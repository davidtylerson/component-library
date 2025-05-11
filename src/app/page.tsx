"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  HelpCircle,
  LogOut,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Building,
  Dot, // For radio item indicator
  PlusCircle, // For "Create new organization"
} from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IconArrowRight, IconHome, IconComponents, IconPalette, IconSettings } from "@tabler/icons-react";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";

export default function HomePage() {
  const [currentOrg, setCurrentOrg] = useState("float");
  const organizations = [
    { id: "float", name: "Float", icon: Building },
    { id: "alta", name: "Alta", icon: Building },
    { id: "state-street", name: "State Street", icon: Building },
  ];
  const SelectedOrgIcon = organizations.find(org => org.id === currentOrg)?.icon || Building;

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar variant="inset">
          <SidebarHeader>
            <div className="px-2 py-2">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full flex items-center justify-between text-left px-2 py-1.5 rounded-md hover:bg-[var(--float-sidebar-item-bg-hover)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <SelectedOrgIcon className="h-5 w-5 text-[var(--text-secondary)] flex-shrink-0" />
                      <span className="text-sm font-medium text-[var(--text-primary)] truncate">
                        {organizations.find(org => org.id === currentOrg)?.name}
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-[var(--text-secondary)] flex-shrink-0" />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="w-[var(--radix-dropdown-menu-trigger-width)] bg-[var(--popover)] text-[var(--popover-foreground)] border border-[var(--border)] rounded-md shadow-md"
                    align="start"
                    sideOffset={5}
                  >
                    <DropdownMenu.Label className="px-2 py-1.5 text-xs text-[var(--text-tertiary)] font-semibold">
                      Organizations
                    </DropdownMenu.Label>
                    <DropdownMenu.Separator className="h-px bg-[var(--border-secondary)] my-1" />
                    <DropdownMenu.RadioGroup value={currentOrg} onValueChange={setCurrentOrg}>
                      {organizations.map((org) => (
                        <DropdownMenu.RadioItem
                          key={org.id}
                          value={org.id}
                          className="flex items-center gap-2 px-2 py-1.5 text-sm text-[var(--text-secondary)] rounded-sm cursor-default select-none outline-none data-[highlighted]:bg-[var(--float-sidebar-item-bg-hover)] data-[highlighted]:text-[var(--text-primary)] data-[state=checked]:text-[var(--text-brand-primary)] relative pl-7"
                        >
                          <DropdownMenu.ItemIndicator className="absolute left-1.5 top-1/2 -translate-y-1/2">
                            <Dot className="h-5 w-5 text-current" />
                          </DropdownMenu.ItemIndicator>
                          <org.icon className="h-4 w-4 text-current flex-shrink-0" />
                          <span>{org.name}</span>
                        </DropdownMenu.RadioItem>
                      ))}
                    </DropdownMenu.RadioGroup>
                    <DropdownMenu.Separator className="h-px bg-[var(--border-secondary)] my-1" />
                    <DropdownMenu.Item
                      className="flex items-center gap-2 px-2 py-1.5 text-sm text-[var(--text-secondary)] rounded-sm cursor-default select-none outline-none data-[highlighted]:bg-[var(--float-sidebar-item-bg-hover)] data-[highlighted]:text-[var(--text-primary)]"
                    >
                      <PlusCircle className="h-4 w-4 text-current" />
                      <span>Create new organization</span>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive>
                      <Link href="/">
                        <IconHome size={18} />
                        <span>Home</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/design-system">
                        <IconPalette size={18} />
                        <span>Design System</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/design-system/sidebar">
                        <IconComponents size={18} />
                        <span>Sidebar Example</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/components">
                        <IconComponents size={18} />
                        <span>Components</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/settings">
                        <IconSettings size={18} />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center gap-2 px-2">
              <Avatar>
                <AvatarFallback>TD</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col">
                <Text size="sm" weight="semibold">Tyler Davidson</Text>
                <Text size="xs" className="text-muted-foreground">v1.0.0</Text>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <div className="p-4">
            <div className="flex items-center mb-4">
              <SidebarTrigger className="mr-4" />
              <Heading level={1} size="md">Float UI Library</Heading>
            </div>

            <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-150px)] py-10 px-4 text-center">
              <Heading level={1} size="xl" className="mb-4">
                Float UI Library
              </Heading>
              <Text size="lg" className="max-w-2xl mb-8 text-muted-foreground">
                A comprehensive React component library built on shadcn/ui, designed for fintech applications
                with a focus on accessibility, customization, and developer experience.
              </Text>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button 
                  asChild 
                  dsVariant="primary" 
                  size="lg" 
                >
                  <Link href="/design-system">
                    View Design System 
                    <IconArrowRight className="ml-2" size={18} stroke={1.5} />
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  dsVariant="secondary" 
                  size="lg" 
                >
                  <Link href="/components">
                    Browse Components
                    <IconArrowRight className="ml-2" size={18} stroke={1.5} />
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  dsVariant="tertiary" 
                  size="lg"
                >
                  <Link href="/buttons">
                    Button Showcase
                    <IconArrowRight className="ml-2" size={18} stroke={1.5} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}