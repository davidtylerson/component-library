import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";

export default function HomePage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-10 px-4 text-center">
      <Heading level={1} size="xl" className="mb-4">
        Float UI Library
      </Heading>
      <Text size="lg" className="max-w-2xl mb-8 text-muted-foreground">
        A comprehensive React component library built on shadcn/ui, designed for fintech applications
        with a focus on accessibility, customization, and developer experience.
      </Text>
      
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Button 
          asChild 
          dsVariant="primary" 
          size="lg" 
        >
          <Link href="/design-system">
            View Design System 
            <IconArrowRight className="ml-2" size={18} stroke={1.5} />
          </Link>
        </Button>
        
        <Button 
          asChild 
          dsVariant="secondary" 
          size="lg" 
        >
          <Link href="/components">
            Browse Components
            <IconArrowRight className="ml-2" size={18} stroke={1.5} />
          </Link>
        </Button>
        
        <Button 
          asChild 
          dsVariant="tertiary" 
          size="lg"
        >
          <Link href="/buttons">
            Button Showcase
            <IconArrowRight className="ml-2" size={18} stroke={1.5} />
          </Link>
        </Button>
      </div>
    </div>
  );
}