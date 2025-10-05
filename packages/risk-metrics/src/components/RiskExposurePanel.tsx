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
import { RiskExposureMetrics } from '@/types'
import { AlertTriangle, Clock, TrendingUp, Shield } from 'lucide-react'

interface RiskExposurePanelProps {
  metrics: RiskExposureMetrics
}

export function RiskExposurePanel({ metrics }: RiskExposurePanelProps) {

  const formatHours = (hours: number) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)}m`
    } else if (hours < 24) {
      return `${hours.toFixed(1)}h`
    } else {
      return `${(hours / 24).toFixed(1)}d`
    }
  }

  const getRiskLevel = (score: number) => {
    if (score < 50) return { level: 'Low', color: 'success' as const }
    if (score < 150) return { level: 'Medium', color: 'warning' as const }
    return { level: 'High', color: 'error' as const }
  }

  const riskLevel = getRiskLevel(metrics.openRiskScore)

  return (
    <div>
      <h2 className="text-xl font-semibold text-text-primary mb-6">
        Current Risk Exposure
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Open Risk Score */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">
              Open Risk Score
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-text-tertiary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">
              {metrics.openRiskScore.toFixed(1)}
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="outline" color={riskLevel.color}>
                {riskLevel.level} Risk
              </Badge>
            </div>
            <p className="text-xs text-text-tertiary mt-2">
              Weighted by notional × severity × time
            </p>
          </CardContent>
        </Card>

        {/* Trades Outside SLA */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">
              Trades Outside SLA
            </CardTitle>
            <Clock className="h-4 w-4 text-text-tertiary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">
              {metrics.tradesOutsideSLA.count}
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Progress 
                value={metrics.tradesOutsideSLA.percentage} 
                className="flex-1"
              />
              <span className="text-sm text-text-secondary">
                {metrics.tradesOutsideSLA.percentage.toFixed(1)}%
              </span>
            </div>
            <p className="text-xs text-text-tertiary mt-2">
              &gt;24 hours without affirmation/confirmation
            </p>
          </CardContent>
        </Card>

        {/* High-Severity Open Breaks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">
              High-Severity Breaks
            </CardTitle>
            <Shield className="h-4 w-4 text-text-tertiary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">
              {metrics.highSeverityOpenBreaks}
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Badge 
                variant="outline" 
                color={metrics.highSeverityOpenBreaks > 10 ? 'error' : 'warning'}
              >
                {metrics.highSeverityOpenBreaks > 10 ? 'Critical' : 'Monitor'}
              </Badge>
            </div>
            <p className="text-xs text-text-tertiary mt-2">
              Unresolved economic risk issues
            </p>
          </CardContent>
        </Card>

        {/* Average Time to Resolution */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">
              Avg Resolution Time
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-text-tertiary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">
              {formatHours(metrics.averageTimeToRiskResolution)}
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Badge 
                variant="outline" 
                color={metrics.averageTimeToRiskResolution > 24 ? 'error' : 'success'}
              >
                {metrics.averageTimeToRiskResolution > 24 ? 'Slow' : 'Good'}
              </Badge>
            </div>
            <p className="text-xs text-text-tertiary mt-2">
              Trade execution to resolution
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Summary */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Risk Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Overall Risk Level</span>
              <Badge color={riskLevel.color} variant="outline">
                {riskLevel.level}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">SLA Compliance</span>
              <span className="font-medium">
                {(100 - metrics.tradesOutsideSLA.percentage).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Critical Issues</span>
              <span className="font-medium text-error-600">
                {metrics.highSeverityOpenBreaks} open
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
