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
  Command,
  ArrowRightToLine,
  Sun,
  Moon
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { OrgSwitcher } from "@/components/ui/org-switcher"
import { useSidebar } from "@/components/ui/sidebar"
import { useTheme } from "@/themes/theme-context"

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
  SidebarInset,
  SidebarTrigger
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
      avatarUrl: "/assets/avatars/tydavidson.png",
      avatarFallback: "AC"
    },
    {
      id: "state-street",
      name: "State Street",
      logo: LogoStateStreet,
      avatarUrl: "/assets/avatars/tydavidson.png",
      avatarFallback: "SS"
    },
    {
      id: "gs",
      name: "Goldman Sachs",
      logo: LogoGS,
      avatarUrl: "/assets/avatars/tydavidson.png",
      avatarFallback: "GS"
    }
  ]
  const [currentOrg, setCurrentOrg] = React.useState(organizations[0].id)
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

  return (
    <div className="flex min-h-screen">
      <SidebarProvider defaultOpen={sidebarOpen} open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SidebarPageContent
          organizations={organizations}
          currentOrg={currentOrg}
          setCurrentOrg={setCurrentOrg}
        />
      </SidebarProvider>
    </div>
  )
}

function SidebarPageContent({ organizations, currentOrg, setCurrentOrg }: {
  organizations: Array<{ id: string; name: string; logo: React.ElementType; avatarUrl: string; avatarFallback: string }>;
  currentOrg: string;
  setCurrentOrg: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { state, toggleSidebar } = useSidebar();
  const { isDark } = useTheme();

  return (
    <>
      <Sidebar
        collapsible="icon"
        className="float-sidebar"
        onClick={e => {
          const interactiveTags = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA', 'LABEL'];
          const target = e.target as HTMLElement;
          // Prevent toggling if click is inside an interactive element or menu button
          if (
            interactiveTags.includes(target.tagName) ||
            target.closest('button') ||
            target.closest('a') ||
            target.closest('[role="button"]') ||
            target.closest('.sidebar-menu-button')
          ) {
            console.log('Sidebar interactive/menu element clicked, not toggling');
            return;
          }
          console.log('Sidebar background or non-interactive element clicked, toggling sidebar');
          toggleSidebar();
        }}
      >
        <SidebarHeader className="flex justify-between items-center">
          <OrgSwitcher organizations={organizations} />
        </SidebarHeader>
        <SidebarContent className="py-4">
          {/* Navigation Section */}
          <SidebarGroup>
            {/* <SidebarGroupLabel>Navigation</SidebarGroupLabel> */}
            <SidebarGroupContent>
              <SidebarMenu>
                {homeItems
                  .filter(item => item.title !== "Settings")
                  .map((item) => (
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

        </SidebarContent>
        <SidebarFooter className="relative min-h-[168px]">
          {/* Expanded (horizontal) layout */}
          <div
            className={
              `absolute inset-0 flex items-center justify-between gap-2 px-4 py-2 transition-opacity duration-200 ${state === "collapsed" ? "opacity-0 pointer-events-none" : "opacity-100"}`
            }
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="/assets/avatars/tydavidson.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Info className="h-5 w-5" />
              </Button>
              {/* Theme toggle button */}
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    const html = document.documentElement;
                    const isCurrentlyDark = html.classList.contains("dark");
                    html.classList.toggle("dark", !isCurrentlyDark);
                  }
                }}
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
          {/* Collapsed (vertical) layout with expand trigger at the top */}
          <div
            className={
              `absolute inset-0 flex flex-col items-center justify-end pb-4 transition-opacity duration-200 ${state === "collapsed" ? "opacity-100" : "opacity-0 pointer-events-none"}`
            }
          >
            <SidebarGroup className="w-full flex flex-col items-center">
              <SidebarMenu className="flex flex-col items-center gap-1 w-full">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <SidebarTrigger
                      className="h-8 w-8 rounded-full mb-4 bg-bg-tertiary"
                      aria-label="Expand sidebar"
                    >
                      <ArrowRightToLine className="h-4 w-4" />
                    </SidebarTrigger>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {/* Theme toggle button in collapsed state */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <button
                      aria-label="Toggle theme"
                      className="h-8 w-8 flex items-center justify-center rounded-full"
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          const html = document.documentElement;
                          const isCurrentlyDark = html.classList.contains("dark");
                          html.classList.toggle("dark", !isCurrentlyDark);
                        }
                      }}
                    >
                      {isDark ? (
                        <Sun className="h-5 w-5" />
                      ) : (
                        <Moon className="h-5 w-5" />
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <button aria-label="Info">
                      <Info className="h-4 w-4" />
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <Avatar className="h-8 w-8 mt-3">
              <AvatarImage src="/assets/avatars/tydavidson.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
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
    </>
  )
} 