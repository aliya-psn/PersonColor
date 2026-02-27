// 自动生成，请勿直接编辑。数据源: life.json, emotion.json, career.json
// 运行 node scripts/gen-questions.js 重新生成

export interface QuestionOption {
  key: string
  text: string
  type: 'serene' | 'warm' | 'free' | 'rational'
}

export interface Question {
  id: number
  text: string
  options: QuestionOption[]
}

export interface QuestionSet {
  type: string
  title: string
  questions: Question[]
}

export const questionSets = {
  life: {
  "type": "life",
  "title": "人格底色",
  "questions": [
    {
      "id": 1,
      "text": "遇到压力大时，你更倾向？",
      "options": [
        {
          "key": "A",
          "text": "独自安静消化",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "找人倾诉安慰",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "换环境散心",
          "type": "free"
        },
        {
          "key": "D",
          "text": "分析问题解决",
          "type": "rational"
        }
      ]
    },
    {
      "id": 2,
      "text": "你人生最看重的是？",
      "options": [
        {
          "key": "A",
          "text": "内心平静与真实",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "爱与被爱",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "自由与体验",
          "type": "free"
        },
        {
          "key": "D",
          "text": "成就与价值",
          "type": "rational"
        }
      ]
    },
    {
      "id": 3,
      "text": "做重要决定时，你更依赖？",
      "options": [
        {
          "key": "A",
          "text": "直觉与内心感受",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "情感与他人建议",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "新鲜感与可能性",
          "type": "free"
        },
        {
          "key": "D",
          "text": "逻辑与利弊",
          "type": "rational"
        }
      ]
    },
    {
      "id": 4,
      "text": "你理想的生活状态是？",
      "options": [
        {
          "key": "A",
          "text": "安稳有序、内心充实",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "温暖有人陪伴",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "不被束缚、随心而活",
          "type": "free"
        },
        {
          "key": "D",
          "text": "不断进步、有目标",
          "type": "rational"
        }
      ]
    },
    {
      "id": 5,
      "text": "别人对你误解时，你通常？",
      "options": [
        {
          "key": "A",
          "text": "不想解释，默默承受",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "难过，希望被理解",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "无所谓，走自己的路",
          "type": "free"
        },
        {
          "key": "D",
          "text": "理性说明，澄清事实",
          "type": "rational"
        }
      ]
    },
    {
      "id": 6,
      "text": "你更讨厌哪种状态？",
      "options": [
        {
          "key": "A",
          "text": "浮躁、内心不安",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "孤独、不被在乎",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "被控制、被安排",
          "type": "free"
        },
        {
          "key": "D",
          "text": "混乱、无效率",
          "type": "rational"
        }
      ]
    },
    {
      "id": 7,
      "text": "你对「未来」的态度是？",
      "options": [
        {
          "key": "A",
          "text": "顺其自然，专注当下",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "希望充满爱与温暖",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "期待新鲜与变化",
          "type": "free"
        },
        {
          "key": "D",
          "text": "规划清晰，稳步前进",
          "type": "rational"
        }
      ]
    },
    {
      "id": 8,
      "text": "你休息时更喜欢？",
      "options": [
        {
          "key": "A",
          "text": "独处、看书、思考",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "和家人朋友相处",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "出门探索、尝试新事物",
          "type": "free"
        },
        {
          "key": "D",
          "text": "学习提升、整理规划",
          "type": "rational"
        }
      ]
    },
    {
      "id": 9,
      "text": "你认为自己最大的特质是？",
      "options": [
        {
          "key": "A",
          "text": "通透、有深度",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "善良、重感情",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "勇敢、不妥协",
          "type": "free"
        },
        {
          "key": "D",
          "text": "理性、靠谱",
          "type": "rational"
        }
      ]
    },
    {
      "id": 10,
      "text": "你一生最想成为的人？",
      "options": [
        {
          "key": "A",
          "text": "内心强大、清醒自洽",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "温柔有爱、被人信赖",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "自由热烈、忠于自己",
          "type": "free"
        },
        {
          "key": "D",
          "text": "沉稳有力、有所成就",
          "type": "rational"
        }
      ]
    }
  ]
},
  emotion: {
  "type": "emotion",
  "title": "情感底色",
  "questions": [
    {
      "id": 1,
      "text": "你在感情里最需要？",
      "options": [
        {
          "key": "A",
          "text": "安全感与理解",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "陪伴与偏爱",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "空间与尊重",
          "type": "free"
        },
        {
          "key": "D",
          "text": "稳定与靠谱",
          "type": "rational"
        }
      ]
    },
    {
      "id": 2,
      "text": "喜欢一个人时，你会？",
      "options": [
        {
          "key": "A",
          "text": "默默关注，慢慢靠近",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "主动关心，温柔付出",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "大胆表达，跟随感觉",
          "type": "free"
        },
        {
          "key": "D",
          "text": "观察评估，认真对待",
          "type": "rational"
        }
      ]
    },
    {
      "id": 3,
      "text": "吵架后你通常？",
      "options": [
        {
          "key": "A",
          "text": "冷静思考，等情绪过去",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "希望先和好，再沟通",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "想独处，不想被逼迫",
          "type": "free"
        },
        {
          "key": "D",
          "text": "理性复盘，解决问题",
          "type": "rational"
        }
      ]
    },
    {
      "id": 4,
      "text": "你心中理想的关系是？",
      "options": [
        {
          "key": "A",
          "text": "灵魂契合，彼此懂对方",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "温暖甜蜜，互相照顾",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "轻松自由，不束缚彼此",
          "type": "free"
        },
        {
          "key": "D",
          "text": "稳定踏实，共同成长",
          "type": "rational"
        }
      ]
    },
    {
      "id": 5,
      "text": "对方忽略你时，你会？",
      "options": [
        {
          "key": "A",
          "text": "内心敏感，默默难过",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "直接表达，希望被重视",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "假装不在意，保持体面",
          "type": "free"
        },
        {
          "key": "D",
          "text": "分析原因，理性沟通",
          "type": "rational"
        }
      ]
    },
    {
      "id": 6,
      "text": "你在感情中最害怕？",
      "options": [
        {
          "key": "A",
          "text": "不被理解，精神孤独",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "被辜负、付出不值得",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "失去自我，变得妥协",
          "type": "free"
        },
        {
          "key": "D",
          "text": "不稳定，充满变数",
          "type": "rational"
        }
      ]
    },
    {
      "id": 7,
      "text": "你表达爱的方式是？",
      "options": [
        {
          "key": "A",
          "text": "用心陪伴，默默支持",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "温柔体贴，细节照顾",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "给对方空间与自由",
          "type": "free"
        },
        {
          "key": "D",
          "text": "承担责任，解决问题",
          "type": "rational"
        }
      ]
    },
    {
      "id": 8,
      "text": "选择伴侣你更看重？",
      "options": [
        {
          "key": "A",
          "text": "三观契合、内心成熟",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "温柔善良、情绪稳定",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "有趣独立、有个性",
          "type": "free"
        },
        {
          "key": "D",
          "text": "靠谱上进、有担当",
          "type": "rational"
        }
      ]
    },
    {
      "id": 9,
      "text": "感情变淡时你会？",
      "options": [
        {
          "key": "A",
          "text": "内心失落，不愿放弃",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "主动挽回，珍惜感情",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "接受现实，体面离开",
          "type": "free"
        },
        {
          "key": "D",
          "text": "冷静分析，尝试修复",
          "type": "rational"
        }
      ]
    },
    {
      "id": 10,
      "text": "你在感情里的底色是？",
      "options": [
        {
          "key": "A",
          "text": "深情且克制",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "热烈且真诚",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "自由且独立",
          "type": "free"
        },
        {
          "key": "D",
          "text": "理性且负责",
          "type": "rational"
        }
      ]
    }
  ]
},
  career: {
  "type": "career",
  "title": "职场底色",
  "questions": [
    {
      "id": 1,
      "text": "工作中你最在意？",
      "options": [
        {
          "key": "A",
          "text": "内心认可、价值感",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "团队氛围、人际关系",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "创造空间、自由度",
          "type": "free"
        },
        {
          "key": "D",
          "text": "目标成果、效率收益",
          "type": "rational"
        }
      ]
    },
    {
      "id": 2,
      "text": "面对任务，你倾向？",
      "options": [
        {
          "key": "A",
          "text": "深思熟虑，稳步推进",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "配合团队，乐于协作",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "灵活创新，不按套路",
          "type": "free"
        },
        {
          "key": "D",
          "text": "目标明确，高效执行",
          "type": "rational"
        }
      ]
    },
    {
      "id": 3,
      "text": "遇到困难工作，你会？",
      "options": [
        {
          "key": "A",
          "text": "冷静分析，找到本质",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "求助协作，一起解决",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "换思路，尝试新方法",
          "type": "free"
        },
        {
          "key": "D",
          "text": "制定计划，强行攻克",
          "type": "rational"
        }
      ]
    },
    {
      "id": 4,
      "text": "你适合的工作环境是？",
      "options": [
        {
          "key": "A",
          "text": "安静专注、少干扰",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "和谐友善、氛围好",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "灵活自由、不刻板",
          "type": "free"
        },
        {
          "key": "D",
          "text": "清晰规则、晋升明确",
          "type": "rational"
        }
      ]
    },
    {
      "id": 5,
      "text": "你对「成功」的定义是？",
      "options": [
        {
          "key": "A",
          "text": "做自己认可、有深度的事",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "被认可、被需要、人缘好",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "做热爱的事，不受限",
          "type": "free"
        },
        {
          "key": "D",
          "text": "有成绩、有地位、有回报",
          "type": "rational"
        }
      ]
    },
    {
      "id": 6,
      "text": "领导安排不合理任务，你？",
      "options": [
        {
          "key": "A",
          "text": "先思考，再委婉提出",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "尽量配合，不想冲突",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "按自己方式灵活完成",
          "type": "free"
        },
        {
          "key": "D",
          "text": "明确逻辑，提出优化",
          "type": "rational"
        }
      ]
    },
    {
      "id": 7,
      "text": "你更擅长？",
      "options": [
        {
          "key": "A",
          "text": "深度思考、总结规律",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "沟通协调、照顾他人",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "创意发散、开拓新思路",
          "type": "free"
        },
        {
          "key": "D",
          "text": "统筹推进、拿到结果",
          "type": "rational"
        }
      ]
    },
    {
      "id": 8,
      "text": "职场中你最讨厌？",
      "options": [
        {
          "key": "A",
          "text": "浮躁形式、无意义内耗",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "勾心斗角、人情复杂",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "僵化死板、条条框框",
          "type": "free"
        },
        {
          "key": "D",
          "text": "效率低下、目标混乱",
          "type": "rational"
        }
      ]
    },
    {
      "id": 9,
      "text": "压力下你会？",
      "options": [
        {
          "key": "A",
          "text": "沉下心，专注解决",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "寻求支持，调整情绪",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "暂时抽离，重新出发",
          "type": "free"
        },
        {
          "key": "D",
          "text": "拆解问题，强行推进",
          "type": "rational"
        }
      ]
    },
    {
      "id": 10,
      "text": "你职场核心竞争力是？",
      "options": [
        {
          "key": "A",
          "text": "洞察力强、看问题透彻",
          "type": "serene"
        },
        {
          "key": "B",
          "text": "情商高、人缘好、会协作",
          "type": "warm"
        },
        {
          "key": "C",
          "text": "敢创新、不设限、适应强",
          "type": "free"
        },
        {
          "key": "D",
          "text": "执行力强、靠谱有结果",
          "type": "rational"
        }
      ]
    }
  ]
},
}
