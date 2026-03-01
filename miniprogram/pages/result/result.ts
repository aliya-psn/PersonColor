// 结果简要页
import { getResults, type TestType } from '../../data/results'

interface HistoryRecord {
  id: string
  testType: TestType
  testTypeTitle: string
  resultType: string
  resultName: string
  resultSummary: string
  scores: number[]
  timestamp: number
  timeStr: string
}

const TEST_TYPE_TITLES: Record<TestType, string> = {
  life: '人生底色',
  emotion: '情感底色',
  career: '职场底色',
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const testDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const diffDays = Math.floor((today.getTime() - testDate.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return '今天 ' + date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  } else if (diffDays === 1) {
    return '昨天 ' + date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  } else if (diffDays < 7) {
    return `${diffDays}天前`
  } else {
    return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })
  }
}

Page({
  data: {
    testType: '' as TestType | '',
    resultType: '',
    resultInfo: null as Record<string, unknown> | null,
    scoresStr: '',
  },

  onLoad(options: { type?: string; result?: string; scores?: string }) {
    const testType = (options.type || 'life') as TestType
    const resultType = options.result || ''
    const results = getResults(testType)
    const info = resultType ? results[resultType] : null
    if (!info) {
      return
    }
    const scoresStr = options.scores || ''
    // 把 scores 写入 storage，report 页可从 storage 兜底读取
    let scores: number[] = []
    if (scoresStr && scoresStr.trim()) {
      try {
        const nums = scoresStr
          .trim()
          .split(',')
          .map(s => parseInt(s, 10))
          .filter(n => !isNaN(n))
        if (nums.length === 4) {
          scores = nums
          const stored = (wx.getStorageSync('personColor_radarScores') as Record<string, number[]>) || {}
          stored[testType] = nums
          wx.setStorageSync('personColor_radarScores', stored)
        }
      } catch (_) {}
    }

    // 保存测试记录到历史
    this.saveTestHistory(testType, resultType, info as { name: string; summary: string }, scores)

    this.setData({
      testType,
      resultType,
      resultInfo: info as unknown as Record<string, unknown>,
      scoresStr,
    })
  },

  saveTestHistory(
    testType: TestType,
    resultType: string,
    resultInfo: { name: string; summary: string },
    scores: number[]
  ) {
    try {
      const timestamp = Date.now()
      const record: HistoryRecord = {
        id: `${testType}_${resultType}_${timestamp}`,
        testType,
        testTypeTitle: TEST_TYPE_TITLES[testType],
        resultType,
        resultName: resultInfo.name,
        resultSummary: resultInfo.summary,
        scores,
        timestamp,
        timeStr: formatTime(timestamp),
      }

      const history = (wx.getStorageSync('personColor_testHistory') as HistoryRecord[]) || []
      // 检查是否已存在相同的记录（相同类型和结果），如果存在则更新，否则添加
      const existingIndex = history.findIndex(
        (r) => r.testType === testType && r.resultType === resultType
      )
      if (existingIndex >= 0) {
        history[existingIndex] = record
      } else {
        history.push(record)
      }
      wx.setStorageSync('personColor_testHistory', history)
    } catch (error) {
      console.error('保存测试记录失败:', error)
    }
  },

  goToReport() {
    const { testType, resultType, scoresStr } = this.data
    const query = scoresStr ? `&scores=${encodeURIComponent(scoresStr)}` : ''
    wx.navigateTo({
      url: `/pages/report/report?type=${testType}&result=${resultType}${query}`,
    })
  },

  onShare() {
    return {
      title: `我的${this.data.resultInfo?.name || '人格底色'}测试结果，快来测测你的！`,
      path: '/pages/index/index',
    }
  },
})
