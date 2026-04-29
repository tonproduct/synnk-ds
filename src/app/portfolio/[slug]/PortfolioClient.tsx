"use client"

import { useEffect, useRef } from "react"
import { ArrowLeft } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

type PortfolioData = {
  name: string
  projectType: string
  accent: string
  bg: string
  tags: string[]
  clientQuote: string
  clientName: string
  clientRole: string
  overview: string
  industry: string
  year: string
  location: string
  siteUrl: string
  siteThumb: string | null
  dsUrl: string | null
  dsThumb: string | null
  pdfUrl: string | null
  pdfThumb: string | null
}

gsap.registerPlugin(ScrollTrigger)

function revealOnScroll(targets: Element | Element[] | NodeListOf<Element>, options?: { y?: number; blur?: number; stagger?: number; start?: string }) {
  const y     = options?.y     ?? 40
  const blur  = options?.blur  ?? 10
  const start = options?.start ?? "top 88%"

  gsap.set(targets, { opacity: 0, y, filter: `blur(${blur}px)` })

  gsap.to(targets, {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.7,
    ease: "power3.out",
    stagger: options?.stagger ?? 0,
    scrollTrigger: {
      trigger: (targets instanceof NodeList ? targets[0] : targets) as Element,
      start,
      once: true,
    },
  })
}

export default function PortfolioClient({ p }: { p: PortfolioData }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const topBar = el.querySelector<HTMLElement>("[data-anim='topbar']")
    const label  = el.querySelector<HTMLElement>("[data-anim='label']")
    const title  = el.querySelector<HTMLElement>("[data-anim='title']")
    const quote  = el.querySelector<HTMLElement>("[data-anim='quote']")
    const meta   = el.querySelector<HTMLElement>("[data-anim='meta']")
    const tags   = el.querySelectorAll<HTMLElement>("[data-anim='tag']")
    const cards  = el.querySelectorAll<HTMLElement>("[data-anim='card']")

    if (topBar) revealOnScroll(topBar, { y: 20, blur: 6, start: "top 95%" })
    if (label)  revealOnScroll(label,  { y: 24, start: "top 92%" })
    if (title)  revealOnScroll(title,  { y: 48, blur: 14, start: "top 92%" })
    if (quote)  revealOnScroll(quote,  { y: 36 })
    if (meta)   revealOnScroll(meta,   { y: 36 })
    if (tags.length)  revealOnScroll(tags,  { y: 20, blur: 8, stagger: 0.05 })
    if (cards.length) revealOnScroll(cards, { y: 48, blur: 12, stagger: 0.1 })

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  return (
    <div
      ref={containerRef}
      className="min-h-screen font-sans antialiased"
      style={{ background: p.bg, color: "#fff" }}
    >
      {/* ── Top bar ── */}
      <div
        data-anim="topbar"
        style={{ opacity: 0 }}
        className="grid grid-cols-3 items-center px-6 md:px-12 py-6 border-b border-white/8"
      >
        <a href="/" className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
          <ArrowLeft className="size-4" />
          Voltar
        </a>
        <div className="flex justify-center">
          <a href="/" className="opacity-70 hover:opacity-100 transition-opacity">
            <img src="/logo-synnk.png" alt="SYNNK" className="h-6 w-auto" />
          </a>
        </div>
        <div />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* ── THE OVERVIEW ── */}
        <div className="py-10 md:py-24 border-b border-white/8">
          <p
            data-anim="label"
            style={{ opacity: 0, color: p.accent }}
            className="text-xs font-bold uppercase tracking-[0.22em] mb-4 md:mb-6"
          >
            Projeto
          </p>
          <h1
            data-anim="title"
            style={{ opacity: 0, fontSize: "clamp(40px, 12vw, 140px)", lineHeight: 0.92 }}
            className="font-black leading-none tracking-tight"
          >
            THE
            <br />
            <span style={{ color: p.accent }}>OVERVIEW</span>
          </h1>
        </div>

        {/* ── Quote + Metadata ── */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-20 py-10 md:py-16 border-b border-white/8">
          <div data-anim="quote" style={{ opacity: 0 }} className="flex flex-col justify-between gap-6 md:gap-10">
            <blockquote className="text-lg md:text-2xl font-medium leading-relaxed text-white/80">
              &ldquo;{p.clientQuote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div
                className="size-9 rounded-full shrink-0 flex items-center justify-center text-xs font-bold"
                style={{ background: p.accent + "25", color: p.accent }}
              >
                {p.clientName[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{p.clientName}</p>
                <p className="text-xs text-white/45">{p.clientRole}</p>
              </div>
            </div>
          </div>

          <div data-anim="meta" style={{ opacity: 0 }} className="flex flex-col gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/35 mb-3">Overview</p>
              <div className="flex flex-col gap-3">
                {p.overview.split("\n\n").map((para, i) => (
                  <p key={i} className="text-white/60 text-sm leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["Projeto", p.name],
                ["Indústria", p.industry],
                ["Localização", p.location],
                ["Ano", p.year],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/30 mb-1">{label}</p>
                  <p className="text-sm font-medium text-white/75">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tags ── */}
        <div className="flex flex-wrap gap-2 py-10 border-b border-white/8">
          {p.tags.map((tag) => (
            <span
              key={tag}
              data-anim="tag"
              style={{ opacity: 0, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
              className="text-xs font-medium px-3 py-1.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── Cards de ação ── */}
        <div className={`grid gap-4 py-8 md:py-12 ${(p.dsUrl || p.pdfUrl) ? "md:grid-cols-2" : "md:grid-cols-1 max-w-lg"}`}>

          <a
            data-anim="card"
            style={{ opacity: 0, border: `1px solid ${p.accent}25` }}
            href={p.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl overflow-hidden aspect-[16/9] flex flex-col justify-end p-4 md:p-6 transition-transform hover:scale-[1.02]"
          >
            {p.siteThumb && <img src={p.siteThumb} alt="" className="absolute inset-0 w-full h-full object-cover" />}
            <div className="absolute inset-0" style={{ background: p.siteThumb ? "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.3) 100%)" : `linear-gradient(135deg, ${p.accent}18 0%, ${p.accent}08 100%)` }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `radial-gradient(circle at 30% 50%, ${p.accent}12 0%, transparent 70%)` }} />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: p.accent }}>Site do Projeto</p>
              <p className="text-white font-bold text-lg flex items-center gap-2">Ver o site <span className="transition-transform group-hover:translate-x-1">→</span></p>
            </div>
          </a>

          {p.dsUrl && (
            <a
              data-anim="card"
              style={{ opacity: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
              href={p.dsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden aspect-[16/9] flex flex-col justify-end p-4 md:p-6 transition-transform hover:scale-[1.02]"
            >
              {p.dsThumb && <img src={p.dsThumb} alt="" className="absolute inset-0 w-full h-full object-cover" />}
              <div className="absolute inset-0" style={{ background: p.dsThumb ? "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.3) 100%)" : "rgba(255,255,255,0.04)" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/[0.03]" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40 mb-2">Design System</p>
                <p className="text-white font-bold text-lg flex items-center gap-2">Ver Design System <span className="transition-transform group-hover:translate-x-1">→</span></p>
              </div>
            </a>
          )}

          {p.pdfUrl && (
            <a
              data-anim="card"
              style={{ opacity: 0, border: "1px solid rgba(255,255,255,0.1)" }}
              href={p.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden aspect-[16/9] flex flex-col justify-end p-4 md:p-6 transition-transform hover:scale-[1.02]"
            >
              {p.pdfThumb && <img src={p.pdfThumb} alt="" className="absolute inset-0 w-full h-full object-cover" />}
              <div className="absolute inset-0" style={{ background: p.pdfThumb ? "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.3) 100%)" : "rgba(255,255,255,0.04)" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/[0.03]" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60 mb-2">Documentação do Projeto</p>
                <p className="text-white font-bold text-lg flex items-center gap-2">Ver documentação <span className="transition-transform group-hover:translate-x-1">→</span></p>
              </div>
            </a>
          )}

        </div>
      </div>
    </div>
  )
}
