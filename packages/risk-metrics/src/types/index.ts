import React from 'react'

// Core Trade Data Types
export interface Trade {
  id: string
  timestamp: Date
  tradeType: 'new' | 'unwind' | 'novation' | 'partial_unwind'
  productType: string
  productFamily: 'rates' | 'fx' | 'equity' | 'credit'
  counterparty: string
  template?: string
  notional: number
  status: 'pending_affirmation' | 'affirmed' | 'confirmed' | 'disputed'
  
  // Process timestamps
  tradeExecutedTime: Date
  docUploadedTime?: Date
  affirmationSentTime?: Date
  affirmationCompletedTime?: Date
  confirmationReceivedTime?: Date
  confirmationCompletedTime?: Date
  reviewStartTime?: Date
  reviewCompleteTime?: Date
  firstDisputeTime?: Date
  disputeResolutionTime?: Date
}

export interface Break {
  id: string
  tradeId: string
  owner: 'client' | 'counterparty' | 'ai' | 'unknown'
  category: 'economic_high_risk' | 'economic_medium_risk' | 'documentation' | 'legal_language'
  fieldsAffected: string[]
  severityScore: 1 | 2 | 3 | 4 | 5
  resolutionStatus: 'open' | 'in_progress' | 'resolved'
  roundTripsToResolution: number
  createdAt: Date
  resolvedAt?: Date
}

export interface Template {
  id: string
  counterparty: string
  productType: string
  exists: boolean
  completenessScore: number // 0-100
  lastUpdated: Date
  fieldsCovered: string[]
  utilizationRate: number // 0-100
}

// Metrics Types
export interface RiskExposureMetrics {
  openRiskScore: number
  tradesOutsideSLA: {
    count: number
    percentage: number
  }
  highSeverityOpenBreaks: number
  averageTimeToRiskResolution: number // in hours
}

export interface BreakAnalysisMetrics {
  breakRateBySeverity: {
    high: number
    medium: number
    low: number
  }
  breakOwnershipDistribution: {
    client: number
    counterparty: number
    ai: number
    unknown: number
  }
  fieldLevelBreakFrequency: Record<string, number>
  breakConcentrationScore: number
  breakResolutionTime: number // average in hours
  confirmDisputeRate: number
}

export interface TemplateCoverageMetrics {
  overallTemplateCoverage: number
  templateGapAnalysis: Array<{
    counterparty: string
    productType: string
    tradeCount: number
  }>
  templateCoverageByVolume: number
  templateUtilizationRate: number
  newProductTimeToTemplate: number // average days
}

export interface ProcessPerformanceMetrics {
  slaAchievement24Hour: number
  affirmationEffectiveness: number
  paperVsElectronicMix: {
    affirmation: { paper: number; electronic: number }
    confirmation: { paper: number; electronic: number }
  }
  timeToReceiveDoc: number // average in hours
  timeToAffirm: number // average in hours
  timeToConfirm: number // average in hours
  timeInReview: number // average in hours
  timeInDispute: number // average in hours
  disputeResolutionSLA: number
  autoMatchSuccessRate: number
}

export interface CounterpartyScorecardMetrics {
  volumeWeightedBreakRate: number
  highSeverityBreakRate: number
  docTimelinessScore: number
  disputeResolutionTime: number
  languageTemplateCompliance: number
  peerComparison: {
    percentile: number
    quartile: 1 | 2 | 3 | 4
  }
}

export interface AIMetrics {
  fieldLevelExtractionAccuracy: Record<string, number>
  aiConfidenceVsAccuracy: Record<string, number>
  manualOverrideRate: number
  aiVsHumanBreakDetection: {
    ai: number
    human: number
  }
}

export interface TradingActivityMetrics {
  totalTrades: number
  tradesByProductType: Record<string, number>
  tradesByProductFamily: Record<string, number>
  tradesByCounterparty: Record<string, number>
  volumeByProduct: Record<string, number>
  volumeTrend: Array<{
    date: Date
    count: number
  }>
}

export interface TrendMetrics {
  riskTrendScore: number // percentage change
  slaAchievementTrend: Array<{
    date: Date
    percentage: number
  }>
  templateCoverageTrajectory: Array<{
    date: Date
    percentage: number
  }>
  breakSeverityMixTrend: Array<{
    date: Date
    high: number
    medium: number
    low: number
  }>
}

// Dashboard State Types
export interface DashboardFilters {
  dateRange: {
    start: Date
    end: Date
  }
  counterparties: string[]
  productTypes: string[]
  productFamilies: string[]
  tradeStatuses: string[]
}

export interface DashboardMetrics {
  riskExposure: RiskExposureMetrics
  breakAnalysis: BreakAnalysisMetrics
  templateCoverage: TemplateCoverageMetrics
  processPerformance: ProcessPerformanceMetrics
  counterpartyScorecards: Record<string, CounterpartyScorecardMetrics>
  aiMetrics: AIMetrics
  tradingActivity: TradingActivityMetrics
  trends: TrendMetrics
}

export interface DashboardState {
  metrics: DashboardMetrics
  filters: DashboardFilters
  isLoading: boolean
  lastUpdated: Date
  selectedTimeframe: '1d' | '7d' | '30d' | '90d' | '1y'
}

// Component Props Types
export interface MetricCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease' | 'neutral'
  }
  subtitle?: string
  icon?: React.ReactNode
  className?: string
}

export interface ChartProps {
  data: unknown[]
  height?: number
  className?: string
}

export interface CounterpartyTableProps {
  counterparties: Array<{
    name: string
    metrics: CounterpartyScorecardMetrics
    tradeCount: number
    volume: number
  }>
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export interface RiskAlertProps {
  alerts: Array<{
    id: string
    severity: 'high' | 'medium' | 'low'
    title: string
    description: string
    tradeId?: string
    counterparty?: string
    createdAt: Date
  }>
}
