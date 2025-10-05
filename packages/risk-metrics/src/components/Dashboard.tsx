'use client'

import React, { useState, useEffect } from 'react'
import { 
  Card, 
  CardContent,
  Button,
  Badge,
  Separator
} from '@float-vibe-foundry/design-system'
import { DashboardMetrics, DashboardFilters } from '@/types'
import { generateMockDataset } from '@/data/mockData'
import { RiskExposurePanel } from '@/components/RiskExposurePanel'
import { BreakAnalysisPanel } from '@/components/BreakAnalysisPanel'
import { TemplateCoveragePanel } from '@/components/TemplateCoveragePanel'
import { ProcessPerformancePanel } from '@/components/ProcessPerformancePanel'
import { CounterpartyScorecardPanel } from '@/components/CounterpartyScorecardPanel'
import { TradingActivityPanel } from '@/components/TradingActivityPanel'
import { TrendAnalysisPanel } from '@/components/TrendAnalysisPanel'

export function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [filters] = useState<DashboardFilters>({
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      end: new Date()
    },
    counterparties: [],
    productTypes: [],
    productFamilies: [],
    tradeStatuses: []
  })
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1d' | '7d' | '30d' | '90d' | '1y'>('30d')

  useEffect(() => {
    // Simulate loading
    const loadData = async () => {
      setIsLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
        const mockData = generateMockDataset()
        console.log('Mock data generated:', mockData.metrics)
        setMetrics(mockData.metrics)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading data:', error)
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [filters, selectedTimeframe])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-secondary p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="min-h-screen bg-bg-secondary p-6 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6 text-center">
            <p className="text-text-secondary">Failed to load dashboard data</p>
            <Button 
              className="mt-4" 
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Header */}
      <div className="bg-white border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-text-primary">
                Risk Metrics Dashboard
              </h1>
              <p className="text-text-secondary mt-1">
                Post-Trade Operations Risk Management
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                {(['1d', '7d', '30d', '90d', '1y'] as const).map((timeframe) => (
                  <Button
                    key={timeframe}
                    variant={selectedTimeframe === timeframe ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTimeframe(timeframe)}
                  >
                    {timeframe.toUpperCase()}
                  </Button>
                ))}
              </div>
              <Badge variant="outline" className="text-xs">
                Last updated: {new Date().toLocaleTimeString()}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Risk Exposure Overview */}
        <div className="mb-8">
          <RiskExposurePanel metrics={metrics.riskExposure} />
        </div>

        <Separator className="my-8" />

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <BreakAnalysisPanel metrics={metrics.breakAnalysis} />
          <TemplateCoveragePanel metrics={metrics.templateCoverage} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ProcessPerformancePanel metrics={metrics.processPerformance} />
          <TradingActivityPanel metrics={metrics.tradingActivity} />
        </div>

        <Separator className="my-8" />

        {/* Counterparty Scorecards */}
        <div className="mb-8">
          <CounterpartyScorecardPanel 
            counterpartyMetrics={metrics.counterpartyScorecards}
            tradingActivity={metrics.tradingActivity}
          />
        </div>

        <Separator className="my-8" />

        {/* Trend Analysis */}
        <div className="mb-8">
          <TrendAnalysisPanel metrics={metrics.trends} />
        </div>
      </div>
    </div>
  )
}
