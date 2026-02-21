import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Branding panel */}
      <div className="hidden lg:flex flex-col justify-between bg-foreground text-background p-10">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-md bg-background text-foreground text-sm font-bold">
            S
          </div>
          <span className="font-semibold text-sm">Synnk DS</span>
        </div>

        <div className="space-y-3">
          <blockquote className="text-xl font-medium leading-snug">
            "Um design system consistente acelera cada projeto — do token ao produto."
          </blockquote>
          <p className="text-sm opacity-60">Template · Next.js · Tailwind · shadcn/ui</p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="flex size-8 items-center justify-center rounded-md bg-foreground text-background text-sm font-bold">
              S
            </div>
            <span className="font-semibold text-sm">Synnk DS</span>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
