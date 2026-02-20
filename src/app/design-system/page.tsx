import Link from "next/link"

const sections = [
  { label: "Colors",      href: "/design-system/colors",      desc: "Paleta primitiva, tokens semânticos light e dark." },
  { label: "Typography",  href: "/design-system/typography",  desc: "Escala tipográfica, famílias de fonte e pesos." },
  { label: "Radius",      href: "/design-system/radius",      desc: "Escala de border-radius com tokens primitivos." },
  { label: "Button",      href: "/design-system/components/button", desc: "6 variantes, 4 tamanhos, tokens de componente." },
  { label: "Rating",      href: "/design-system/components/rating", desc: "Avaliação por estrelas, controlado e read-only." },
]

export default function OverviewPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center rounded-md border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground">
          shadcn/ui · New York · Neutral
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Synnk Design System</h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Tokens, tipografia, componentes e guias para construir interfaces consistentes.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Tokens",       value: "60+" },
          { label: "Componentes",  value: "2"   },
          { label: "Variantes",    value: "9"   },
          { label: "Base",         value: "shadcn/ui" },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-lg border border-border bg-card p-4">
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <hr className="border-border" />

      {/* Sections */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Seções</h2>
        <div className="grid grid-cols-2 gap-3">
          {sections.map(({ label, href, desc }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-lg border border-border bg-card p-5 transition-colors hover:bg-accent"
            >
              <p className="font-semibold group-hover:text-accent-foreground">{label}</p>
              <p className="text-sm text-muted-foreground mt-1">{desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Stack */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Stack</h2>
        <div className="flex flex-wrap gap-2">
          {["Next.js 15", "React 19", "TypeScript", "Tailwind v4", "shadcn/ui", "CVA", "Radix UI", "Lucide"].map((t) => (
            <span key={t} className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-medium">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
