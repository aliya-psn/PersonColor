// 答题页
import { questionSets } from '../../data/questions'
import { getResultKeys, type TestType } from '../../data/results'

Page({
  data: {
    type: '',
    title: '',
    questions: [] as Array<{ id: number; text: string; options: Array<{ key: string; text: string; type: string }> }>,
    currentIndex: 0,
    answers: [] as string[],
    progress: 0,
    animating: false,
    slideDirection: 'slide-in',
  },

  onLoad(options: { type?: string }) {
    const type = (options.type || 'life') as 'life' | 'emotion' | 'career'
    const set = questionSets[type]
    if (!set) {
      setTimeout(() => wx.navigateBack(), 1500)
      return
    }
    this.setData({
      type,
      title: set.title,
      questions: set.questions,
      currentIndex: 0,
      answers: [],
      progress: 0,
      animating: false,
      slideDirection: 'slide-in',
    })
    // 首次加载时触发进入动画
    setTimeout(() => {
      this.setData({
        animating: true,
      })
      setTimeout(() => {
        this.setData({
          animating: false,
        })
      }, 400)
    }, 50)
  },

  onSelect(e: WechatMiniprogram.TouchEvent) {
    const { type } = e.currentTarget.dataset as { type: string }
    const { questions, currentIndex, answers } = this.data
    const newAnswers = [...answers, type]
    const nextIndex = currentIndex + 1

    if (nextIndex >= questions.length) {
      const { winner, scores } = this.calcScore(newAnswers)
      const scoreStr = scores.join(',')
      wx.redirectTo({
        url: `/pages/result/result?type=${this.data.type}&result=${winner}&scores=${scoreStr}`,
      })
      return
    }

    // 触发退出动画
    this.setData({
      animating: true,
      slideDirection: 'slide-out',
    })

    // 等待退出动画完成后切换题目（优化时序，让过渡更流畅）
    setTimeout(() => {
      this.setData({
        currentIndex: nextIndex,
        answers: newAnswers,
        progress: Math.round((nextIndex / questions.length) * 100),
        slideDirection: 'slide-in',
      })

      // 触发进入动画（稍微延迟，确保DOM更新完成）
      setTimeout(() => {
        this.setData({
          animating: false,
        })
      }, 30)
    }, 280)
  },

  calcScore(answers: string[]): { winner: string; scores: number[] } {
    const testType = this.data.type as TestType
    const keys = getResultKeys(testType)
    const count: Record<string, number> = {}
    keys.forEach(k => { count[k] = 0 })
    answers.forEach(t => {
      if (count[t] !== undefined) count[t]++
    })
    const scores = keys.map(k => count[k])
    const entries = Object.entries(count) as [string, number][]
    entries.sort((a, b) => b[1] - a[1])
    return { winner: entries[0][0], scores }
  },
})
