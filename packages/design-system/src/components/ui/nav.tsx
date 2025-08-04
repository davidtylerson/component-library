'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';

interface NavLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  exact?: boolean;
}

export function NavLink({
  href,
  exact = false,
  className,
  children,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = exact
    ? pathname === href
    : pathname.startsWith(href) && (href === '/' ? pathname === '/' : true);

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn('flex items-center space-x-1', className)} {...props}>
      <NavLink href="/" exact>
        Home
      </NavLink>
      <NavLink href="/design-system">Design System</NavLink>
      <NavLink href="/components">Components</NavLink>
      <NavLink href="/buttons">Buttons</NavLink>
    </nav>
  );
}
