'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from '@float-vibe-foundry/design-system';
import {
  OrgSwitcher,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
} from '@float-vibe-foundry/design-system';
import {
  IconArrowBigRightLine,
  IconInfoCircle,
  IconShield,
  IconChartBar,
  IconUsers,
  IconTrendingUp,
  IconActivity,
} from '@tabler/icons-react';
import { ClientThemeToggle } from '@float-vibe-foundry/design-system/themes';

const organizations = [
  {
    id: 'alta-capital',
    name: 'Alta Capital',
    logo: () => <span className="text-xs font-bold">AC</span>,
    avatarUrl: '/avatars/tydavidson.png',
    avatarFallback: 'AC',
  },
  {
    id: 'state-street',
    name: 'State Street',
    logo: () => <span className="text-xs font-bold">SS</span>,
    avatarUrl: '/avatars/tydavidson.png',
    avatarFallback: 'SS',
  },
  {
    id: 'gs',
    name: 'Goldman Sachs',
    logo: () => <span className="text-xs font-bold">GS</span>,
    avatarUrl: '/avatars/tydavidson.png',
    avatarFallback: 'GS',
  },
];

const navItems = [
  {
    title: 'Home',
    icon: IconShield,
    url: '/',
  },
  {
    title: 'Risk Overview',
    icon: IconShield,
    url: '/dashboard_executive',
  },
  {
    title: 'Risk Deep Dive',
    icon: IconChartBar,
    url: '/dashboard_risk_deepdive',
  },
  {
    title: 'Counterparty Scorecard',
    icon: IconUsers,
    url: '/dashboard_counterparty',
  },
  {
    title: 'Template Progress',
    icon: IconTrendingUp,
    url: '/dashboard_template_progress',
  },
  {
    title: 'Trading Activity',
    icon: IconActivity,
    url: '/dashboard_activity',
  },
];

interface AppFrameProps {
  children: React.ReactNode;
}

export function AppFrame({ children }: AppFrameProps) {
  const pathname = usePathname();
  const { state, toggleSidebar } = useSidebar();

  return (
    <div className="flex min-h-screen w-full">
      <div className="bg-bg-app-base h-screen flex-none">
        <Sidebar
          collapsible="icon"
          className="float-sidebar h-screen"
          onClick={e => {
            const interactiveTags = [
              'BUTTON',
              'A',
              'INPUT',
              'SELECT',
              'TEXTAREA',
              'LABEL',
            ];
            const target = e.target as HTMLElement;
            if (
              interactiveTags.includes(target.tagName) ||
              target.closest('button') ||
              target.closest('a') ||
              target.closest('[role="button"]') ||
              target.closest('.sidebar-menu-button') ||
              target.closest('.org-switcher-root')
            ) {
              return;
            }
            toggleSidebar();
          }}
        >
          <SidebarHeader className="flex items-center justify-between">
            <OrgSwitcher organizations={organizations} />
          </SidebarHeader>
          <SidebarContent className="py-4">
            {/* Navigation Section */}
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map(item => {
                    const isActive = pathname === item.url;

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                          <Link href={item.url}>
                            {item.icon && <item.icon className="h-4 w-4" />}
                            <span className="ml-2 max-w-[120px] overflow-hidden whitespace-nowrap opacity-100 transition-all duration-200 group-data-[state=collapsed]/sidebar:ml-0 group-data-[state=collapsed]/sidebar:max-w-0 group-data-[state=collapsed]/sidebar:opacity-0">
                              {item.title}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="relative min-h-[60px]">
            {/* Expanded (horizontal) layout */}
            <div
              className={`absolute inset-0 flex items-center justify-between gap-2 px-4 py-2 transition-opacity duration-200 ${state === 'collapsed' ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/tydavidson.png" alt="User" />
                <AvatarFallback>RM</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <IconInfoCircle className="h-5 w-5" />
                </Button>
                {/* Theme toggle button */}
                <ClientThemeToggle variant="icon" size="md" />
              </div>
            </div>
            {/* Collapsed (vertical) layout with expand trigger at the top */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-end pb-4 transition-opacity duration-200 ${state === 'collapsed' ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            >
              <SidebarGroup className="flex w-full flex-col items-center">
                <SidebarMenu className="flex w-full flex-col items-center gap-1">
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <SidebarTrigger
                        className="mb-4 h-8 w-8 rounded-full bg-bg-tertiary"
                        aria-label="Expand sidebar"
                      >
                        <IconArrowBigRightLine className="h-4 w-4" />
                      </SidebarTrigger>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {/* Theme toggle button in collapsed state */}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <ClientThemeToggle variant="icon" size="sm" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <button aria-label="Info">
                        <IconInfoCircle className="h-4 w-4" />
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
              <Avatar className="mt-3 h-8 w-8">
                <AvatarImage src="/avatars/tydavidson.png" alt="User" />
                <AvatarFallback>RM</AvatarFallback>
              </Avatar>
            </div>
          </SidebarFooter>
        </Sidebar>
      </div>
      <div className="flex h-screen flex-1 items-start justify-center">
        <div
          className="relative my-2 mr-2 flex-1 overflow-auto rounded-lg border border-border-tertiary bg-bg-primary"
          style={{
            boxSizing: 'border-box',
            padding: 0,
            height: 'calc(100vh - 16px)',
          }}
        >
          <div className="mx-auto h-full w-full max-w-6xl">
            <main className="h-full w-full text-text-primary p-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
