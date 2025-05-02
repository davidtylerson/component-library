'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Button Test Page</h1>
      
      <div className="space-y-4">
        <h2>Regular Button</h2>
        <Button>Regular Button</Button>
        
        <h2>Button with asChild</h2>
        <Button asChild>
          <a href="/">Simple Link</a>
        </Button>
        
        <h2>Link to home</h2>
        <Link href="/">Go home</Link>
      </div>
    </div>
  );
} 