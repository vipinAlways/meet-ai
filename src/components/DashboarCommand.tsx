import React, { type Dispatch, type SetStateAction } from 'react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "~/components/ui/command"

interface Props{
    open :boolean;
    setOpen:Dispatch<SetStateAction<boolean>>
}
const DashboarCommand = ({open,setOpen}:Props) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput  placeholder ="Find a meeting or agent"/>
        <CommandList>
            <CommandItem>
                Test
            </CommandItem>
        </CommandList>
    </CommandDialog>
  )
}

export default DashboarCommand