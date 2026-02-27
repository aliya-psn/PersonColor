// 人格底色测试 - 首页
Component({
  options: {
    multipleSlots: true,
  },
  data: {
    dimensions: [
      { type: 'life', title: '人格底色', desc: '你的人生观与生活态度', icon: '/images/icon-life.svg' },
      { type: 'emotion', title: '情感底色', desc: '你在感情中的真实模样', icon: '/images/icon-emotion.svg' },
      { type: 'career', title: '职场底色', desc: '你的工作风格与优势', icon: '/images/icon-career.svg' },
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
  },
})
