// 答题页
import { questionSets } from '../../data/questions'

Page({
  data: {
    type: '',
    title: '',
    questions: [] as Array<{ id: number; text: string; options: Array<{ key: string; text: string; type: string }> }>,
    currentIndex: 0,
    answers: [] as string[],
    progress: 0,
  },

  onLoad(options: { type?: string }) {
    const type = (options.type || 'life') as 'life' | 'emotion' | 'career'
    const set = questionSets[type]
    if (!set) {
      wx.showToast({ title: '测试类型无效', icon: 'none' })
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
    })
  },

  onSelect(e: WechatMiniprogram.TouchEvent) {
    const { type } = e.currentTarget.dataset as { type: string }
    const { questions, currentIndex, answers } = this.data
    const newAnswers = [...answers, type]
    const nextIndex = currentIndex + 1

    if (nextIndex >= questions.length) {
      const score = this.calcScore(newAnswers)
      wx.redirectTo({
        url: `/pages/result/result?type=${this.data.type}&result=${score}`,
      })
      return
    }

    this.setData({
      answers: newAnswers,
      currentIndex: nextIndex,
      progress: Math.round((nextIndex / questions.length) * 100),
    })
  },

  calcScore(answers: string[]): string {
    const count: Record<string, number> = { serene: 0, warm: 0, free: 0, rational: 0 }
    answers.forEach(t => {
      if (count[t] !== undefined) count[t]++
    })
    const entries = Object.entries(count)
    entries.sort((a, b) => b[1] - a[1])
    return entries[0][0]
  },
})
