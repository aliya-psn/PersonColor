// 测试历史记录页
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
    historyList: [] as HistoryRecord[],
    isEmpty: true,
  },

  onLoad() {
    this.loadHistory()
  },

  onShow() {
    // 每次显示页面时刷新历史记录
    this.loadHistory()
  },

  loadHistory() {
    try {
      const records = (wx.getStorageSync('personColor_testHistory') as HistoryRecord[]) || []
      // 确保每条记录都有timeStr，如果没有则格式化
      records.forEach((record) => {
        if (!record.timeStr && record.timestamp) {
          record.timeStr = formatTime(record.timestamp)
        }
      })
      // 按时间倒序排列
      records.sort((a, b) => b.timestamp - a.timestamp)
      this.setData({
        historyList: records,
        isEmpty: records.length === 0,
      })
    } catch (error) {
      console.error('加载历史记录失败:', error)
      this.setData({
        historyList: [],
        isEmpty: true,
      })
    }
  },

  onItemTap(e: WechatMiniprogram.TouchEvent) {
    const index = e.currentTarget.dataset.index as number
    const record = this.data.historyList[index]
    if (!record) return

    const scoresStr = record.scores.join(',')
    wx.navigateTo({
      url: `/pages/result/result?type=${record.testType}&result=${record.resultType}&scores=${scoresStr}`,
    })
  },

  onClear() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空所有测试记录吗？此操作不可恢复。',
      success: (res) => {
        if (res.confirm) {
          try {
            wx.removeStorageSync('personColor_testHistory')
            this.setData({
              historyList: [],
              isEmpty: true,
            })
            wx.showToast({
              title: '已清空',
              icon: 'success',
            })
          } catch (error) {
            wx.showToast({
              title: '清空失败',
              icon: 'error',
            })
          }
        }
      },
    })
  },
})

