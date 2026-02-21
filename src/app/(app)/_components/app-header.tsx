"use client"

import { usePathname } from "next/navigation"
import { Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const routeLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/users":     "Usuários",
  "/reports":   "Relatórios",
  "/settings":  "Ajustes",
}

export function AppHeader() {
  const pathname = usePathname()
  const title = routeLabels[pathname] ?? "Página"

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background px-6">
      <h1 className="text-sm font-semibold flex-1">{title}</h1>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
          <Bell className="size-4" />
          <span className="absolute top-1 right-1 size-1.5 rounded-full bg-destructive" />
          <span className="sr-only">Notificações</span>
        </button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-md p-1 hover:bg-accent transition-colors">
              <Avatar className="size-7">
                <AvatarImage src="" alt="Usuário" />
                <AvatarFallback className="text-xs">U</AvatarFallback>
              </Avatar>
              <span className="hidden sm:block text-sm font-medium">Usuário</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Usuário</span>
                <span className="text-xs text-muted-foreground">usuario@empresa.com</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Ajustes</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
