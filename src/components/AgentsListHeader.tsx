"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { PlusIcon } from 'lucide-react'
import NewAgentDialog from './newAgentDialog'

const AgentsListHeader = () => {
  const [isOpen,setISOpen] = useState(false)
  return (
   <>
   <NewAgentDialog open={isOpen} onOpenChange={setISOpen} />
    <div className='p-4 md:px-8 flex flex-col gap-y-4'>

      <div className="flex items-center justify-between">
        <h5 className='text-xl font-medium'>My Agents</h5>

        <Button onClick={() => setISOpen(true)} className='bg-primary text-primary-foreground hover:bg-primary/90'>
          <PlusIcon className='size-4'/>
          New Agent
        </Button>
      </div>
    </div>
   </>
  )
}

export default AgentsListHeader