import React from 'react'
import { SidebarProvider } from '~/components/ui/sidebar'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <SidebarProvider>{children}</SidebarProvider>
  )
}

export default layout