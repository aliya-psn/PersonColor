// 完整报告页
import { getResults, getRadarLabels } from '../../data/results'

const defaultAvatar = '/images/default-avatar.svg'
const RADAR_STORAGE_KEY = 'personColor_radarScores'
const RADAR_TITLES: Record<RadarDim, string> = {
  life: '人生底色',
  emotion: '情感底色',
  career: '职场底色',
}

type RadarDim = 'life' | 'emotion' | 'career'

function loadRadarScores(): Partial<Record<RadarDim, number[]>> {
  try {
    const raw = wx.getStorageSync(RADAR_STORAGE_KEY)
    if (raw && typeof raw === 'object') return raw as Partial<Record<RadarDim, number[]>>
  } catch (_) {}
  return {}
}

function saveRadarScores(data: Partial<Record<RadarDim, number[]>>) {
  try {
    wx.setStorageSync(RADAR_STORAGE_KEY, data)
  } catch (_) {}
}

function parseScoresParam(raw?: string): number[] | null {
  if (!raw) return null
  let decoded = raw
  try {
    decoded = decodeURIComponent(raw)
  } catch (_) {}

  // 支持 "1,2,3,4" 或 "[1,2,3,4]" 两种格式
  const trimmed = decoded.trim()
  if (!trimmed) return null
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const arr = JSON.parse(trimmed)
      if (Array.isArray(arr)) {
        const nums = arr.map(n => (typeof n === 'number' ? n : parseInt(String(n), 10))).filter(n => !isNaN(n))
        return nums.length === 4 ? nums : null
      }
    } catch (_) {}
  }

  const nums = trimmed
    .split(',')
    .map(s => parseInt(s, 10))
    .filter(n => !isNaN(n))
  return nums.length === 4 ? nums : null
}

/** 使用旧版 Canvas API 绘制雷达图（兼容 scroll-view，不依赖 type="2d"） */
function drawRadarCanvasOld(
  ctx: WechatMiniprogram.CanvasContext,
  width: number,
  height: number,
  scores: number[],
  labels: string[]
) {
  const cx = width / 2
  const cy = height / 2
  const padding = 44
  const maxR = Math.min(width, height) / 2 - padding
  const maxVal = Math.max(...scores, 1)
  const angleList = [270, 0, 90, 180].map((d) => (d * Math.PI) / 180)

  ctx.clearRect(0, 0, width, height)

  ctx.setStrokeStyle('rgba(30, 58, 95, 0.12)')
  ctx.setFillStyle('rgba(30, 58, 95, 0.04)')
  ctx.setLineWidth(1)
  for (let level = 1; level <= 5; level++) {
    const r = (maxR * level) / 5
    ctx.beginPath()
    for (let i = 0; i < angleList.length; i++) {
      const x = cx + r * Math.cos(angleList[i])
      const y = cy + r * Math.sin(angleList[i])
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.stroke()
    ctx.fill()
  }

  ctx.setStrokeStyle('rgba(30, 58, 95, 0.2)')
  ctx.setLineWidth(1.5)
  for (let i = 0; i < angleList.length; i++) {
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo(cx + maxR * Math.cos(angleList[i]), cy + maxR * Math.sin(angleList[i]))
    ctx.stroke()
  }

  ctx.beginPath()
  for (let i = 0; i < scores.length; i++) {
    const ratio = maxVal ? scores[i] / maxVal : 0
    const r = maxR * ratio
    const x = cx + r * Math.cos(angleList[i])
    const y = cy + r * Math.sin(angleList[i])
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.setFillStyle('rgba(30, 58, 95, 0.35)')
  ctx.fill()
  ctx.setStrokeStyle('#1e3a5f')
  ctx.setLineWidth(2)
  ctx.stroke()

  ctx.setFillStyle('#64748b')
  ctx.setFontSize(12)
  ctx.setTextAlign('center')
  for (let i = 0; i < labels.length; i++) {
    const r = maxR + 20
    const x = cx + r * Math.cos(angleList[i])
    const y = cy + r * Math.sin(angleList[i])
    ctx.fillText(labels[i], x, y)
  }
}

type RadarChartItem = {
  key: string
  title: string
  scores: number[] | null
  labels: string[]
  radarOption?: Record<string, unknown> | null
}

Page({
  data: {
    testType: '',
    resultType: '',
    resultInfo: null as Record<string, unknown> | null,
    userAvatar: defaultAvatar,
    userNickname: '我的报告',
    suggestionsStr: '',
    radarCharts: [] as RadarChartItem[],
    radarTitle: '',
    radarScores: [] as number[],
    radarLabels: [] as string[],
  },

  onLoad(options: { type?: string; result?: string; scores?: string }) {
    const testType = (options.type || 'life') as RadarDim
    const resultType = options.result || ''
    const results = getResults(testType)
    const info = resultType ? results[resultType] : null
    if (!info) {
      return
    }
    const scores = parseScoresParam(options.scores)
    if (scores) {
      const stored = loadRadarScores()
      stored[testType] = scores
      saveRadarScores(stored)
    }
    const stored = loadRadarScores()
    const currentScores = scores || stored[testType] || null
    const labels = getRadarLabels(testType)
    const radarTitle = RADAR_TITLES[testType]
    const radarCharts: RadarChartItem[] = [
      {
        key: testType,
        title: radarTitle,
        scores: currentScores,
        labels,
        radarOption: null,
      },
    ]
    const suggestions = (info as { suggestions?: string[] }).suggestions || []
    this.setData({
      testType,
      resultType,
      resultInfo: info as unknown as Record<string, unknown>,
      suggestionsStr: suggestions.join('；'),
      radarCharts,
      radarTitle,
      radarScores: currentScores || [],
      radarLabels: labels,
    })
  },

  onReady() {
    const scores = this.data.radarScores
    const labels = this.data.radarLabels || []
    if (!scores || scores.length !== 4) return

    const doDraw = (width: number, height: number) => {
      const ctx = wx.createCanvasContext('radarCanvas', this)
      drawRadarCanvasOld(ctx, width, height, scores, labels)
      ctx.draw(false, () => {})
    }

    const tryDraw = (retry: number) => {
      wx.createSelectorQuery()
        .in(this)
        .select('#radar-canvas')
        .boundingClientRect()
        .exec((res) => {
          const rect = res && res[0]
          if (!rect || !rect.width || !rect.height) {
            if (retry < 12) setTimeout(() => tryDraw(retry + 1), 250)
            return
          }
          const w = rect.width
          const h = rect.height
          doDraw(w, h)
        })
    }

    setTimeout(() => tryDraw(0), 500)
  },

  onGenerateImage() {
    wx.showToast({ title: '生成图片功能开发中', icon: 'none' })
  },

  onTestAgain() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },

  onShare() {
    return {
      title: `我的${this.data.resultInfo?.name || '人格底色'}完整报告，快来测测你的！`,
      path: '/pages/index/index',
    }
  },
})
