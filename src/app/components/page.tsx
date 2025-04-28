import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";

export default function ComponentsPage() {
  return (
    <div className="container mx-auto py-12 bg-gray-100">
      <Heading level={1} size="lg" className="mb-8">Component Library</Heading>
      
      <section className="mb-12">
        <Heading level={2} size="sm" className="mb-4">Typography</Heading>
        <div className="space-y-6">
          <div>
            <Heading level={2} size="2xl">Display 2XL</Heading>
            <Heading level={2} size="xl">Display XL</Heading>
            <Heading level={2} size="lg">Display LG</Heading>
            <Heading level={2} size="md">Display MD</Heading>
            <Heading level={2} size="sm">Display SM</Heading>
            <Heading level={2} size="xs">Display XS</Heading>
          </div>
          
          <div>
            <Text size="xl">Text XL</Text>
            <Text size="lg">Text LG</Text>
            <Text size="md">Text MD</Text>
            <Text size="sm">Text SM</Text>
            <Text size="xs">Text XS</Text>
          </div>
          
          <div>
            <Text weight="regular">Regular Text</Text>
            <Text weight="medium">Medium Text</Text>
            <Text weight="semibold">Semibold Text</Text>
            <Text weight="bold">Bold Text</Text>
            <Text italic>Italic Text</Text>
            <Text underline>Underlined Text</Text>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <Heading level={2} size="sm" className="mb-4">Buttons</Heading>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default Button</Button>
            <Button variant="destructive">Destructive Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="link">Link Button</Button>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button size="sm">Small Button</Button>
            <Button>Default Size Button</Button>
            <Button size="lg">Large Button</Button>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button disabled>Disabled Button</Button>
            <Button variant="outline" disabled>Disabled Outline</Button>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <a href="#">Button as Link</a>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <Heading level={2} size="sm" className="mb-4">Cards</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
              <CardDescription>A simple card component with default styling</CardDescription>
            </CardHeader>
            <CardContent>
              <Text>This is the content of the card. It can contain any elements you need.</Text>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Card with Footer</CardTitle>
              <CardDescription>A card with actions in the footer</CardDescription>
            </CardHeader>
            <CardContent>
              <Text>This card demonstrates the use of a footer for actions.</Text>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Submit</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>No Padding</CardTitle>
              <CardDescription>Card with modified padding</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Text>This card has adjusted padding between header and content.</Text>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <img 
              src="https://via.placeholder.com/400x200" 
              alt="Placeholder" 
              className="w-full h-40 object-cover"
            />
            <CardHeader>
              <CardTitle>Card with Image</CardTitle>
              <CardDescription>A card with an image at the top</CardDescription>
            </CardHeader>
            <CardContent>
              <Text>Cards can include images and other media.</Text>
            </CardContent>
          </Card>
          
          <Card className="bg-muted">
            <CardHeader>
              <CardTitle>Alternate Style</CardTitle>
              <CardDescription>A card with alternate styling</CardDescription>
            </CardHeader>
            <CardContent>
              <Text>This card uses a different background color.</Text>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Card with Borders</CardTitle>
              <CardDescription>A card with internal borders</CardDescription>
            </CardHeader>
            <CardContent className="border-b py-4">
              <Text>This section has a border at the bottom.</Text>
            </CardContent>
            <CardFooter className="pt-4">
              <Text className="text-muted-foreground">Footer with top spacing</Text>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}