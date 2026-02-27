// 测试前须知页（首次展示）
const STORAGE_KEY = 'personColor_hasSeenIntro'

Page({
  data: {
    type: 'life' as string,
  },

  onLoad(options: { type?: string }) {
    this.setData({ type: options.type || 'life' })
  },

  onEnter() {
    wx.setStorageSync(STORAGE_KEY, true)
    wx.redirectTo({
      url: `/pages/quiz/quiz?type=${this.data.type}`,
    })
  },
})
