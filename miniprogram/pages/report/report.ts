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
    wx.showLoading({ title: '生成中...', mask: true })
    
    const { resultInfo, userAvatar } = this.data
    if (!resultInfo) {
      wx.hideLoading()
      wx.showToast({ title: '数据加载中，请稍候', icon: 'none' })
      return
    }

    // 使用 rpx 转 px 的比例（假设设计稿 750rpx = 375px，即 2倍）
    const rpx2px = 0.5
    const canvasWidth = 750
    const padding = 40 * rpx2px
    let currentY = padding

    const ctx = wx.createCanvasContext('shareCanvas', this)
    
    // 绘制背景（高度足够覆盖所有内容包括二维码）
    ctx.setFillStyle('#fdf6eb')
    ctx.fillRect(0, 0, canvasWidth, 1800)

    // 绘制标题卡片背景
    const cardBgY = currentY
    const cardBgHeight = 200 * rpx2px
    ctx.setFillStyle('#fff')
    ctx.setShadow(0, 4 * rpx2px, 20 * rpx2px, 'rgba(0, 0, 0, 0.06)')
    this.roundRect(ctx, padding, cardBgY, canvasWidth - padding * 2, cardBgHeight, 24 * rpx2px)
    ctx.fill()
    ctx.setShadow(0, 0, 0, 'transparent')

    // 绘制用户信息
    if (userAvatar && userAvatar !== '/images/default-avatar.svg') {
      // 绘制头像（简化处理，实际需要先下载图片）
      ctx.save()
      ctx.beginPath()
      ctx.arc(padding + 28 * rpx2px, cardBgY + 24 * rpx2px, 28 * rpx2px, 0, 2 * Math.PI)
      ctx.clip()
      ctx.setFillStyle('#e8e4de')
      ctx.fill()
      ctx.restore()
    }

    // 绘制标题标签
    const labelX = padding + 36 * rpx2px
    const labelY = cardBgY + 40 * rpx2px
    ctx.setFillStyle('#1e3a5f')
    ctx.setFontSize(28 * rpx2px)
    ctx.fillText('人格底色', labelX, labelY)

    // 绘制类型名称
    const nameY = labelY + 50 * rpx2px
    ctx.setFillStyle('#1e3a5f')
    ctx.setFontSize(40 * rpx2px)
    ctx.fillText((resultInfo.name as string) || '', labelX, nameY)

    // 绘制 tagline
    if (resultInfo.tagline) {
      const taglineY = nameY + 35 * rpx2px
      ctx.setFillStyle('#64748b')
      ctx.setFontSize(28 * rpx2px)
      this.drawText(ctx, resultInfo.tagline as string, labelX, taglineY, canvasWidth - padding * 2 - 36 * rpx2px, 28 * rpx2px * 1.5)
    }

    currentY = cardBgY + cardBgHeight + 28 * rpx2px

    // 绘制内容卡片
    const contentCardY = currentY
    ctx.setFillStyle('#fff')
    ctx.setShadow(0, 4 * rpx2px, 20 * rpx2px, 'rgba(0, 0, 0, 0.06)')
    this.roundRect(ctx, padding, contentCardY, canvasWidth - padding * 2, 800 * rpx2px, 24 * rpx2px)
    ctx.fill()
    ctx.setShadow(0, 0, 0, 'transparent')

    let contentY = contentCardY + 40 * rpx2px

    // 绘制标签
    if (resultInfo.tags && Array.isArray(resultInfo.tags)) {
      ctx.setFillStyle('#1e3a5f')
      ctx.setFontSize(28 * rpx2px)
      ctx.fillText('人格类型', padding + 36 * rpx2px, contentY)
      contentY += 50 * rpx2px

      const tags = resultInfo.tags as string[]
      let tagX = padding + 36 * rpx2px
      tags.forEach((tag) => {
        const tagWidth = ctx.measureText(tag).width + 36 * rpx2px
        if (tagX + tagWidth > canvasWidth - padding - 36 * rpx2px) {
          tagX = padding + 36 * rpx2px
          contentY += 50 * rpx2px
        }
        ctx.setFillStyle('rgba(148, 163, 184, 0.12)')
        this.roundRect(ctx, tagX, contentY - 22 * rpx2px, tagWidth, 44 * rpx2px, 999 * rpx2px)
        ctx.fill()
        ctx.setFillStyle('#1e3a5f')
        ctx.setFontSize(22 * rpx2px)
        ctx.fillText(tag, tagX + 18 * rpx2px, contentY)
        tagX += tagWidth + 24 * rpx2px
      })
      contentY += 60 * rpx2px
    }

    // 绘制详细内容
    const pointItems = [
      { label: '整体气质：', text: resultInfo.summary as string },
      { label: '核心优势：', text: resultInfo.strengths as string },
      { label: '隐藏天赋 & 雷区：', text: `${resultInfo.hiddenTalent as string}；${resultInfo.weakness as string}` },
    ]

    pointItems.forEach((item, index) => {
      const pointX = padding + 36 * rpx2px
      const pointY = contentY

      // 绘制数字圆圈
      ctx.setFillStyle('#c97a65')
      ctx.beginPath()
      ctx.arc(pointX + 24 * rpx2px, pointY + 24 * rpx2px, 24 * rpx2px, 0, 2 * Math.PI)
      ctx.fill()
      ctx.setFillStyle('#fff')
      ctx.setFontSize(26 * rpx2px)
      ctx.setTextAlign('center')
      ctx.fillText(String(index + 1), pointX + 24 * rpx2px, pointY + 30 * rpx2px)
      ctx.setTextAlign('left')

      // 绘制文本
      const textX = pointX + 72 * rpx2px
      const textWidth = canvasWidth - textX - padding - 36 * rpx2px
      ctx.setFillStyle('#1e293b')
      ctx.setFontSize(28 * rpx2px)
      ctx.fillText(item.label, textX, pointY + 20 * rpx2px)
      
      ctx.setFillStyle('#475569')
      const fullText = item.text
      contentY = this.drawText(ctx, fullText, textX, pointY + 50 * rpx2px, textWidth, 28 * rpx2px * 1.8)
      contentY += 32 * rpx2px
    })

    // 绘制建议
    if (resultInfo.suggestions && Array.isArray(resultInfo.suggestions)) {
      const suggestX = padding + 36 * rpx2px
      const suggestStartY = contentY

      ctx.setFillStyle('#1e293b')
      ctx.setFontSize(28 * rpx2px)
      ctx.fillText('行动建议：', suggestX + 72 * rpx2px, suggestStartY + 20 * rpx2px)

      const suggestions = resultInfo.suggestions as string[]
      let suggestY = suggestStartY + 50 * rpx2px
      suggestions.forEach((suggest) => {
        // 绘制圆点
        ctx.setFillStyle('#c97a65')
        ctx.beginPath()
        ctx.arc(suggestX + 72 * rpx2px + 5 * rpx2px, suggestY + 7 * rpx2px, 5 * rpx2px, 0, 2 * Math.PI)
        ctx.fill()

        // 绘制文本
        const textX = suggestX + 72 * rpx2px + 24 * rpx2px
        const textWidth = canvasWidth - textX - padding - 36 * rpx2px
        ctx.setFillStyle('#475569')
        ctx.setFontSize(26 * rpx2px)
        suggestY = this.drawText(ctx, suggest, textX, suggestY, textWidth, 26 * rpx2px * 1.8)
        suggestY += 16 * rpx2px
      })
      contentY = suggestY + 20 * rpx2px
    }

    // 绘制底部二维码区域
    const qrCodeY = contentY + 60 * rpx2px
    const qrCodeSize = 120 * rpx2px
    const qrCodeX = (canvasWidth - qrCodeSize) / 2

    // 绘制二维码背景
    ctx.setFillStyle('#fff')
    this.roundRect(ctx, qrCodeX - 20 * rpx2px, qrCodeY - 20 * rpx2px, qrCodeSize + 40 * rpx2px, qrCodeSize + 40 * rpx2px, 12 * rpx2px)
    ctx.fill()

    // 绘制二维码（需要先下载图片）
    this.drawQRCode(ctx, qrCodeX, qrCodeY, qrCodeSize, () => {
      // 绘制底部提示文字
      const footerY = qrCodeY + qrCodeSize + 60 * rpx2px
      ctx.setFillStyle('#94a3b8')
      ctx.setFontSize(24 * rpx2px)
      ctx.setTextAlign('center')
      ctx.fillText('长按保存图片分享给好友', canvasWidth / 2, footerY)
      
      // 绘制小程序提示
      const tipY = footerY + 40 * rpx2px
      ctx.setFillStyle('#64748b')
      ctx.setFontSize(22 * rpx2px)
      ctx.fillText('扫码体验「人格底色」测试', canvasWidth / 2, tipY)
      
      ctx.draw(false, () => {
        setTimeout(() => {
          wx.canvasToTempFilePath({
            canvasId: 'shareCanvas',
            success: (res) => {
              wx.hideLoading()
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: () => {
                  wx.showToast({ title: '已保存到相册', icon: 'success' })
                },
                fail: (err) => {
                  if (err.errMsg.includes('auth deny')) {
                    wx.showModal({
                      title: '提示',
                      content: '需要授权保存图片到相册',
                      success: (modalRes) => {
                        if (modalRes.confirm) {
                          wx.openSetting()
                        }
                      },
                    })
                  } else {
                    wx.showToast({ title: '保存失败', icon: 'none' })
                  }
                },
              })
            },
            fail: () => {
              wx.hideLoading()
              wx.showToast({ title: '生成失败', icon: 'none' })
            },
          }, this)
        }, 500)
      })
    })

  },

  // 绘制圆角矩形
  roundRect(ctx: WechatMiniprogram.CanvasContext, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.quadraticCurveTo(x + w, y, x + w, y + r)
    ctx.lineTo(x + w, y + h - r)
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    ctx.lineTo(x + r, y + h)
    ctx.quadraticCurveTo(x, y + h, x, y + h - r)
    ctx.lineTo(x, y + r)
    ctx.quadraticCurveTo(x, y, x + r, y)
    ctx.closePath()
  },

  // 绘制文本（支持换行）
  drawText(ctx: WechatMiniprogram.CanvasContext, text: string, x: number, y: number, maxWidth: number, lineHeight: number): number {
    const words = text.split('')
    let line = ''
    let currentY = y

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i]
      const metrics = ctx.measureText(testLine)
      const testWidth = metrics.width

      if (testWidth > maxWidth && i > 0) {
        ctx.fillText(line, x, currentY)
        line = words[i]
        currentY += lineHeight
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, x, currentY)
    return currentY + lineHeight
  },

  // 绘制二维码
  drawQRCode(
    ctx: WechatMiniprogram.CanvasContext,
    x: number,
    y: number,
    size: number,
    callback: () => void
  ) {
    // 尝试加载本地二维码图片，如果不存在则绘制占位符
    // 二维码图片路径：/images/qrcode.png 或 /images/qrcode.jpg
    const qrCodePaths = ['/images/qrcode.png', '/images/qrcode.jpg', '/images/qrcode.jpeg']
    let loaded = false

    const tryLoadQRCode = (index: number) => {
      if (index >= qrCodePaths.length) {
        // 所有路径都失败，绘制占位符
        if (!loaded) {
          this.drawQRCodePlaceholder(ctx, x, y, size)
          callback()
        }
        return
      }

      wx.getImageInfo({
        src: qrCodePaths[index],
        success: (res) => {
          loaded = true
          ctx.drawImage(res.path, x, y, size, size)
          callback()
        },
        fail: () => {
          // 尝试下一个路径
          tryLoadQRCode(index + 1)
        },
      })
    }

    tryLoadQRCode(0)
  },

  // 绘制二维码占位符（如果无法获取小程序码）
  drawQRCodePlaceholder(
    ctx: WechatMiniprogram.CanvasContext,
    x: number,
    y: number,
    size: number
  ) {
    // 绘制二维码边框
    ctx.setStrokeStyle('#1e3a5f')
    ctx.setLineWidth(2)
    ctx.strokeRect(x, y, size, size)

    // 绘制内部网格（模拟二维码）
    ctx.setStrokeStyle('#1e3a5f')
    ctx.setLineWidth(1)
    const gridSize = size / 7
    for (let i = 1; i < 7; i++) {
      ctx.beginPath()
      ctx.moveTo(x + i * gridSize, y)
      ctx.lineTo(x + i * gridSize, y + size)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y + i * gridSize)
      ctx.lineTo(x + size, y + i * gridSize)
      ctx.stroke()
    }

    // 绘制四个角的定位点
    const cornerSize = gridSize * 2
    const corners = [
      [x, y],
      [x + size - cornerSize, y],
      [x, y + size - cornerSize],
    ]

    corners.forEach(([cx, cy]) => {
      // 外框
      ctx.setFillStyle('#1e3a5f')
      ctx.fillRect(cx, cy, cornerSize, cornerSize)
      // 内框
      ctx.setFillStyle('#fff')
      ctx.fillRect(cx + gridSize * 0.3, cy + gridSize * 0.3, gridSize * 1.4, gridSize * 1.4)
      // 中心点
      ctx.setFillStyle('#1e3a5f')
      ctx.fillRect(cx + gridSize * 0.6, cy + gridSize * 0.6, gridSize * 0.8, gridSize * 0.8)
    })
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
