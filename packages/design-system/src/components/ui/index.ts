// src/components/ui/index.ts
// Re-export components that actually exist in your project

// Button component (we've implemented this)
export { Button, buttonVariants } from './button';

// Dropdown menu (simple implementation for now)
export { DropdownMenu } from './dropdown-menu/dropdown-menu';

// Typography components - adjust these paths based on your actual folder structure
export { Heading } from '../typography/heading';
export { Text } from '../typography/text';

// Toggle and ToggleGroup components
export { Toggle } from './toggle';
export { ToggleGroup, ToggleGroupItem } from './toggle-group';

// New components
export { Slider } from './slider';
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from './popover';
export { HoverCard, HoverCardTrigger, HoverCardContent } from './hover-card';
export {
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
} from './sheet';
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from './command';
export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './collapsible';
export {
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
} from './context-menu';

// Card components
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './card';

// Dialog component
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './dialog';

// Input component
export { Input } from './input';

// Comment out components that don't exist yet
// export * from './input/input'; // Uncomment when implemented
// export * from './card/card'; // Uncomment when implemented
// export * from './dialog/dialog'; // Uncomment when implemented
