import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";
import { ChevronsUpDownIcon } from "lucide-react";
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "./ui/command";

interface Props {
  option: Array<{
    id: string;
    value: string;
    children: React.ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value?: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
  
}
const CommandSelect = ({
  onSearch,
  onSelect,
  option,
  className,
    placeholder,
  value,
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedOption = option.find((opp) => opp.value === value);
  const handleOpenChange = (value:boolean)=>{
    onSearch?.("")
    setOpen(value)
  }
  return (
    <>
      <Button
        type="button"
        variant={"outline"}
        className={cn(
          "h-9 justify-between px-2 font-semibold",
          !selectedOption && "text-muted-foreground",
          className,
        )}
        onClick={()=>setOpen(true)}
      >
        <div>{selectedOption?.children ?? placeholder}</div>{" "}
        <ChevronsUpDownIcon />
      </Button>

      <CommandResponsiveDialog open={open} onOpenChange={handleOpenChange} shouoldFilter={!onSearch}>
        <CommandInput
          placeholder="Search..."
          onValueChange={onSearch}
        ></CommandInput>
        <CommandList>
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">No option Found</span>
          </CommandEmpty>

          {option.map((opp) => (
            <CommandItem
              key={opp.id}
              onSelect={() => {
                onSelect(opp.value);
                setOpen(false);
              }}
            >
              {opp.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};

export default CommandSelect;
