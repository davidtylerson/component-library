'use client'

import React from 'react'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Badge,
  Progress
} from '@float-vibe-foundry/design-system'
import { CounterpartyScorecardMetrics, TradingActivityMetrics } from '@/types'

interface CounterpartyScorecardPanelProps {
  counterpartyMetrics: Record<string, CounterpartyScorecardMetrics>
  tradingActivity: TradingActivityMetrics
}

export function CounterpartyScorecardPanel({ 
  counterpartyMetrics, 
  tradingActivity 
}: CounterpartyScorecardPanelProps) {

  const formatHours = (hours: number) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)}m`
    } else if (hours < 24) {
      return `${hours.toFixed(1)}h`
    } else {
      return `${(hours / 24).toFixed(1)}d`
    }
  }

  const getQuartileColor = (quartile: number) => {
    switch (quartile) {
      case 1: return 'error'
      case 2: return 'warning'
      case 3: return 'success'
      case 4: return 'success'
      default: return 'secondary'
    }
  }

  const counterparties = Object.entries(counterpartyMetrics)
    .map(([name, metrics]) => ({
      name,
      metrics,
      tradeCount: tradingActivity.tradesByCounterparty[name] || 0,
      volume: tradingActivity.volumeByProduct[name] || 0
    }))
    .sort((a, b) => b.tradeCount - a.tradeCount)
    .slice(0, 10)

  return (
    <div>
      <h2 className="text-xl font-semibold text-text-primary mb-6">
        Counterparty Scorecards
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {counterparties.map(({ name, metrics, tradeCount }) => (
          <Card key={name}>
            <CardHeader>
              <CardTitle className="text-lg">{name}</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">
                  {tradeCount} trades
                </Badge>
                <Badge variant="outline" color={getQuartileColor(metrics.peerComparison.quartile)}>
                  Q{metrics.peerComparison.quartile}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Volume-Weighted Break Rate */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text-secondary">Break Rate</span>
                  <span className="text-sm font-semibold">{metrics.volumeWeightedBreakRate.toFixed(1)}%</span>
                </div>
                <Progress value={metrics.volumeWeightedBreakRate} className="h-2" />
              </div>

              {/* High-Severity Break Rate */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text-secondary">High-Severity Breaks</span>
                  <span className="text-sm font-semibold">{metrics.highSeverityBreakRate.toFixed(1)}%</span>
                </div>
                <Progress value={metrics.highSeverityBreakRate} className="h-2" />
              </div>

              {/* Doc Timeliness */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text-secondary">Doc Timeliness</span>
                  <span className="text-sm font-semibold">{metrics.docTimelinessScore.toFixed(1)}%</span>
                </div>
                <Progress value={metrics.docTimelinessScore} className="h-2" />
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-primary">
                <div className="text-center">
                  <div className="text-sm font-semibold text-text-primary">
                    {formatHours(metrics.disputeResolutionTime)}
                  </div>
                  <div className="text-xs text-text-tertiary">Dispute Resolution</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-text-primary">
                    {metrics.languageTemplateCompliance.toFixed(1)}%
                  </div>
                  <div className="text-xs text-text-tertiary">Template Compliance</div>
                </div>
              </div>

              {/* Peer Comparison */}
              <div className="pt-2">
                <div className="text-xs text-text-tertiary text-center">
                  {metrics.peerComparison.percentile.toFixed(0)}th percentile vs peers
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
