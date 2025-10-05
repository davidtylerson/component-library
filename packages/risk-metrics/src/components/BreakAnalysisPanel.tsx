'use client'

import React from 'react'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Progress
} from '@float-vibe-foundry/design-system'
import { BreakAnalysisMetrics } from '@/types'
import { AlertCircle } from 'lucide-react'

interface BreakAnalysisPanelProps {
  metrics: BreakAnalysisMetrics
}

export function BreakAnalysisPanel({ metrics }: BreakAnalysisPanelProps) {
  const formatHours = (hours: number) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)}m`
    } else if (hours < 24) {
      return `${hours.toFixed(1)}h`
    } else {
      return `${(hours / 24).toFixed(1)}d`
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertCircle className="h-5 w-5" />
          <span>Break Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Break Rate by Severity */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">
            Break Rate by Severity
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-error-500 rounded-full"></div>
                <span className="text-sm">High Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={metrics.breakRateBySeverity.high} className="w-20" />
                <span className="text-sm font-medium">{metrics.breakRateBySeverity.high.toFixed(1)}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning-500 rounded-full"></div>
                <span className="text-sm">Medium Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={metrics.breakRateBySeverity.medium} className="w-20" />
                <span className="text-sm font-medium">{metrics.breakRateBySeverity.medium.toFixed(1)}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                <span className="text-sm">Low Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={metrics.breakRateBySeverity.low} className="w-20" />
                <span className="text-sm font-medium">{metrics.breakRateBySeverity.low.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Break Ownership */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">
            Break Ownership
          </h4>
          <div className="space-y-2">
            {Object.entries(metrics.breakOwnershipDistribution).map(([owner, percentage]) => (
              <div key={owner} className="flex items-center justify-between">
                <span className="text-sm capitalize">{owner}</span>
                <div className="flex items-center space-x-2">
                  <Progress value={percentage} className="w-16" />
                  <span className="text-sm font-medium">{percentage.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Field-Level Break Frequency */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">
            Field-Level Break Frequency
          </h4>
          <div className="space-y-2">
            {Object.entries(metrics.fieldLevelBreakFrequency).map(([field, frequency]) => (
              <div key={field} className="flex items-center justify-between">
                <span className="text-sm capitalize">{field.replace('_', ' ')}</span>
                <div className="flex items-center space-x-2">
                  <Progress value={frequency} className="w-16" />
                  <span className="text-sm font-medium">{frequency.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-primary">
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">
              {metrics.breakConcentrationScore.toFixed(1)}%
            </div>
            <div className="text-xs text-text-tertiary">Concentration Score</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">
              {formatHours(metrics.breakResolutionTime)}
            </div>
            <div className="text-xs text-text-tertiary">Avg Resolution Time</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
