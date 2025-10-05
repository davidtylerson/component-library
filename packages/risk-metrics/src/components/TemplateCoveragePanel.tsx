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
import { TemplateCoverageMetrics } from '@/types'
import { FileText } from 'lucide-react'

interface TemplateCoveragePanelProps {
  metrics: TemplateCoverageMetrics
}

export function TemplateCoveragePanel({ metrics }: TemplateCoveragePanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Template Coverage</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Coverage */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">
            Overall Template Coverage
          </h4>
          <div className="flex items-center space-x-4">
            <Progress value={metrics.overallTemplateCoverage} className="flex-1" />
            <span className="text-lg font-semibold text-text-primary">
              {metrics.overallTemplateCoverage.toFixed(1)}%
            </span>
          </div>
          <div className="mt-2">
            <Badge 
              variant="outline" 
              color={metrics.overallTemplateCoverage > 75 ? 'success' : metrics.overallTemplateCoverage > 50 ? 'warning' : 'error'}
            >
              {metrics.overallTemplateCoverage > 75 ? 'Good' : metrics.overallTemplateCoverage > 50 ? 'Needs Improvement' : 'Critical'}
            </Badge>
          </div>
        </div>

        {/* Coverage by Volume */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">
            Coverage by Volume
          </h4>
          <div className="flex items-center space-x-4">
            <Progress value={metrics.templateCoverageByVolume} className="flex-1" />
            <span className="text-lg font-semibold text-text-primary">
              {metrics.templateCoverageByVolume.toFixed(1)}%
            </span>
          </div>
          <p className="text-xs text-text-tertiary mt-1">
            Risk-weighted coverage calculation
          </p>
        </div>

        {/* Utilization Rate */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">
            Template Utilization Rate
          </h4>
          <div className="flex items-center space-x-4">
            <Progress value={metrics.templateUtilizationRate} className="flex-1" />
            <span className="text-lg font-semibold text-text-primary">
              {metrics.templateUtilizationRate.toFixed(1)}%
            </span>
          </div>
          <p className="text-xs text-text-tertiary mt-1">
            Of available templates, how often used
          </p>
        </div>

        {/* Template Gap Analysis */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">
            Top Template Gaps
          </h4>
          <div className="space-y-2">
            {metrics.templateGapAnalysis.slice(0, 3).map((gap, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-bg-tertiary rounded">
                <div>
                  <div className="text-sm font-medium text-text-primary">
                    {gap.counterparty}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {gap.productType}
                  </div>
                </div>
                <Badge variant="outline" color="warning">
                  {gap.tradeCount} trades
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-primary">
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">
              {metrics.newProductTimeToTemplate.toFixed(0)}d
            </div>
            <div className="text-xs text-text-tertiary">Avg Time to Template</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">
              {metrics.templateGapAnalysis.length}
            </div>
            <div className="text-xs text-text-tertiary">Total Gaps</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
