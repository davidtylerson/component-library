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
import { ProcessPerformanceMetrics } from '@/types'
import { Clock } from 'lucide-react'

interface ProcessPerformancePanelProps {
  metrics: ProcessPerformanceMetrics
}

export function ProcessPerformancePanel({ metrics }: ProcessPerformancePanelProps) {
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
          <Clock className="h-5 w-5" />
          <span>Process Performance</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* SLA Achievement */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">
            24-Hour SLA Achievement
          </h4>
          <div className="flex items-center space-x-4">
            <Progress value={metrics.slaAchievement24Hour} className="flex-1" />
            <span className="text-lg font-semibold text-text-primary">
              {metrics.slaAchievement24Hour.toFixed(1)}%
            </span>
          </div>
          <div className="mt-2">
            <Badge 
              variant="outline" 
              color={metrics.slaAchievement24Hour > 90 ? 'success' : metrics.slaAchievement24Hour > 75 ? 'warning' : 'error'}
            >
              {metrics.slaAchievement24Hour > 90 ? 'Excellent' : metrics.slaAchievement24Hour > 75 ? 'Good' : 'Needs Improvement'}
            </Badge>
          </div>
        </div>

        {/* Affirmation Effectiveness */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">
            Affirmation Effectiveness
          </h4>
          <div className="flex items-center space-x-4">
            <Progress value={metrics.affirmationEffectiveness} className="flex-1" />
            <span className="text-lg font-semibold text-text-primary">
              {metrics.affirmationEffectiveness.toFixed(1)}%
            </span>
          </div>
          <p className="text-xs text-text-tertiary mt-1">
            Non-superseded affirmations
          </p>
        </div>

        {/* Paper vs Electronic Mix */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">
            Automation Mix
          </h4>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Affirmation</span>
                <span className="text-sm font-medium">{metrics.paperVsElectronicMix.affirmation.electronic}% Electronic</span>
              </div>
              <Progress value={metrics.paperVsElectronicMix.affirmation.electronic} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Confirmation</span>
                <span className="text-sm font-medium">{metrics.paperVsElectronicMix.confirmation.electronic}% Electronic</span>
              </div>
              <Progress value={metrics.paperVsElectronicMix.confirmation.electronic} className="h-2" />
            </div>
          </div>
        </div>

        {/* Timing Metrics */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">
            Process Timing
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-bg-tertiary rounded">
              <div className="text-sm font-semibold text-text-primary">
                {formatHours(metrics.timeToReceiveDoc)}
              </div>
              <div className="text-xs text-text-tertiary">Time to Receive Doc</div>
            </div>
            <div className="text-center p-3 bg-bg-tertiary rounded">
              <div className="text-sm font-semibold text-text-primary">
                {formatHours(metrics.timeToAffirm)}
              </div>
              <div className="text-xs text-text-tertiary">Time to Affirm</div>
            </div>
            <div className="text-center p-3 bg-bg-tertiary rounded">
              <div className="text-sm font-semibold text-text-primary">
                {formatHours(metrics.timeToConfirm)}
              </div>
              <div className="text-xs text-text-tertiary">Time to Confirm</div>
            </div>
            <div className="text-center p-3 bg-bg-tertiary rounded">
              <div className="text-sm font-semibold text-text-primary">
                {formatHours(metrics.timeInDispute)}
              </div>
              <div className="text-xs text-text-tertiary">Time in Dispute</div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-primary">
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">
              {metrics.disputeResolutionSLA.toFixed(1)}%
            </div>
            <div className="text-xs text-text-tertiary">Dispute Resolution SLA</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">
              {metrics.autoMatchSuccessRate.toFixed(1)}%
            </div>
            <div className="text-xs text-text-tertiary">Auto-Match Success</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
