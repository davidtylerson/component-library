'use client';

import { useTheme } from "@/themes/theme-context";
import { Heading } from "@/components/typography/heading";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader,
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from "@/components/ui/sidebar/sidebar";
// import { 
//   DropdownMenu, 
//   DropdownMenuContent, 
//   DropdownMenuItem, 
//   DropdownMenuLabel, 
//   DropdownMenuSeparator, 
//   DropdownMenuTrigger 
// } from "@/components/ui/dropdown-menu";
import { DropdownMenu as FloatDropdownMenu } from "@/components/ui/dropdown-menu";
import { 
  IconHome, IconSearch, IconFileText, IconArrowLeftRight, 
  IconChartBar, IconDatabase, IconTable, 
  IconSelector, IconBuildingSkyscraper
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Text } from "@/components/typography/text";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";

export default function ComponentsPage() {
  const { isDark } = useTheme();
  const [currentOrg, setCurrentOrg] = React.useState("Alta Capital");
  const orgIcons: Record<string, React.ElementType> = {
    "Alta Capital": IconBuildingSkyscraper,
    "State Street": IconBuildingSkyscraper,
    "Float": IconBuildingSkyscraper,
  };
  const CurrentOrgIcon = orgIcons[currentOrg] || IconBuildingSkyscraper;

  return (
    <div className="flex flex-row min-h-screen bg-ds-bg-primary">
      <SidebarProvider>
        <Sidebar variant="inset">
          <SidebarHeader>
            <FloatDropdownMenu.Root>
              <FloatDropdownMenu.Trigger asChild>
                <button className="float-sidebar-org-switcher">
                  <CurrentOrgIcon className="float-sidebar-org-switcher-icon" />
                  <div className="float-sidebar-org-switcher-text-content">
                    <span className="float-sidebar-org-switcher-name">{currentOrg}</span>
                  </div>
                  <IconSelector className="float-sidebar-org-switcher-chevron" />
                </button>
              </FloatDropdownMenu.Trigger>
              <FloatDropdownMenu.Content 
                className="w-[var(--radix-dropdown-menu-trigger-width)]" 
                align="start" 
                sideOffset={4}
              >
                <FloatDropdownMenu.Label>Organizations</FloatDropdownMenu.Label>
                <FloatDropdownMenu.Separator />
                {["Alta Capital", "State Street", "Float"].map((org) => {
                  const OrgIcon = orgIcons[org] || IconBuildingSkyscraper;
                  return (
                    <FloatDropdownMenu.Item key={org} onSelect={() => setCurrentOrg(org)}>
                      <OrgIcon className="mr-2 h-4 w-4" />
                      <span>{org}</span>
                    </FloatDropdownMenu.Item>
                  );
                })}
              </FloatDropdownMenu.Content>
            </FloatDropdownMenu.Root>
          </SidebarHeader>

          <SidebarMenu className="float-sidebar-menu">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" className="flex items-center">
                  <IconHome className="float-sidebar-menu-button-icon" />
                  <span className="float-sidebar-menu-button-text">Home</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" className="flex items-center">
                  <IconSearch className="float-sidebar-menu-button-icon" />
                  <span className="float-sidebar-menu-button-text">Search</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
                <a href="#" className="flex items-center">
                  <IconFileText className="float-sidebar-menu-button-icon" />
                  <span className="float-sidebar-menu-button-text">Documents</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" className="flex items-center">
                  <IconArrowLeftRight className="float-sidebar-menu-button-icon" />
                  <span className="float-sidebar-menu-button-text">Trades</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <div className="float-sidebar-section-label">Analytics</div>
          <SidebarMenu className="float-sidebar-menu">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" className="flex items-center">
                  <IconChartBar className="float-sidebar-menu-button-icon" />
                  <span className="float-sidebar-menu-button-text">Insights</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <div className="float-sidebar-section-label">Data</div>
          <SidebarMenu className="float-sidebar-menu">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" className="flex items-center">
                  <IconDatabase className="float-sidebar-menu-button-icon" />
                  <span className="float-sidebar-menu-button-text">Feeds</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" className="flex items-center">
                  <IconTable className="float-sidebar-menu-button-icon" />
                  <span className="float-sidebar-menu-button-text">Data Browser</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </Sidebar>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="container mx-auto">
            <div className="mb-8">
              <Heading level={1} size="lg">Component Library</Heading>
            </div>
            
            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Typography</Heading>
              <div className="space-y-6">
                <div>
                  <Heading level={2} size="2xl">Display 2XL</Heading>
                  {/* ... more typography headings ... */}
                </div>
                <div>
                  <Text size="xl">Text XL</Text>
                  {/* ... more text examples ... */}
                </div>
                <div>
                  <Text weight="regular">Regular Text</Text>
                  {/* ... more text weights ... */}
                </div>
              </div>
            </section>

            {/* ADD ALL OTHER SECTIONS FROM YOUR ORIGINAL page.tsx HERE */}
            {/* e.g., Buttons, Cards, Inputs, etc. */}

          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}