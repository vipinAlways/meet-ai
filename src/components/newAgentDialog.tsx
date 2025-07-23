import React from 'react'
import ResponsiveDialog from './ResponsiveDialog'

interface NewAgentDialogProps {
    open:boolean;
    onOpenChange: (open: boolean) => void;
}
const NewAgentDialog = ({onOpenChange,open}:NewAgentDialogProps) => {
  return (
   <ResponsiveDialog title='New Agent' description='Create a new agent'
   open={open} onOpenChange={onOpenChange}>
        new Agent Form
   </ResponsiveDialog>
  )
}

export default NewAgentDialog