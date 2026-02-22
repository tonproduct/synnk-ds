"use client"

import { useState, useEffect, useRef, ReactNode } from "react"
import {
  RefreshCw, CalendarCheck, Target,
  Smartphone, Monitor, Layers, Palette, Search,
  ChevronDown, ArrowRight, CheckCircle2,
  Rocket, Code2, Building2, Menu, X,
  Mail, Phone, MapPin, Linkedin, Instagram,
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   Utility: FadeIn com IntersectionObserver
   ───────────────────────────────────────────────────────────── */
function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, sv] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => sv(true), delay)
          obs.disconnect()
        }
      },
      { threshold: 0.08 }
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
        transform: v ? "none" : "translateY(24px)",
        transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .7s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Logo
   ───────────────────────────────────────────────────────────── */
function Logo({ size = "text-xl", invert = false }: { size?: string; invert?: boolean }) {
  return (
    <span className={`font-black tracking-tight ${size} ${invert ? "text-gray-900" : "text-white"}`}>
      SY<span className="text-amber-400">NN</span>K
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────
   Data
   ───────────────────────────────────────────────────────────── */
const TABS = ["Todos", "Apps Mobile", "Web & Plataformas", "Design Systems", "Identidade", "Consultoria"]

const PROJECTS = [
  {
    id: 1,
    tag: "Apps Mobile",
    category: "App Mobile · Dashboard · Identidade",
    title: "Droneiros Voluntários",
    desc: "Sistema completo para gestão de missões de resgate com drones.",
    results: [
      "App iOS/Android + Dashboard web sincronizados",
      "Design system completo Material UI",
      "Identidade visual do zero",
    ],
    bg: "#040F1C",
    accent: "#00E5FF",
  },
  {
    id: 2,
    tag: "Design Systems",
    category: "Design Systems · Consultoria",
    title: "X Digital Brasil",
    desc: "Auditoria e sincronização de 200+ componentes Figma ↔ Material UI.",
    results: [
      "Mapeamento completo Figma → MUI",
      "Documentação de gaps e inconsistências",
      "Roadmap de implementação",
    ],
    bg: "#0A0514",
    accent: "#A855F7",
  },
  {
    id: 3,
    tag: "Identidade",
    category: "Identidade · Web & Plataformas",
    title: "JHV Pack Tech",
    desc: "Identidade visual e site institucional para indústria de máquinas de embalagem.",
    results: [
      "Identidade visual completa B2B",
      "Site responsivo com CMS",
      "Redução de 40% no tempo de cotação",
    ],
    bg: "#051409",
    accent: "#22C55E",
  },
]

const BENEFITS = [
  {
    icon: RefreshCw,
    title: "Sincronia design-código",
    desc: "Figma e Material UI conversam 1:1. Componentes que você valida viram código funcional sem perder fidelidade.",
  },
  {
    icon: CalendarCheck,
    title: "Processo transparente",
    desc: "Checkpoints semanais. Você nunca fica mais de 7 dias sem ver progresso real e validar a direção.",
  },
  {
    icon: Target,
    title: "Entrega previsível",
    desc: "Cronogramas claros, sem surpresas. 100% dos projetos entregues no prazo nos últimos 3 anos.",
  },
]

const SERVICES = [
  {
    icon: Smartphone,
    title: "Apps Mobile",
    items: [
      { label: "MVPs", time: "6–8 sem", price: "R$40–80k" },
      { label: "Apps completos", time: "8–16 sem", price: "R$80–150k" },
      { label: "App + Dashboard", time: "12–20 sem", price: "R$120k+" },
    ],
    includes: "Discovery, UX, UI, design system, landing page",
    featured: false,
  },
  {
    icon: Monitor,
    title: "Web & Plataformas",
    items: [
      { label: "Landing pages", time: "2–3 sem", price: "R$8–15k" },
      { label: "Sites institucionais", time: "5–7 sem", price: "R$20–40k" },
      { label: "E-commerce", time: "10–14 sem", price: "R$50–80k" },
      { label: "Dashboards/Sistemas", time: "8–16 sem", price: "R$40–100k" },
    ],
    includes: "Design responsivo, CMS quando aplicável",
    featured: false,
  },
  {
    icon: Layers,
    title: "Design Systems",
    items: [
      { label: "Auditoria", time: "2–3 sem", price: "R$15–25k" },
      { label: "Do zero", time: "4–8 sem", price: "R$30–60k" },
      { label: "Component library", time: "2–4 sem", price: "R$20–40k" },
    ],
    includes: "Especialidade: Material UI + Figma sync",
    featured: true,
  },
  {
    icon: Palette,
    title: "Identidade Visual",
    items: [
      { label: "Identidade completa", time: "4–6 sem", price: "R$15–30k" },
      { label: "Brand refresh", time: "4–6 sem", price: "R$12–25k" },
      { label: "Identidade + Site", time: "7–9 sem", price: "R$25–50k" },
    ],
    includes: "Logo, manual de marca, aplicações",
    featured: false,
  },
  {
    icon: Search,
    title: "Consultoria UX",
    items: [
      { label: "UX Audit", time: "1–2 sem", price: "R$8–15k" },
      { label: "Discovery Sprint", time: "2–3 sem", price: "R$12–20k" },
      { label: "Design System Audit", time: "2–4 sem", price: "R$15–30k" },
      { label: "Retainer mensal", time: "—", price: "R$8–15k/mês" },
    ],
    includes: "Diagnóstico, roadmap, mentoria",
    featured: false,
  },
]

const PROCESS = [
  {
    num: "01",
    title: "DISCOVER",
    time: "1–2 semanas",
    desc: "Entendemos o problema. Research, stakeholders, análise competitiva.",
    deliverable: "Briefing consolidado",
    checkpoint: false,
  },
  {
    num: "02",
    title: "DEFINE",
    time: "1–2 semanas",
    desc: "Personas, prioridades, wireframes e roadmap definidos em conjunto.",
    deliverable: "Protótipo navegável + cronograma",
    checkpoint: true,
  },
  {
    num: "03",
    title: "DEVELOP",
    time: "4–12 semanas",
    desc: "Sprints semanais com design system, interfaces e código em sincronia.",
    deliverable: "Versões testáveis toda semana",
    checkpoint: false,
  },
  {
    num: "04",
    title: "DELIVER",
    time: "1–2 semanas",
    desc: "Testes finais, deploy, documentação completa e handoff.",
    deliverable: "Produto em produção + documentação",
    checkpoint: false,
  },
]

const PROFILES = [
  {
    icon: Rocket,
    title: "Founders & Product Managers",
    desc: "Precisam validar rápido sem gastar tudo. Querem partner que entende produto, não apenas executa pedidos.",
    services: ["MVP Mobile", "Discovery Sprint", "Landing Pages"],
  },
  {
    icon: Code2,
    title: "CTOs & Tech Leads",
    desc: "Time dev perde tempo com design inconsistente. Precisam de componentes realmente reutilizáveis.",
    services: ["Design System Audit", "Design System Implementation", "Retainer"],
  },
  {
    icon: Building2,
    title: "Empresas estruturando produto",
    desc: "Produto legado causando perda de credibilidade. Precisam digitalizar mas não sabem por onde começar.",
    services: ["UX Audit", "Redesign", "Identidade + Site", "Consultoria"],
  },
]

const FAQS = [
  { q: "Quanto tempo leva um projeto?", a: "Depende do escopo. Landing pages: 2–3 semanas. Apps completos: 8–16 semanas. Sistemas complexos: 12–20 semanas. Sempre com checkpoints semanais." },
  { q: "Qual o investimento mínimo?", a: "Projetos começam em R$8k (UX audits, landing pages). A maioria dos clientes investe entre R$20–60k em projetos completos." },
  { q: "Vocês desenvolvem ou só fazem design?", a: "Fazemos os dois. Somos especializados em Material UI + React, então entregamos design E código quando o cliente precisa." },
  { q: "Como funciona o processo semanal?", a: "Toda semana você recebe uma entrega testável (protótipo, código rodando, design atualizado). Você valida, nós ajustamos e seguimos. Nunca fica mais de 7 dias sem ver progresso." },
  { q: "E se eu só quiser design, sem código?", a: "Sem problema. Fazemos design systems, UI design e UX research de forma independente. A sincronia com código é um diferencial quando você precisa, não uma obrigação." },
  { q: "Atendem todo o Brasil?", a: "Sim, 100% remoto. Já atendemos clientes em 8 estados. Reuniões por videochamada, entregas via Figma/GitHub, comunicação diária por Slack." },
  { q: "Posso contratar só uma fase?", a: "Sim! Todas as fases podem ser contratadas separadamente. Muitos clientes começam com Discovery ou Audit para validar a direção antes de investir mais." },
  { q: "Qual a diferença entre vocês e uma agência?", a: "Pegamos poucos projetos por vez e trabalhamos como extensão do seu time. Plus: expertise técnica real em Material UI e React — não terceirizamos." },
]

/* ─────────────────────────────────────────────────────────────
   Project mockup visuals
   ───────────────────────────────────────────────────────────── */
function DroneMockup({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full p-3 flex flex-col gap-2">
      <div className="flex justify-between text-[8px] text-white/25 font-mono">
        <span>09:41</span><span>●●●</span>
      </div>
      <div className="flex-1 rounded-lg relative overflow-hidden" style={{ background: "#071828" }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="dronegrid" width="14" height="14" patternUnits="userSpaceOnUse">
              <path d="M 14 0 L 0 0 0 14" fill="none" stroke={accent} strokeWidth="0.25" opacity="0.15" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#dronegrid)" />
          <path d="M12 72 Q30 38 52 52 T88 22" fill="none" stroke={accent} strokeWidth="1.3" opacity="0.8" strokeDasharray="4,3" />
          <circle cx="12" cy="72" r="3.5" fill={accent} opacity="0.9" />
          <circle cx="88" cy="22" r="3" fill="#ff4455" opacity="0.9" />
          <circle cx="52" cy="52" r="2" fill={accent} opacity="0.5" />
        </svg>
      </div>
      <div className="space-y-1">
        {[["● MISSÃO ATIVA", accent], ["○ EM STANDBY", "#ffffff30"]] .map(([t, c]) => (
          <div key={t as string} className="flex items-center gap-1.5 bg-white/5 rounded px-2 py-1">
            <span style={{ color: c as string }} className="text-[8px] font-mono tracking-wider">{t as string}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DSMockup({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full p-3 flex flex-col gap-2">
      <p className="text-[7px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: accent + "99" }}>
        Component Library
      </p>
      <div className="grid grid-cols-4 gap-1 flex-1">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="rounded aspect-square flex items-center justify-center"
            style={{
              background: i % 3 === 0 ? accent + "20" : "rgba(255,255,255,0.04)",
              border: `1px solid ${i % 3 === 0 ? accent + "50" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            {i % 4 === 0 && (
              <div className="w-3/5 h-0.5 rounded-full" style={{ background: accent, opacity: 0.7 }} />
            )}
          </div>
        ))}
      </div>
      <div className="rounded bg-white/5 px-2 py-1.5 flex items-center gap-2">
        <div className="size-2.5 rounded-sm shrink-0" style={{ background: accent }} />
        <span className="text-[7px] font-mono text-white/40">Button / Primary / Default</span>
      </div>
    </div>
  )
}

function CorporateMockup({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full p-3 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="size-4 rounded shrink-0" style={{ background: accent }} />
        <span className="text-[8px] font-black text-white/80 tracking-wider uppercase">JHV Pack Tech</span>
      </div>
      <div className="flex-1 rounded-lg flex flex-col justify-center items-center gap-2 p-3" style={{ background: "rgba(255,255,255,0.03)" }}>
        <p className="text-[10px] font-bold text-white/80 leading-tight text-center">
          Soluções para<br />embalagem industrial
        </p>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="flex gap-1">
          {[7, 4, 5].map((w, i) => (
            <div key={i} className="h-1 rounded-full" style={{ width: `${w * 4}px`, background: i === 0 ? accent : "rgba(255,255,255,0.15)" }} />
          ))}
        </div>
      </div>
      <div
        className="rounded px-2 py-1 text-center text-[8px] font-semibold text-white/80"
        style={{ background: accent + "25", border: `1px solid ${accent}50` }}
      >
        Solicitar orçamento →
      </div>
    </div>
  )
}

function ProjectMockup({ project }: { project: (typeof PROJECTS)[0] }) {
  if (project.id === 1) return <DroneMockup accent={project.accent} />
  if (project.id === 2) return <DSMockup accent={project.accent} />
  return <CorporateMockup accent={project.accent} />
}

/* ─────────────────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────────────────── */
export default function SynnkPage() {
  const [scrolled, setScrolled] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("Todos")
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formSent, setFormSent] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", type: "" })

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    const fn = () => setScrolled(window.scrollY > 72)
    window.addEventListener("scroll", fn, { passive: true })
    return () => {
      window.removeEventListener("scroll", fn)
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  const filtered =
    activeTab === "Todos"
      ? PROJECTS
      : PROJECTS.filter((p) => p.tag === activeTab || p.category.includes(activeTab))

  return (
    <div className="font-sans antialiased bg-white text-gray-900">

      {/* ══════════════════════════════════════════════════════
          NAV
          ══════════════════════════════════════════════════════ */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#050D1A]/95 backdrop-blur-md border-b border-white/[0.07] shadow-xl" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero">
            <Logo />
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm text-white/65">
            {[["Projetos", "#projetos"], ["Serviços", "#servicos"], ["Processo", "#processo"], ["FAQ", "#faq"]].map(
              ([label, href]) => (
                <a key={label} href={href} className="hover:text-white transition-colors">
                  {label}
                </a>
              )
            )}
          </div>

          <a
            href="#contato"
            className="hidden md:inline-flex items-center px-5 py-2 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm font-semibold transition-colors"
          >
            Agendar conversa
          </a>

          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden text-white">
            {navOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {navOpen && (
          <div className="md:hidden bg-[#050D1A] border-t border-white/10 px-6 py-4 space-y-1">
            {[["Projetos", "#projetos"], ["Serviços", "#servicos"], ["Processo", "#processo"], ["FAQ", "#faq"]].map(
              ([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setNavOpen(false)}
                  className="block text-white/70 text-sm py-2.5 border-b border-white/5 hover:text-white"
                >
                  {label}
                </a>
              )
            )}
            <a href="#contato" className="block text-white font-semibold text-sm pt-3">
              Agendar conversa →
            </a>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════════════════════
          1. HERO
          ══════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative min-h-screen bg-[#050D1A] pt-16 flex flex-col overflow-hidden"
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,.035) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#050D1A] to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-12 flex-1 flex flex-col">
          {/* Badge */}
          <div className="self-center mb-10">
            <div
              className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-medium"
              style={{
                border: "1px solid rgba(0,102,255,.35)",
                background: "rgba(0,102,255,.1)",
                color: "#93C5FD",
              }}
            >
              <span className="size-1.5 rounded-full bg-blue-400 animate-pulse inline-block" />
              Design + Código sincronizados desde o dia 1
            </div>
          </div>

          {/* Headline */}
          <div className="text-center mb-8 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-[72px] font-black text-white leading-[1.04] tracking-tight mb-6">
              Produtos digitais.
              <br />
              <span className="text-amber-400">Completamente</span>
              <br />
              sincronizados.
            </h1>
            <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-lg mx-auto">
              Da identidade ao deploy, tudo conectado. Marca, design e código conversam desde o dia 1.
              O que você valida é o que você recebe — sem surpresas, sem retrabalho.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <a
              href="#contato"
              className="px-7 py-3.5 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-sm transition-all hover:scale-[1.02] shadow-lg shadow-blue-500/20"
            >
              Agendar conversa
            </a>
            <a
              href="#projetos"
              className="px-7 py-3.5 rounded-lg border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all"
            >
              Ver projetos
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-16 text-sm text-white/45">
            {[
              "50+ projetos entregues",
              "7+ anos de experiência",
              "100% entregas no prazo",
              "8–16 semanas média",
            ].map((b) => (
              <div key={b} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-green-400 shrink-0" />
                {b}
              </div>
            ))}
          </div>

          {/* Project screenshots */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-auto">
            {PROJECTS.map((p) => (
              <div
                key={p.id}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_28px_60px_-10px_rgba(0,0,0,.9)]"
                style={{ background: p.bg }}
              >
                <ProjectMockup project={p} />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-4 pb-4 pt-14">
                  <p className="text-[10px] uppercase tracking-widest font-semibold mb-0.5" style={{ color: p.accent }}>
                    {p.category.split("·")[0].trim()}
                  </p>
                  <p className="text-white text-sm font-bold">{p.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. CREDIBILITY BAR
          ══════════════════════════════════════════════════════ */}
      <section className="bg-[#0066FF] py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { val: "50+", label: "projetos entregues" },
              { val: "7+", label: "anos de experiência" },
              { val: "100%", label: "no prazo" },
              { val: "8–16", label: "semanas por projeto" },
            ].map(({ val, label }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">{val}</span>
                <span className="text-sm text-white/70">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. PROJETOS
          ══════════════════════════════════════════════════════ */}
      <section id="projetos" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <p className="text-xs font-bold text-[#0066FF] uppercase tracking-[0.18em] mb-3">
              Projetos em destaque
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Resultados reais, entregas concretas
            </h2>
          </FadeIn>

          {/* Tabs */}
          <FadeIn delay={100} className="flex flex-wrap gap-2 justify-center mb-10">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-[#0066FF] text-white shadow-md shadow-blue-500/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </FadeIn>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <FadeIn key={p.id} delay={i * 100}>
                <div className="group rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col">
                  <div className="aspect-[16/9] relative overflow-hidden" style={{ background: p.bg }}>
                    <ProjectMockup project={p} />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10">
                      <p className="text-[9px] uppercase tracking-[0.18em] font-bold" style={{ color: p.accent }}>
                        {p.category}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
                    <p className="text-gray-500 text-sm mb-5">{p.desc}</p>
                    <ul className="space-y-2 mb-6 mt-auto">
                      {p.results.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                          {r}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contato"
                      className="inline-flex items-center gap-1 text-sm font-bold text-[#0066FF] hover:gap-2.5 transition-all"
                    >
                      Ver case completo <ArrowRight className="size-4" />
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. BENEFÍCIOS
          ══════════════════════════════════════════════════════ */}
      <section className="bg-[#EEF4FF] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-bold text-[#0066FF] uppercase tracking-[0.18em] mb-3">Por que SYNNK</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Design e código que conversam
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BENEFITS.map(({ icon: Icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 120}>
                <div className="bg-white rounded-2xl p-8 border border-blue-100/80 hover:shadow-xl transition-shadow h-full">
                  <div className="size-12 rounded-xl bg-[#0066FF] flex items-center justify-center mb-6">
                    <Icon className="size-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. SERVIÇOS
          ══════════════════════════════════════════════════════ */}
      <section id="servicos" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-bold text-[#0066FF] uppercase tracking-[0.18em] mb-3">Serviços</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">O que entregamos</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map(({ icon: Icon, title, items, includes, featured }, i) => (
              <FadeIn key={title} delay={i * 70}>
                <div
                  className={`rounded-2xl p-6 h-full flex flex-col border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    featured
                      ? "bg-[#0066FF] border-transparent"
                      : "bg-white border-gray-100"
                  }`}
                >
                  <div
                    className={`size-11 rounded-xl flex items-center justify-center mb-5 ${
                      featured ? "bg-white/20" : "bg-[#EEF4FF]"
                    }`}
                  >
                    <Icon className={`size-5 ${featured ? "text-white" : "text-[#0066FF]"}`} />
                  </div>
                  <h3 className={`text-lg font-bold mb-5 ${featured ? "text-white" : "text-gray-900"}`}>
                    {title}
                    {featured && (
                      <span className="ml-2 text-xs font-semibold bg-white/20 text-white px-2 py-0.5 rounded-full align-middle">
                        Especialidade
                      </span>
                    )}
                  </h3>
                  <div className="space-y-2.5 mb-5 flex-1">
                    {items.map(({ label, time, price }) => (
                      <div
                        key={label}
                        className={`rounded-xl p-3 ${featured ? "bg-white/10" : "bg-gray-50"}`}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`text-sm font-semibold ${featured ? "text-white" : "text-gray-800"}`}>
                            {label}
                          </span>
                          <span className={`text-xs font-bold ${featured ? "text-amber-300" : "text-[#0066FF]"}`}>
                            {price}
                          </span>
                        </div>
                        <p className={`text-xs mt-0.5 ${featured ? "text-white/55" : "text-gray-400"}`}>{time}</p>
                      </div>
                    ))}
                  </div>
                  <p className={`text-xs mb-5 leading-relaxed ${featured ? "text-white/55" : "text-gray-400"}`}>
                    <span className={featured ? "text-white/80 font-medium" : "text-gray-500 font-medium"}>
                      Inclui:{" "}
                    </span>
                    {includes}
                  </p>
                  <a
                    href="#contato"
                    className={`inline-flex items-center gap-1.5 text-sm font-bold hover:gap-2.5 transition-all ${
                      featured ? "text-white" : "text-[#0066FF]"
                    }`}
                  >
                    Saiba mais <ArrowRight className="size-4" />
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. PROCESSO
          ══════════════════════════════════════════════════════ */}
      <section id="processo" className="bg-[#050D1A] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-6">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-[0.18em] mb-3">Como trabalhamos</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">Método Double Diamond</h2>
          </FadeIn>
          <FadeIn delay={80} className="text-center mb-16">
            <p className="text-white/45 text-sm max-w-md mx-auto">
              Fases podem ser contratadas separadamente. Valide uma antes de investir na próxima.
            </p>
          </FadeIn>

          <div className="relative">
            {/* Connector */}
            <div className="hidden md:block absolute top-[26px] left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {PROCESS.map(({ num, title, time, desc, deliverable, checkpoint }, i) => (
                <FadeIn key={num} delay={i * 100}>
                  <div className="relative">
                    {/* Step dot */}
                    <div className="hidden md:flex absolute -top-[3px] left-1/2 -translate-x-1/2 size-[14px] rounded-full bg-[#0066FF] ring-4 ring-[#050D1A] z-10" />
                    <div className="pt-0 md:pt-10">
                      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 hover:bg-white/[0.07] transition-colors h-full">
                        <div className="flex items-start gap-3 mb-4">
                          <span className="text-4xl font-black text-white/12 leading-none">{num}</span>
                          <div className="pt-0.5">
                            <p className="text-[11px] font-semibold text-blue-400 mb-0.5">{time}</p>
                            <p className="text-base font-bold text-white">{title}</p>
                          </div>
                        </div>
                        <p className="text-white/45 text-sm leading-relaxed mb-4">{desc}</p>
                        <div className="rounded-xl bg-white/[0.05] px-3 py-2.5 mb-3">
                          <p className="text-[10px] text-white/35 uppercase tracking-wider mb-1">Entregável</p>
                          <p className="text-xs font-medium text-white/75">{deliverable}</p>
                        </div>
                        {checkpoint && (
                          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
                            <CheckCircle2 className="size-3.5" />
                            Cliente aprova antes de avançar
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. PARA QUEM
          ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-bold text-[#0066FF] uppercase tracking-[0.18em] mb-3">Para quem construímos</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Reconhece alguém aqui?</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROFILES.map(({ icon: Icon, title, desc, services: svc }, i) => (
              <FadeIn key={title} delay={i * 100}>
                <div className="rounded-2xl border border-gray-100 p-7 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col">
                  <div className="size-12 rounded-xl bg-[#EEF4FF] flex items-center justify-center mb-6">
                    <Icon className="size-5 text-[#0066FF]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{desc}</p>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2.5">
                      Serviços indicados
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {svc.map((s) => (
                        <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-[#0066FF] font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          8. FAQ
          ══════════════════════════════════════════════════════ */}
      <section id="faq" className="bg-[#EEF4FF] py-24">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <p className="text-xs font-bold text-[#0066FF] uppercase tracking-[0.18em] mb-3">Dúvidas frequentes</p>
            <h2 className="text-4xl font-black text-gray-900">FAQ</h2>
          </FadeIn>
          <div className="space-y-2.5">
            {FAQS.map(({ q, a }, i) => (
              <FadeIn key={i} delay={i * 40}>
                <div className="rounded-xl border border-blue-100 bg-white overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                  >
                    <span className="font-semibold text-gray-900 text-sm">{q}</span>
                    <ChevronDown
                      className={`size-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {a}
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          9. CTA FINAL
          ══════════════════════════════════════════════════════ */}
      <section
        id="contato"
        className="py-24"
        style={{ background: "linear-gradient(135deg, #0066FF 0%, #0040BB 100%)" }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <FadeIn className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Pronto para sincronizar seu produto?
            </h2>
            <p className="text-white/60 text-sm">Resposta em até 24h úteis. Sem spam, sem pitch forçado.</p>
          </FadeIn>

          {formSent ? (
            <FadeIn className="text-center">
              <div className="bg-white/10 rounded-2xl p-12 border border-white/20">
                <CheckCircle2 className="size-14 text-green-400 mx-auto mb-4" />
                <p className="text-white text-xl font-bold mb-2">Mensagem enviada!</p>
                <p className="text-white/60 text-sm">Retorno em até 24 horas úteis.</p>
              </div>
            </FadeIn>
          ) : (
            <FadeIn>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setFormSent(true)
                }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 space-y-4 border border-white/15"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="Seu nome"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="rounded-xl px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/35 text-sm focus:outline-none focus:border-white/50 transition-colors"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Seu e-mail"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="rounded-xl px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/35 text-sm focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 bg-white/10 border border-white/20 text-white/80 text-sm focus:outline-none focus:border-white/50 transition-colors"
                >
                  <option value="" className="bg-[#0066FF]">Tipo de projeto</option>
                  {["App Mobile", "Site/Plataforma", "Design System", "Identidade", "Consultoria", "Não sei ainda"].map(
                    (o) => (
                      <option key={o} value={o} className="bg-[#0044BB]">{o}</option>
                    )
                  )}
                </select>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-white text-[#0066FF] font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg shadow-black/20"
                >
                  Agendar conversa
                </button>
              </form>
              <p className="text-center text-white/45 text-xs mt-5">
                Ou:{" "}
                <a href="mailto:contato@synnk.design" className="text-white/75 hover:text-white transition-colors">
                  contato@synnk.design
                </a>
                <span className="mx-2">·</span>
                <span className="text-white/75">(19) XXXXX-XXXX</span>
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          10. FOOTER
          ══════════════════════════════════════════════════════ */}
      <footer className="bg-[#050D1A] text-white py-16 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Logo size="text-2xl" />
              <p className="text-white/35 text-xs mt-1.5 font-mono">Sync Your Needs N' Kode</p>
              <p className="text-white/40 text-xs mt-4 leading-relaxed max-w-[200px]">
                Produtos digitais completamente sincronizados. Da identidade ao deploy.
              </p>
              <div className="flex items-center gap-3 mt-5">
                <a href="#" aria-label="LinkedIn" className="size-8 rounded-lg bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors">
                  <Linkedin className="size-3.5 text-white/60" />
                </a>
                <a href="#" aria-label="Instagram" className="size-8 rounded-lg bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors">
                  <Instagram className="size-3.5 text-white/60" />
                </a>
              </div>
            </div>

            {/* Nav */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35 mb-4">Navegação</p>
              <div className="space-y-2.5">
                {[["Início", "#hero"], ["Projetos", "#projetos"], ["Serviços", "#servicos"], ["Processo", "#processo"], ["Contato", "#contato"]].map(
                  ([label, href]) => (
                    <a key={label} href={href} className="block text-sm text-white/55 hover:text-white transition-colors">
                      {label}
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Services */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35 mb-4">Serviços</p>
              <div className="space-y-2.5">
                {["Apps Mobile", "Web & Plataformas", "Design Systems", "Identidade Visual", "Consultoria UX"].map(
                  (s) => (
                    <p key={s} className="text-sm text-white/55">{s}</p>
                  )
                )}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35 mb-4">Contato</p>
              <div className="space-y-3">
                <a href="mailto:contato@synnk.design" className="flex items-center gap-2.5 text-sm text-white/55 hover:text-white transition-colors">
                  <Mail className="size-3.5 shrink-0" />
                  contato@synnk.design
                </a>
                <div className="flex items-center gap-2.5 text-sm text-white/55">
                  <Phone className="size-3.5 shrink-0" />
                  (19) XXXXX-XXXX
                </div>
                <div className="flex items-center gap-2.5 text-sm text-white/55">
                  <MapPin className="size-3.5 shrink-0" />
                  Sumaré, São Paulo
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/25">
            <p>© 2025 SYNNK. Todos os direitos reservados.</p>
            <p>CNPJ XX.XXX.XXX/0001-XX</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
