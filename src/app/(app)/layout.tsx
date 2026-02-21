"use client"

import { useState, useEffect, type ReactNode } from "react"
import { AppSidebar } from "./_components/app-sidebar"
import { AppHeader } from "./_components/app-header"

const STORAGE_KEY = "sidebar-collapsed"

export default function AppLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) setCollapsed(stored === "true")

    // Sync with sidebar toggle
    const handler = () => {
      const v = localStorage.getItem(STORAGE_KEY)
      if (v !== null) setCollapsed(v === "true")
    }
    window.addEventListener("storage", handler)
    // Poll for same-tab changes
    const interval = setInterval(handler, 100)
    return () => {
      window.removeEventListener("storage", handler)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div
        className="transition-[margin] duration-200"
        style={{ marginLeft: collapsed ? 60 : 240 }}
      >
        <AppHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
