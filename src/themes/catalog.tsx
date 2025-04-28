// src/app/components/catalog.tsx
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardFooter,
  Text
} from "@/components/ui";

// Sample icons
import { 
  ChevronDownIcon, 
  PlusIcon, 
  CheckIcon,
  XMarkIcon 
} from "@heroicons/react/24/outline";

export default function ComponentCatalog() {
  // Component examples with different variants
  const colorOptions: Array<"brand" | "error" | "warning" | "success"> = [
    "brand", "error", "warning", "success"
  ];
  
  const variantOptions: Array<"primary" | "secondary" | "tertiary"> = [
    "primary", "secondary", "tertiary"
  ];
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-display-xl font-bold mb-8">Component Catalog</h1>
      
      <section className="mb-12">
        <h2 className="text-display-md font-semibold mb-6">Buttons</h2>
        <div className="grid grid-cols-4 gap-6">
          {colorOptions.map(color => (
            <Card key={color}>
              <CardHeader>
                <CardTitle>{color.charAt(0).toUpperCase() + color.slice(1)} Buttons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {variantOptions.map(variant => (
                  <div key={`${color}-${variant}`} className="flex items-center gap-2">
                    <Button 
                      color={color} 
                      variant={variant}
                    >
                      {variant}
                    </Button>
                    <Button 
                      color={color} 
                      variant={variant} 
                      leftIcon={<PlusIcon className="w-4 h-4" />}
                    >
                      With Icon
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Add more component examples */}
    </div>
  );
}