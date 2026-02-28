// 结果简要页
import { getResults, type TestType } from '../../data/results'

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
    if (scoresStr && scoresStr.trim()) {
      try {
        const nums = scoresStr
          .trim()
          .split(',')
          .map(s => parseInt(s, 10))
          .filter(n => !isNaN(n))
        if (nums.length === 4) {
          const stored = (wx.getStorageSync('personColor_radarScores') as Record<string, number[]>) || {}
          stored[testType] = nums
          wx.setStorageSync('personColor_radarScores', stored)
        }
      } catch (_) {}
    }
    this.setData({
      testType,
      resultType,
      resultInfo: info as unknown as Record<string, unknown>,
      scoresStr,
    })
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
