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
    { id: 1, text: '压力大到崩溃时，你第一反应是？', options: [{ key: 'A', text: '别理我，让我一个人静静', type: 'serene' }, { key: 'B', text: '赶紧找个人唠唠，不然要憋死了', type: 'warm' }, { key: 'C', text: '先跑路换个环境，换个活法', type: 'free' }, { key: 'D', text: '先捋清楚问题在哪，再想办法', type: 'rational' }] },
    { id: 2, text: '你这辈子最怕白活成什么样？', options: [{ key: 'A', text: '活成别人眼里的好孩子，自己却从没清醒过', type: 'serene' }, { key: 'B', text: '身边没人爱，也没人值得我去爱', type: 'warm' }, { key: 'C', text: '被按在工位上，一眼看到退休', type: 'free' }, { key: 'D', text: '忙活一辈子，最后啥也没留下', type: 'rational' }] },
    { id: 3, text: '做重大决定时，你更信什么？', options: [{ key: 'A', text: '信自己的第六感，内心怎么想就怎么来', type: 'serene' }, { key: 'B', text: '信身边重要的人怎么说，听听他们的意见', type: 'warm' }, { key: 'C', text: '信「干就完了」，先试试再说', type: 'free' }, { key: 'D', text: '信数据、逻辑和利弊分析', type: 'rational' }] },
    { id: 4, text: '你理想中的生活，最不能缺的是？', options: [{ key: 'A', text: '一个人待着的空间，内心不被打扰', type: 'serene' }, { key: 'B', text: '被爱包围，有人可以依靠', type: 'warm' }, { key: 'C', text: '想干嘛干嘛，不被任何人绑架', type: 'free' }, { key: 'D', text: '有明确目标，能看到自己在进步', type: 'rational' }] },
    { id: 5, text: '被误解时，你通常会？', options: [{ key: 'A', text: '懒得解释，懂我的人自然懂', type: 'serene' }, { key: 'B', text: '心里难受，特别希望对方能理解我', type: 'warm' }, { key: 'C', text: '无所谓，我又不靠他们吃饭', type: 'free' }, { key: 'D', text: '找机会把事情和道理说清楚', type: 'rational' }] },
    { id: 6, text: '你最受不了自己变成哪种人？', options: [{ key: 'A', text: '浮躁跟风，内心没主见', type: 'serene' }, { key: 'B', text: '冷冰冰的，没人情味，不被需要', type: 'warm' }, { key: 'C', text: '听话认命，被安排得明明白白', type: 'free' }, { key: 'D', text: '一团乱麻，效率低，啥也干不成', type: 'rational' }] },
    { id: 7, text: '你对「未来」的态度更接近？', options: [{ key: 'A', text: '随缘吧，先把现在过好', type: 'serene' }, { key: 'B', text: '希望未来充满爱和温暖', type: 'warm' }, { key: 'C', text: '未来最好充满未知和惊喜', type: 'free' }, { key: 'D', text: '提前规划好，一步步实现', type: 'rational' }] },
    { id: 8, text: '累的时候，你最想怎么回血？', options: [{ key: 'A', text: '一个人待着，看看书发发呆', type: 'serene' }, { key: 'B', text: '和好朋友或家人待在一起', type: 'warm' }, { key: 'C', text: '出门浪一圈，干点新鲜事', type: 'free' }, { key: 'D', text: '列个计划复盘一下，把事情理顺', type: 'rational' }] },
    { id: 9, text: '你觉得自己最拿得出手的特质是？', options: [{ key: 'A', text: '想得明白，不随大流', type: 'serene' }, { key: 'B', text: '心软重感情，能接住别人的情绪', type: 'warm' }, { key: 'C', text: '敢做敢当，不认怂不妥协', type: 'free' }, { key: 'D', text: '靠谱能扛事，说到做到', type: 'rational' }] },
    { id: 10, text: '你最想成为的那种人？', options: [{ key: 'A', text: '内心强大，活得明白通透', type: 'serene' }, { key: 'B', text: '被爱被需要，被人信赖', type: 'warm' }, { key: 'C', text: '自由真实，不讨好任何人', type: 'free' }, { key: 'D', text: '有成就，有话语权，有结果', type: 'rational' }] },
  ],
}

const emotionData: QuestionSet = {
  type: 'emotion',
  title: '情感底色',
  questions: [
    { id: 1, text: '在感情里，你最怕对方给你什么感觉？', options: [{ key: 'A', text: '人在心不在，感觉走不进他心里', type: 'safe' }, { key: 'B', text: '忽冷忽热，让我总在猜他到底在想啥', type: 'anxious' }, { key: 'C', text: '黏得太紧，让我感觉要窒息了', type: 'avoidant' }, { key: 'D', text: '说变就变，完全没安全感', type: 'fearful' }] },
    { id: 2, text: '喜欢一个人时，你通常会？', options: [{ key: 'A', text: '慢慢了解，顺其自然在一起', type: 'safe' }, { key: 'B', text: '忍不住主动，想马上知道他喜不喜欢我', type: 'anxious' }, { key: 'C', text: '保持距离，先观察观察再说', type: 'avoidant' }, { key: 'D', text: '既想靠近又怕受伤，反复试探', type: 'fearful' }] },
    { id: 3, text: '吵完架，你更常？', options: [{ key: 'A', text: '冷静下来再好好聊，不翻旧账', type: 'safe' }, { key: 'B', text: '想赶紧和好，受不了冷战', type: 'anxious' }, { key: 'C', text: '需要一个人待会儿，别逼我马上聊', type: 'avoidant' }, { key: 'D', text: '怕他不爱了，又怕自己太依赖', type: 'fearful' }] },
    { id: 4, text: '你心中理想的关系更像？', options: [{ key: 'A', text: '彼此信任，既能腻在一起也能各自独立', type: 'safe' }, { key: 'B', text: '被需要、被偏爱、被放在第一位', type: 'anxious' }, { key: 'C', text: '有空间、不绑架、不道德绑架', type: 'avoidant' }, { key: 'D', text: '既想要深度亲密，又怕失去自己', type: 'fearful' }] },
    { id: 5, text: '对方半天不回消息，你第一反应？', options: [{ key: 'A', text: '可能在忙，等会儿再说', type: 'safe' }, { key: 'B', text: '开始胡思乱想：是不是不在乎我了', type: 'anxious' }, { key: 'C', text: '正好，我也需要自己的时间', type: 'avoidant' }, { key: 'D', text: '想追问又怕显得太黏人', type: 'fearful' }] },
    { id: 6, text: '在感情里你最怕？', options: [{ key: 'A', text: '从没真正被理解过', type: 'safe' }, { key: 'B', text: '付出一切却被辜负，真心喂了狗', type: 'anxious' }, { key: 'C', text: '失去自我，完全为对方而活', type: 'avoidant' }, { key: 'D', text: '既怕被抛弃，又怕被吞没', type: 'fearful' }] },
    { id: 7, text: '你表达爱的方式更接近？', options: [{ key: 'A', text: '稳定陪伴，需要的时候我都在', type: 'safe' }, { key: 'B', text: '细节拉满，恨不得把心掏出来给他', type: 'anxious' }, { key: 'C', text: '给足空间，不缠着', type: 'avoidant' }, { key: 'D', text: '有时很热情，有时又想逃', type: 'fearful' }] },
    { id: 8, text: '选伴侣你最看重？', options: [{ key: 'A', text: '情绪成熟、能好好沟通', type: 'safe' }, { key: 'B', text: '能给我足够的安全感和确认感', type: 'anxious' }, { key: 'C', text: '尊重边界、不黏人', type: 'avoidant' }, { key: 'D', text: '能接住我的矛盾和不安全感', type: 'fearful' }] },
    { id: 9, text: '感情变淡时，你更会？', options: [{ key: 'A', text: '一起找原因，能修就修', type: 'safe' }, { key: 'B', text: '拼命挽回，不想放手', type: 'anxious' }, { key: 'C', text: '接受结果，体面离开', type: 'avoidant' }, { key: 'D', text: '又舍不得又怕继续受伤', type: 'fearful' }] },
    { id: 10, text: '你在感情里的底色更像？', options: [{ key: 'A', text: '信任、稳定、不折腾', type: 'safe' }, { key: 'B', text: '热烈、黏人、怕被丢下', type: 'anxious' }, { key: 'C', text: '独立、要空间、怕被吞没', type: 'avoidant' }, { key: 'D', text: '渴望爱又怕受伤，进退两难', type: 'fearful' }] },
  ],
}

const careerData: QuestionSet = {
  type: 'career',
  title: '职场底色',
  questions: [
    { id: 1, text: '工作中你最不能忍的是？', options: [{ key: 'A', text: '没价值感，纯内耗，浪费时间', type: 'executor' }, { key: 'B', text: '氛围差，人际关系复杂，心累', type: 'connector' }, { key: 'C', text: '条条框框太多，没发挥空间', type: 'creator' }, { key: 'D', text: '目标不清，瞎忙一通', type: 'analyst' }] },
    { id: 2, text: '接到任务，你第一反应？', options: [{ key: 'A', text: '先拆解任务，再盯住 deadline 开干', type: 'executor' }, { key: 'B', text: '先看看谁一起干，怎么配合', type: 'connector' }, { key: 'C', text: '先想想能不能换个更好玩的玩法', type: 'creator' }, { key: 'D', text: '先想清楚逻辑和风险', type: 'analyst' }] },
    { id: 3, text: '遇到难搞的工作，你更会？', options: [{ key: 'A', text: '拆成小步，一步步啃下来', type: 'executor' }, { key: 'B', text: '找人一起扛，一起想办法', type: 'connector' }, { key: 'C', text: '换个思路，试试新办法', type: 'creator' }, { key: 'D', text: '先分析本质，再定方案', type: 'analyst' }] },
    { id: 4, text: '你最能发挥的工作环境？', options: [{ key: 'A', text: '目标清晰，责任到人，看结果', type: 'executor' }, { key: 'B', text: '团队和谐，沟通多，协作多', type: 'connector' }, { key: 'C', text: '灵活，可以试错，不僵化', type: 'creator' }, { key: 'D', text: '有空间深度思考，不催进度', type: 'analyst' }] },
    { id: 5, text: '你对「职场成功」的定义更接近？', options: [{ key: 'A', text: '说到做到，拿结果说话', type: 'executor' }, { key: 'B', text: '被认可，被需要，人缘好', type: 'connector' }, { key: 'C', text: '做成了别人没做过的事', type: 'creator' }, { key: 'D', text: '想得透，判断准，少踩坑', type: 'analyst' }] },
    { id: 6, text: '领导安排明显不合理的任务，你会？', options: [{ key: 'A', text: '先执行，同时找机会说明困难', type: 'executor' }, { key: 'B', text: '尽量配合，私下再沟通', type: 'connector' }, { key: 'C', text: '按自己觉得对的方式做出结果', type: 'creator' }, { key: 'D', text: '摆逻辑和数据，提替代方案', type: 'analyst' }] },
    { id: 7, text: '你觉得自己最拿得出手的是？', options: [{ key: 'A', text: '执行力强，能扛事，有闭环', type: 'executor' }, { key: 'B', text: '会沟通，能协调，带氛围', type: 'connector' }, { key: 'C', text: '点子多，能创新，能破局', type: 'creator' }, { key: 'D', text: '分析强，判断准，想得深', type: 'analyst' }] },
    { id: 8, text: '职场里你最烦的是？', options: [{ key: 'A', text: '光说不练，没结果', type: 'executor' }, { key: 'B', text: '勾心斗角，站队', type: 'connector' }, { key: 'C', text: '死板，不让试', type: 'creator' }, { key: 'D', text: '没想清楚就干，总返工', type: 'analyst' }] },
    { id: 9, text: '压力爆表时，你更会？', options: [{ key: 'A', text: '顶住，先把事搞定再说', type: 'executor' }, { key: 'B', text: '找同事或上级聊，一起扛', type: 'connector' }, { key: 'C', text: '先撤一下，换换脑子再上', type: 'creator' }, { key: 'D', text: '先理清优先级和路径', type: 'analyst' }] },
    { id: 10, text: '你的职场核心竞争力更像？', options: [{ key: 'A', text: '拿结果，靠谱，能打', type: 'executor' }, { key: 'B', text: '人缘好，会来事，能整合', type: 'connector' }, { key: 'C', text: '敢试，能破局，不设限', type: 'creator' }, { key: 'D', text: '想得透，判断准，少踩坑', type: 'analyst' }] },
  ],
}

export const questionSets: Record<string, QuestionSet> = {
  life: lifeData,
  emotion: emotionData,
  career: careerData,
}
