import * as React from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { useTheme } from "@/themes/theme-context";
import Link from "next/link";
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
  SidebarTrigger
} from "@/components/ui/sidebar";
import { OrgSwitcher } from "@/components/ui/org-switcher";
import { ArrowRightToLine, Sun, Moon, Info, Home, Palette, Layers, Sidebar as SidebarIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    title: "Home",
    icon: Home,
    url: "/",
  },
  {
    title: "Design System",
    icon: Palette,
    url: "/design-system",
  },
  {
    title: "Components",
    icon: Layers,
    url: "/components",
  },
  {
    title: "Test Page",
    icon: Info,
    url: "/test",
  },
  {
    title: "Sidebar Example",
    icon: SidebarIcon,
    url: "/design-system/sidebar",
  },
];

// SidebarNav component: contains all sidebar logic/content
export function SidebarNav({ organizations, currentOrg, setCurrentOrg }: {
  organizations: Array<{ id: string; name: string; logo: React.ElementType; avatarUrl: string; avatarFallback: string }>;
  currentOrg: string;
  setCurrentOrg: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { state, toggleSidebar } = useSidebar();
  const { isDark } = useTheme();

  return (
    <Sidebar
      collapsible="icon"
      className="float-sidebar h-screen"
      onClick={e => {
        const interactiveTags = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA', 'LABEL'];
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
      <SidebarHeader className="flex justify-between items-center">
        <OrgSwitcher organizations={organizations} />
      </SidebarHeader>
      <SidebarContent className="py-4">
        {/* Navigation Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span
                        className="transition-all duration-200 max-w-[120px] opacity-100 ml-2 group-data-[state=collapsed]/sidebar:max-w-0 group-data-[state=collapsed]/sidebar:opacity-0 group-data-[state=collapsed]/sidebar:ml-0 overflow-hidden whitespace-nowrap"
                      >
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
  );
} 