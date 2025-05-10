'use client';

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { useTheme } from "@/themes/theme-context";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectLabel,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectGroup
} from "@/components/ui/select";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger, PopoverAnchor } from "@/components/ui/popover";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { 
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { 
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from "@/components/ui/context-menu";

// Import icons for demonstration
import { 
  IconArrowRight,
  IconPlus,
  IconCheck,
  IconSettings,
  IconDownload,
  IconTrash,
  IconUser,
  IconDots,
  IconAlertCircle,
  IconInfoCircle,
  IconCalendar,
  IconCreditCard,
  IconChevronDown,
  IconRefresh,
  IconCopy,
  IconChevronRight
} from "@tabler/icons-react";

export default function ComponentsPage() {
  const { isDark } = useTheme();

  return (
    <div className="container mx-auto py-12 bg-ds-bg-primary text-ds-text-primary">
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
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Design System Variants</CardTitle>
            <CardDescription>Buttons using our semantic design system variants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Heading level={3} size="xs" className="mb-3">Brand Color</Heading>
              <div className="flex flex-wrap gap-4">
                <Button dsVariant="primary" color="brand">Primary</Button>
                <Button dsVariant="secondary" color="brand">Secondary</Button>
                <Button dsVariant="tertiary" color="brand">Tertiary</Button>
              </div>
            </div>
            
            <div>
              <Heading level={3} size="xs" className="mb-3">Error Color</Heading>
              <div className="flex flex-wrap gap-4">
                <Button dsVariant="primary" color="error">Primary</Button>
                <Button dsVariant="secondary" color="error">Secondary</Button>
                <Button dsVariant="tertiary" color="error">Tertiary</Button>
              </div>
            </div>
            
            <div>
              <Heading level={3} size="xs" className="mb-3">Warning Color</Heading>
              <div className="flex flex-wrap gap-4">
                <Button dsVariant="primary" color="warning">Primary</Button>
                <Button dsVariant="secondary" color="warning">Secondary</Button>
                <Button dsVariant="tertiary" color="warning">Tertiary</Button>
              </div>
            </div>
            
            <div>
              <Heading level={3} size="xs" className="mb-3">Success Color</Heading>
              <div className="flex flex-wrap gap-4">
                <Button dsVariant="primary" color="success">Primary</Button>
                <Button dsVariant="secondary" color="success">Secondary</Button>
                <Button dsVariant="tertiary" color="success">Tertiary</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Button Sizes</CardTitle>
            <CardDescription>Size variations for buttons</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div>
                <Heading level={3} size="xs" className="mb-3">Text Buttons</Heading>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm" dsVariant="primary">Small</Button>
                  <Button size="md" dsVariant="primary">Medium</Button>
                  <Button size="lg" dsVariant="primary">Large</Button>
                </div>
              </div>
              
              <div>
                <Heading level={3} size="xs" className="mb-3">Icon-only Buttons</Heading>
                <div className="flex flex-wrap items-center gap-4">
                  <Button iconOnly size="sm" dsVariant="primary" aria-label="Small Icon"><IconSettings /></Button>
                  <Button iconOnly size="md" dsVariant="primary" aria-label="Medium Icon"><IconSettings /></Button>
                  <Button iconOnly size="lg" dsVariant="primary" aria-label="Large Icon"><IconSettings /></Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Buttons with Icons</CardTitle>
            <CardDescription>Examples of buttons with left and right icons</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Heading level={3} size="xs" className="mb-3">Left Icons</Heading>
              <div className="flex flex-wrap gap-4">
                <Button dsVariant="primary" leftIcon={<IconPlus />}>Add Item</Button>
                <Button dsVariant="secondary" leftIcon={<IconDownload />}>Download</Button>
                <Button dsVariant="tertiary" leftIcon={<IconSettings />}>Settings</Button>
              </div>
            </div>
            
            <div>
              <Heading level={3} size="xs" className="mb-3">Right Icons</Heading>
              <div className="flex flex-wrap gap-4">
                <Button dsVariant="primary" rightIcon={<IconArrowRight />}>Continue</Button>
                <Button dsVariant="secondary" rightIcon={<IconCheck />}>Confirm</Button>
                <Button dsVariant="tertiary" rightIcon={<IconTrash />}>Delete</Button>
              </div>
            </div>
            
            <div>
              <Heading level={3} size="xs" className="mb-3">Both Sides</Heading>
              <div className="flex flex-wrap gap-4">
                <Button 
                  dsVariant="primary" 
                  leftIcon={<IconDownload />}
                  rightIcon={<IconArrowRight />}
                >
                  Download and Proceed
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Button States</CardTitle>
            <CardDescription>Buttons in various states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Heading level={3} size="xs" className="mb-3">Loading State</Heading>
              <div className="flex flex-wrap gap-4">
                <Button dsVariant="primary" isLoading>Loading</Button>
                <Button dsVariant="secondary" isLoading>Loading</Button>
                <Button dsVariant="tertiary" isLoading>Loading</Button>
              </div>
            </div>
            
            <div>
              <Heading level={3} size="xs" className="mb-3">Disabled State</Heading>
              <div className="flex flex-wrap gap-4">
                <Button dsVariant="primary" disabled>Disabled</Button>
                <Button dsVariant="secondary" disabled>Disabled</Button>
                <Button dsVariant="tertiary" disabled>Disabled</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Other Features</CardTitle>
            <CardDescription>Additional button functionality</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Heading level={3} size="xs" className="mb-3">asChild Prop</Heading>
                <div className="flex flex-wrap gap-4">
                  <Button asChild dsVariant="primary">
                    <a href="#">
                      Button as Link
                      <IconArrowRight className="ml-2" />
                    </a>
                  </Button>
                </div>
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
            
            <div>
              <Heading level={3} size="xs" className="mb-3">Icon Only</Heading>
              <div className="flex flex-wrap gap-3 items-center">
                <Badge variant="primary" iconOnly leftIcon={<IconUser size={14}/>} size="sm" aria-label="User profile" />
                <Badge variant="gray" iconOnly leftIcon={<IconSettings size={16}/>} size="md" aria-label="Settings" />
                <Badge variant="destructive" iconOnly leftIcon={<IconTrash size={18}/>} size="lg" aria-label="Delete item" />
                <Badge variant="outline" iconOnly leftIcon={<IconPlus size={16}/>} size="md" aria-label="Add new item" />
                <Badge variant="ghost" iconOnly leftIcon={<IconDots size={16}/>} size="md" aria-label="More options" />
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
            
            <div>
              <label htmlFor="select-disabled" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Disabled Select</label>
              <Select disabled>
                <SelectTrigger id="select-disabled" className="w-[240px]">
                  <SelectValue placeholder="Cannot select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option">Option</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="select-country" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Select with more items (scroll)</label>
              <Select>
                <SelectTrigger id="select-country" className="w-[240px]">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usa">United States</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="mexico">Mexico</SelectItem>
                  <SelectItem value="brazil">Brazil</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="france">France</SelectItem>
                  <SelectItem value="japan">Japan</SelectItem>
                  <SelectItem value="australia">Australia</SelectItem>
                  <SelectItem value="india">India</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <Heading level={2} size="sm" className="mb-4">Dropdown Menu</Heading>
        <Card>
          <CardHeader>
            <CardTitle>Dropdown Menus</CardTitle>
            <CardDescription>Context menus and dropdowns using centralized CSS variables.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-6 justify-center items-start">
            
            {/* Standard Dropdown Example */}
            <div>
              <Text size="sm" weight="medium" className="mb-2 text-center block">Standard & Themed</Text>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button variant="outline">Open Menu</Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className="w-60">
                  <DropdownMenu.Label>My Account</DropdownMenu.Label>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Group>
                    <DropdownMenu.Item leftIcon={<IconUser size={16} />}>
                      Profile
                      <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item leftIcon={<IconCreditCard size={16} />}>
                      Billing
                      <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item leftIcon={<IconSettings size={16} />}>
                      Settings
                      <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item color="brand" leftIcon={<IconInfoCircle size={16}/>}>
                      Brand Themed Item
                      <DropdownMenu.Shortcut>⌘I</DropdownMenu.Shortcut>
                    </DropdownMenu.Item>
                  </DropdownMenu.Group>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item leftIcon={<IconPlus size={16} />}>
                    New Item
                  </DropdownMenu.Item>
                  <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger>
                      <span>More Actions</span>
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.SubContent>
                        <DropdownMenu.Item>Sub Action 1</DropdownMenu.Item>
                        <DropdownMenu.Item disabled>Sub Action 2 (Disabled)</DropdownMenu.Item>
                        <DropdownMenu.Sub>
                            <DropdownMenu.SubTrigger>Even More...</DropdownMenu.SubTrigger>
                            <DropdownMenu.Portal>
                                <DropdownMenu.SubContent>
                                    <DropdownMenu.Item>Deep Sub Action</DropdownMenu.Item>
                                </DropdownMenu.SubContent>
                            </DropdownMenu.Portal>
                        </DropdownMenu.Sub>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Sub>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item color="error" leftIcon={<IconTrash size={16} />}>
                    Delete Account
                    <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item color="warning" leftIcon={<IconAlertCircle size={16} />}>
                    Warning Item
                  </DropdownMenu.Item>
                  <DropdownMenu.Item color="success" leftIcon={<IconCheck size={16} />}>
                    Success Item
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>

            {/* Checkbox and Radio Items Example */}
            <div>
              <Text size="sm" weight="medium" className="mb-2 text-center block">Selection Items</Text>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button variant="secondary">View Options</Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className="w-56">
                  <DropdownMenu.Label>Panel Settings</DropdownMenu.Label>
                  <DropdownMenu.Separator />
                  <DropdownMenu.CheckboxItem checked>
                    Show Panel
                    <DropdownMenu.Shortcut>⌘P</DropdownMenu.Shortcut>
                  </DropdownMenu.CheckboxItem>
                  <DropdownMenu.CheckboxItem>
                    Full Width
                  </DropdownMenu.CheckboxItem>
                  <DropdownMenu.CheckboxItem disabled>
                    Auto-Refresh (Disabled)
                  </DropdownMenu.CheckboxItem>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Label>Sort By</DropdownMenu.Label>
                  <DropdownMenu.RadioGroup value="name">
                    <DropdownMenu.RadioItem value="name">Name</DropdownMenu.RadioItem>
                    <DropdownMenu.RadioItem value="date">Date Modified</DropdownMenu.RadioItem>
                    <DropdownMenu.RadioItem value="size" disabled>Size (Soon)</DropdownMenu.RadioItem>
                  </DropdownMenu.RadioGroup>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
            
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

      {/* Accordion Component */}
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

      {/* Alert Component */}
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
          </CardContent>
        </Card>
      </section>

      {/* Dialog Component */}
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

      {/* Switch Component */}
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

      {/* Tabs Component */}
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

      {/* Tooltip Component */}
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

      {/* Toggle Component */}
      <section className="mb-12">
        <Heading level={2} size="sm" className="mb-4">Toggle</Heading>
        <Card>
          <CardHeader>
            <CardTitle>Toggle</CardTitle>
            <CardDescription>A two-state button that can be either on or off.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Toggle variant="default" aria-label="Toggle default">
                Default
              </Toggle>
              <Toggle variant="outline" aria-label="Toggle outline">
                Outline
              </Toggle>
            </div>
            <div className="flex flex-wrap gap-4">
              <Toggle variant="default" size="sm" aria-label="Toggle small">
                Small
              </Toggle>
              <Toggle variant="default" size="default" aria-label="Toggle default size">
                Default
              </Toggle>
              <Toggle variant="default" size="lg" aria-label="Toggle large">
                Large
              </Toggle>
            </div>
            <div className="flex flex-wrap gap-4">
              <Toggle variant="default" aria-pressed="true" aria-label="Toggle on">
                On
              </Toggle>
              <Toggle variant="default" aria-pressed="false" aria-label="Toggle off">
                Off
              </Toggle>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Toggle Group Component */}
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
              <ToggleGroup type="single" defaultValue="center">
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
            
            <div>
              <Heading level={3} size="xs" className="mb-3">Outline Toggle Group</Heading>
              <ToggleGroup type="multiple" variant="outline">
                <ToggleGroupItem value="bold" aria-label="Bold">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.10505 12C4.70805 12 4.4236 11.912 4.25171 11.736C4.0839 11.5559 4 11.2715 4 10.8827V4.11733C4 3.72033 4.08595 3.43588 4.25784 3.26398C4.43383 3.08799 4.71623 3 5.10505 3H8.11841C9.05172 3 9.77883 3.21789 10.2997 3.65367C10.8247 4.08536 11.0872 4.67337 11.0872 5.4177C11.0872 5.8839 10.9602 6.29259 10.7064 6.64379C10.4526 6.99089 10.1139 7.23456 9.69018 7.37479C10.209 7.49464 10.6475 7.75359 11.0057 8.15163C11.3639 8.54968 11.5429 9.05472 11.5429 9.66676C11.5429 10.4969 11.2598 11.1493 10.6935 11.624C10.1273 12.0946 9.33648 12.3299 8.32106 12.3299H5.10505V12ZM7.76272 7.25089C8.21588 7.25089 8.56091 7.13513 8.79784 6.90361C9.03476 6.668 9.15322 6.33812 9.15322 5.91396C9.15322 5.50603 9.03476 5.19237 8.79784 4.98303C8.56091 4.7696 8.22201 4.66288 7.78112 4.66288H5.98336V7.25089H7.76272ZM8.06444 10.6671C8.56703 10.6671 8.94147 10.5411 9.18779 10.289C9.4341 10.037 9.55726 9.68999 9.55726 9.24837C9.55726 8.81894 9.42183 8.48497 9.15099 8.24648C8.88425 8.0039 8.498 7.88261 7.99224 7.88261H5.98336V10.6671H8.06444Z" fill="currentColor"></path></svg>
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Italic">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.67494 3.50017C5.67494 3.25164 5.87641 3.05017 6.12494 3.05017H10.6249C10.8735 3.05017 11.0749 3.25164 11.0749 3.50017C11.0749 3.7487 10.8735 3.95017 10.6249 3.95017H9.00587L7.2309 11.05H8.87493C9.12345 11.05 9.32493 11.2515 9.32493 11.5C9.32493 11.7486 9.12345 11.95 8.87493 11.95H4.37493C4.1264 11.95 3.92493 11.7486 3.92493 11.5C3.92493 11.2515 4.1264 11.05 4.37493 11.05H5.99397L7.76894 3.95017H6.12494C5.87641 3.95017 5.67494 3.7487 5.67494 3.50017Z" fill="currentColor"></path></svg>
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Underline">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.00001 2.75C5.00001 2.47386 4.77615 2.25 4.50001 2.25C4.22387 2.25 4.00001 2.47386 4.00001 2.75V8.05C4.00001 10.1167 5.7333 11.75 7.80001 11.75C9.8667 11.75 11.6 10.1167 11.6 8.05V2.75C11.6 2.47386 11.3762 2.25 11.1 2.25C10.8239 2.25 10.6 2.47386 10.6 2.75V8.05C10.6 9.5667 9.31671 10.75 7.80001 10.75C6.2833 10.75 5.00001 9.5667 5.00001 8.05V2.75ZM3.49998 13.1C3.27906 13.1 3.09998 13.2791 3.09998 13.5C3.09998 13.7209 3.27906 13.9 3.49998 13.9H12.1C12.3209 13.9 12.5 13.7209 12.5 13.5C12.5 13.2791 12.3209 13.1 12.1 13.1H3.49998Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            <div>
              <Heading level={3} size="xs" className="mb-3">Sizes</Heading>
              <div className="space-y-2">
                <ToggleGroup type="single" size="sm">
                  <ToggleGroupItem value="1" aria-label="Option 1">Option 1</ToggleGroupItem>
                  <ToggleGroupItem value="2" aria-label="Option 2">Option 2</ToggleGroupItem>
                  <ToggleGroupItem value="3" aria-label="Option 3">Option 3</ToggleGroupItem>
                </ToggleGroup>
                <ToggleGroup type="single" size="default">
                  <ToggleGroupItem value="1" aria-label="Option 1">Option 1</ToggleGroupItem>
                  <ToggleGroupItem value="2" aria-label="Option 2">Option 2</ToggleGroupItem>
                  <ToggleGroupItem value="3" aria-label="Option 3">Option 3</ToggleGroupItem>
                </ToggleGroup>
                <ToggleGroup type="single" size="lg">
                  <ToggleGroupItem value="1" aria-label="Option 1">Option 1</ToggleGroupItem>
                  <ToggleGroupItem value="2" aria-label="Option 2">Option 2</ToggleGroupItem>
                  <ToggleGroupItem value="3" aria-label="Option 3">Option 3</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Slider Component */}
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

      {/* Popover Component */}
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

      {/* Hover Card Component */}
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

      {/* Sheet Component */}
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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open Top Sheet</Button>
              </SheetTrigger>
              <SheetContent side="top">
                <SheetHeader>
                  <SheetTitle>Top Sheet</SheetTitle>
                  <SheetDescription>
                    This sheet slides in from the top of the screen.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open Left Sheet</Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Left Sheet</SheetTitle>
                  <SheetDescription>
                    This sheet slides in from the left side of the screen.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open Bottom Sheet</Button>
              </SheetTrigger>
              <SheetContent side="bottom">
                <SheetHeader>
                  <SheetTitle>Bottom Sheet</SheetTitle>
                  <SheetDescription>
                    This sheet slides in from the bottom of the screen.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </CardContent>
        </Card>
      </section>

      {/* Command Component */}
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

      {/* Collapsible Component */}
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

      {/* Context Menu Component */}
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
  );
}