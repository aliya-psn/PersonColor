// 三种测试各自的结果维度与雷达图标签
export type TestType = 'life' | 'emotion' | 'career'

export const RESULT_KEYS: Record<TestType, readonly string[]> = {
  life: ['serene', 'warm', 'free', 'rational'],
  emotion: ['safe', 'anxious', 'avoidant', 'fearful'],
  career: ['executor', 'creator', 'connector', 'analyst'],
}

export const RADAR_LABELS: Record<TestType, readonly string[]> = {
  life: ['沉静', '温暖', '自由', '理性'],
  emotion: ['安全型', '痴迷型', '疏离型', '恐惧型'],
  career: ['执行型', '创意型', '关系型', '分析型'],
}

export function getResultKeys(type: TestType): string[] {
  return [...RESULT_KEYS[type]]
}

export function getRadarLabels(type: TestType): string[] {
  return [...RADAR_LABELS[type]]
}
