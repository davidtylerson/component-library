'use client';

import { useTheme } from "@/themes/theme-context";
import { Heading } from "@/components/typography/heading";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader,
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from "@/components/ui/sidebar/sidebar";
// import { 
//   DropdownMenu, 
//   DropdownMenuContent, 
//   DropdownMenuItem, 
//   DropdownMenuLabel, 
//   DropdownMenuSeparator, 
//   DropdownMenuTrigger 
// } from "@/components/ui/dropdown-menu";
import { DropdownMenu as FloatDropdownMenu } from "@/components/ui/dropdown-menu";
import { 
  IconHome, IconSearch, IconFileText, IconArrowLeftRight, 
  IconChartBar, IconDatabase, IconTable, 
  IconSelector, IconBuildingSkyscraper,
  IconSettings, IconTrash, IconPlus, IconDownload,
  IconUser, IconInfoCircle, IconArrowRight, IconCheck,
  IconAlertCircle,
  IconRefresh,
  IconCopy,
  IconCalendar,
  IconCreditCard,
  IconChevronDown
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Text } from "@/components/typography/text";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectSeparator, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent
} from "@/components/ui/accordion";
import { 
  Alert, 
  AlertDescription, 
  AlertTitle
} from "@/components/ui/alert";
import { 
  Switch
} from "@/components/ui/switch";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger
} from "@/components/ui/tabs";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger
} from "@/components/ui/tooltip";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger
} from "@/components/ui/popover";
import { 
  HoverCard, 
  HoverCardContent, 
  HoverCardTrigger
} from "@/components/ui/hover-card";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetFooter, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger
} from "@/components/ui/sheet";
import { 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList, 
  CommandShortcut
} from "@/components/ui/command";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { 
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
  ContextMenuCheckboxItem
} from "@/components/ui/context-menu";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { OrgSwitcher } from "@/components/ui/org-switcher";
import LogoStateStreet from "@/assets/logos/Logo_State_Street.svg";
import LogoAlta from "@/assets/logos/Logo_Alta.svg";
import LogoGS from "@/assets/logos/Logo_GS.svg";

export default function ComponentsPage() {
  const { isDark } = useTheme();
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
  const [currentOrg, setCurrentOrg] = React.useState(organizations[0].id);
  const orgIcons: Record<string, React.ElementType> = {
    "Alta Capital": IconBuildingSkyscraper,
    "State Street": IconBuildingSkyscraper,
    "Float": IconBuildingSkyscraper,
  };
  const CurrentOrgIcon = orgIcons[currentOrg] || IconBuildingSkyscraper;

  return (
    <div className="flex flex-row min-h-screen bg-ds-bg-primary">
      <SidebarProvider>
        <Sidebar variant="inset">
          <SidebarHeader>
            <OrgSwitcher
              organizations={organizations}
              value={currentOrg}
              onValueChange={setCurrentOrg}
            />
          </SidebarHeader>

          <SidebarMenu className="float-sidebar-menu">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" className="flex items-center">
                  <IconHome className="float-sidebar-menu-button-icon" />
                  <span className="float-sidebar-menu-button-text">Home</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" className="flex items-center">
                  <IconSearch className="float-sidebar-menu-button-icon" />
                  <span className="float-sidebar-menu-button-text">Search</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
                <a href="#" className="flex items-center">
                  <IconFileText className="float-sidebar-menu-button-icon" />
                  <span className="float-sidebar-menu-button-text">Documents</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" className="flex items-center">
                  <IconArrowLeftRight className="float-sidebar-menu-button-icon" />
                  <span className="float-sidebar-menu-button-text">Trades</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <div className="float-sidebar-section-label">Analytics</div>
          <SidebarMenu className="float-sidebar-menu">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" className="flex items-center">
                  <IconChartBar className="float-sidebar-menu-button-icon" />
                  <span className="float-sidebar-menu-button-text">Insights</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <div className="float-sidebar-section-label">Data</div>
          <SidebarMenu className="float-sidebar-menu">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" className="flex items-center">
                  <IconDatabase className="float-sidebar-menu-button-icon" />
                  <span className="float-sidebar-menu-button-text">Feeds</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" className="flex items-center">
                  <IconTable className="float-sidebar-menu-button-icon" />
                  <span className="float-sidebar-menu-button-text">Data Browser</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </Sidebar>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="container mx-auto">
            <div className="mb-8">
              <Heading level={1} size="lg">Component Library</Heading>
            </div>
            
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
              <Heading level={2} size="sm" className="mb-6">Buttons</Heading>
              
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Updated Button Variants</CardTitle>
                  <CardDescription>Buttons using our semantic color system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Heading level={3} size="xs" className="mb-3">Basic Variants</Heading>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="primary">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="link">Link</Button>
                      <Button variant="destructive">Destructive</Button>
                    </div>
                  </div>

                  <div>
                    <Heading level={3} size="xs" className="mb-3">Icon Only Buttons</Heading>
                    <div className="flex flex-wrap gap-4">
                      <Button iconOnly size="sm" variant="primary" leftIcon={<IconSettings />} />
                      <Button iconOnly size="md" variant="primary" leftIcon={<IconSettings />} />
                      <Button iconOnly size="lg" variant="primary" leftIcon={<IconSettings />} />
                      
                      <Button iconOnly size="md" variant="destructive" leftIcon={<IconTrash />} />
                      <Button iconOnly size="md" variant="outline" leftIcon={<IconPlus />} />
                      <Button iconOnly size="md" variant="secondary" leftIcon={<IconDownload />} />
                      <Button iconOnly size="md" variant="ghost" leftIcon={<IconUser />} />
                      <Button iconOnly size="md" variant="link" leftIcon={<IconInfoCircle />} />
                    </div>
                  </div>

                  <div>
                    <Heading level={3} size="xs" className="mb-3">Buttons with Icons</Heading>
                    <div className="flex flex-wrap gap-4">
                      <Button leftIcon={<IconPlus />} variant="default">Add Item</Button>
                      <Button rightIcon={<IconArrowRight />} variant="primary">Continue</Button>
                      <Button leftIcon={<IconDownload />} rightIcon={<IconCheck />} variant="secondary">Download</Button>
                      <Button leftIcon={<IconTrash />} variant="destructive">Delete</Button>
                    </div>
                  </div>

                  <div>
                    <Heading level={3} size="xs" className="mb-3">Loading States</Heading>
                    <div className="flex flex-wrap gap-4">
                      <Button isLoading variant="default">Loading</Button>
                      <Button isLoading variant="primary">Loading</Button>
                      <Button isLoading variant="destructive">Loading</Button>
                      <Button isLoading iconOnly leftIcon={<IconSettings />} variant="secondary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Inputs</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Input Variations</CardTitle>
                  <CardDescription>Standard text input fields</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Text className="mb-2">Default Input</Text>
                    <Input placeholder="Enter your name" />
                  </div>
                  
                  <div>
                    <Text className="mb-2">Disabled Input</Text>
                    <Input placeholder="This input is disabled" disabled />
                  </div>
                  
                  <div>
                    <Text className="mb-2">With Label</Text>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input type="email" id="email" placeholder="Email address" />
                    </div>
                  </div>
                  
                  <div>
                    <Text className="mb-2">With Icon</Text>
                    <div className="relative">
                      <IconUser className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" stroke={1.5} />
                      <Input placeholder="Username" className="pl-8" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Avatars</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Avatar Variations</CardTitle>
                  <CardDescription>User avatars with images and fallbacks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <Text className="mb-2 text-center">With Image</Text>
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div>
                      <Text className="mb-2 text-center">Fallback</Text>
                      <Avatar>
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div>
                      <Text className="mb-2 text-center">Custom Color</Text>
                      <Avatar className="bg-brand-500 text-white">
                        <AvatarFallback>TD</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Badges</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Badge Variations</CardTitle>
                  <CardDescription>Status indicators with new variants, sizes, and icon support.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Heading level={3} size="xs" className="mb-3">Basic Variants</Heading>
                    <div className="flex flex-wrap gap-3 items-center">
                      <Badge variant="primary">Primary</Badge>
                      <Badge variant="gray">Gray</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                      <Badge variant="outline">Outline</Badge>
                      <Badge variant="ghost">Ghost</Badge>
                    </div>
                  </div>

                  <div>
                    <Heading level={3} size="xs" className="mb-3">Sizes</Heading>
                    <div className="flex flex-wrap gap-3 items-center">
                      <Badge variant="primary" size="sm">Small</Badge>
                      <Badge variant="primary" size="md">Medium</Badge>
                      <Badge variant="primary" size="lg">Large</Badge>
                    </div>
                  </div>

                  <div>
                    <Heading level={3} size="xs" className="mb-3">With Icons</Heading>
                    <div className="flex flex-wrap gap-3 items-center">
                      <Badge variant="primary" leftIcon={<IconPlus size={14}/>} size="sm">Left Icon</Badge>
                      <Badge variant="gray" rightIcon={<IconCheck size={14}/>} size="md">Right Icon</Badge>
                      <Badge variant="destructive" leftIcon={<IconTrash size={16}/>} rightIcon={<IconAlertCircle size={16}/>} size="lg">
                        Error State
                      </Badge>
                      <Badge variant="outline" leftIcon={<IconSettings size={14}/>} size="md">Outline Left</Badge>
                      <Badge variant="ghost" rightIcon={<IconInfoCircle size={14}/>} size="md">Ghost Right</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Checkboxes</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Checkbox States</CardTitle>
                  <CardDescription>Selection controls</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Accept terms and conditions
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="disabled" disabled />
                      <label
                        htmlFor="disabled"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Disabled checkbox
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="checked" defaultChecked />
                      <label
                        htmlFor="checked"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Checked by default
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Radio Groups</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Radio Selection</CardTitle>
                  <CardDescription>Single selection controls</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <label htmlFor="option-one" className="text-sm">Option One</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <label htmlFor="option-two" className="text-sm">Option Two</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-three" id="option-three" disabled />
                      <label htmlFor="option-three" className="text-sm text-muted-foreground">
                        Option Three (disabled)
                      </label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
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
                    <Button dsVariant="secondary">Cancel</Button>
                    <Button dsVariant="primary">Submit</Button>
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
              </div>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Select</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Select Dropdowns</CardTitle>
                  <CardDescription>Selection from a dropdown list, styled with centralized CSS variables.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label htmlFor="select-fruit" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Basic Select</label>
                    <Select>
                      <SelectTrigger id="select-fruit" className="w-[240px]">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Fruits</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                        <SelectSeparator />
                        <SelectGroup>
                          <SelectLabel>Vegetables</SelectLabel>
                          <SelectItem value="broccoli">Broccoli</SelectItem>
                          <SelectItem value="carrot">Carrot</SelectItem>
                          <SelectItem value="spinach" disabled>Spinach (Out of stock)</SelectItem> 
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Org Switcher</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Organization Switcher</CardTitle>
                  <CardDescription>A select component with avatar support for switching between organizations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label htmlFor="org-switcher" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Basic Org Switcher</label>
                    <OrgSwitcher
                      organizations={organizations}
                      value={currentOrg}
                      onValueChange={setCurrentOrg}
                    />
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Dropdown Menu</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Dropdown Menu</CardTitle>
                  <CardDescription>Displays a menu to the user—such as a set of actions or functions—triggered by a button.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <FloatDropdownMenu.Root>
                    <FloatDropdownMenu.Trigger asChild>
                      <Button variant="outline">Open Menu</Button>
                    </FloatDropdownMenu.Trigger>
                    <FloatDropdownMenu.Content className="w-56">
                      <FloatDropdownMenu.Label>My Account</FloatDropdownMenu.Label>
                      <FloatDropdownMenu.Separator />
                      <FloatDropdownMenu.Item>
                        <IconUser className="mr-2 h-4 w-4" size={16} stroke={1.5} />
                        <span>Profile</span>
                      </FloatDropdownMenu.Item>
                      <FloatDropdownMenu.Item>
                        <IconSettings className="mr-2 h-4 w-4" size={16} stroke={1.5} />
                        <span>Settings</span>
                      </FloatDropdownMenu.Item>
                      <FloatDropdownMenu.Item>
                        <IconDownload className="mr-2 h-4 w-4" size={16} stroke={1.5} />
                        <span>Download</span>
                      </FloatDropdownMenu.Item>
                      <FloatDropdownMenu.Separator />
                      <FloatDropdownMenu.Item>
                        <IconTrash className="mr-2 h-4 w-4" size={16} stroke={1.5} />
                        <span>Delete</span>
                      </FloatDropdownMenu.Item>
                    </FloatDropdownMenu.Content>
                  </FloatDropdownMenu.Root>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Dialog</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Dialog</CardTitle>
                  <CardDescription>A modal dialog that interrupts the user with important content.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Text className="text-right">Name</Text>
                          <Input id="name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Text className="text-right">Username</Text>
                          <Input id="username" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Accordion</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Accordion</CardTitle>
                  <CardDescription>A vertically stacked set of interactive headings that each reveal a section of content.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Is it accessible?</AccordionTrigger>
                      <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Is it styled?</AccordionTrigger>
                      <AccordionContent>
                        Yes. It comes with default styles that match the other components' aesthetic.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Is it animated?</AccordionTrigger>
                      <AccordionContent>
                        Yes. It's animated by default, but you can disable it if you prefer.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Alert</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Alert</CardTitle>
                  <CardDescription>Displays a callout for user attention.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <IconInfoCircle className="h-4 w-4" stroke={1.5} />
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>
                      This is an informational alert message.
                    </AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <IconAlertCircle className="h-4 w-4" stroke={1.5} />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      This action cannot be undone.
                    </AlertDescription>
                  </Alert>
                  <Alert variant="warning">
                    <IconAlertCircle className="h-4 w-4" stroke={1.5} />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                      This action may have consequences.
                    </AlertDescription>
                  </Alert>
                  <Alert variant="success">
                    <IconCheck className="h-4 w-4" stroke={1.5} />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>
                      Your action was completed successfully.
                    </AlertDescription>
                  </Alert>
                  <Alert variant="brand">
                    <IconInfoCircle className="h-4 w-4" stroke={1.5} />
                    <AlertTitle>Brand</AlertTitle>
                    <AlertDescription>
                      This is a brand-themed alert message.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Switch</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Switch</CardTitle>
                  <CardDescription>A control that allows the user to toggle between checked and not checked.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" />
                    <label
                      htmlFor="airplane-mode"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Airplane Mode
                    </label>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Tabs</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Tabs</CardTitle>
                  <CardDescription>A set of layered sections of content that display one panel at a time.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="account" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="account">Account</TabsTrigger>
                      <TabsTrigger value="password">Password</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="p-4 border rounded-md mt-2">
                      <Text>Account settings panel</Text>
                    </TabsContent>
                    <TabsContent value="password" className="p-4 border rounded-md mt-2">
                      <Text>Password settings panel</Text>
                    </TabsContent>
                    <TabsContent value="settings" className="p-4 border rounded-md mt-2">
                      <Text>Other settings panel</Text>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Tooltip</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Tooltip</CardTitle>
                  <CardDescription>A popup that displays information related to an element when it receives focus or is hovered over.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">Hover Me</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This is a tooltip</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Toggle</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Toggle</CardTitle>
                  <CardDescription>A two-state button that can be either on or off.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap gap-4">
                    <Toggle aria-label="Toggle default">
                      Default
                    </Toggle>
                    <Toggle aria-label="Toggle outline">
                      Outline
                    </Toggle>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Toggle Group</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Toggle Group</CardTitle>
                  <CardDescription>A set of two-state buttons that can be toggled on or off.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Heading level={3} size="xs" className="mb-3">Default Toggle Group</Heading>
                    <ToggleGroup type="single">
                      <ToggleGroupItem value="left" aria-label="Left aligned">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM2 7.5C2 7.22386 2.22386 7 2.5 7H7.5C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8H2.5C2.22386 8 2 7.77614 2 7.5ZM2 10.5C2 10.2239 2.22386 10 2.5 10H10.5C10.7761 10 11 10.2239 11 10.5C11 10.7761 10.7761 11 10.5 11H2.5C2.22386 11 2 10.7761 2 10.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                      </ToggleGroupItem>
                      <ToggleGroupItem value="center" aria-label="Center aligned">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM3.5 7C3.22386 7 3 7.22386 3 7.5C3 7.77614 3.22386 8 3.5 8H11.5C11.7761 8 12 7.77614 12 7.5C12 7.22386 11.7761 7 11.5 7H3.5ZM3 10.5C3 10.2239 3.22386 10 3.5 10H11.5C11.7761 10 12 10.2239 12 10.5C12 10.7761 11.7761 11 11.5 11H3.5C3.22386 11 3 10.7761 3 10.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                      </ToggleGroupItem>
                      <ToggleGroupItem value="right" aria-label="Right aligned">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM7 7.5C7 7.22386 7.22386 7 7.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H7.5C7.22386 8 7 7.77614 7 7.5ZM4 10.5C4 10.2239 4.22386 10 4.5 10H12.5C12.7761 10 13 10.2239 13 10.5C13 10.7761 12.7761 11 12.5 11H4.5C4.22386 11 4 10.7761 4 10.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Slider</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Slider</CardTitle>
                  <CardDescription>A control that allows users to select a value from a range.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <Text className="mb-3">Default</Text>
                    <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
                  </div>
                  <div>
                    <Text className="mb-3">Range Slider</Text>
                    <Slider defaultValue={[25, 75]} max={100} step={1} className="w-full" />
                  </div>
                  <div>
                    <Text className="mb-3">Disabled</Text>
                    <Slider defaultValue={[50]} max={100} step={1} disabled className="w-full" />
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Popover</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Popover</CardTitle>
                  <CardDescription>Displays rich content in a portal triggered by a button.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Dimensions</h4>
                          <p className="text-sm text-muted-foreground">
                            Set the dimensions for the layer.
                          </p>
                        </div>
                        <div className="grid gap-2">
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Text className="text-right">Width</Text>
                            <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Text className="text-right">Height</Text>
                            <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Hover Card</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Hover Card</CardTitle>
                  <CardDescription>For sighted users to preview content available behind a link.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link">@shadcn</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">@shadcn</h4>
                          <p className="text-sm">
                            Creator of the shadcn/ui component library. Software engineer and designer.
                          </p>
                          <div className="flex items-center pt-2">
                            <IconUser className="mr-2 h-4 w-4 opacity-70" size={16} stroke={1.5} />
                            <span className="text-xs text-muted-foreground">
                              Joined December 2021
                            </span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Sheet</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Sheet</CardTitle>
                  <CardDescription>A modal dialog that slides in from the edge of the screen.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4 justify-center">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Open Right Sheet</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Edit Profile</SheetTitle>
                        <SheetDescription>
                          Make changes to your profile here. Click save when you're done.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Text className="text-right">Name</Text>
                          <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Text className="text-right">Username</Text>
                          <Input id="username" defaultValue="@peduarte" className="col-span-3" />
                        </div>
                      </div>
                      <SheetFooter>
                        <Button type="submit">Save changes</Button>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Command</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Command</CardTitle>
                  <CardDescription>A command palette for quick keyboard-based navigation.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <CommandDialog>
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Suggestions">
                        <CommandItem>
                          <IconCalendar className="mr-2 h-4 w-4" size={16} stroke={1.5} />
                          <span>Calendar</span>
                        </CommandItem>
                        <CommandItem>
                          <IconCreditCard className="mr-2 h-4 w-4" size={16} stroke={1.5} />
                          <span>Billing</span>
                          <CommandShortcut>⌘B</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                          <IconSettings className="mr-2 h-4 w-4" size={16} stroke={1.5} />
                          <span>Settings</span>
                          <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </CommandDialog>
                  <Button
                    onClick={() => document.querySelector<HTMLElement>('[cmdk-input]')?.focus()}
                  >
                    Open Command Menu
                  </Button>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Collapsible</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Collapsible</CardTitle>
                  <CardDescription>An interactive component that expands/collapses content.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Collapsible className="w-full space-y-2">
                    <div className="flex items-center justify-between space-x-4 px-4">
                      <h4 className="text-sm font-semibold">
                        @peduarte starred 3 repositories
                      </h4>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <IconChevronDown className="h-4 w-4" size={16} stroke={1.5} />
                          <span className="sr-only">Toggle</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <div className="rounded-md border px-4 py-2 font-mono text-sm">
                      @radix-ui/primitives
                    </div>
                    <CollapsibleContent className="space-y-2">
                      <div className="rounded-md border px-4 py-2 font-mono text-sm">
                        @shadcn/ui
                      </div>
                      <div className="rounded-md border px-4 py-2 font-mono text-sm">
                        @radix-ui/colors
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <Heading level={2} size="sm" className="mb-4">Context Menu</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Context Menu</CardTitle>
                  <CardDescription>A context menu that appears on right-click.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ContextMenu>
                    <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                      Right click here
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-64">
                      <ContextMenuItem>
                        <IconRefresh className="mr-2 h-4 w-4" size={16} stroke={1.5} />
                        <span>Refresh</span>
                        <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                      </ContextMenuItem>
                      <ContextMenuItem>
                        <IconCopy className="mr-2 h-4 w-4" size={16} stroke={1.5} />
                        <span>Copy</span>
                        <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                      </ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuCheckboxItem checked>
                        <span>Show Bookmarks</span>
                        <ContextMenuShortcut>⌘B</ContextMenuShortcut>
                      </ContextMenuCheckboxItem>
                      <ContextMenuCheckboxItem>
                        <span>Show Full URLs</span>
                      </ContextMenuCheckboxItem>
                      <ContextMenuSeparator />
                      <ContextMenuRadioGroup value="pedro">
                        <ContextMenuLabel inset>People</ContextMenuLabel>
                        <ContextMenuSeparator />
                        <ContextMenuRadioItem value="pedro">
                          Pedro Duarte
                        </ContextMenuRadioItem>
                        <ContextMenuRadioItem value="colm">
                          Colm Tuite
                        </ContextMenuRadioItem>
                      </ContextMenuRadioGroup>
                    </ContextMenuContent>
                  </ContextMenu>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}