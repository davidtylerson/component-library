import * as React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface Org {
  id: string;
  name: string;
  avatarUrl?: string;
  avatarFallback?: string;
  logo?: React.ComponentType<{ className?: string }>;
}

interface OrgSwitcherProps extends Omit<React.ComponentPropsWithoutRef<typeof Select>, 'value' | 'onValueChange'> {
  organizations: Org[];
  value?: string;
  onValueChange?: (value: string) => void;
  triggerClassName?: string;
  contentClassName?: string;
}

export const OrgSwitcher = React.forwardRef<
  React.ElementRef<typeof Select>,
  OrgSwitcherProps
>(({ organizations, value, onValueChange, triggerClassName, contentClassName, ...props }, ref) => {
  // Default to first org if value is not set
  const selectedValue = value || (organizations.length > 0 ? organizations[0].id : undefined);
  const selectedOrg = organizations.find(org => org.id === selectedValue);

  return (
    <Select value={selectedValue} onValueChange={onValueChange} {...props}>
      <SelectTrigger className={cn("w-[240px] px-2", triggerClassName)}>
        {selectedOrg ? (
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 overflow-hidden rounded-[4px] flex items-center justify-center">
              {selectedOrg.logo ? (
                <selectedOrg.logo className="h-5 w-5 object-contain" />
              ) : (
                <Avatar className="h-5 w-5 object-contain">
                  {selectedOrg.avatarUrl && <AvatarImage src={selectedOrg.avatarUrl} alt={selectedOrg.name} className="h-5 w-5 object-contain" />}
                  <AvatarFallback className="h-5 w-5 object-contain">{selectedOrg.avatarFallback || selectedOrg.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              )}
            </div>
            <span>{selectedOrg.name}</span>
          </div>
        ) : (
          <SelectValue placeholder="Select organization" />
        )}
      </SelectTrigger>
      <SelectContent className={cn("px-0", contentClassName)}>
        <SelectGroup>
          {organizations.map((org) => (
            <SelectItem key={org.id} value={org.id}>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 overflow-hidden rounded-[4px] flex items-center justify-center">
                  {org.logo ? (
                    <org.logo className="h-5 w-5 object-contain" />
                  ) : (
                    <Avatar className="h-5 w-5 object-contain">
                      {org.avatarUrl && <AvatarImage src={org.avatarUrl} alt={org.name} className="h-5 w-5 object-contain" />}
                      <AvatarFallback className="h-5 w-5 object-contain">{org.avatarFallback || org.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <span>{org.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

OrgSwitcher.displayName = "OrgSwitcher"; 