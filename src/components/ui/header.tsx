'use client';

import * as React from "react";
import Link from "next/link";
import { MainNav } from "./nav";
import { ClientThemeToggle } from "../../themes/client-wrapper";
import { cn } from "../../lib/utils";

export function Header({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <header className={cn("border-b", className)}>
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link 
            href="/" 
            className="flex items-center text-lg font-semibold"
          >
            <span className="text-primary mr-2">Float</span>
            <span className="text-foreground">UI</span>
          </Link>
          <MainNav />
        </div>
        <div>
          <ClientThemeToggle />
        </div>
      </div>
    </header>
  );
} 