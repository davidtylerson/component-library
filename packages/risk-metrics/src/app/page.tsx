import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@float-vibe-foundry/design-system';
import Link from 'next/link';
import { BarChart3, TrendingUp, Users, Shield, Activity } from 'lucide-react';

const dashboardCards = [
  {
    title: 'Risk Overview',
    description:
      'Executive summary of current risk exposure and priority actions',
    icon: Shield,
    href: '/dashboard_executive',
    color: 'text-red-600',
  },
  {
    title: 'Risk Deep Dive',
    description: 'Detailed breakdown of breaks and disputes analysis',
    icon: BarChart3,
    href: '/dashboard_risk_deepdive',
    color: 'text-orange-600',
  },
  {
    title: 'Counterparty Scorecard',
    description: 'Comprehensive counterparty performance metrics and rankings',
    icon: Users,
    href: '/dashboard_counterparty',
    color: 'text-blue-600',
  },
  {
    title: 'Template Progress',
    description: 'Coverage and automation tracking with AI accuracy metrics',
    icon: TrendingUp,
    href: '/dashboard_template_progress',
    color: 'text-green-600',
  },
  {
    title: 'Trading Activity',
    description:
      'Volume and activity trends across products and counterparties',
    icon: Activity,
    href: '/dashboard_activity',
    color: 'text-purple-600',
  },
];

export default function HomePage() {
  return (
    <div className="p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-display-sm text-text-primary mb-2">
            Risk Metrics Dashboard
          </h1>
          <p className="text-text-secondary">
            Post-trade operational risk management dashboard prototype
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dashboardCards.map(card => {
            const Icon = card.icon;
            return (
              <Link key={card.title} href={card.href}>
                <Card className="h-full cursor-pointer transition-all hover:scale-105 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon className={`h-6 w-6 ${card.color}`} />
                      <CardTitle className="text-text-primary">
                        {card.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-text-secondary">{card.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
