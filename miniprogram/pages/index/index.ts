// 本我岛测试 - 首页
Component({
  options: {
    multipleSlots: true,
  },
  data: {
    dimensions: [
      { type: 'life', title: '人生岛', desc: '探索你的人生观与生活态度', icon: '/images/icon-life.svg' },
      { type: 'emotion', title: '情感岛', desc: '探索你在感情中的真实模样', icon: '/images/icon-emotion.svg' },
      { type: 'career', title: '职场岛', desc: '探索你的工作风格与优势', icon: '/images/icon-career.svg' },
    ],
  },
  methods: {
    onSelect(e: WechatMiniprogram.TouchEvent) {
      const type = e.currentTarget.dataset.type as string
      const hasSeenIntro = wx.getStorageSync('personColor_hasSeenIntro')
      const url = hasSeenIntro
        ? `/pages/quiz/quiz?type=${type}`
        : `/pages/intro/intro?type=${type}`
      wx.navigateTo({ url })
    },
    onHistoryTap() {
      wx.navigateTo({
        url: '/pages/history/history',
      })
    },
  },
})
