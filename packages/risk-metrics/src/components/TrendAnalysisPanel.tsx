'use client'

import React from 'react'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Badge
} from '@float-vibe-foundry/design-system'
import { TrendMetrics } from '@/types'
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react'

interface TrendAnalysisPanelProps {
  metrics: TrendMetrics
}

export function TrendAnalysisPanel({ metrics }: TrendAnalysisPanelProps) {
  const getTrendIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="h-4 w-4 text-success-500" />
    if (value < 0) return <TrendingDown className="h-4 w-4 text-error-500" />
    return <Minus className="h-4 w-4 text-text-tertiary" />
  }

  const getTrendColor = (value: number) => {
    if (value > 0) return 'success'
    if (value < 0) return 'error'
    return 'secondary'
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-text-primary mb-6">
        Trend Analysis
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Trend Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Risk Trend Score</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                {getTrendIcon(metrics.riskTrendScore)}
                <span className="text-3xl font-bold text-text-primary">
                  {Math.abs(metrics.riskTrendScore).toFixed(1)}%
                </span>
              </div>
              <Badge 
                variant="outline" 
                color={getTrendColor(metrics.riskTrendScore)}
                className="mb-2"
              >
                {metrics.riskTrendScore > 0 ? 'Risk Increasing' : metrics.riskTrendScore < 0 ? 'Risk Decreasing' : 'Risk Stable'}
              </Badge>
              <p className="text-sm text-text-tertiary">
                Month-over-month risk change
              </p>
            </div>
          </CardContent>
        </Card>

        {/* SLA Achievement Trend */}
        <Card>
          <CardHeader>
            <CardTitle>SLA Achievement Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary">
                  {metrics.slaAchievementTrend[metrics.slaAchievementTrend.length - 1]?.percentage.toFixed(1)}%
                </div>
                <div className="text-sm text-text-secondary">Current SLA Achievement</div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-text-secondary">Recent Trend</h4>
                {metrics.slaAchievementTrend.slice(-6).map((point, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-xs text-text-tertiary">
                      {formatDate(point.date)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-brand-500"
                          style={{ width: `${point.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">{point.percentage.toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Template Coverage Trajectory */}
        <Card>
          <CardHeader>
            <CardTitle>Template Coverage Trajectory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary">
                  {metrics.templateCoverageTrajectory[metrics.templateCoverageTrajectory.length - 1]?.percentage.toFixed(1)}%
                </div>
                <div className="text-sm text-text-secondary">Current Coverage</div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-text-secondary">Progress Over Time</h4>
                {metrics.templateCoverageTrajectory.slice(-6).map((point, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-xs text-text-tertiary">
                      {formatDate(point.date)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-success-500"
                          style={{ width: `${point.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">{point.percentage.toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Break Severity Mix Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Break Severity Mix Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-sm text-text-secondary mb-2">Current Mix</div>
                <div className="flex justify-center space-x-4">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-error-500 rounded-full mx-auto mb-1"></div>
                    <div className="text-xs text-text-tertiary">High</div>
                    <div className="text-sm font-semibold">
                      {metrics.breakSeverityMixTrend[metrics.breakSeverityMixTrend.length - 1]?.high.toFixed(0)}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-warning-500 rounded-full mx-auto mb-1"></div>
                    <div className="text-xs text-text-tertiary">Medium</div>
                    <div className="text-sm font-semibold">
                      {metrics.breakSeverityMixTrend[metrics.breakSeverityMixTrend.length - 1]?.medium.toFixed(0)}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-success-500 rounded-full mx-auto mb-1"></div>
                    <div className="text-xs text-text-tertiary">Low</div>
                    <div className="text-sm font-semibold">
                      {metrics.breakSeverityMixTrend[metrics.breakSeverityMixTrend.length - 1]?.low.toFixed(0)}%
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-text-secondary">Trend Over Time</h4>
                {metrics.breakSeverityMixTrend.slice(-6).map((point, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-xs text-text-tertiary">
                      {formatDate(point.date)}
                    </span>
                    <div className="flex space-x-1">
                      <div 
                        className="w-4 h-2 bg-error-500 rounded"
                        style={{ width: `${point.high * 0.8}px` }}
                      ></div>
                      <div 
                        className="w-4 h-2 bg-warning-500 rounded"
                        style={{ width: `${point.medium * 0.8}px` }}
                      ></div>
                      <div 
                        className="w-4 h-2 bg-success-500 rounded"
                        style={{ width: `${point.low * 0.8}px` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
