// 完整报告页
import { results, type ResultType } from '../../data/results'

const defaultAvatar = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    testType: '',
    resultType: '' as ResultType | '',
    resultInfo: null as Record<string, unknown> | null,
    userAvatar: defaultAvatar,
    userNickname: '我的报告',
    suggestionsStr: '',
  },

  onLoad(options: { type?: string; result?: string }) {
    const resultType = (options.result || 'serene') as ResultType
    const info = results[resultType]
    if (!info) {
      wx.showToast({ title: '结果无效', icon: 'none' })
      return
    }
    const suggestions = (info as { suggestions?: string[] }).suggestions || []
    this.setData({
      testType: options.type || 'life',
      resultType,
      resultInfo: info as Record<string, unknown>,
      suggestionsStr: suggestions.join('；'),
    })
  },

  onGenerateImage() {
    wx.showToast({ title: '生成图片功能开发中', icon: 'none' })
    // TODO: 使用 canvas 生成分享海报
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
