"use client"

import * as React from "react"
import { 
  Calendar, 
  ChevronLeft, 
  ExternalLink, 
  Home, 
  Inbox, 
  Info, 
  Search, 
  Settings, 
  User,
  Database,
  BarChart,
  GalleryVerticalEnd,
  AudioWaveform,
  Command
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { OrgSwitcher } from "@/components/ui/org-switcher"

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
  SidebarSeparator,
  SidebarTriggerExternal,
  SidebarInset
} from "@/components/ui/sidebar"

// Logo imports - replace with your actual paths
import LogoStateStreet from "@/assets/logos/Logo_State_Street.svg"
import LogoAlta from "@/assets/logos/Logo_Alta.svg"
import LogoGS from "@/assets/logos/Logo_GS.svg"

const homeItems = [
  {
    title: "Home",
    icon: Home,
    url: "#",
    isActive: true
  },
  {
    title: "Inbox",
    icon: Inbox,
    url: "#"
  },
  {
    title: "Search",
    icon: Search,
    url: "#"
  },
  {
    title: "Calendar",
    icon: Calendar,
    url: "#"
  },
]

const analyticsItems = [
  {
    title: "Reports",
    icon: BarChart,
    url: "#"
  },
  {
    title: "Data Browser",
    icon: Database,
    url: "#"
  },
]

const settingsItems = [
  {
    title: "Settings",
    icon: Settings,
    url: "#"
  },
  {
    title: "Profile",
    icon: User,
    url: "#"
  },
]

export default function SidebarPage() {
  const organizations = [
    {
      id: "alta-capital",
      name: "Alta Capital",
      logo: LogoAlta,
      avatarUrl: "https://github.com/shadcn.png",
      avatarFallback: "AC"
    },
    {
      id: "state-street",
      name: "State Street",
      logo: LogoStateStreet,
      avatarUrl: "https://github.com/shadcn.png",
      avatarFallback: "SS"
    },
    {
      id: "gs",
      name: "Goldman Sachs",
      logo: LogoGS,
      avatarUrl: "https://github.com/shadcn.png",
      avatarFallback: "GS"
    }
  ]
  const [currentOrg, setCurrentOrg] = React.useState(organizations[0].id)
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

  return (
    <div className="flex min-h-screen">
      <SidebarProvider defaultOpen={sidebarOpen} open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <Sidebar collapsible="icon" className="float-sidebar">
          <SidebarHeader className="flex justify-between items-center">
            <OrgSwitcher organizations={organizations} />
          </SidebarHeader>
          <SidebarContent className="py-4">
            {/* Navigation Section */}
            <SidebarGroup>
              {/* Navigation Section Label Removed */}
              <SidebarGroupContent>
                <SidebarMenu>
                  {homeItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title} isActive={item.isActive}>
                        <a href={item.url}>
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span
                            className="transition-all duration-200 max-w-[120px] opacity-100 ml-2 group-data-[state=collapsed]/sidebar:max-w-0 group-data-[state=collapsed]/sidebar:opacity-0 group-data-[state=collapsed]/sidebar:ml-0 overflow-hidden whitespace-nowrap"
                          >
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Analytics Section */}
            <SidebarGroup>
              <SidebarGroupLabel>Analytics</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {analyticsItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <a href={item.url}>
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span
                            className="transition-all duration-200 max-w-[120px] opacity-100 ml-2 group-data-[state=collapsed]/sidebar:max-w-0 group-data-[state=collapsed]/sidebar:opacity-0 group-data-[state=collapsed]/sidebar:ml-0 overflow-hidden whitespace-nowrap"
                          >
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            {/* Settings Section */}
            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {settingsItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <a href={item.url}>
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span
                            className="transition-all duration-200 max-w-[120px] opacity-100 ml-2 group-data-[state=collapsed]/sidebar:max-w-0 group-data-[state=collapsed]/sidebar:opacity-0 group-data-[state=collapsed]/sidebar:ml-0 overflow-hidden whitespace-nowrap"
                          >
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="flex items-center justify-between gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarTriggerExternal />
        <SidebarInset>
          <div className="flex-1 p-8">
            <h1 className="text-3xl font-bold">Sidebar Example</h1>
            <p className="mt-4 text-gray-500">
              This example demonstrates the shadcn sidebar component integrated with the Float design system.
            </p>
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Collapsible sidebar with toggle button</li>
                <li>Organization switcher</li>
                <li>Navigation groups with labels</li>
                <li>Active state styling</li>
                <li>Section labels</li>
                <li>Footer with user avatar</li>
                <li>Fully styled with your design system</li>
              </ul>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
} 