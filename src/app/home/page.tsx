"use client"

import { useEffect, useRef, ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────
   FloatIcon
   ───────────────────────────────────────────────── */
function FloatIcon({
  children,
  className = "",
  style,
  delayMs = 0,
}: {
  children: ReactNode
  className?: string
  style: React.CSSProperties
  delayMs?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const phase = useRef<"hidden" | "entering" | "visible">("hidden")
  const enteredY = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.set(el, { opacity: 0, y: -32 })

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && phase.current === "hidden") {
          phase.current = "entering"
          setTimeout(() => {
            gsap.to(el, {
              opacity: 1, y: 0, duration: 0.75,
              ease: "power3.out",
              onComplete() { phase.current = "visible" },
            })
          }, delayMs)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)

    let raf: number
    const onScroll = () => {
      if (phase.current !== "visible") return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        const centre = rect.top + rect.height / 2
        const progress = Math.max(0, Math.min(1, (vh * 0.65 - centre) / (vh * 0.55)))
        enteredY.current = progress * 72
        gsap.set(el, {
          opacity: Math.max(0, 1 - progress * 1.3),
          y: enteredY.current,
        })
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      obs.disconnect()
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [delayMs])

  return (
    <div
      ref={ref}
      className={`absolute rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────── */
export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const badge   = el.querySelector<HTMLElement>("[data-anim='badge']")
    const title   = el.querySelector<HTMLElement>("[data-anim='title']")
    const desc    = el.querySelector<HTMLElement>("[data-anim='desc']")
    const ctas    = el.querySelector<HTMLElement>("[data-anim='ctas']")

    const items = [badge, title, desc, ctas].filter(Boolean) as HTMLElement[]

    gsap.set(items, { opacity: 0, y: 40 })

    const tl = gsap.timeline({ delay: 0.15 })
    tl.to(badge,  { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 0)
    tl.to(title,  { opacity: 1, y: 0, duration: 0.7,  ease: "power3.out" }, 0.1)
    tl.to(desc,   { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 0.22)
    tl.to(ctas,   { opacity: 1, y: 0, duration: 0.6,  ease: "power3.out" }, 0.32)

    return () => { tl.kill() }
  }, [])

  return (
    <div
      ref={containerRef}
      className="min-h-screen font-sans overflow-x-hidden"
      style={{
        backgroundColor: "#f6f6f6",
        backgroundImage: "radial-gradient(#c8c8c8 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      {/* ── Nav ── */}
      <nav className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#0f172a" }}>
            <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none">
              <rect x="2" y="2" width="7" height="7" rx="1" fill="white" />
              <rect x="11" y="2" width="7" height="7" rx="1" fill="white" />
              <rect x="2" y="11" width="7" height="7" rx="1" fill="white" />
              <path d="M14.5 11v6M11.5 14h6" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-bold text-gray-900">Logoipsum</span>
        </div>

        <div className="hidden md:flex items-center gap-1.5">
          {["Company", "Products", "Services", "Resources", "Industries"].map((item) => (
            <button key={item} className="flex items-center gap-1 px-3.5 py-1.5 text-sm text-gray-600 rounded-full border border-gray-200 bg-white/70 hover:bg-white hover:shadow-sm transition-all">
              {item}
              <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 text-gray-400" fill="none">
                <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>

        <button className="px-5 py-2.5 text-sm font-semibold text-white rounded-full hover:opacity-90 transition-opacity" style={{ backgroundColor: "#2563eb" }}>
          Get In Touch
        </button>
      </nav>

      {/* ── Hero ── */}
      <section className="relative text-center px-6 pt-6 pb-0 overflow-hidden">

        {/* ── LEFT icons ── */}
        <FloatIcon style={{ left: "14%", top: "44px" }}  className="size-14" delayMs={0}>
          <svg viewBox="0 0 100 100" className="w-8 h-8">
            <rect width="100" height="100" rx="22" fill="#000" />
            <path d="M32 22L32 78L50 60L61 82L70 78L59 56L78 56Z" fill="white" />
          </svg>
        </FloatIcon>

        <FloatIcon style={{ left: "10%", top: "178px" }} className="size-12" delayMs={80}>
          <svg viewBox="0 0 100 100" className="w-7 h-7" fill="none">
            <circle cx="50" cy="50" r="8" fill="#61DAFB" />
            <ellipse cx="50" cy="50" rx="46" ry="17" stroke="#61DAFB" strokeWidth="3.5" />
            <ellipse cx="50" cy="50" rx="46" ry="17" stroke="#61DAFB" strokeWidth="3.5" transform="rotate(60 50 50)" />
            <ellipse cx="50" cy="50" rx="46" ry="17" stroke="#61DAFB" strokeWidth="3.5" transform="rotate(120 50 50)" />
          </svg>
        </FloatIcon>

        <FloatIcon style={{ left: "15%", top: "302px" }} className="size-12" delayMs={160}>
          <svg viewBox="0 0 100 60" className="w-8 h-5" fill="none">
            <circle cx="16" cy="30" r="13" stroke="#FF6D5A" strokeWidth="5" />
            <circle cx="84" cy="30" r="13" stroke="#FF6D5A" strokeWidth="5" />
            <line x1="29" y1="30" x2="71" y2="30" stroke="#FF6D5A" strokeWidth="5" />
            <circle cx="50" cy="30" r="8" fill="#FF6D5A" />
          </svg>
        </FloatIcon>

        {/* ── RIGHT icons ── */}
        <FloatIcon style={{ right: "14%", top: "52px" }}  className="size-12" delayMs={40}>
          <svg viewBox="0 0 100 87" className="w-7 h-6">
            <path d="M50 0L100 87H0Z" fill="#000" />
          </svg>
        </FloatIcon>

        <FloatIcon style={{ right: "10%", top: "178px" }} className="size-14" delayMs={120}>
          <svg viewBox="0 0 38 57" className="w-5 h-8">
            <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
            <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83" />
            <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262" />
            <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
            <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
          </svg>
        </FloatIcon>

        <FloatIcon style={{ right: "15%", top: "298px" }} className="size-12" delayMs={200}>
          <svg viewBox="0 0 100 100" className="w-6 h-6">
            <path d="M62 6L18 54H44L37 94 82 42H56Z" fill="#3ECF8E" />
          </svg>
        </FloatIcon>

        {/* ── Content ── */}
        <div data-anim="badge" className="inline-flex">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm mb-8"
            style={{
              background: "linear-gradient(135deg, #f5f0ff 0%, #eff6ff 100%)",
              border: "1px solid #c4b5fd",
              color: "#6d28d9",
            }}
          >
            <span style={{ color: "#8b5cf6" }}>✦</span>
            Trusted by businesses in finance, healthcare, logistics, retail, and beyond.
          </div>
        </div>

        <div data-anim="title">
          <h1
            className="text-[88px] sm:text-[96px] font-black text-gray-950 tracking-tight leading-[1.05] mb-6 mx-auto"
            style={{ maxWidth: "720px" }}
          >
            Automate,
            <br />
            Accelerate &amp;{" "}
            <span style={{ color: "#2563eb", background: "rgba(147,197,253,.35)", borderRadius: "6px", padding: "0 6px 2px" }}>
              Scale
            </span>
          </h1>
        </div>

        <div data-anim="desc">
          <p className="text-gray-500 text-base leading-relaxed mx-auto mb-8" style={{ maxWidth: "420px" }}>
            Unlock the future of work with AI Agents, Workflow Automation, and Smart Data
            Architecture. From startups to enterprises, we help businesses cut costs, save time,
            and grow faster without the tech headaches.
          </p>
        </div>

        <div data-anim="ctas" className="flex items-center justify-center gap-3 mb-10">
          <button className="px-7 py-3 text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity" style={{ backgroundColor: "#2563eb" }}>
            Get Started
          </button>
          <button className="px-7 py-3 bg-white text-gray-700 text-sm font-semibold rounded-full border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
            See How It Works
          </button>
        </div>

      </section>
    </div>
  )
}
