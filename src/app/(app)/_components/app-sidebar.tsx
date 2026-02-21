"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  PanelLeft,
} from "lucide-react"

const navItems = [
  { label: "Dashboard",  href: "/dashboard",  icon: LayoutDashboard },
  { label: "Usuários",   href: "/users",       icon: Users },
  { label: "Relatórios", href: "/reports",     icon: FileText },
  { label: "Ajustes",    href: "/settings",    icon: Settings },
]

const STORAGE_KEY = "sidebar-collapsed"

export function AppSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) setCollapsed(stored === "true")
  }, [])

  function toggle() {
    setCollapsed((v) => {
      localStorage.setItem(STORAGE_KEY, String(!v))
      return !v
    })
  }

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border bg-sidebar transition-[width] duration-200",
        collapsed ? "w-[60px]" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-border px-3 shrink-0">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-foreground text-background text-sm font-bold">
          S
        </div>
        {!collapsed && (
          <div className="ml-2.5 min-w-0">
            <p className="text-sm font-semibold leading-none truncate">Synnk DS</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">v0.1.0</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Toggle button */}
      <div className="border-t border-border p-2 shrink-0">
        <button
          onClick={toggle}
          className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          title={collapsed ? "Expandir" : "Recolher"}
        >
          <PanelLeft className="size-4 shrink-0" />
          {!collapsed && <span>Recolher</span>}
        </button>
      </div>
    </aside>
  )
}
