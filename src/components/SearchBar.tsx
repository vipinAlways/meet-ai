"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Github, PanelLeftCloseIcon, PanelLeftIcon } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { CiSearch } from "react-icons/ci";
import DashboarCommand from "./DashboarCommand";


const SearchBar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);


  useEffect(()=>{
    const down =(e:KeyboardEvent) => {
      if(e.key === "k" && (e.metaKey || e.ctrlKey)){
        e.preventDefault()
        setCommandOpen((open) => !open);
       
      }
    }

    document.addEventListener("keydown", down);

    return ()=>document.removeEventListener("keydown", down);
  },[])
  
  return (

    <nav className="bg-background flex items-center justify-between  gap-x-2 border-b px-4 py-3 text-white">
    <div className="flex gap-5 items-center">
      <DashboarCommand open={commandOpen} setOpen={setCommandOpen}/>
      <Button
        className="size-9 text-black"
        variant="outline"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar "
      >
        {state === "collapsed" || isMobile ? (
          <PanelLeftIcon className="size-4" />
        ) : (
          <PanelLeftCloseIcon className="size-4" />
        )}
      </Button>
      <Button
        variant={"outline"}
        size="sm"
        className="flex h-9 w-[240px] justify-start text-muted-foreground hover:text-muted-foreground font-normal bg-background"
        onClick={()=>setCommandOpen(!commandOpen)}
      >
        <CiSearch />
        Search
        <kbd className="ml-auto pointer-events-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground"> <span className="text-xs">&#8984;</span> K</kbd>
      </Button>
    </div>


      <a href="https://github.com/vipinAlways/meet-ai" className="p-1.5 rounded-full border-2 "><Github className="size-5 text-foreground  "/></a>
    </nav>

  );
};

export default SearchBar;
