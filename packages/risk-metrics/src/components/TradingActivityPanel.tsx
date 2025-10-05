'use client'

import React from 'react'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Badge
} from '@float-vibe-foundry/design-system'
import { TradingActivityMetrics } from '@/types'
import { BarChart3 } from 'lucide-react'

interface TradingActivityPanelProps {
  metrics: TradingActivityMetrics
}

export function TradingActivityPanel({ metrics }: TradingActivityPanelProps) {

  const topProducts = Object.entries(metrics.tradesByProductType)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)

  const topCounterparties = Object.entries(metrics.tradesByCounterparty)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>Trading Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Trades */}
        <div className="text-center p-4 bg-bg-tertiary rounded">
          <div className="text-2xl font-bold text-text-primary">
            {metrics.totalTrades.toLocaleString()}
          </div>
          <div className="text-sm text-text-secondary">Total Trades</div>
        </div>

        {/* Product Family Distribution */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">
            Product Family Distribution
          </h4>
          <div className="space-y-2">
            {Object.entries(metrics.tradesByProductFamily).map(([family, count]) => (
              <div key={family} className="flex items-center justify-between">
                <span className="text-sm capitalize">{family}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-500"
                      style={{ width: `${(count / metrics.totalTrades) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">
            Top Products by Volume
          </h4>
          <div className="space-y-2">
            {topProducts.map(([product, count]) => (
              <div key={product} className="flex items-center justify-between p-2 bg-bg-tertiary rounded">
                <span className="text-sm font-medium text-text-primary">{product}</span>
                <Badge variant="outline">{count} trades</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Top Counterparties */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">
            Top Counterparties
          </h4>
          <div className="space-y-2">
            {topCounterparties.map(([counterparty, count]) => (
              <div key={counterparty} className="flex items-center justify-between p-2 bg-bg-tertiary rounded">
                <span className="text-sm font-medium text-text-primary">{counterparty}</span>
                <Badge variant="outline">{count} trades</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Volume Trend Summary */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">
            Recent Volume Trend
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-bg-tertiary rounded">
              <div className="text-lg font-semibold text-text-primary">
                {metrics.volumeTrend[metrics.volumeTrend.length - 1]?.count || 0}
              </div>
              <div className="text-xs text-text-tertiary">Today</div>
            </div>
            <div className="text-center p-3 bg-bg-tertiary rounded">
              <div className="text-lg font-semibold text-text-primary">
                {Math.round(metrics.volumeTrend.slice(-7).reduce((sum, day) => sum + day.count, 0) / 7)}
              </div>
              <div className="text-xs text-text-tertiary">7d Avg</div>
            </div>
            <div className="text-center p-3 bg-bg-tertiary rounded">
              <div className="text-lg font-semibold text-text-primary">
                {Math.round(metrics.volumeTrend.reduce((sum, day) => sum + day.count, 0) / metrics.volumeTrend.length)}
              </div>
              <div className="text-xs text-text-tertiary">30d Avg</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
