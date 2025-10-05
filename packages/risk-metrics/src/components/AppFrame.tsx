'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@float-vibe-foundry/design-system';
import { ClientThemeToggle } from '@float-vibe-foundry/design-system';
import {
  BarChart3,
  TrendingUp,
  Users,
  Shield,
  Activity,
  Home,
} from 'lucide-react';

const navigationItems = [
  {
    title: 'Home',
    icon: Home,
    url: '/',
  },
  {
    title: 'Risk Overview',
    icon: Shield,
    url: '/dashboard_executive',
  },
  {
    title: 'Risk Deep Dive',
    icon: BarChart3,
    url: '/dashboard_risk_deepdive',
  },
  {
    title: 'Counterparty Scorecard',
    icon: Users,
    url: '/dashboard_counterparty',
  },
  {
    title: 'Template Progress',
    icon: TrendingUp,
    url: '/dashboard_template_progress',
  },
  {
    title: 'Trading Activity',
    icon: Activity,
    url: '/dashboard_activity',
  },
];

interface AppFrameProps {
  children: React.ReactNode;
}

export function AppFrame({ children }: AppFrameProps) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar className="w-64">
          <SidebarHeader className="border-border-secondary border-b">
            <div className="flex items-center gap-2 px-4 py-3">
              <div className="bg-brand-600 flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white">
                RM
              </div>
              <div className="flex flex-col">
                <span className="text-text-primary text-sm font-semibold">
                  Risk Metrics
                </span>
                <span className="text-text-tertiary text-xs">Dashboard</span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="py-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-text-tertiary px-4">
                Dashboards
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map(item => {
                    const Icon = item.icon;
                    const isActive = pathname === item.url;

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          className="mx-2"
                        >
                          <Link href={item.url}>
                            <Icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-border-secondary border-t p-4">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary text-sm">Theme</span>
              <ClientThemeToggle />
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="border-border-secondary bg-bg-primary border-b px-6 py-3">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <div className="flex-1">
                <h1 className="text-text-primary text-lg font-semibold">
                  {navigationItems.find(item => item.url === pathname)?.title ||
                    'Risk Metrics Dashboard'}
                </h1>
              </div>
            </div>
          </header>

          <main className="bg-bg-secondary flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
