import {
  type LucideIcon,
  Command,
} from "lucide-react"
import { useState, useEffect } from "react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar"
import { SearchDialog } from "./SearchDialog"

export function NavViews({
  views,
}: {
  views: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const { isMobile } = useSidebar()
  const [isSearchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 's' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setSearchOpen(true) 
      } else if (event.key === 'Escape') {
        setSearchOpen(false) 
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Explore</SidebarGroupLabel>
        <SidebarMenu>
          {views.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <a
                  href={item.url}
                  className="flex items-center justify-between"
                  onClick={(e) => {
                    if (item.name === "Search") {
                      e.preventDefault()
                      setSearchOpen(true)
                    }
                  }}
                >
                  {item.name === "Search" && (
                    <>
                      <item.icon className="mr-2" />
                      <span className="flex-1">{item.name}</span>
                      <div className="flex items-center bg-slate-200 text-black rounded-md p-1 ml-2">
                        <Command className="size-3" />
                        <span className="text-sm mx-1">S</span>
                      </div>
                    </>
                  )}
                  {item.name !== "Search" && (
                    <>
                      <item.icon className="mr-2" />
                      <span className="flex-1">{item.name}</span>
                    </>
                  )}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      <SearchDialog open={isSearchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}