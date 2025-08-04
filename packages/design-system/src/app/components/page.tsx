'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  IconAlertTriangle,
  IconCheck,
  IconInfoCircle,
  IconX,
  IconChevronDown,
  IconSettings,
  IconUser,
  IconLogout,
  IconCopy,
  IconShare,
  IconDots,
} from '@tabler/icons-react';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from '@/components/ui/context-menu';

export default function ComponentsPage() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl bg-bg-primary p-8 text-text-primary">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Components</h1>
        <p className="mt-2 text-text-secondary">
          A collection of reusable components built with shadcn/ui and styled
          with our design system.
        </p>
      </div>

      {/* Buttons */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Buttons</h2>
        <div className="grid grid-cols-1 gap-6 rounded-md border border-border-primary p-4 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-medium text-text-secondary">
                Default Buttons
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium text-text-secondary">
                Destructive Buttons
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="destructive">Destructive</Button>
                <Button variant="destructive" size="sm">
                  Small
                </Button>
                <Button variant="destructive" size="lg">
                  Large
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-medium text-text-secondary">
                Button Sizes
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Small</Button>
                <Button size="md">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium text-text-secondary">
                Disabled Buttons
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button disabled>Default</Button>
                <Button variant="secondary" disabled>
                  Secondary
                </Button>
                <Button variant="outline" disabled>
                  Outline
                </Button>
                <Button variant="ghost" disabled>
                  Ghost
                </Button>
                <Button variant="link" disabled>
                  Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Elements */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Form Elements</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Inputs */}
          <Card>
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
              <CardDescription>
                Text input fields with various states
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default">Default Input</Label>
                <Input id="default" placeholder="Enter text..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="disabled">Disabled Input</Label>
                <Input id="disabled" placeholder="Cannot type here" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="with-value">Input with Value</Label>
                <Input id="with-value" defaultValue="This is some text" />
              </div>
            </CardContent>
          </Card>

          {/* Select */}
          <Card>
            <CardHeader>
              <CardTitle>Select</CardTitle>
              <CardDescription>Dropdown selection component</CardDescription>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Checkbox */}
          <Card>
            <CardHeader>
              <CardTitle>Checkbox</CardTitle>
              <CardDescription>Single and group checkboxes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="single" />
                <Label htmlFor="single">Single checkbox</Label>
              </div>
              <div className="space-y-2">
                <Label>Checkbox Group</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="marketing" />
                    <Label htmlFor="marketing">
                      Subscribe to marketing emails
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Radio Group */}
          <Card>
            <CardHeader>
              <CardTitle>Radio Group</CardTitle>
              <CardDescription>Radio button selection group</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="option1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="option1" />
                  <Label htmlFor="option1">Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="option2" />
                  <Label htmlFor="option2">Option 2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option3" id="option3" />
                  <Label htmlFor="option3">Option 3</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Textarea */}
          <Card>
            <CardHeader>
              <CardTitle>Textarea</CardTitle>
              <CardDescription>Multi-line text input</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Type your message here..." />
            </CardContent>
          </Card>

          {/* Switch */}
          <Card>
            <CardHeader>
              <CardTitle>Switch</CardTitle>
              <CardDescription>Toggle switch component</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Progress & Sliders */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Progress & Sliders</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
              <CardDescription>Progress bar component</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={33} />
              <Progress value={66} />
              <Progress value={100} />
            </CardContent>
          </Card>

          {/* Slider */}
          <Card>
            <CardHeader>
              <CardTitle>Slider</CardTitle>
              <CardDescription>Range slider component</CardDescription>
            </CardHeader>
            <CardContent>
              <Slider defaultValue={[50]} max={100} step={1} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Alerts */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Alerts</h2>
        <div className="space-y-4">
          <Alert>
            <IconInfoCircle className="h-4 w-4" />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>
              This is an informational alert with an icon.
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <IconX className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              This is a destructive alert for error messages.
            </AlertDescription>
          </Alert>

          <Alert variant="success">
            <IconCheck className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              This is a success alert for positive feedback.
            </AlertDescription>
          </Alert>

          <Alert variant="warning">
            <IconAlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              This is a warning alert for important notices.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Badges */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Badges</h2>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="gray">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </section>

      {/* Dropdown Menu */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Dropdown Menu</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic Dropdown</CardTitle>
              <CardDescription>Simple dropdown menu with items</CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button variant="outline">
                    Open Menu <IconChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item>
                    <IconUser className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>
                    <IconSettings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item color="error">
                    <IconLogout className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dropdown with Submenu</CardTitle>
              <CardDescription>
                Dropdown menu with nested submenus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button variant="outline">
                    More Actions <IconDots className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item>
                    <IconCopy className="mr-2 h-4 w-4" />
                    Copy
                  </DropdownMenu.Item>
                  <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger>
                      <IconShare className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.SubContent>
                      <DropdownMenu.Item>Email</DropdownMenu.Item>
                      <DropdownMenu.Item>Twitter</DropdownMenu.Item>
                      <DropdownMenu.Item>LinkedIn</DropdownMenu.Item>
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Sub>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Context Menu */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Context Menu</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic Context Menu</CardTitle>
              <CardDescription>Right-click to open the menu</CardDescription>
            </CardHeader>
            <CardContent>
              <ContextMenu>
                <ContextMenuTrigger className="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm">
                  Right click here
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem>
                    <IconCopy className="mr-2 h-4 w-4" />
                    Copy
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <IconShare className="mr-2 h-4 w-4" />
                    Share
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem color="error">
                    <IconLogout className="mr-2 h-4 w-4" />
                    Delete
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Context Menu with Submenu</CardTitle>
              <CardDescription>
                Right-click to open nested menus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContextMenu>
                <ContextMenuTrigger className="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm">
                  Right click here for nested menu
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem>
                    <IconUser className="mr-2 h-4 w-4" />
                    View Profile
                  </ContextMenuItem>
                  <ContextMenuSub>
                    <ContextMenuSubTrigger>
                      <IconSettings className="mr-2 h-4 w-4" />
                      Settings
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent>
                      <ContextMenuItem>Account</ContextMenuItem>
                      <ContextMenuItem>Preferences</ContextMenuItem>
                      <ContextMenuItem>Notifications</ContextMenuItem>
                    </ContextMenuSubContent>
                  </ContextMenuSub>
                </ContextMenuContent>
              </ContextMenu>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tabs */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Tabs</h2>
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john@example.com"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Change password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Manage your application settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="notifications" />
                  <Label htmlFor="notifications">Enable notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="marketing" />
                  <Label htmlFor="marketing">Enable marketing emails</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
