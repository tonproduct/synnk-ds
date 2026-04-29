"use client"

import { useState, useEffect, useRef, ReactNode } from "react"
import {
  Shield, Smile, Sparkles, Activity, Heart, Scan, CreditCard,
  ArrowRight, CheckCircle2,
  Menu, X, ChevronLeft, ChevronRight,
  Mail, Phone, MapPin, Linkedin, Instagram, Github,
  Quote, Calendar, Clock,
  Star, Users,
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   FadeIn — scroll-reveal com IntersectionObserver
   ───────────────────────────────────────────────────────────── */
function FadeIn({
  children,
  className = "",
  delay = 0,
  from = "bottom",
}: {
  children: ReactNode
  className?: string
  delay?: number
  from?: "bottom" | "left" | "right" | "top"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)

  const transforms: Record<string, string> = {
    bottom: "translateY(32px)",
    top:    "translateY(-32px)",
    left:   "translateX(-32px)",
    right:  "translateX(32px)",
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setV(true), delay); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "none" : transforms[from],
        transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .7s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   AnimatedCounter
   ───────────────────────────────────────────────────────────── */
function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true
          const duration = 1800
          const start = performance.now()
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setCount(Math.round(eased * target))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

/* ─────────────────────────────────────────────────────────────
   Data
   ───────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: Shield,
    title: "Prevenção & Diagnóstico",
    desc: "Exames de rotina, limpeza profissional e radiografias digitais para identificar problemas antes que se tornem dor de cabeça.",
    color: "#0891B2",
  },
  {
    icon: Smile,
    title: "Ortodontia Moderna",
    desc: "Aparelho fixo convencional, autoligado e alinhadores invisíveis. Soluções para todas as idades com acompanhamento mensal.",
    color: "#7C3AED",
  },
  {
    icon: Sparkles,
    title: "Estética do Sorriso",
    desc: "Clareamento dental, lentes de porcelana e facetas. Transformamos seu sorriso mantendo a naturalidade e a saúde do esmalte.",
    color: "#0066FF",
  },
]

const SERVICES = [
  {
    tag: "Implantes Dentários",
    title: "Implantes com tecnologia de ponta",
    desc: "Reposição de dentes perdidos com implantes de titânio de alta precisão. Tratamento planejado em 3D, com protocolo seguro e recuperação confortável.",
    bullets: ["Implante unitário e múltiplo", "Protocolo All-on-4 e All-on-6", "Prótese provisória no mesmo dia"],
    bg: "#040F1C",
    accent: "#00E5FF",
    icon: Activity,
    img: "https://images.unsplash.com/photo-1593022356769-11f762e25ed9?w=640&h=384&fit=crop&q=80",
  },
  {
    tag: "Ortodontia",
    title: "Dentes alinhados, saúde em dia",
    desc: "Tratamento ortodôntico completo com aparelhos de última geração. Do planejamento digital à contenção final, com checkups mensais e suporte contínuo.",
    bullets: ["Aparelho metálico e estético", "Alinhadores Invisalign®", "Planejamento digital 3D"],
    bg: "#0A0514",
    accent: "#A855F7",
    icon: Smile,
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=640&h=384&fit=crop&q=80",
  },
  {
    tag: "Estética Dental",
    title: "Sorriso que transforma vidas",
    desc: "Protocolos estéticos personalizados para cada sorriso. Harmonização facial, facetas de porcelana e clareamento seguro com resultado duradouro.",
    bullets: ["Clareamento LED de consultório", "Lentes e facetas de porcelana", "Harmonização orofacial"],
    bg: "#051409",
    accent: "#22C55E",
    icon: Sparkles,
    img: "https://images.unsplash.com/photo-1495573020741-8a2f372bbec3?w=640&h=384&fit=crop&q=80",
  },
]

const PROJECTS = [
  { tag: "Caso Estético", title: "Transformação com facetas", desc: "Paciente com dentes escurecidos e desgastados. Reabilitação completa com 8 facetas de porcelana ultrafinas — resultado em 2 semanas.", year: "2024" },
  { tag: "Implante", title: "Reabilitação All-on-4", desc: "Paciente edêntulo total recuperou função mastigatória e estética com protocolo All-on-4 em carga imediata.", year: "2024" },
  { tag: "Ortodontia", title: "Alinhadores invisíveis", desc: "Tratamento de 14 meses com Invisalign para correção de apinhamento severo e mordida cruzada posterior.", year: "2023" },
  { tag: "Clareamento", title: "Clareamento e harmonização", desc: "Protocolo de clareamento dental combinado com botox masseter e preenchimento labial para harmonização completa do sorriso.", year: "2023" },
]

const TESTIMONIALS = [
  {
    name: "Fernanda Costa",
    role: "Paciente — Facetas de Porcelana",
    text: "Sempre tive vergonha de sorrir em fotos. Depois das facetas do Dr. Rafael, não consigo parar de sorrir. O atendimento foi incrível do início ao fim — me explicaram cada etapa e eu nunca me senti ansiosa. Resultado simplesmente perfeito.",
    stars: 5,
  },
  {
    name: "Marcos Oliveira",
    role: "Paciente — Implante Dentário",
    text: "Perdi um dente frontal em um acidente e fiquei meses sem conseguir sorrir. O implante foi feito com muito cuidado, sem dor alguma. Hoje ninguém acredita que é um implante — parece dente natural. Recomendo demais essa clínica.",
    stars: 5,
  },
  {
    name: "Juliana Mendes",
    role: "Paciente — Ortodontia",
    text: "Fiz 16 meses de tratamento com alinhadores e foi a melhor decisão. Ninguém percebia que eu estava usando, não tinha restrição de comida e o resultado superou minha expectativa. A equipe é atenciosa e o espaço é muito aconchegante.",
    stars: 5,
  },
]

const ARTICLES = [
  { tag: "Prevenção", title: "Por que a limpeza dental a cada 6 meses pode salvar seu dente", date: "10 Fev 2025", readTime: "5 min" },
  { tag: "Ortodontia", title: "Alinhadores vs. aparelho fixo: qual é o melhor para você?", date: "22 Jan 2025", readTime: "7 min" },
  { tag: "Estética", title: "Clareamento dental: o que é mito e o que é verdade", date: "8 Jan 2025", readTime: "6 min" },
  { tag: "Saúde Bucal", title: "Bruxismo: como o estresse está destruindo seus dentes enquanto você dorme", date: "15 Dez 2024", readTime: "8 min" },
]

const BLOG_PHOTOS = [
  "https://images.unsplash.com/photo-1670250492416-570b5b7343b1?w=640&h=320&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?w=640&h=320&fit=crop&q=80",
  "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=640&h=320&fit=crop&q=80",
  "https://images.unsplash.com/photo-1620775997990-ee3c25938b4c?w=640&h=320&fit=crop&q=80",
]

/* ─────────────────────────────────────────────────────────────
   Case Thumbnails — SVG illustrations por caso clínico
   ───────────────────────────────────────────────────────────── */
function CaseThumb({ idx }: { idx: number }) {
  if (idx === 0) return (
    // Facetas de porcelana — dente antes/depois + sparkles
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 208" fill="none">
      {/* Split background */}
      <rect x={0} y={0} width={200} height={208} fill="rgba(255,255,255,.02)" />
      <rect x={200} y={0} width={200} height={208} fill="rgba(8,145,178,.04)" />
      <line x1={200} y1={0} x2={200} y2={208} stroke="rgba(8,145,178,.2)" strokeWidth={1} strokeDasharray="6 4" />
      {/* "Antes" label */}
      <rect x={20} y={18} width={40} height={14} rx={7} fill="rgba(255,255,255,.08)" />
      <text x={40} y={29} textAnchor="middle" fill="rgba(255,255,255,.3)" fontSize={7} fontFamily="sans-serif">Antes</text>
      {/* "Depois" label */}
      <rect x={340} y={18} width={44} height={14} rx={7} fill="rgba(8,145,178,.2)" stroke="rgba(8,145,178,.4)" strokeWidth={1} />
      <text x={362} y={29} textAnchor="middle" fill="rgba(8,145,178,.9)" fontSize={7} fontFamily="sans-serif">Depois</text>
      {/* Tooth before (grayish) */}
      <path d="M 110 50 C 85 50 72 65 72 90 L 78 148 C 79 158 88 162 96 158 L 102 136 C 104 130 116 130 118 136 L 124 158 C 132 162 141 158 142 148 L 148 90 C 148 65 135 50 110 50 Z"
        fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.2)" strokeWidth={1.5} />
      {/* Tooth after (bright white) */}
      <path d="M 290 50 C 265 50 252 65 252 90 L 258 148 C 259 158 268 162 276 158 L 282 136 C 284 130 296 130 298 136 L 304 158 C 312 162 321 158 322 148 L 328 90 C 328 65 315 50 290 50 Z"
        fill="rgba(255,255,255,.75)" stroke="rgba(8,145,178,.5)" strokeWidth={1.5} />
      <path d="M 263 72 C 272 65 308 65 317 72" stroke="rgba(255,255,255,.6)" strokeWidth={1} fill="none" />
      {/* Sparkles around after tooth */}
      {([[240, 55, 8],[340, 48, 6],[330, 90, 5],[248, 120, 7],[342, 130, 5]] as number[][]).map(([x, y, r], n) => (
        <g key={n}>
          <line x1={x} y1={y - r} x2={x} y2={y + r} stroke="rgba(8,145,178,.7)" strokeWidth={1} />
          <line x1={x - r} y1={y} x2={x + r} y2={y} stroke="rgba(8,145,178,.7)" strokeWidth={1} />
          <line x1={x - r * .7} y1={y - r * .7} x2={x + r * .7} y2={y + r * .7} stroke="rgba(8,145,178,.4)" strokeWidth={1} />
        </g>
      ))}
    </svg>
  )

  if (idx === 1) return (
    // All-on-4 — diagrama de implantes no arco dental
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 208" fill="none">
      {/* Background grid */}
      {Array.from({ length: 6 }, (_, r) => Array.from({ length: 10 }, (_, c) => (
        <rect key={`${r}-${c}`} x={c * 40 + 2} y={r * 34 + 2} width={36} height={30} rx={2}
          fill="rgba(0,229,255,.02)" stroke="rgba(0,229,255,.05)" strokeWidth={.6} />
      )))}
      {/* Arch (jawbone) */}
      <path d="M 60 160 Q 60 80 200 68 Q 340 80 340 160" stroke="rgba(0,229,255,.4)" strokeWidth={3} fill="rgba(0,229,255,.04)" />
      {/* Gum line */}
      <path d="M 75 160 Q 75 100 200 88 Q 325 100 325 160" stroke="rgba(255,255,255,.12)" strokeWidth={1.5} fill="none" strokeDasharray="6 4" />
      {/* 4 Implant posts */}
      {([[120,130],[160,98],[240,98],[280,130]] as number[][]).map(([x,y],n) => (
        <g key={n}>
          {/* Post */}
          <rect x={x - 4} y={y} width={8} height={44} rx={3}
            fill="rgba(0,229,255,.3)" stroke="rgba(0,229,255,.7)" strokeWidth={1} />
          {/* Threads */}
          {[8,16,24,32].map(dy => (
            <line key={dy} x1={x - 4} y1={y + dy} x2={x + 4} y2={y + dy} stroke="rgba(0,229,255,.4)" strokeWidth={.8} />
          ))}
          {/* Crown cap */}
          <ellipse cx={x} cy={y} rx={9} ry={5} fill="rgba(0,229,255,.2)" stroke="rgba(0,229,255,.6)" strokeWidth={1} />
          {/* Number label */}
          <circle cx={x} cy={y - 18} r={9} fill="rgba(0,229,255,.12)" stroke="rgba(0,229,255,.35)" strokeWidth={1} />
          <text x={x} y={y - 14} textAnchor="middle" fill="rgba(0,229,255,.8)" fontSize={8} fontFamily="monospace">{n + 1}</text>
        </g>
      ))}
      {/* Label */}
      <rect x={14} y={168} width={110} height={18} rx={9} fill="rgba(0,229,255,.08)" stroke="rgba(0,229,255,.2)" strokeWidth={1} />
      <text x={69} y={180} textAnchor="middle" fill="rgba(0,229,255,.6)" fontSize={8} fontFamily="sans-serif">Protocolo All-on-4</text>
    </svg>
  )

  if (idx === 2) return (
    // Alinhadores invisíveis — Invisalign U-shape
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 208" fill="none">
      {/* Soft bg glow */}
      <ellipse cx={200} cy={120} rx={160} ry={80} fill="rgba(168,85,247,.06)" />
      {/* Aligner shell — top arch */}
      <path d="M 80 170 Q 80 80 200 64 Q 320 80 320 170"
        fill="rgba(168,85,247,.1)" stroke="rgba(168,85,247,.5)" strokeWidth={2.5} />
      {/* Inner arch (tooth surface) */}
      <path d="M 100 170 Q 100 98 200 84 Q 300 98 300 170"
        fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.2)" strokeWidth={1.5} />
      {/* Teeth bumps along arch */}
      {[
        [115,155],[135,128],[155,112],[175,102],[200,98],[225,102],[245,112],[265,128],[285,155]
      ].map(([x,y],n) => (
        <ellipse key={n} cx={x} cy={y} rx={9} ry={13}
          fill="rgba(255,255,255,.08)" stroke="rgba(168,85,247,.3)" strokeWidth={1} />
      ))}
      {/* Aligner transparency highlight */}
      <path d="M 82 168 Q 82 82 200 66" stroke="rgba(255,255,255,.15)" strokeWidth={1.5} fill="none" />
      {/* Label badge */}
      <rect x={140} y={26} width={120} height={22} rx={11} fill="rgba(168,85,247,.15)" stroke="rgba(168,85,247,.35)" strokeWidth={1} />
      <text x={200} y={41} textAnchor="middle" fill="rgba(168,85,247,.9)" fontSize={9} fontFamily="sans-serif">Alinhadores invisíveis</text>
    </svg>
  )

  if (idx === 3) return (
    // Clareamento e harmonização — split antes/depois + LED whitening lamp
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 208" fill="none">
      {/* Backgrounds */}
      <rect width={400} height={208} fill="#08101C" />
      <rect x={0} y={0} width={200} height={208} fill="rgba(251,191,36,.04)" />
      <rect x={200} y={0} width={200} height={208} fill="rgba(200,240,255,.03)" />
      {/* LED lamp body */}
      <rect x={162} y={12} width={76} height={26} rx={8} fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.15)" strokeWidth={1} />
      <rect x={170} y={17} width={60} height={9} rx={4} fill="rgba(255,255,255,.12)" />
      {[177,189,201,213,225].map((x, n) => (
        <line key={n} x1={x} y1={17} x2={x} y2={26} stroke="rgba(255,255,255,.28)" strokeWidth={.8} />
      ))}
      {/* Light rays */}
      {[-50,-30,-10,10,30,50].map((offset, n) => (
        <line key={n} x1={200 + offset * 0.4} y1={38} x2={200 + offset} y2={72}
          stroke="rgba(255,255,255,.06)" strokeWidth={2.5} />
      ))}
      {/* Divider */}
      <line x1={200} y1={50} x2={200} y2={192} stroke="rgba(255,255,255,.12)" strokeWidth={1} strokeDasharray="5 4" />
      {/* Labels */}
      <rect x={12} y={14} width={44} height={15} rx={7} fill="rgba(251,191,36,.15)" />
      <text x={34} y={26} textAnchor="middle" fill="rgba(251,191,36,.75)" fontSize={8} fontFamily="sans-serif">Antes</text>
      <rect x={344} y={14} width={44} height={15} rx={7} fill="rgba(200,240,255,.12)" />
      <text x={366} y={26} textAnchor="middle" fill="rgba(200,240,255,.85)" fontSize={8} fontFamily="sans-serif">Depois</text>
      {/* Teeth before — yellowish */}
      {[105,121,137,153,169,185].map((x, n) => (
        <rect key={n} x={x - 7} y={76} width={13} height={54} rx={4}
          fill={`rgba(255,${190 - n * 8},${70 - n * 6},.28)`}
          stroke="rgba(251,191,36,.14)" strokeWidth={1} />
      ))}
      {/* Smile curve before */}
      <path d="M 96 145 Q 145 162 194 145" stroke="rgba(251,191,36,.25)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      {/* Teeth after — bright white */}
      {[215,231,247,263,279,295].map((x, n) => (
        <g key={n}>
          <rect x={x - 7} y={76} width={13} height={54} rx={4}
            fill="rgba(255,255,255,.82)" stroke="rgba(200,240,255,.3)" strokeWidth={1} />
          <rect x={x - 4} y={80} width={4} height={14} rx={2} fill="rgba(255,255,255,.45)" />
        </g>
      ))}
      {/* Smile curve after */}
      <path d="M 206 145 Q 255 168 304 145" stroke="rgba(200,240,255,.5)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      {/* Glow under after teeth */}
      <ellipse cx={255} cy={134} rx={58} ry={7} fill="rgba(200,240,255,.06)" />
      {/* Harmony guide lines */}
      <line x1={205} y1={76} x2={385} y2={76} stroke="rgba(200,240,255,.08)" strokeWidth={.7} strokeDasharray="3 3" />
      <line x1={205} y1={130} x2={385} y2={130} stroke="rgba(200,240,255,.08)" strokeWidth={.7} strokeDasharray="3 3" />
      {/* Sparkles after side */}
      {([[222,57,7],[355,68,5],[375,112,6],[330,172,5]] as number[][]).map(([x,y,r],n)=>(
        <g key={n}>
          <line x1={x} y1={y-r} x2={x} y2={y+r} stroke="rgba(200,240,255,.55)" strokeWidth={1} />
          <line x1={x-r} y1={y} x2={x+r} y2={y} stroke="rgba(200,240,255,.55)" strokeWidth={1} />
        </g>
      ))}
    </svg>
  )

  return null
}

/* ─────────────────────────────────────────────────────────────
   Decorative shapes
   ───────────────────────────────────────────────────────────── */
function Dots({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute pointer-events-none z-0 ${className}`}
      style={{
        width: 120,
        height: 120,
        backgroundImage: "radial-gradient(#0891B2 1.5px, transparent 1.5px)",
        backgroundSize: "12px 12px",
        opacity: 0.35,
      }}
    />
  )
}

/* ─────────────────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────────────────── */
export default function DentistaPage() {
  const [scrolled, setScrolled]   = useState(false)
  const [navOpen, setNavOpen]     = useState(false)
  const [activeT, setActiveT]     = useState(0)
  const [email, setEmail]         = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const heroRightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    let raf: number
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        if (heroRightRef.current) {
          heroRightRef.current.style.transform = `translateY(${-window.scrollY * 0.08}px)`
        }
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf) }
  }, [])

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute("href")
      if (!href || href === "#") return
      const target = document.getElementById(href.slice(1))
      if (!target) return
      e.preventDefault()
      target.scrollIntoView({ behavior: "smooth" })
    }
    document.addEventListener("click", handleAnchorClick)
    return () => document.removeEventListener("click", handleAnchorClick)
  }, [])

  const prevT = () => setActiveT((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const nextT = () => setActiveT((p) => (p + 1) % TESTIMONIALS.length)

  return (
    <div className="font-sans text-[#0F172A] overflow-x-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-9px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
      `}</style>

      {/* ══ NAV ══════════════════════════════════════════════════ */}
      <nav
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,.07)" : "none",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#hero" className="font-black text-xl text-[#0F172A]">
            Sorriso<span className="text-[#0891B2]">Já</span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#475569]">
            {[["Sobre", "#sobre"], ["Serviços", "#servicos"], ["Tratamentos", "#projetos"], ["Blog", "#blog"], ["Agendamento", "#contato"]].map(
              ([label, href]) => (
                <a key={label} href={href} className="hover:text-[#0891B2] transition-colors">{label}</a>
              )
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+551132650800" className="text-sm text-[#475569] hover:text-[#0891B2] transition-colors">
              (11) 3265-0800
            </a>
            <a
              href="#contato"
              className="px-5 py-2.5 bg-[#0891B2] hover:bg-[#0670A0] text-white text-sm font-semibold rounded-full transition-colors shadow-sm shadow-cyan-500/20"
            >
              Agendar consulta
            </a>
          </div>

          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden text-[#0F172A]">
            {navOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {navOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-1">
            {[["Sobre", "#sobre"], ["Serviços", "#servicos"], ["Tratamentos", "#projetos"], ["Blog", "#blog"], ["Agendamento", "#contato"]].map(
              ([label, href]) => (
                <a key={label} href={href} onClick={() => setNavOpen(false)}
                  className="block text-[#475569] text-sm py-2.5 border-b border-gray-100 hover:text-[#0891B2]">
                  {label}
                </a>
              )
            )}
            <a href="#contato" className="block text-[#0891B2] font-semibold text-sm pt-3">Agendar consulta →</a>
          </div>
        )}
      </nav>

      {/* ══ HERO ═════════════════════════════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex items-center bg-white overflow-hidden">
        {/* Teal gradient blob */}
        <div className="absolute -top-32 -right-32 size-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(8,145,178,.08) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-20 -left-20 size-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(8,145,178,.06) 0%, transparent 70%)" }} />

        {/* Dots */}
        <Dots className="right-[10%] top-24" />
        <Dots className="left-[6%] bottom-32" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 grid md:grid-cols-2 gap-16 items-center w-full">
          {/* Left — text */}
          <div>
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-6"
                style={{ background: "rgba(255,255,255,.92)", color: "#0891B2", border: "1px solid rgba(8,145,178,.35)", backdropFilter: "blur(4px)" }}>
                <span className="size-1.5 rounded-full bg-[#0891B2] animate-pulse inline-block" />
                Novos horários disponíveis
              </div>
            </FadeIn>

            <FadeIn delay={80}>
              <h1 className="text-4xl md:text-[50px] font-black leading-[1.06] tracking-tight text-[#0F172A] mb-6">
                Seu sorriso em<br />
                <span className="text-[#0891B2]">boas mãos</span> desde<br />
                o primeiro dia
              </h1>
            </FadeIn>

            <FadeIn delay={160}>
              <p className="text-[#475569] text-lg leading-relaxed mb-8 max-w-md">
                Clínica odontológica completa com tecnologia digital de ponta. Do diagnóstico ao resultado final, cuidamos do seu sorriso com atenção, segurança e carinho.
              </p>
            </FadeIn>

            <FadeIn delay={240} className="flex flex-wrap gap-3 mb-10">
              <a href="#contato"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0891B2] hover:bg-[#0670A0] text-white font-semibold text-sm rounded-full transition-all hover:scale-[1.02] shadow-lg shadow-cyan-500/20">
                Agendar consulta
                <ArrowRight className="size-4" />
              </a>
              <a href="#servicos"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white border border-[#E2E8F0] text-[#0F172A] font-semibold text-sm rounded-full hover:border-[#0891B2] hover:text-[#0891B2] transition-all">
                Ver tratamentos
              </a>
            </FadeIn>

            <FadeIn delay={320} className="flex flex-wrap gap-6 text-sm text-[#475569]">
              {["3.000+ pacientes atendidos", "12+ anos de experiência", "Sem dor, sem medo"].map((b) => (
                <div key={b} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#0891B2] shrink-0" />
                  {b}
                </div>
              ))}
            </FadeIn>
          </div>

          {/* Right — decorative image frame */}
          <FadeIn delay={100} from="right" className="relative hidden md:flex items-center justify-center">
            {/* Outer ring */}
            <div ref={heroRightRef} className="relative size-[440px]" style={{ willChange: "transform" }}>
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#0891B2]/20 animate-spin" style={{ animationDuration: "30s" }} />
              <div className="absolute inset-8 rounded-full border border-[#0891B2]/15" />

              {/* Center card */}
              <div className="absolute inset-12 rounded-full overflow-hidden bg-gradient-to-br from-[#0891B2]/10 to-[#7C3AED]/10 flex items-center justify-center border border-[#E2E8F0]">
                <div className="text-center p-8">
                  <div className="text-5xl font-black text-[#0891B2] mb-1">3k<span className="text-2xl">+</span></div>
                  <div className="text-xs font-semibold text-[#475569] uppercase tracking-wider">Pacientes felizes</div>
                  <div className="w-8 h-0.5 bg-[#0891B2] mx-auto my-3" />
                  <div className="text-5xl font-black text-[#7C3AED] mb-1">12<span className="text-2xl">+</span></div>
                  <div className="text-xs font-semibold text-[#475569] uppercase tracking-wider">Anos de experiência</div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg px-4 py-2.5 flex items-center gap-2 border border-[#E2E8F0]"
                style={{ animation: "float 3s ease-in-out infinite" }}>
                <div className="size-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-semibold text-[#0F172A]">Consulta disponível hoje</span>
              </div>

              <div className="absolute -right-4 top-1/3 bg-white rounded-2xl shadow-lg px-3 py-2 border border-[#E2E8F0]"
                style={{ animation: "floatSlow 3.8s ease-in-out 0.6s infinite" }}>
                <div className="text-xs font-bold text-[#0891B2]">Tecnologia 3D</div>
                <div className="text-[10px] text-[#475569]">planejamento digital</div>
              </div>

              <div className="absolute -left-6 bottom-1/3 bg-white rounded-2xl shadow-lg px-3 py-2 border border-[#E2E8F0]"
                style={{ animation: "float 2.9s ease-in-out 1.2s infinite" }}>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="size-2.5 fill-amber-400 text-amber-400" />)}
                </div>
                <div className="text-[10px] text-[#475569]">5 estrelas no Google</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ FEATURES ═════════════════════════════════════════════ */}
      <section className="relative py-12 md:py-24 bg-[#F8FAFC] overflow-hidden">
        <Dots className="right-0 top-0" />

        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-14">
            <p className="text-[#0891B2] text-sm font-semibold uppercase tracking-widest mb-3">Nossas especialidades</p>
            <h2 className="text-4xl font-black text-[#0F172A] tracking-tight max-w-xl mx-auto">
              Cuidado completo para a saúde do seu sorriso
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, color }, i) => (
              <FadeIn key={title} delay={i * 100}>
                <div className="group bg-white rounded-2xl p-8 shadow-sm border border-[#E2E8F0] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-default">
                  <div className="size-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: `${color}15` }}>
                    <Icon className="size-6" style={{ color }} />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-3">{title}</h3>
                  <p className="text-[#475569] text-sm leading-relaxed mb-4">{desc}</p>
                  <button className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
                    style={{ color }}>
                    Saiba mais <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ABOUT ════════════════════════════════════════════════ */}
      <section id="sobre" className="relative py-14 md:py-28 bg-white overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at right, rgba(8,145,178,.04) 0%, transparent 70%)" }} />
        <Dots className="left-[5%] top-1/3" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          {/* Left — visual */}
          <FadeIn from="left" className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-[#E2E8F0]">
              <img
                src="https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=640&fit=crop&q=80"
                alt="Clínica SorrisoJá"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="bg-[#0891B2] rounded-xl p-4 text-white">
                  <div className="text-xs font-semibold mb-2">Planejamento digital 3D</div>
                  <div className="flex gap-2 items-center">
                    {[0,1,2,3,4].map(n => (
                      <svg key={n} viewBox="0 0 20 28" className="h-7 opacity-90" fill="none">
                        <path d="M10 2 C4 2 1 7 1 13 L3 23 C3.5 26 6 27 8 25.5 L9 21 C9.4 19.5 10.6 19.5 11 21 L12 25.5 C14 27 16.5 26 17 23 L19 13 C19 7 16 2 10 2Z"
                          fill={n === 2 ? "rgba(255,255,255,.95)" : "rgba(255,255,255,.55)"}
                          stroke={n === 2 ? "rgba(255,255,255,.6)" : "rgba(255,255,255,.2)"}
                          strokeWidth={.8} />
                      </svg>
                    ))}
                    <span className="text-[10px] opacity-70 ml-1">32 dentes mapeados</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative ring */}
            <div className="absolute -bottom-6 -right-6 size-24 rounded-full border-2 border-dashed border-[#0891B2]/30" />
            <div className="absolute -top-6 -left-6 size-16 rounded-full bg-[#0891B2]/10" />
          </FadeIn>

          {/* Right — text */}
          <div>
            <FadeIn>
              <p className="text-[#0891B2] text-sm font-semibold uppercase tracking-widest mb-4">Sobre a clínica</p>
              <h2 className="text-4xl font-black text-[#0F172A] tracking-tight leading-tight mb-6">
                Odontologia humanizada.<br />Tecnologia a serviço do seu sorriso.
              </h2>
              <p className="text-[#475569] leading-relaxed mb-8">
                A SorrisoJá nasceu com um propósito simples: fazer com que cada paciente saia com um sorriso maior do que o que trouxe. Combinamos tecnologia de ponta com atendimento acolhedor para transformar a experiência odontológica.
              </p>
            </FadeIn>

            <div className="space-y-6">
              {[
                { n: "01", title: "Diagnóstico digital completo", desc: "Radiografia panorâmica, tomografia 3D e escaneamento intraoral para planejamento preciso." },
                { n: "02", title: "Equipe especialista", desc: "Dentistas pós-graduados em cada especialidade, atualizados com as melhores técnicas do mercado." },
                { n: "03", title: "Conforto e transparência", desc: "Ambiente acolhedor, anestesia sem dor e orçamento detalhado antes de qualquer procedimento." },
              ].map(({ n, title, desc }, i) => (
                <FadeIn key={n} delay={i * 100}>
                  <div className="flex gap-5 group">
                    <div className="size-11 rounded-xl bg-[#0891B2]/10 text-[#0891B2] font-black text-sm flex items-center justify-center shrink-0 group-hover:bg-[#0891B2] group-hover:text-white transition-colors">
                      {n}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F172A] mb-1">{title}</h4>
                      <p className="text-[#475569] text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ═══════════════════════════════════════════ */}
      <section className="relative py-10 md:py-20 overflow-hidden" style={{ background: "linear-gradient(135deg, #0891B2 0%, #0E7490 100%)" }}>
        <Dots className="right-20 top-4" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-4xl font-black text-white mb-4">Primeira consulta gratuita para novos pacientes!</h2>
            <p className="text-cyan-100 mb-8 text-lg">
              Venha conhecer a clínica. Avaliação completa sem custo e sem compromisso.
            </p>
            <a href="#contato"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0891B2] font-bold rounded-full hover:bg-cyan-50 transition-all hover:scale-[1.02] shadow-xl text-sm">
              Agendar avaliação gratuita
              <ArrowRight className="size-4" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ══ SERVICES ═════════════════════════════════════════════ */}
      <section id="servicos" className="py-14 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-14">
            <p className="text-[#0891B2] text-sm font-semibold uppercase tracking-widest mb-3">Tratamentos</p>
            <h2 className="text-4xl font-black text-[#0F172A] tracking-tight">Soluções completas para o seu sorriso</h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map(({ tag, title, desc, bullets, bg, accent, icon: Icon, img }, i) => (
              <FadeIn key={title} delay={i * 120}>
                <div className="group rounded-2xl overflow-hidden border border-[#E2E8F0] hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 flex flex-col h-full">
                  {/* Card header */}
                  <div className="relative h-48 flex items-end p-6" style={{ background: bg }}>
                    <img src={img} alt={tag}
                      className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="absolute inset-0"
                      style={{ background: `linear-gradient(to top, ${bg} 10%, ${bg}cc 55%, transparent 100%)` }} />
                    <div className="absolute inset-0 opacity-10"
                      style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.15) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
                    <div className="absolute top-5 right-5 size-12 rounded-2xl flex items-center justify-center"
                      style={{ background: `${accent}20`, border: `1px solid ${accent}30` }}>
                      <Icon className="size-5" style={{ color: accent }} />
                    </div>
                    <span className="relative text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ background: `${accent}20`, color: accent }}>
                      {tag}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="p-6 bg-white flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-[#0F172A] mb-3">{title}</h3>
                    <p className="text-[#475569] text-sm leading-relaxed mb-5">{desc}</p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-[#475569]">
                          <CheckCircle2 className="size-4 text-[#0891B2] shrink-0 mt-0.5" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <a href="#contato"
                      className="flex items-center gap-1.5 text-sm font-semibold text-[#0891B2] hover:gap-2.5 transition-all">
                      Agendar consulta <ArrowRight className="size-3.5" />
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS ════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { target: 3000, suffix: "+", label: "Pacientes atendidos" },
              { target: 12, suffix: "+", label: "Anos de experiência" },
              { target: 8500, suffix: "+", label: "Procedimentos realizados" },
              { target: 98, suffix: "%", label: "Pacientes satisfeitos" },
            ].map(({ target, suffix, label }, i) => (
              <FadeIn key={label} delay={i * 80}>
                <div>
                  <div className="text-4xl font-black text-white mb-1">
                    <Counter target={target} suffix={suffix} />
                  </div>
                  <p className="text-slate-400 text-sm">{label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE ═══════════════════════════════════════════ */}
      <section className="relative py-14 md:py-28 bg-[#F8FAFC] overflow-hidden">
        <Dots className="left-0 bottom-0" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          {/* Left */}
          <div>
            <FadeIn>
              <p className="text-[#0891B2] text-sm font-semibold uppercase tracking-widest mb-4">Por que a SorrisoJá</p>
              <h2 className="text-4xl font-black text-[#0F172A] tracking-tight leading-tight mb-6">
                Uma experiência odontológica sem estresse
              </h2>
              <p className="text-[#475569] leading-relaxed mb-8">
                Sabemos que muitos pacientes têm medo do dentista. Por isso criamos um ambiente pensado para proporcionar conforto, confiança e resultados que vão além das suas expectativas.
              </p>
            </FadeIn>

            <div className="space-y-4">
              {[
                { icon: Heart, title: "Anestesia sem dor", desc: "Técnica anestésica computadorizada que praticamente elimina o desconforto da injeção." },
                { icon: Scan, title: "Tecnologia 3D", desc: "Planejamento digital com tomografia e escaneamento intraoral para resultados previsíveis." },
                { icon: Users, title: "Equipe acolhedora", desc: "Profissionais treinados para atender com empatia pacientes com fobia e ansiedade dental." },
                { icon: CreditCard, title: "Parcelamento facilitado", desc: "Opções de parcelamento em até 18x e convênios para facilitar o acesso ao tratamento." },
              ].map(({ icon: Icon, title, desc }, i) => (
                <FadeIn key={title} delay={i * 80}>
                  <div className="flex gap-4 p-4 bg-white rounded-2xl border border-[#E2E8F0] hover:border-[#0891B2]/30 hover:shadow-md transition-all group">
                    <div className="size-10 rounded-xl bg-[#0891B2]/10 flex items-center justify-center shrink-0 group-hover:bg-[#0891B2] transition-colors">
                      <Icon className="size-4 text-[#0891B2] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-sm mb-0.5">{title}</h4>
                      <p className="text-[#475569] text-xs leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right — image grid */}
          <FadeIn from="right" className="grid grid-cols-2 gap-4">
            {[
              { bg: "from-[#0891B2]/20 to-[#0891B2]/5", label: "Prevenção", icon: Shield },
              { bg: "from-[#7C3AED]/20 to-[#7C3AED]/5", label: "Ortodontia", icon: Smile },
              { bg: "from-[#0066FF]/20 to-[#0066FF]/5", label: "Implantes", icon: Activity },
              { bg: "from-[#0891B2]/10 to-[#7C3AED]/10", label: "Estética", icon: Sparkles },
            ].map(({ bg, label, icon: Icon }, i) => (
              <div key={label}
                className={`aspect-square rounded-2xl bg-gradient-to-br ${bg} border border-[#E2E8F0] flex flex-col items-center justify-center gap-3 hover:scale-[1.03] transition-transform cursor-default ${i === 1 ? "mt-6" : ""}`}>
                <Icon className="size-8 text-[#0891B2]" />
                <span className="text-xs font-semibold text-[#475569]">{label}</span>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ══ CASES ════════════════════════════════════════════════ */}
      <section id="projetos" className="py-14 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <FadeIn>
              <p className="text-[#0891B2] text-sm font-semibold uppercase tracking-widest mb-3">Casos clínicos</p>
              <h2 className="text-4xl font-black text-[#0F172A] tracking-tight">Transformações reais</h2>
            </FadeIn>
            <FadeIn from="right">
              <a href="#contato" className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-[#0891B2] hover:gap-2.5 transition-all">
                Agendar avaliação <ArrowRight className="size-4" />
              </a>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map(({ tag, title, desc, year }, i) => (
              <FadeIn key={title} delay={i * 80}>
                <div className="group rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white cursor-pointer">
                  {/* Image area */}
                  <div className="relative h-52 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
                    <CaseThumb idx={i} />
                    <div className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ background: "rgba(8,145,178,.2)", color: "#67E8F9", border: "1px solid rgba(8,145,178,.3)" }}>
                      {tag}
                    </div>
                    <div className="absolute bottom-4 right-4 size-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#0891B2] group-hover:border-[#0891B2] transition-colors">
                      <ArrowRight className="size-4 -rotate-45" />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-[#0F172A] text-lg mb-2 group-hover:text-[#0891B2] transition-colors">{title}</h3>
                        <p className="text-[#475569] text-sm leading-relaxed">{desc}</p>
                      </div>
                      <span className="text-xs font-semibold text-[#94A3B8] shrink-0">{year}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═════════════════════════════════════════ */}
      <section className="relative py-14 md:py-28 overflow-hidden" style={{ background: "linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)" }}>
        <Dots className="right-10 top-10" />
        <Dots className="left-10 bottom-10" />

        <div className="max-w-4xl mx-auto px-6">
          <FadeIn className="text-center mb-14">
            <p className="text-[#0891B2] text-sm font-semibold uppercase tracking-widest mb-3">Depoimentos</p>
            <h2 className="text-4xl font-black text-[#0F172A] tracking-tight">O que nossos pacientes falam</h2>
          </FadeIn>

          <FadeIn>
            <div className="relative bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-[#E2E8F0]">
              {/* Quote icon */}
              <div className="size-12 rounded-2xl bg-[#0891B2]/10 flex items-center justify-center mb-6">
                <Quote className="size-5 text-[#0891B2]" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(TESTIMONIALS[activeT].stars)].map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-[#475569] text-lg leading-relaxed mb-8 italic">
                &ldquo;{TESTIMONIALS[activeT].text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex size-12 rounded-full bg-gradient-to-br from-[#0891B2] to-[#7C3AED] items-center justify-center text-white font-bold text-lg">
                    {TESTIMONIALS[activeT].name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-[#0F172A]">{TESTIMONIALS[activeT].name}</p>
                    <p className="text-[#475569] text-sm">{TESTIMONIALS[activeT].role}</p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-2">
                  <button onClick={prevT}
                    className="size-10 rounded-full border border-[#E2E8F0] hover:border-[#0891B2] hover:text-[#0891B2] flex items-center justify-center transition-colors">
                    <ChevronLeft className="size-4" />
                  </button>
                  <button onClick={nextT}
                    className="size-10 rounded-full bg-[#0891B2] text-white flex items-center justify-center hover:bg-[#0670A0] transition-colors">
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* Dots indicator */}
              <div className="flex gap-1.5 mt-6">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setActiveT(i)}
                    className="h-1.5 rounded-full transition-all"
                    style={{ width: i === activeT ? 24 : 6, background: i === activeT ? "#0891B2" : "#E2E8F0" }} />
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ BLOG ═════════════════════════════════════════════════ */}
      <section id="blog" className="py-14 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <FadeIn>
              <p className="text-[#0891B2] text-sm font-semibold uppercase tracking-widest mb-3">Blog</p>
              <h2 className="text-4xl font-black text-[#0F172A] tracking-tight">Dicas de saúde bucal</h2>
            </FadeIn>
            <FadeIn from="right">
              <a href="#" className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-[#0891B2] hover:gap-2.5 transition-all">
                Ver todos <ArrowRight className="size-4" />
              </a>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ARTICLES.map(({ tag, title, date, readTime }, i) => (
              <FadeIn key={title} delay={i * 80}>
                <div className="group bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="h-40 relative overflow-hidden">
                    <img
                      src={BLOG_PHOTOS[i]}
                      alt={tag}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full bg-[#0891B2]/25 text-cyan-300 border border-[#0891B2]/40 backdrop-blur-sm">
                      {tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[#0F172A] text-sm leading-snug mb-4 group-hover:text-[#0891B2] transition-colors line-clamp-2">
                      {title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
                      <span className="flex items-center gap-1"><Calendar className="size-3" />{date}</span>
                      <span className="flex items-center gap-1"><Clock className="size-3" />{readTime}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ NEWSLETTER ═══════════════════════════════════════════ */}
      <section className="relative py-10 md:py-20 bg-[#F8FAFC] overflow-hidden">
        <Dots className="right-20 top-4" />
        <Dots className="left-20 bottom-4" />

        <div className="max-w-2xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-[#0891B2] text-sm font-semibold uppercase tracking-widest mb-3">Newsletter</p>
            <h2 className="text-3xl font-black text-[#0F172A] mb-3">Dicas de saúde bucal toda semana</h2>
            <p className="text-[#475569] mb-8">Conteúdo especializado sobre cuidados preventivos, novidades em odontologia e promoções exclusivas da clínica.</p>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 rounded-full px-6 py-3 text-sm font-semibold">
                <CheckCircle2 className="size-4" /> Inscrito! Fique de olho no seu email.
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true) }}
                className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="flex-1 px-4 py-3 rounded-full border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20"
                />
                <button type="submit"
                  className="px-6 py-3 bg-[#0891B2] text-white text-sm font-semibold rounded-full hover:bg-[#0670A0] transition-colors shrink-0">
                  Inscrever
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>

      {/* ══ CONTACT ══════════════════════════════════════════════ */}
      <section id="contato" className="py-14 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-20 items-start">
          <FadeIn from="left">
            <p className="text-[#0891B2] text-sm font-semibold uppercase tracking-widest mb-4">Agendamento</p>
            <h2 className="text-4xl font-black text-[#0F172A] tracking-tight mb-6">Agende sua consulta hoje mesmo</h2>
            <p className="text-[#475569] leading-relaxed mb-10">
              Entre em contato pelo formulário, WhatsApp ou telefone. Nossa equipe confirma seu horário em até 2 horas.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { icon: Mail, label: "Email", value: "contato@sorrisoja.com.br" },
                { icon: Phone, label: "WhatsApp / Telefone", value: "+55 (11) 3265-0800" },
                { icon: MapPin, label: "Endereço", value: "Av. Paulista, 1000 — São Paulo, SP" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-[#0891B2]/10 flex items-center justify-center">
                    <Icon className="size-4 text-[#0891B2]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#94A3B8] font-semibold">{label}</p>
                    <p className="text-sm font-medium text-[#0F172A]">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] mb-8">
              <p className="text-xs font-bold text-[#475569] uppercase tracking-widest mb-3">Horário de atendimento</p>
              <div className="space-y-1 text-sm text-[#475569]">
                <div className="flex justify-between"><span>Segunda a Sexta</span><span className="font-semibold text-[#0F172A]">08h – 20h</span></div>
                <div className="flex justify-between"><span>Sábado</span><span className="font-semibold text-[#0F172A]">08h – 14h</span></div>
                <div className="flex justify-between"><span>Domingo</span><span className="font-semibold text-[#94A3B8]">Fechado</span></div>
              </div>
            </div>

            <div className="flex gap-3">
              {[
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Instagram, label: "Instagram" },
                { icon: Github, label: "GitHub" },
              ].map(({ icon: Icon, label }) => (
                <a key={label} href="#"
                  className="size-10 rounded-xl border border-[#E2E8F0] flex items-center justify-center text-[#475569] hover:border-[#0891B2] hover:text-[#0891B2] transition-colors">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </FadeIn>

          <FadeIn from="right">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Nome completo</label>
                  <input type="text" placeholder="Seu nome"
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Telefone / WhatsApp</label>
                  <input type="tel" placeholder="(11) 3265-0800"
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Email</label>
                <input type="email" placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20" />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Tratamento de interesse</label>
                <select className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20 text-[#475569]">
                  <option>Consulta de avaliação (gratuita)</option>
                  <option>Limpeza e prevenção</option>
                  <option>Clareamento dental</option>
                  <option>Ortodontia / Alinhadores</option>
                  <option>Implante dentário</option>
                  <option>Facetas de porcelana</option>
                  <option>Outro tratamento</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Mensagem (opcional)</label>
                <textarea rows={4} placeholder="Conte-nos um pouco sobre sua necessidade ou dúvida..."
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20 resize-none" />
              </div>
              <button type="submit"
                className="w-full py-4 bg-[#0891B2] hover:bg-[#0670A0] text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-cyan-500/20 text-sm">
                Agendar consulta
              </button>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════ */}
      <footer className="bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="font-black text-2xl mb-4">
              Sorriso<span className="text-[#0891B2]">Já</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Clínica odontológica completa. Tecnologia de ponta, atendimento humanizado e resultados que transformam vidas.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Instagram, Github].map((Icon, i) => (
                <a key={i} href="#"
                  className="size-9 rounded-lg bg-white/5 hover:bg-[#0891B2] flex items-center justify-center text-slate-400 hover:text-white transition-all">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Navegação</p>
            <ul className="space-y-2.5">
              {[["Sobre", "#sobre"], ["Serviços", "#servicos"], ["Casos clínicos", "#projetos"], ["Blog", "#blog"], ["Agendamento", "#contato"]].map(
                ([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-slate-400 text-sm hover:text-[#0891B2] transition-colors">{label}</a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Contato</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-slate-400 text-sm">
                <Mail className="size-3.5 text-[#0891B2] shrink-0" /> contato@sorrisoja.com.br
              </li>
              <li className="flex items-center gap-2.5 text-slate-400 text-sm">
                <Phone className="size-3.5 text-[#0891B2] shrink-0" /> +55 (11) 3265-0800
              </li>
              <li className="flex items-center gap-2.5 text-slate-400 text-sm">
                <MapPin className="size-3.5 text-[#0891B2] shrink-0" /> Av. Paulista, 1000 — SP
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-xs">© 2025 SorrisoJá. Todos os direitos reservados.</p>
            <div className="flex gap-4 text-xs text-slate-500">
              <a href="#" className="hover:text-[#0891B2] transition-colors">Privacidade</a>
              <a href="#" className="hover:text-[#0891B2] transition-colors">Termos de uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
