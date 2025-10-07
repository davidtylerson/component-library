'use client';

import * as React from 'react';
import { IconChevronsDown, IconPlus } from '@tabler/icons-react';
import { cn } from '../../lib/utils';

import { DropdownMenu } from './dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from './sidebar';

export interface Org {
  id: string;
  name: string;
  logo: React.ElementType;
  plan?: string;
}

interface OrgSwitcherProps {
  organizations: Org[];
}

export function OrgSwitcher({ organizations }: OrgSwitcherProps) {
  const { isMobile } = useSidebar();
  const [activeOrg, setActiveOrg] = React.useState(organizations[0]);

  if (!activeOrg) {
    return null;
  }

  return (
    <SidebarMenu
      className="org-switcher-root"
      onClick={e => e.stopPropagation()}
    >
      <SidebarMenuItem>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <SidebarMenuButton
              className={cn(
                'h-10 py-0 px-2 border-border-tertiary rounded-md border focus-visible:ring-2 focus-visible:ring-sidebar-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sidebar-bg)]',
                'group-data-[state=collapsed]/sidebar:h-10 group-data-[state=collapsed]/sidebar:w-10',
                'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              )}
            >
              <div className="flex h-6 w-6 flex-shrink-0 flex-grow-0 items-center justify-center rounded-[4px] bg-bg-secondary text-sidebar-primary-foreground">
                <activeOrg.logo />
              </div>
              <div className="ml-2 grid max-w-[120px] flex-1 overflow-hidden whitespace-nowrap text-left text-sm leading-tight opacity-100 transition-all duration-200 group-data-[state=collapsed]/sidebar:ml-0 group-data-[state=collapsed]/sidebar:max-w-0 group-data-[state=collapsed]/sidebar:opacity-0">
                <span className="truncate font-semibold">{activeOrg.name}</span>
                {activeOrg.plan && (
                  <span className="truncate text-xs">{activeOrg.plan}</span>
                )}
              </div>
              <IconChevronsDown className="ml-auto overflow-hidden opacity-100 transition-all duration-200 group-data-[state=collapsed]/sidebar:ml-0 group-data-[state=collapsed]/sidebar:max-w-0 group-data-[state=collapsed]/sidebar:opacity-0" />
            </SidebarMenuButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenu.Label className="text-xs text-text-tertiary">
              Organizations
            </DropdownMenu.Label>
            {organizations.map((org, index) => (
              <DropdownMenu.Item
                key={org.id}
                onClick={() => setActiveOrg(org)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border border-border-tertiary">
                  <org.logo />
                </div>
                {org.name}
                <DropdownMenu.Shortcut>⌘{index + 1}</DropdownMenu.Shortcut>
              </DropdownMenu.Item>
            ))}
            <DropdownMenu.Separator />
            <DropdownMenu.Item className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border border-border-tertiary bg-bg-primary">
                <IconPlus className="size-4" />
              </div>
              <div className="font-medium text-text-secondary">
                Add organization
              </div>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
