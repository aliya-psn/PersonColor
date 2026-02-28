// 三种测试（人生 / 情感 / 职场）的结果入口
// - 人生：results-life.ts（沉静、温暖、自由、理性）
// - 情感：results-emotion.ts（安全型、痴迷型、疏离型、恐惧型）
// - 职场：results-career.ts（执行型、创意型、关系型、分析型）

import type { TestType } from './result-config'
import { getResultKeys, getRadarLabels } from './result-config'
import { resultsLife } from './results-life'
import { resultsEmotion } from './results-emotion'
import { resultsCareer } from './results-career'

export interface ResultInfo {
  name: string
  tagline: string
  summary: string
  tags: string[]
  strengths: string
  hiddenTalent: string
  weakness: string
  suggestions: string[]
}

const resultsByType: Record<TestType, Record<string, ResultInfo>> = {
  life: resultsLife as Record<string, ResultInfo>,
  emotion: resultsEmotion as Record<string, ResultInfo>,
  career: resultsCareer as Record<string, ResultInfo>,
}

export function getResults(type: TestType): Record<string, ResultInfo> {
  return resultsByType[type] || resultsByType.life
}

export { getResultKeys, getRadarLabels }
export type { TestType } from './result-config'
