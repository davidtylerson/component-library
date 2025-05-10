import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrgSwitcher } from '@/components/ui/org-switcher';
import LogoStateStreet from '@/assets/logos/Logo_State_Street.svg';
import LogoAlta from '@/assets/logos/Logo_Alta.svg';
import LogoGS from '@/assets/logos/Logo_GS.svg';

interface SidebarProps {
  className?: string;
  children?: React.ReactNode;
}

export function Sidebar({ className, children }: SidebarProps) {
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
  ];
  const [currentOrg, setCurrentOrg] = useState(organizations[0].id);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={cn("float-sidebar-root", className)}
      data-state={isCollapsed ? "collapsed" : "expanded"}
    >
      <div className="float-sidebar-header flex flex-col gap-2">
        <OrgSwitcher
          organizations={organizations}
          value={currentOrg}
          onValueChange={setCurrentOrg}
        />
        {!isCollapsed && <h2 className="text-lg font-semibold">Design System</h2>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="float-sidebar-collapse-button"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
      
      <nav className="float-sidebar-content">
        {children}
      </nav>
      
      <div className="float-sidebar-footer">
        {/* Footer content */}
      </div>
    </aside>
  );
}

export function SidebarGroup({ 
  label, 
  children 
}: { 
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="float-sidebar-group">
      <div className="float-sidebar-group-label">{label}</div>
      {children}
    </div>
  );
}

export function SidebarItem({ 
  icon: Icon, 
  children,
  isActive,
  ...props
}: { 
  icon?: React.ElementType;
  children: React.ReactNode;
  isActive?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button 
      className="float-sidebar-menu-button" 
      data-active={isActive}
      {...props}
    >
      {Icon && <Icon className="float-sidebar-menu-button-icon" size={20} />}
      <span className="truncate">{children}</span>
    </button>
  );
}

export function SidebarSeparator() {
  return <div className="float-sidebar-separator" />;
} 