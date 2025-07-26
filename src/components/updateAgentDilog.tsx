import React from 'react'
import ResponsiveDialog from './ResponsiveDialog'
import AgentForm from './AgentForm';
import type { AgentGetOne } from '~/lib/type';

interface UpdatAgentDialogProps {
    open:boolean;
    onOpenChange: (open: boolean) => void;
    initialValues:AgentGetOne
}
const UpdateAgentDialog = ({onOpenChange,open,initialValues}:UpdatAgentDialogProps) => {
  return (
   <ResponsiveDialog title='Edit Agent' description='Edit agent details'
   open={open} onOpenChange={onOpenChange}>
        <AgentForm onSuccess={()=>onOpenChange(false)} onCancel={()=>onOpenChange(false)} initialValues={initialValues}/>
   </ResponsiveDialog>
  )
}

export default UpdateAgentDialog