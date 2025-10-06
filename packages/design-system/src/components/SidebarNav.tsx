'use client';

import * as React from 'react';
import { useSidebar } from './ui/sidebar';

import Link from 'next/link';
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
} from './ui/sidebar';
import { OrgSwitcher } from './ui/org-switcher';
import {
  IconArrowBigRightLine,
  IconInfoCircle,
  IconHome,
  IconPalette,
  IconLayersSubtract,
  IconTable,
  IconChartBar,
} from '@tabler/icons-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { ClientThemeToggle } from '../themes/client-wrapper';

const navItems = [
  {
    title: 'Home',
    icon: IconHome,
    url: '/',
  },
  {
    title: 'Color',
    icon: IconPalette,
    url: '/design-system',
  },
  {
    title: 'Components',
    icon: IconLayersSubtract,
    url: '/components',
  },
  {
    title: 'DataTable',
    icon: IconTable,
    url: '/data-table',
  },
  {
    title: 'Chart Testing',
    icon: IconChartBar,
    url: '/interactive-chart-test',
  },
  {
    title: 'Test Page',
    icon: IconInfoCircle,
    url: '/test',
  },
];

// SidebarNav component: contains all sidebar logic/content
export function SidebarNav({
  organizations,
}: {
  organizations: Array<{
    id: string;
    name: string;
    logo: React.ElementType;
    avatarUrl: string;
    avatarFallback: string;
  }>;
}) {
  const { state, toggleSidebar } = useSidebar();

  return (
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
              {navItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span className="ml-2 max-w-[120px] overflow-hidden whitespace-nowrap opacity-100 transition-all duration-200 group-data-[state=collapsed]/sidebar:ml-0 group-data-[state=collapsed]/sidebar:max-w-0 group-data-[state=collapsed]/sidebar:opacity-0">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
            <AvatarFallback>JD</AvatarFallback>
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
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
