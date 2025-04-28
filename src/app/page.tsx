// src/app/page.tsx
import { Button } from "@/components/ui/button/button";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { IconPlus, IconChevronDown, IconBrandGithub, IconCheck } from '@tabler/icons-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm">
        <Heading level={1} size="lg" className="text-center text-brand-700 mb-6">
          Float UI Library
        </Heading>
        
        <section className="mb-12">
          <Heading level={2} size="sm" className="mb-4">Buttons</Heading>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary" color="brand">Primary Button</Button>
            <Button variant="secondary" color="brand">Secondary Button</Button>
            <Button variant="tertiary" color="brand">Tertiary Button</Button>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <Button 
              leftIcon={<IconPlus size={18} />}
              variant="primary"
              color="brand"
            >
              With Left Icon
            </Button>
            
            <Button 
              rightIcon={<IconChevronDown size={18} />}
              variant="secondary"
              color="brand"
            >
              With Right Icon
            </Button>
            
            <Button isLoading variant="primary" color="brand">
              Loading Button
            </Button>
          </div>
        </section>
        
        <section className="mb-12">
          <Heading level={2} size="sm" className="mb-4">Button Colors</Heading>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary" color="brand" leftIcon={<IconCheck size={18} />}>Brand</Button>
            <Button variant="primary" color="error" leftIcon={<IconCheck size={18} />}>Error</Button>
            <Button variant="primary" color="warning" leftIcon={<IconCheck size={18} />}>Warning</Button>
            <Button variant="primary" color="success" leftIcon={<IconCheck size={18} />}>Success</Button>
          </div>
        </section>
        
        <section className="mb-12">
          <Heading level={2} size="sm" className="mb-4">Icon Examples</Heading>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              variant="primary" 
              color="brand" 
              leftIcon={<IconBrandGithub size={18} />}
            >
              GitHub
            </Button>
            <Button 
              variant="secondary" 
              color="brand" 
              leftIcon={<IconPlus size={18} />} 
              rightIcon={<IconChevronDown size={18} />}
            >
              Add Item
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}