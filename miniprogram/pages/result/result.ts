// 结果简要页
import { results, type ResultType } from '../../data/results'

Page({
  data: {
    testType: '',
    resultType: '' as ResultType | '',
    resultInfo: null as Record<string, unknown> | null,
  },

  onLoad(options: { type?: string; result?: string }) {
    const resultType = (options.result || 'serene') as ResultType
    const info = results[resultType]
    if (!info) {
      wx.showToast({ title: '结果无效', icon: 'none' })
      return
    }
    this.setData({
      testType: options.type || 'life',
      resultType,
      resultInfo: info as Record<string, unknown>,
    })
  },

  goToReport() {
    wx.showModal({
      title: '解锁完整报告',
      content: '观看一段广告即可免费解锁完整性格解析、优势天赋、建议等内容',
      confirmText: '看广告解锁',
      success: res => {
        if (res.confirm) this.watchAdAndUnlock()
      },
      fail: err => {
        console.error('showModal fail', err)
        this.watchAdAndUnlock()
      },
    })
  },

  watchAdAndUnlock() {
    const goReport = () => {
      wx.navigateTo({
        url: `/pages/report/report?type=${this.data.testType}&result=${this.data.resultType}`,
      })
    }
    try {
      const videoAd = wx.createRewardedVideoAd({ adUnitId: 'ad-unit-id' })
      videoAd.onClose(res => {
        if (res && res.isEnded) goReport()
        else wx.showToast({ title: '请完整观看广告', icon: 'none' })
      })
      videoAd.onError(() => goReport())
      videoAd.show().catch(() => goReport())
    } catch {
      goReport()
    }
  },

  onShare() {
    return {
      title: `我的${this.data.resultInfo?.name || '人格底色'}测试结果，快来测测你的！`,
      path: '/pages/index/index',
    }
  },
})
