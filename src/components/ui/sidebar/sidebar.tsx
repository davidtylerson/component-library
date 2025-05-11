"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react"
import { useMediaQuery } from "@/hooks/use-media-query"

import { cn } from "@/lib/utils"

interface SidebarContextValue {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(
  undefined
)

// Constants that can be customized
const SIDEBAR_WIDTH = "240px"
const SIDEBAR_COLLAPSED_WIDTH = "80px"
const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

interface SidebarProviderProps {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  children,
  style,
  className,
}: SidebarProviderProps) {
  const [open, setOpen] = React.useState(defaultOpen)
  const [openMobile, setOpenMobile] = React.useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const state = open ? "expanded" : "collapsed" as const

  const toggleSidebar = React.useCallback(() => {
    const newOpen = !open
    setOpen(newOpen)
    setOpenProp?.(newOpen)
  }, [open, setOpenProp])

  React.useEffect(() => {
    if (typeof openProp !== "undefined") {
      setOpen(openProp)
    }
  }, [openProp])

  React.useEffect(() => {
    if (isMobile) {
      setOpen(false)
    }
  }, [isMobile])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "[" && e.metaKey) {
      e.preventDefault()
      toggleSidebar()
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const value = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    }),
    [state, open, openMobile, isMobile, toggleSidebar]
  ) as SidebarContextValue

  return (
    <SidebarContext.Provider value={value}>
      <div
        className={cn(
          "float-sidebar relative flex text-[var(--float-sidebar-foreground)]",
          className
        )}
        style={{
          "--float-sidebar-width": SIDEBAR_WIDTH,
          "--float-sidebar-collapsed-width": SIDEBAR_COLLAPSED_WIDTH,
          ...style,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

const sidebarVariants = cva(
  "flex h-screen flex-col transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default:
          "fixed left-0 top-0 z-50 border-r border-[var(--float-sidebar-border)]",
        floating:
          "fixed left-4 top-4 z-50 rounded-lg border border-[var(--float-sidebar-border)] shadow-lg",
        inset: "relative border-r border-[var(--float-sidebar-border)]",
      },
      side: {
        left: "",
        right: "",
      },
      state: {
        expanded: "w-[var(--float-sidebar-width)]",
        collapsed: "w-[var(--float-sidebar-collapsed-width)]",
      },
      collapsible: {
        icon: "",
        offcanvas: "",
        none: "",
      },
    },
    compoundVariants: [
      {
        state: "expanded",
        collapsible: "offcanvas",
        className: "lg:w-[var(--float-sidebar-width)] w-0 sm:w-0 md:w-0",
      },
      {
        state: "collapsed",
        collapsible: "offcanvas",
        className: "w-0 sm:w-0 md:w-0",
      },
      {
        state: "expanded",
        collapsible: "icon",
        className: "w-[var(--float-sidebar-width)]",
      },
      {
        state: "collapsed",
        collapsible: "icon",
        className: "w-[var(--float-sidebar-collapsed-width)]",
      },
      {
        side: "right",
        className: "left-auto right-0",
      },
    ],
    defaultVariants: {
      variant: "default",
      side: "left",
      state: "expanded",
      collapsible: "icon",
    },
  }
)

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "floating" | "inset"
  side?: "left" | "right"
  collapsible?: "icon" | "offcanvas" | "none"
  children?: React.ReactNode
}

function Sidebar({
  variant = "default",
  side = "left",
  collapsible = "icon",
  children,
  className,
  ...props
}: SidebarProps) {
  const { state, openMobile } = useSidebar()

  return (
    <aside
      data-side={side}
      data-collapsible={collapsible}
      data-state={state}
      data-mobile={openMobile ? "open" : "closed"}
      className={cn(
        sidebarVariants({
          variant,
          side,
          state,
          collapsible,
        }),
        "bg-[var(--float-sidebar-bg)]",
        openMobile && "!w-[var(--float-sidebar-width)]",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
}

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <header
      ref={ref}
      className={cn(
        "flex h-[var(--float-sidebar-header-height)] shrink-0 items-center px-2",
        className
      )}
      {...props}
    >
      {children}
    </header>
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex-1 overflow-auto", className)}
      {...props}
    >
      {children}
    </div>
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <footer
      ref={ref}
      className={cn(
        "flex h-[var(--float-sidebar-footer-height)] shrink-0 items-center border-t border-[var(--float-sidebar-border)] px-4",
        className
      )}
      {...props}
    >
      {children}
    </footer>
  )
})
SidebarFooter.displayName = "SidebarFooter"

interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative space-y-2 py-2", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SidebarGroup.displayName = "SidebarGroup"

interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
  asChild?: boolean
}

const SidebarGroupLabel = React.forwardRef<HTMLHeadingElement, SidebarGroupLabelProps>(
  ({ className, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "h3"
    
    return (
      <Comp
        ref={ref}
        className={cn(
          "px-2 text-xs font-medium text-[var(--float-sidebar-foreground)] opacity-70",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
SidebarGroupLabel.displayName = "SidebarGroupLabel"

interface SidebarGroupContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const SidebarGroupContent = React.forwardRef<HTMLDivElement, SidebarGroupContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("mt-2", className)} {...props}>
        {children}
      </div>
    )
  }
)
SidebarGroupContent.displayName = "SidebarGroupContent"

interface SidebarGroupActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const SidebarGroupAction = React.forwardRef<HTMLButtonElement, SidebarGroupActionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "absolute right-2 top-1 flex h-6 w-6 items-center justify-center rounded-md text-[var(--float-sidebar-foreground)] opacity-60 hover:bg-[var(--float-sidebar-accent)] hover:opacity-100",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
SidebarGroupAction.displayName = "SidebarGroupAction"

interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ className, ...props }, ref) => {
    const { state, toggleSidebar } = useSidebar()
    
    return (
      <button
        ref={ref}
        type="button"
        onClick={toggleSidebar}
        className={cn(
          "float-sidebar-trigger",
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--float-sidebar-ring)]",
          "disabled:pointer-events-none disabled:opacity-50",
          "hover:bg-[var(--float-sidebar-item-bg-hover)] hover:text-[var(--float-sidebar-item-fg-hover)]",
          "h-9 w-9",
          className
        )}
        {...props}
      >
        {state === "expanded" ? (
          <IconChevronLeft className="h-4 w-4" />
        ) : (
          <IconChevronRight className="h-4 w-4" />
        )}
        <span className="sr-only">Toggle Sidebar</span>
      </button>
    )
  }
)
SidebarTrigger.displayName = "SidebarTrigger"

// Additional components for sidebar navigation
const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, children, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      className={cn("px-2", className)}
      {...props}
    >
      {children}
    </ul>
  )
})
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, children, ...props }, ref) => {
  return (
    <li
      ref={ref}
      className={cn("relative flex items-center", className)}
      {...props}
    >
      {children}
    </li>
  )
})
SidebarMenuItem.displayName = "SidebarMenuItem"

interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  isActive?: boolean
}

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, children, asChild = false, isActive = false, ...props }, ref) => {
    const { state } = useSidebar()
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        ref={ref}
        data-active={isActive}
        className={cn(
          "group/menu-button peer/menu-button flex w-full items-center gap-2 rounded-md py-2 px-2.5 text-sm font-medium transition-colors",
          "hover:bg-[var(--float-sidebar-item-bg-hover)] hover:text-[var(--text-primary)]",
          isActive && "bg-[var(--float-sidebar-accent)] text-[var(--text-primary)]",
          state === "collapsed" && "justify-center",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("my-2 h-px bg-[var(--float-sidebar-border)]", className)}
      {...props}
    />
  )
})
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { state, openMobile } = useSidebar()
  
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-1 flex-col transition-[margin] duration-300 ease-in-out",
        state === "expanded" && "ml-[var(--float-sidebar-width)]",
        state === "collapsed" && "ml-[var(--float-sidebar-collapsed-width)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
SidebarInset.displayName = "SidebarInset"

// Organization Switcher Component
interface SidebarOrgSwitcherProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string
  description?: string
  icon?: React.ReactNode
}

const SidebarOrgSwitcher = React.forwardRef<HTMLButtonElement, SidebarOrgSwitcherProps>(
  ({ className, name, description, icon, ...props }, ref) => {
    const { state } = useSidebar()

    return (
      <button
        ref={ref}
        className={cn("float-sidebar-org-switcher", className)}
        {...props}
      >
        {icon}
        {state === "expanded" && (
          <div className="float-sidebar-org-switcher-content">
            <div className="float-sidebar-org-switcher-name">{name}</div>
            {description && (
              <div className="float-sidebar-org-switcher-description">{description}</div>
            )}
          </div>
        )}
        {state === "expanded" && <IconChevronRight className="h-4 w-4 opacity-50" />}
      </button>
    )
  }
)

SidebarOrgSwitcher.displayName = "SidebarOrgSwitcher"

export {
  SidebarProvider,
  useSidebar,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarTrigger,
  SidebarInset,
  SidebarOrgSwitcher
} 