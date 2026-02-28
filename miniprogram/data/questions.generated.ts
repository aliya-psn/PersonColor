// 题目数据：编辑 life.json / emotion.json / career.json 后需同步到此文件（小程序无法直接 require JSON）

export interface QuestionOption {
  key: string
  text: string
  type: string
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

const lifeData: QuestionSet = {
  type: 'life',
  title: '人生底色',
  questions: [
    { id: 1, text: '压力大到崩溃时，你第一反应是？', options: [{ key: 'A', text: '谁也别来，我自己待着', type: 'serene' }, { key: 'B', text: '立刻想找个人说说话', type: 'warm' }, { key: 'C', text: '换个地方、换种活法再说', type: 'free' }, { key: 'D', text: '先理清问题，再想怎么解决', type: 'rational' }] },
    { id: 2, text: '你这辈子最怕白活成什么样？', options: [{ key: 'A', text: '活成别人期待的样子，内心从没清醒过', type: 'serene' }, { key: 'B', text: '身边没人爱、也没人值得爱', type: 'warm' }, { key: 'C', text: '被按在格子间里，一眼望到头', type: 'free' }, { key: 'D', text: '忙了一辈子，啥也没留下', type: 'rational' }] },
    { id: 3, text: '做重大决定时，你更信什么？', options: [{ key: 'A', text: '信自己的直觉和内心感受', type: 'serene' }, { key: 'B', text: '信重要的人怎么说、怎么想', type: 'warm' }, { key: 'C', text: '信「先试了再说」', type: 'free' }, { key: 'D', text: '信逻辑、利弊、数据', type: 'rational' }] },
    { id: 4, text: '你理想中的生活，最不能缺的是？', options: [{ key: 'A', text: '内心秩序和独处空间', type: 'serene' }, { key: 'B', text: '被爱包围、有人可依', type: 'warm' }, { key: 'C', text: '不被任何人绑架的自由', type: 'free' }, { key: 'D', text: '清晰的目标和可见的进步', type: 'rational' }] },
    { id: 5, text: '被误解时，你通常会？', options: [{ key: 'A', text: '懒得解释，懂的人自然懂', type: 'serene' }, { key: 'B', text: '很难过，特别希望对方能懂', type: 'warm' }, { key: 'C', text: '无所谓，反正不靠他们活', type: 'free' }, { key: 'D', text: '找机会把事实和逻辑讲清楚', type: 'rational' }] },
    { id: 6, text: '你最受不了自己变成哪种人？', options: [{ key: 'A', text: '浮躁、跟风、内心没根', type: 'serene' }, { key: 'B', text: '冷漠、没人情味、不被需要', type: 'warm' }, { key: 'C', text: '听话、认命、被安排', type: 'free' }, { key: 'D', text: '混乱、低效、一事无成', type: 'rational' }] },
    { id: 7, text: '你对「未来」的态度更接近？', options: [{ key: 'A', text: '顺其自然，把当下活明白', type: 'serene' }, { key: 'B', text: '希望未来充满爱与归属', type: 'warm' }, { key: 'C', text: '未来最好充满变数和可能', type: 'free' }, { key: 'D', text: '提前规划，一步步实现', type: 'rational' }] },
    { id: 8, text: '累的时候，你最想怎么回血？', options: [{ key: 'A', text: '一个人待着，看书发呆思考', type: 'serene' }, { key: 'B', text: '和亲近的人待在一起', type: 'warm' }, { key: 'C', text: '出门干点不一样的', type: 'free' }, { key: 'D', text: '列计划、复盘、把事理顺', type: 'rational' }] },
    { id: 9, text: '你觉得自己最拿得出手的特质是？', options: [{ key: 'A', text: '想得透、不随大流', type: 'serene' }, { key: 'B', text: '心软、重感情、能接住别人', type: 'warm' }, { key: 'C', text: '敢做、不认怂、不妥协', type: 'free' }, { key: 'D', text: '靠谱、有结果、能扛事', type: 'rational' }] },
    { id: 10, text: '你最想成为的那种人？', options: [{ key: 'A', text: '内心强大、清醒自洽', type: 'serene' }, { key: 'B', text: '被爱、被需要、被人信赖', type: 'warm' }, { key: 'C', text: '自由、真实、不讨好任何人', type: 'free' }, { key: 'D', text: '有成就、有话语权、有结果', type: 'rational' }] },
  ],
}

const emotionData: QuestionSet = {
  type: 'emotion',
  title: '情感底色',
  questions: [
    { id: 1, text: '在感情里，你最怕对方给你什么感觉？', options: [{ key: 'A', text: '人在心不在，精神上从不真正靠近', type: 'safe' }, { key: 'B', text: '忽冷忽热，让我总在猜', type: 'anxious' }, { key: 'C', text: '黏得太紧，让我喘不过气', type: 'avoidant' }, { key: 'D', text: '说变就变，没有安全感', type: 'fearful' }] },
    { id: 2, text: '喜欢一个人时，你通常会？', options: [{ key: 'A', text: '慢慢了解，顺其自然在一起', type: 'safe' }, { key: 'B', text: '忍不住主动，想马上确认对方心意', type: 'anxious' }, { key: 'C', text: '保持距离，先观察再说', type: 'avoidant' }, { key: 'D', text: '既想靠近又怕受伤，反复试探', type: 'fearful' }] },
    { id: 3, text: '吵完架，你更常？', options: [{ key: 'A', text: '冷静下来再谈，不翻旧账', type: 'safe' }, { key: 'B', text: '想赶紧和好，受不了冷战', type: 'anxious' }, { key: 'C', text: '需要独处，别逼我马上聊', type: 'avoidant' }, { key: 'D', text: '怕对方不爱了，又怕自己太依赖', type: 'fearful' }] },
    { id: 4, text: '你心中理想的关系更像？', options: [{ key: 'A', text: '彼此信任，既能亲密也能独立', type: 'safe' }, { key: 'B', text: '被需要、被偏爱、被放在第一位', type: 'anxious' }, { key: 'C', text: '有空间、不绑架、不道德绑架', type: 'avoidant' }, { key: 'D', text: '既渴望深度亲密，又怕失去自己', type: 'fearful' }] },
    { id: 5, text: '对方半天不回消息，你第一反应？', options: [{ key: 'A', text: '可能在忙，等会儿再说', type: 'safe' }, { key: 'B', text: '开始乱想：是不是不在乎我了', type: 'anxious' }, { key: 'C', text: '正好，我也需要自己的时间', type: 'avoidant' }, { key: 'D', text: '想追问又怕显得太黏人', type: 'fearful' }] },
    { id: 6, text: '在感情里你最怕？', options: [{ key: 'A', text: '从没真正被理解过', type: 'safe' }, { key: 'B', text: '付出一切却被辜负', type: 'anxious' }, { key: 'C', text: '失去自我、为对方活', type: 'avoidant' }, { key: 'D', text: '既怕被抛弃，又怕被吞没', type: 'fearful' }] },
    { id: 7, text: '你表达爱的方式更接近？', options: [{ key: 'A', text: '稳定陪伴，需要时在', type: 'safe' }, { key: 'B', text: '细节拉满，恨不得把心掏出来', type: 'anxious' }, { key: 'C', text: '给足空间，不缠着', type: 'avoidant' }, { key: 'D', text: '有时很热有时想逃', type: 'fearful' }] },
    { id: 8, text: '选伴侣你最看重？', options: [{ key: 'A', text: '情绪成熟、能沟通', type: 'safe' }, { key: 'B', text: '能给我足够的安全感和确认感', type: 'anxious' }, { key: 'C', text: '尊重边界、不黏人', type: 'avoidant' }, { key: 'D', text: '能接住我的矛盾和不安全感', type: 'fearful' }] },
    { id: 9, text: '感情变淡时，你更会？', options: [{ key: 'A', text: '一起找原因，能修就修', type: 'safe' }, { key: 'B', text: '拼命挽回，不想放手', type: 'anxious' }, { key: 'C', text: '接受结果，体面离开', type: 'avoidant' }, { key: 'D', text: '又舍不得又怕继续受伤', type: 'fearful' }] },
    { id: 10, text: '你在感情里的底色更像？', options: [{ key: 'A', text: '信任、稳定、不折腾', type: 'safe' }, { key: 'B', text: '热烈、黏人、怕被丢下', type: 'anxious' }, { key: 'C', text: '独立、要空间、怕被吞没', type: 'avoidant' }, { key: 'D', text: '渴望爱又怕受伤，进退两难', type: 'fearful' }] },
  ],
}

const careerData: QuestionSet = {
  type: 'career',
  title: '职场底色',
  questions: [
    { id: 1, text: '工作中你最不能忍的是？', options: [{ key: 'A', text: '没价值感、纯内耗', type: 'executor' }, { key: 'B', text: '氛围差、人际复杂', type: 'connector' }, { key: 'C', text: '条条框框、没发挥空间', type: 'creator' }, { key: 'D', text: '目标不清、瞎忙', type: 'analyst' }] },
    { id: 2, text: '接到任务，你第一反应？', options: [{ key: 'A', text: '先拆解，再盯住 deadline 干', type: 'executor' }, { key: 'B', text: '先看谁一起干、怎么配合', type: 'connector' }, { key: 'C', text: '先想能不能换个更好玩法', type: 'creator' }, { key: 'D', text: '先想清楚逻辑和风险', type: 'analyst' }] },
    { id: 3, text: '遇到难搞的工作，你更会？', options: [{ key: 'A', text: '拆成小步，一步步啃下来', type: 'executor' }, { key: 'B', text: '找人一起扛、一起想', type: 'connector' }, { key: 'C', text: '换思路、试新办法', type: 'creator' }, { key: 'D', text: '先分析本质，再定方案', type: 'analyst' }] },
    { id: 4, text: '你最能发挥的工作环境？', options: [{ key: 'A', text: '目标清晰、责任到人、看结果', type: 'executor' }, { key: 'B', text: '团队和谐、沟通多、协作多', type: 'connector' }, { key: 'C', text: '灵活、可试错、不僵化', type: 'creator' }, { key: 'D', text: '有空间深度想、不催进度', type: 'analyst' }] },
    { id: 5, text: '你对「职场成功」的定义更接近？', options: [{ key: 'A', text: '说到做到、拿结果说话', type: 'executor' }, { key: 'B', text: '被认可、被需要、人缘好', type: 'connector' }, { key: 'C', text: '做成了别人没做过的事', type: 'creator' }, { key: 'D', text: '想得透、判断准、少踩坑', type: 'analyst' }] },
    { id: 6, text: '领导安排明显不合理的任务，你会？', options: [{ key: 'A', text: '先执行，同时找机会说明困难', type: 'executor' }, { key: 'B', text: '尽量配合，私下再沟通', type: 'connector' }, { key: 'C', text: '按自己觉得对的方式做出结果', type: 'creator' }, { key: 'D', text: '摆逻辑和数据，提替代方案', type: 'analyst' }] },
    { id: 7, text: '你觉得自己最拿得出手的是？', options: [{ key: 'A', text: '执行力、扛事、闭环', type: 'executor' }, { key: 'B', text: '沟通、协调、带氛围', type: 'connector' }, { key: 'C', text: '点子、创新、破局', type: 'creator' }, { key: 'D', text: '分析、判断、想得深', type: 'analyst' }] },
    { id: 8, text: '职场里你最烦的是？', options: [{ key: 'A', text: '光说不练、没结果', type: 'executor' }, { key: 'B', text: '勾心斗角、站队', type: 'connector' }, { key: 'C', text: '死板、不让试', type: 'creator' }, { key: 'D', text: '没想清楚就干、总返工', type: 'analyst' }] },
    { id: 9, text: '压力爆表时，你更会？', options: [{ key: 'A', text: '顶住，先把事搞定', type: 'executor' }, { key: 'B', text: '找同事或上级聊，一起扛', type: 'connector' }, { key: 'C', text: '先撤一下，换换脑子再上', type: 'creator' }, { key: 'D', text: '先理清优先级和路径', type: 'analyst' }] },
    { id: 10, text: '你的职场核心竞争力更像？', options: [{ key: 'A', text: '拿结果、靠谱、能打', type: 'executor' }, { key: 'B', text: '人缘好、会来事、能整合', type: 'connector' }, { key: 'C', text: '敢试、能破局、不设限', type: 'creator' }, { key: 'D', text: '想得透、判断准、少踩坑', type: 'analyst' }] },
  ],
}

export const questionSets: Record<string, QuestionSet> = {
  life: lifeData,
  emotion: emotionData,
  career: careerData,
}
