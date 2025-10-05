import { 
  Trade, 
  Break, 
  Template, 
  DashboardMetrics,
  RiskExposureMetrics,
  BreakAnalysisMetrics,
  TemplateCoverageMetrics,
  ProcessPerformanceMetrics,
  CounterpartyScorecardMetrics,
  AIMetrics,
  TradingActivityMetrics,
  TrendMetrics
} from '@/types'

// Mock data constants
const COUNTERPARTIES = [
  'Goldman Sachs',
  'Morgan Stanley',
  'JPMorgan Chase',
  'Bank of America',
  'Citigroup',
  'Deutsche Bank',
  'Barclays',
  'Credit Suisse',
  'UBS',
  'BNP Paribas'
]

const PRODUCT_TYPES = [
  'CMS Option',
  'FX Option',
  'Equity Swap',
  'Interest Rate Swap',
  'Credit Default Swap',
  'Total Return Swap',
  'FX Forward',
  'Bond Forward',
  'Commodity Swap',
  'Variance Swap'
]

const PRODUCT_FAMILIES = ['rates', 'fx', 'equity', 'credit'] as const

const TRADE_STATUSES = ['pending_affirmation', 'affirmed', 'confirmed', 'disputed'] as const

const BREAK_CATEGORIES = ['economic_high_risk', 'economic_medium_risk', 'documentation', 'legal_language'] as const

const BREAK_OWNERS = ['client', 'counterparty', 'ai', 'unknown'] as const

// Utility functions
function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function randomDateInRange(daysBack: number): Date {
  const now = new Date()
  const pastDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000)
  return new Date(pastDate.getTime() + Math.random() * (now.getTime() - pastDate.getTime()))
}

function generateTradeId(): string {
  return `TRD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
}

function generateBreakId(): string {
  return `BRK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
}

// Generate mock trades
export function generateMockTrades(count: number = 1000): Trade[] {
  const trades: Trade[] = []
  
  for (let i = 0; i < count; i++) {
    const tradeTime = randomDateInRange(90) // Last 90 days
    const productType = randomChoice(PRODUCT_TYPES)
    const productFamily = randomChoice(PRODUCT_FAMILIES)
    const counterparty = randomChoice(COUNTERPARTIES)
    const status = randomChoice(TRADE_STATUSES)
    
    // Generate timestamps based on status
    let docUploadedTime: Date | undefined
    let affirmationSentTime: Date | undefined
    let affirmationCompletedTime: Date | undefined
    let confirmationReceivedTime: Date | undefined
    let confirmationCompletedTime: Date | undefined
    let reviewStartTime: Date | undefined
    let reviewCompleteTime: Date | undefined
    let firstDisputeTime: Date | undefined
    let disputeResolutionTime: Date | undefined
    
    if (status !== 'pending_affirmation') {
      docUploadedTime = new Date(tradeTime.getTime() + randomBetween(0.5, 4) * 60 * 60 * 1000) // 0.5-4 hours
      
      if (status === 'affirmed' || status === 'confirmed') {
        affirmationSentTime = new Date(docUploadedTime.getTime() + randomBetween(0.1, 2) * 60 * 60 * 1000)
        affirmationCompletedTime = new Date(affirmationSentTime.getTime() + randomBetween(0.5, 8) * 60 * 60 * 1000)
      }
      
      if (status === 'confirmed') {
        confirmationReceivedTime = new Date(affirmationCompletedTime!.getTime() + randomBetween(0.1, 2) * 60 * 60 * 1000)
        confirmationCompletedTime = new Date(confirmationReceivedTime.getTime() + randomBetween(0.5, 4) * 60 * 60 * 1000)
      }
      
      if (status === 'disputed') {
        firstDisputeTime = new Date(tradeTime.getTime() + randomBetween(2, 48) * 60 * 60 * 1000)
        disputeResolutionTime = new Date(firstDisputeTime.getTime() + randomBetween(1, 72) * 60 * 60 * 1000)
      }
    }
    
    trades.push({
      id: generateTradeId(),
      timestamp: tradeTime,
      tradeType: randomChoice(['new', 'unwind', 'novation', 'partial_unwind']),
      productType,
      productFamily,
      counterparty,
      template: Math.random() > 0.3 ? `TMP-${counterparty}-${productType}` : undefined,
      notional: randomBetween(1000000, 100000000), // $1M to $100M
      status,
      tradeExecutedTime: tradeTime,
      docUploadedTime,
      affirmationSentTime,
      affirmationCompletedTime,
      confirmationReceivedTime,
      confirmationCompletedTime,
      reviewStartTime,
      reviewCompleteTime,
      firstDisputeTime,
      disputeResolutionTime
    })
  }
  
  return trades
}

// Generate mock breaks
export function generateMockBreaks(trades: Trade[]): Break[] {
  const breaks: Break[] = []
  
  // Generate breaks for ~15% of trades
  const tradesWithBreaks = trades.filter(() => Math.random() < 0.15)
  
  for (const trade of tradesWithBreaks) {
    const breakCount = Math.random() < 0.8 ? 1 : Math.floor(randomBetween(2, 4)) // Most trades have 1 break
    
    for (let i = 0; i < breakCount; i++) {
      const createdAt = new Date(trade.tradeExecutedTime.getTime() + randomBetween(1, 48) * 60 * 60 * 1000)
      
      breaks.push({
        id: generateBreakId(),
        tradeId: trade.id,
        owner: randomChoice(BREAK_OWNERS),
        category: randomChoice(BREAK_CATEGORIES),
        fieldsAffected: randomChoice([
          ['strike'],
          ['notional'],
          ['effective_date'],
          ['termination_date'],
          ['counterparty'],
          ['strike', 'notional'],
          ['effective_date', 'termination_date']
        ]),
        severityScore: randomChoice([1, 2, 3, 4, 5]) as 1 | 2 | 3 | 4 | 5,
        resolutionStatus: randomChoice(['open', 'in_progress', 'resolved']),
        roundTripsToResolution: Math.floor(randomBetween(1, 5)),
        createdAt,
        resolvedAt: Math.random() > 0.3 ? new Date(createdAt.getTime() + randomBetween(1, 72) * 60 * 60 * 1000) : undefined
      })
    }
  }
  
  return breaks
}

// Generate mock templates
export function generateMockTemplates(): Template[] {
  const templates: Template[] = []
  
  for (const counterparty of COUNTERPARTIES) {
    for (const productType of PRODUCT_TYPES) {
      if (Math.random() > 0.4) { // 60% coverage
        templates.push({
          id: `TMP-${counterparty}-${productType}`,
          counterparty,
          productType,
          exists: true,
          completenessScore: randomBetween(70, 100),
          lastUpdated: randomDateInRange(180),
          fieldsCovered: randomChoice([
            ['strike', 'notional', 'effective_date'],
            ['strike', 'notional', 'effective_date', 'termination_date'],
            ['strike', 'notional', 'effective_date', 'termination_date', 'counterparty']
          ]),
          utilizationRate: randomBetween(60, 95)
        })
      }
    }
  }
  
  return templates
}

// Calculate metrics from mock data
export function calculateMetrics(trades: Trade[], breaks: Break[], templates: Template[]): DashboardMetrics {
  const now = new Date()
  
  // Risk Exposure Metrics
  const openTrades = trades.filter(t => t.status === 'pending_affirmation' || t.status === 'disputed')
  const tradesOutsideSLA = trades.filter(t => {
    const timeDiff = now.getTime() - t.tradeExecutedTime.getTime()
    return timeDiff > 24 * 60 * 60 * 1000 && (t.status === 'pending_affirmation' || t.status === 'disputed')
  })
  
  const riskExposure: RiskExposureMetrics = {
    openRiskScore: openTrades.reduce((sum, trade) => {
      const timeWeight = Math.min((now.getTime() - trade.tradeExecutedTime.getTime()) / (24 * 60 * 60 * 1000), 5)
      return sum + (trade.notional / 1000000) * timeWeight
    }, 0),
    tradesOutsideSLA: {
      count: tradesOutsideSLA.length,
      percentage: (tradesOutsideSLA.length / trades.length) * 100
    },
    highSeverityOpenBreaks: breaks.filter(b => b.severityScore >= 4 && b.resolutionStatus !== 'resolved').length,
    averageTimeToRiskResolution: trades
      .filter(t => t.affirmationCompletedTime || t.confirmationCompletedTime)
      .reduce((sum, t) => {
        const resolutionTime = t.affirmationCompletedTime || t.confirmationCompletedTime!
        return sum + (resolutionTime.getTime() - t.tradeExecutedTime.getTime()) / (60 * 60 * 1000)
      }, 0) / trades.filter(t => t.affirmationCompletedTime || t.confirmationCompletedTime).length
  }
  
  // Break Analysis Metrics
  const breakAnalysis: BreakAnalysisMetrics = {
    breakRateBySeverity: {
      high: (breaks.filter(b => b.severityScore >= 4).length / trades.length) * 100,
      medium: (breaks.filter(b => b.severityScore === 3).length / trades.length) * 100,
      low: (breaks.filter(b => b.severityScore <= 2).length / trades.length) * 100
    },
    breakOwnershipDistribution: {
      client: (breaks.filter(b => b.owner === 'client').length / breaks.length) * 100,
      counterparty: (breaks.filter(b => b.owner === 'counterparty').length / breaks.length) * 100,
      ai: (breaks.filter(b => b.owner === 'ai').length / breaks.length) * 100,
      unknown: (breaks.filter(b => b.owner === 'unknown').length / breaks.length) * 100
    },
    fieldLevelBreakFrequency: {
      'strike': (breaks.filter(b => b.fieldsAffected.includes('strike')).length / trades.length) * 100,
      'notional': (breaks.filter(b => b.fieldsAffected.includes('notional')).length / trades.length) * 100,
      'effective_date': (breaks.filter(b => b.fieldsAffected.includes('effective_date')).length / trades.length) * 100,
      'termination_date': (breaks.filter(b => b.fieldsAffected.includes('termination_date')).length / trades.length) * 100
    },
    breakConcentrationScore: 0.75, // Mock value
    breakResolutionTime: breaks
      .filter(b => b.resolvedAt)
      .reduce((sum, b) => sum + (b.resolvedAt!.getTime() - b.createdAt.getTime()) / (60 * 60 * 1000), 0) / 
      breaks.filter(b => b.resolvedAt).length,
    confirmDisputeRate: (breaks.length / trades.length) * 100
  }
  
  // Template Coverage Metrics
  const templateCoverage: TemplateCoverageMetrics = {
    overallTemplateCoverage: (trades.filter(t => t.template).length / trades.length) * 100,
    templateGapAnalysis: COUNTERPARTIES.slice(0, 5).map(cp => ({
      counterparty: cp,
      productType: randomChoice(PRODUCT_TYPES),
      tradeCount: Math.floor(randomBetween(5, 25))
    })),
    templateCoverageByVolume: (trades.filter(t => t.template).reduce((sum, t) => sum + t.notional, 0) / 
      trades.reduce((sum, t) => sum + t.notional, 0)) * 100,
    templateUtilizationRate: templates.reduce((sum, t) => sum + t.utilizationRate, 0) / templates.length,
    newProductTimeToTemplate: randomBetween(7, 30)
  }
  
  // Process Performance Metrics
  const processPerformance: ProcessPerformanceMetrics = {
    slaAchievement24Hour: (trades.filter(t => {
      const timeDiff = (t.affirmationCompletedTime || t.confirmationCompletedTime)?.getTime() - t.tradeExecutedTime.getTime()
      return timeDiff && timeDiff <= 24 * 60 * 60 * 1000
    }).length / trades.length) * 100,
    affirmationEffectiveness: randomBetween(60, 85),
    paperVsElectronicMix: {
      affirmation: { paper: 25, electronic: 75 },
      confirmation: { paper: 15, electronic: 85 }
    },
    timeToReceiveDoc: randomBetween(1, 6),
    timeToAffirm: randomBetween(2, 12),
    timeToConfirm: randomBetween(4, 18),
    timeInReview: randomBetween(1, 4),
    timeInDispute: randomBetween(8, 48),
    disputeResolutionSLA: randomBetween(70, 95),
    autoMatchSuccessRate: randomBetween(75, 92)
  }
  
  // Counterparty Scorecard Metrics
  const counterpartyScorecards: Record<string, CounterpartyScorecardMetrics> = {}
  for (const cp of COUNTERPARTIES) {
    const cpTrades = trades.filter(t => t.counterparty === cp)
    const cpBreaks = breaks.filter(b => cpTrades.some(t => t.id === b.tradeId))
    
    counterpartyScorecards[cp] = {
      volumeWeightedBreakRate: (cpBreaks.length / cpTrades.length) * 100,
      highSeverityBreakRate: (cpBreaks.filter(b => b.severityScore >= 4).length / cpTrades.length) * 100,
      docTimelinessScore: randomBetween(70, 95),
      disputeResolutionTime: randomBetween(12, 72),
      languageTemplateCompliance: randomBetween(80, 98),
      peerComparison: {
        percentile: randomBetween(10, 90),
        quartile: randomChoice([1, 2, 3, 4]) as 1 | 2 | 3 | 4
      }
    }
  }
  
  // AI Metrics
  const aiMetrics: AIMetrics = {
    fieldLevelExtractionAccuracy: {
      'strike': randomBetween(85, 98),
      'notional': randomBetween(90, 99),
      'effective_date': randomBetween(80, 95),
      'termination_date': randomBetween(75, 92),
      'counterparty': randomBetween(95, 99)
    },
    aiConfidenceVsAccuracy: {
      '90-100%': randomBetween(88, 95),
      '80-89%': randomBetween(75, 85),
      '70-79%': randomBetween(65, 75),
      '60-69%': randomBetween(55, 65)
    },
    manualOverrideRate: randomBetween(15, 35),
    aiVsHumanBreakDetection: {
      ai: randomBetween(60, 80),
      human: randomBetween(20, 40)
    }
  }
  
  // Trading Activity Metrics
  const tradingActivity: TradingActivityMetrics = {
    totalTrades: trades.length,
    tradesByProductType: PRODUCT_TYPES.reduce((acc, product) => {
      acc[product] = trades.filter(t => t.productType === product).length
      return acc
    }, {} as Record<string, number>),
    tradesByProductFamily: PRODUCT_FAMILIES.reduce((acc, family) => {
      acc[family] = trades.filter(t => t.productFamily === family).length
      return acc
    }, {} as Record<string, number>),
    tradesByCounterparty: COUNTERPARTIES.reduce((acc, cp) => {
      acc[cp] = trades.filter(t => t.counterparty === cp).length
      return acc
    }, {} as Record<string, number>),
    volumeByProduct: PRODUCT_TYPES.reduce((acc, product) => {
      acc[product] = trades.filter(t => t.productType === product).reduce((sum, t) => sum + t.notional, 0)
      return acc
    }, {} as Record<string, number>),
    volumeTrend: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(now.getTime() - (29 - i) * 24 * 60 * 60 * 1000),
      count: Math.floor(randomBetween(20, 80))
    }))
  }
  
  // Trend Metrics
  const trendMetrics: TrendMetrics = {
    riskTrendScore: randomBetween(-15, 10),
    slaAchievementTrend: Array.from({ length: 12 }, (_, i) => ({
      date: new Date(now.getTime() - (11 - i) * 30 * 24 * 60 * 60 * 1000),
      percentage: randomBetween(75, 95)
    })),
    templateCoverageTrajectory: Array.from({ length: 12 }, (_, i) => ({
      date: new Date(now.getTime() - (11 - i) * 30 * 24 * 60 * 60 * 1000),
      percentage: randomBetween(40, 80)
    })),
    breakSeverityMixTrend: Array.from({ length: 12 }, (_, i) => ({
      date: new Date(now.getTime() - (11 - i) * 30 * 24 * 60 * 60 * 1000),
      high: randomBetween(5, 15),
      medium: randomBetween(10, 25),
      low: randomBetween(20, 40)
    }))
  }
  
  return {
    riskExposure,
    breakAnalysis,
    templateCoverage,
    processPerformance,
    counterpartyScorecards,
    aiMetrics,
    tradingActivity,
    trends: trendMetrics
  }
}

// Generate complete mock dataset
export function generateMockDataset(): {
  trades: Trade[]
  breaks: Break[]
  templates: Template[]
  metrics: DashboardMetrics
} {
  const trades = generateMockTrades(1000)
  const breaks = generateMockBreaks(trades)
  const templates = generateMockTemplates()
  const metrics = calculateMetrics(trades, breaks, templates)
  
  return { trades, breaks, templates, metrics }
}
