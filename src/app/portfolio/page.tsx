"use client"

import { useState, useEffect, useRef, ReactNode } from "react"
import {
  Layers, Code2, Search, ArrowRight, CheckCircle2,
  Menu, X, ChevronLeft, ChevronRight,
  Mail, Phone, MapPin, Linkedin, Instagram, Github,
  Quote, Calendar, Clock, Palette, Smartphone, Globe,
  Star, Users, Briefcase, Zap,
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
    icon: Search,
    title: "UX Research & Strategy",
    desc: "Entendimento profundo do usuário antes de qualquer pixel. Pesquisa, mapeamento de jornada e definição de oportunidades.",
    color: "#0891B2",
  },
  {
    icon: Layers,
    title: "Design Systems",
    desc: "Componentes documentados, tokens semânticos e sincronia total com o código. Um único source of truth para design e dev.",
    color: "#7C3AED",
  },
  {
    icon: Code2,
    title: "Desenvolvimento Front-end",
    desc: "React, Next.js e Tailwind com a mesma atenção ao detalhe do design. Interface que o usuário valida é a que vai para produção.",
    color: "#0066FF",
  },
]

const SERVICES = [
  {
    tag: "Apps Mobile & Web",
    title: "Produto digital do zero ao deploy",
    desc: "Da identidade visual ao app em produção, tudo no mesmo ritmo. Design e código evoluindo juntos, sem ruídos de comunicação entre equipes.",
    bullets: ["App iOS/Android + Web sincronizados", "Design system próprio do produto", "Entrega em 8 a 16 semanas"],
    bg: "#040F1C",
    accent: "#00E5FF",
    icon: Smartphone,
  },
  {
    tag: "Design Systems",
    title: "Componentes que escalam com o time",
    desc: "Auditoria, estruturação e documentação completa. Tokens, variáveis Figma e código alinhados para o time crescer sem retrabalho.",
    bullets: ["Mapeamento Figma ↔ código", "Documentação e guidelines", "Onboarding do time de dev"],
    bg: "#0A0514",
    accent: "#A855F7",
    icon: Layers,
  },
  {
    tag: "Identidade Visual & Site",
    title: "Marca que comunica antes de falar",
    desc: "Identidade visual consistente do logo ao site institucional. B2B ou B2C, a primeira impressão já vende.",
    bullets: ["Identidade visual completa", "Site responsivo com CMS", "Kit de marca para a equipe"],
    bg: "#051409",
    accent: "#22C55E",
    icon: Palette,
  },
]

const PROJECTS = [
  { tag: "App Mobile", title: "Droneiros Voluntários", desc: "Sistema completo para gestão de missões de resgate com drones — app, dashboard e design system.", year: "2024" },
  { tag: "Design Systems", title: "X Digital Brasil", desc: "Auditoria e sincronização de 200+ componentes Figma ↔ Material UI para empresa de tecnologia financeira.", year: "2023" },
  { tag: "Identidade + Web", title: "JHV Pack Tech", desc: "Identidade visual e site institucional para indústria de máquinas de embalagem. Redução de 40% no tempo de cotação.", year: "2023" },
  { tag: "Web & Plataformas", title: "Synnk DS", desc: "Design system e template de projeto open-source para equipes que trabalham com design e código juntos.", year: "2024" },
]

const TESTIMONIALS = [
  {
    name: "Carlos Henrique",
    role: "CTO · Droneiros Voluntários",
    text: "Lucas entregou um produto que parece impossível para o prazo. O que mais me surpreendeu foi a sincronia entre o Figma e o código — não houve surpresa nenhuma na implementação. Exatamente o que foi aprovado é o que foi entregue.",
    stars: 5,
  },
  {
    name: "Ana Flávia",
    role: "Head of Design · X Digital Brasil",
    text: "Precisávamos urgentemente organizar 200+ componentes que estavam fora de sincronia. O trabalho foi preciso, documentado e o time de dev conseguiu onboarding em menos de uma semana. Recomendo sem hesitar.",
    stars: 5,
  },
  {
    name: "João Henrique",
    role: "CEO · JHV Pack Tech",
    text: "O novo site nos posicionou de forma completamente diferente no mercado B2B. Clientes chegam ao site e já entendem o que fazemos — o tempo de cotação caiu 40%. Melhor investimento em comunicação que fizemos.",
    stars: 5,
  },
]

const ARTICLES = [
  { tag: "Design Systems", title: "Por que seu design system falha antes de lançar", date: "12 Jan 2025", readTime: "6 min" },
  { tag: "Front-end", title: "Tokens semânticos: o elo perdido entre Figma e código", date: "28 Dez 2024", readTime: "8 min" },
  { tag: "UX", title: "Como fazer research quando o cliente acha que sabe tudo", date: "10 Dez 2024", readTime: "5 min" },
  { tag: "Carreira", title: "Designer que também coda: nem herói, nem unicórnio", date: "2 Dez 2024", readTime: "7 min" },
]

/* ─────────────────────────────────────────────────────────────
   Decorative shapes
   ───────────────────────────────────────────────────────────── */
function Dots({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
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
export default function PortfolioPage() {
  const [scrolled, setScrolled]   = useState(false)
  const [navOpen, setNavOpen]     = useState(false)
  const [activeT, setActiveT]     = useState(0)
  const [email, setEmail]         = useState("")
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const prevT = () => setActiveT((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const nextT = () => setActiveT((p) => (p + 1) % TESTIMONIALS.length)

  return (
    <div className="font-sans text-[#0F172A] overflow-x-hidden">

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
            Lucas<span className="text-[#0891B2]">.</span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#475569]">
            {[["Sobre", "#sobre"], ["Serviços", "#servicos"], ["Projetos", "#projetos"], ["Blog", "#blog"], ["Contato", "#contato"]].map(
              ([label, href]) => (
                <a key={label} href={href} className="hover:text-[#0891B2] transition-colors">{label}</a>
              )
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="mailto:oi@lucas.com" className="text-sm text-[#475569] hover:text-[#0891B2] transition-colors">
              oi@lucas.com
            </a>
            <a
              href="#contato"
              className="px-5 py-2.5 bg-[#0891B2] hover:bg-[#0670A0] text-white text-sm font-semibold rounded-full transition-colors shadow-sm shadow-cyan-500/20"
            >
              Agendar conversa
            </a>
          </div>

          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden text-[#0F172A]">
            {navOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {navOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-1">
            {[["Sobre", "#sobre"], ["Serviços", "#servicos"], ["Projetos", "#projetos"], ["Blog", "#blog"], ["Contato", "#contato"]].map(
              ([label, href]) => (
                <a key={label} href={href} onClick={() => setNavOpen(false)}
                  className="block text-[#475569] text-sm py-2.5 border-b border-gray-100 hover:text-[#0891B2]">
                  {label}
                </a>
              )
            )}
            <a href="#contato" className="block text-[#0891B2] font-semibold text-sm pt-3">Agendar conversa →</a>
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

        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 grid md:grid-cols-2 gap-16 items-center w-full">
          {/* Left — text */}
          <div>
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-6"
                style={{ background: "rgba(8,145,178,.1)", color: "#0891B2", border: "1px solid rgba(8,145,178,.2)" }}>
                <span className="size-1.5 rounded-full bg-[#0891B2] animate-pulse inline-block" />
                Disponível para novos projetos
              </div>
            </FadeIn>

            <FadeIn delay={80}>
              <h1 className="text-5xl md:text-[62px] font-black leading-[1.06] tracking-tight text-[#0F172A] mb-6">
                Design e código que
                <span className="text-[#0891B2]"> conversam</span>
                <br />desde o dia 1.
              </h1>
            </FadeIn>

            <FadeIn delay={160}>
              <p className="text-[#475569] text-lg leading-relaxed mb-8 max-w-md">
                Sou designer e desenvolvedor front-end. Crio produtos digitais onde o que você aprova no Figma é exatamente o que vai para produção — sem retrabalho, sem surpresas.
              </p>
            </FadeIn>

            <FadeIn delay={240} className="flex flex-wrap gap-3 mb-10">
              <a href="#projetos"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0891B2] hover:bg-[#0670A0] text-white font-semibold text-sm rounded-full transition-all hover:scale-[1.02] shadow-lg shadow-cyan-500/20">
                Ver projetos
                <ArrowRight className="size-4" />
              </a>
              <a href="#contato"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#E2E8F0] text-[#0F172A] font-semibold text-sm rounded-full hover:border-[#0891B2] hover:text-[#0891B2] transition-all">
                Agendar conversa
              </a>
            </FadeIn>

            <FadeIn delay={320} className="flex flex-wrap gap-6 text-sm text-[#475569]">
              {["50+ projetos entregues", "7+ anos de experiência", "100% no prazo"].map((b) => (
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
            <div className="relative size-[440px]">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#0891B2]/20 animate-spin" style={{ animationDuration: "30s" }} />
              <div className="absolute inset-8 rounded-full border border-[#0891B2]/15" />

              {/* Center card */}
              <div className="absolute inset-12 rounded-full overflow-hidden bg-gradient-to-br from-[#0891B2]/10 to-[#7C3AED]/10 flex items-center justify-center border border-[#E2E8F0]">
                <div className="text-center p-8">
                  <div className="text-5xl font-black text-[#0891B2] mb-1">50<span className="text-2xl">+</span></div>
                  <div className="text-xs font-semibold text-[#475569] uppercase tracking-wider">Projetos entregues</div>
                  <div className="w-8 h-0.5 bg-[#0891B2] mx-auto my-3" />
                  <div className="text-5xl font-black text-[#7C3AED] mb-1">7<span className="text-2xl">+</span></div>
                  <div className="text-xs font-semibold text-[#475569] uppercase tracking-wider">Anos de experiência</div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg px-4 py-2.5 flex items-center gap-2 border border-[#E2E8F0]">
                <div className="size-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-semibold text-[#0F172A]">Disponível agora</span>
              </div>

              <div className="absolute -right-4 top-1/3 bg-white rounded-2xl shadow-lg px-3 py-2 border border-[#E2E8F0]">
                <div className="text-xs font-bold text-[#0891B2]">Figma → React</div>
                <div className="text-[10px] text-[#475569]">em sincronia</div>
              </div>

              <div className="absolute -left-6 bottom-1/3 bg-white rounded-2xl shadow-lg px-3 py-2 border border-[#E2E8F0]">
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="size-2.5 fill-amber-400 text-amber-400" />)}
                </div>
                <div className="text-[10px] text-[#475569]">100% satisfação</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ FEATURES ═════════════════════════════════════════════ */}
      <section className="relative py-24 bg-[#F8FAFC] overflow-hidden">
        <Dots className="right-0 top-0" />

        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-14">
            <p className="text-[#0891B2] text-sm font-semibold uppercase tracking-widest mb-3">O que eu faço</p>
            <h2 className="text-4xl font-black text-[#0F172A] tracking-tight max-w-xl mx-auto">
              Especialidades que conectam design e produto
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
      <section id="sobre" className="relative py-28 bg-white overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at right, rgba(8,145,178,.04) 0%, transparent 70%)" }} />
        <Dots className="left-[5%] top-1/3" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          {/* Left — visual */}
          <FadeIn from="left" className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-[#0891B2]/10 via-[#F8FAFC] to-[#7C3AED]/10 border border-[#E2E8F0] flex items-center justify-center">
              {/* Decorative inner layout */}
              <div className="w-full h-full p-8 flex flex-col gap-4">
                {/* Mock browser bar */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E2E8F0]">
                  <div className="flex gap-1.5 mb-3">
                    <div className="size-2.5 rounded-full bg-red-400" />
                    <div className="size-2.5 rounded-full bg-amber-400" />
                    <div className="size-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="h-2 bg-[#E2E8F0] rounded mb-2 w-3/4" />
                  <div className="h-2 bg-[#E2E8F0] rounded w-1/2" />
                </div>

                <div className="flex gap-4 flex-1">
                  <div className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-[#E2E8F0] flex flex-col gap-2">
                    <div className="size-8 rounded-lg bg-[#0891B2]/20 mb-1" />
                    <div className="h-2 bg-[#E2E8F0] rounded w-full" />
                    <div className="h-2 bg-[#E2E8F0] rounded w-3/4" />
                    <div className="h-2 bg-[#E2E8F0] rounded w-1/2" />
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-white rounded-xl p-3 shadow-sm border border-[#E2E8F0]">
                        <div className="h-1.5 bg-[#0891B2]/30 rounded mb-2" style={{ width: `${60 + i * 15}%` }} />
                        <div className="h-1.5 bg-[#E2E8F0] rounded" style={{ width: `${50 + i * 10}%` }} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0891B2] rounded-xl p-4 text-white">
                  <div className="text-xs font-semibold mb-1">Design System ativo</div>
                  <div className="flex gap-1">
                    {["#0891B2", "#7C3AED", "#0F172A", "#22C55E"].map(c => (
                      <div key={c} className="size-5 rounded" style={{ background: c }} />
                    ))}
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
              <p className="text-[#0891B2] text-sm font-semibold uppercase tracking-widest mb-4">Sobre mim</p>
              <h2 className="text-4xl font-black text-[#0F172A] tracking-tight leading-tight mb-6">
                Designer que coda.<br />Developer que pensa em UX.
              </h2>
              <p className="text-[#475569] leading-relaxed mb-8">
                Trabalho na interseção entre design e desenvolvimento há mais de 7 anos. Comecei como designer, aprendi a codar por necessidade — e descobri que o produto muda quando a mesma pessoa entende os dois lados da tela.
              </p>
            </FadeIn>

            <div className="space-y-6">
              {[
                { n: "01", title: "Design orientado a negócio", desc: "Toda decisão visual tem uma razão estratégica. Beleza serve ao resultado." },
                { n: "02", title: "Código com olho de designer", desc: "Componentes limpos, acessíveis e fiéis ao Figma. Nenhuma surpresa na entrega." },
                { n: "03", title: "Processo transparente", desc: "Checkpoints semanais, Figma compartilhado, repositório aberto. Você acompanha tudo." },
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
      <section className="relative py-20 overflow-hidden" style={{ background: "linear-gradient(135deg, #0891B2 0%, #0E7490 100%)" }}>
        <Dots className="right-20 top-4" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-4xl font-black text-white mb-4">Pronto para um produto digital que funciona?</h2>
            <p className="text-cyan-100 mb-8 text-lg">
              Me conta o projeto. Em 48h tenho um briefing inicial e estimativa de prazo.
            </p>
            <a href="#contato"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0891B2] font-bold rounded-full hover:bg-cyan-50 transition-all hover:scale-[1.02] shadow-xl text-sm">
              Agendar conversa gratuita
              <ArrowRight className="size-4" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ══ SERVICES ═════════════════════════════════════════════ */}
      <section id="servicos" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-14">
            <p className="text-[#0891B2] text-sm font-semibold uppercase tracking-widest mb-3">Serviços</p>
            <h2 className="text-4xl font-black text-[#0F172A] tracking-tight">O que posso construir com você</h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map(({ tag, title, desc, bullets, bg, accent, icon: Icon }, i) => (
              <FadeIn key={title} delay={i * 120}>
                <div className="group rounded-2xl overflow-hidden border border-[#E2E8F0] hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 flex flex-col h-full">
                  {/* Card header */}
                  <div className="relative h-48 flex items-end p-6" style={{ background: bg }}>
                    <div className="absolute inset-0 opacity-20"
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
                      Solicitar orçamento <ArrowRight className="size-3.5" />
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
              { target: 50, suffix: "+", label: "Projetos entregues" },
              { target: 7, suffix: "+", label: "Anos de experiência" },
              { target: 100, suffix: "%", label: "Entregas no prazo" },
              { target: 8, suffix: "–16", label: "Semanas por projeto", prefix: "" },
            ].map(({ target, suffix, label, prefix = "" }, i) => (
              <FadeIn key={label} delay={i * 80}>
                <div>
                  <div className="text-4xl font-black text-white mb-1">
                    <Counter target={target} suffix={suffix} prefix={prefix} />
                  </div>
                  <p className="text-slate-400 text-sm">{label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE ═══════════════════════════════════════════ */}
      <section className="relative py-28 bg-[#F8FAFC] overflow-hidden">
        <Dots className="left-0 bottom-0" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <div>
            <FadeIn>
              <p className="text-[#0891B2] text-sm font-semibold uppercase tracking-widest mb-4">Por que trabalhar comigo</p>
              <h2 className="text-4xl font-black text-[#0F172A] tracking-tight leading-tight mb-6">
                Um processo que elimina o retrabalho
              </h2>
              <p className="text-[#475569] leading-relaxed mb-8">
                A maioria dos problemas de entrega não é falta de talento — é falta de sincronia. Eu trabalho para que design e desenvolvimento evoluam juntos, não em sequência.
              </p>
            </FadeIn>

            <div className="space-y-4">
              {[
                { icon: Zap, title: "Iterações semanais", desc: "Você vê progresso todo sprint, não só na entrega final." },
                { icon: Layers, title: "Figma + código em sincronia", desc: "Tokens e componentes compartilhados entre os dois lados." },
                { icon: Users, title: "Comunicação direta", desc: "Sem intermediários. Você fala direto com quem produz." },
                { icon: Briefcase, title: "Foco em resultado", desc: "Métricas de negócio norteiam cada decisão de design." },
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
              { bg: "from-[#0891B2]/20 to-[#0891B2]/5", label: "UX Research", icon: Search },
              { bg: "from-[#7C3AED]/20 to-[#7C3AED]/5", label: "Design Systems", icon: Layers },
              { bg: "from-[#0066FF]/20 to-[#0066FF]/5", label: "Front-end", icon: Code2 },
              { bg: "from-[#0891B2]/10 to-[#7C3AED]/10", label: "Estratégia", icon: Globe },
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

      {/* ══ PROJECTS ═════════════════════════════════════════════ */}
      <section id="projetos" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <FadeIn>
              <p className="text-[#0891B2] text-sm font-semibold uppercase tracking-widest mb-3">Projetos</p>
              <h2 className="text-4xl font-black text-[#0F172A] tracking-tight">Trabalhos recentes</h2>
            </FadeIn>
            <FadeIn from="right">
              <a href="#" className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-[#0891B2] hover:gap-2.5 transition-all">
                Ver todos <ArrowRight className="size-4" />
              </a>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map(({ tag, title, desc, year }, i) => (
              <FadeIn key={title} delay={i * 80}>
                <div className="group rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white cursor-pointer">
                  {/* Image area */}
                  <div className="relative h-52 bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-30"
                      style={{ backgroundImage: "radial-gradient(rgba(8,145,178,.4) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                    <div className="relative text-4xl font-black text-white/20 select-none">{String(i + 1).padStart(2, "0")}</div>
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
      <section className="relative py-28 overflow-hidden" style={{ background: "linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)" }}>
        <Dots className="right-10 top-10" />
        <Dots className="left-10 bottom-10" />

        <div className="max-w-4xl mx-auto px-6">
          <FadeIn className="text-center mb-14">
            <p className="text-[#0891B2] text-sm font-semibold uppercase tracking-widest mb-3">Depoimentos</p>
            <h2 className="text-4xl font-black text-[#0F172A] tracking-tight">O que os clientes falam</h2>
          </FadeIn>

          <FadeIn>
            <div className="relative bg-white rounded-3xl p-10 shadow-xl border border-[#E2E8F0]">
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
                  <div className="size-12 rounded-full bg-gradient-to-br from-[#0891B2] to-[#7C3AED] flex items-center justify-center text-white font-bold text-lg">
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
      <section id="blog" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <FadeIn>
              <p className="text-[#0891B2] text-sm font-semibold uppercase tracking-widest mb-3">Blog</p>
              <h2 className="text-4xl font-black text-[#0F172A] tracking-tight">Artigos recentes</h2>
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
                  <div className="h-40 bg-gradient-to-br from-[#F1F5F9] to-[#E2E8F0] relative overflow-hidden flex items-end p-4">
                    <div className="absolute inset-0 opacity-40"
                      style={{ backgroundImage: "radial-gradient(rgba(8,145,178,.2) 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
                    <span className="relative text-xs font-bold px-2.5 py-1 rounded-full bg-[#0891B2]/10 text-[#0891B2] border border-[#0891B2]/20">
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
      <section className="relative py-20 bg-[#F8FAFC] overflow-hidden">
        <Dots className="right-20 top-4" />
        <Dots className="left-20 bottom-4" />

        <div className="max-w-2xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-[#0891B2] text-sm font-semibold uppercase tracking-widest mb-3">Newsletter</p>
            <h2 className="text-3xl font-black text-[#0F172A] mb-3">Design e código toda semana</h2>
            <p className="text-[#475569] mb-8">Insights sobre design systems, front-end e produto digital. Sem spam.</p>

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
      <section id="contato" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-start">
          <FadeIn from="left">
            <p className="text-[#0891B2] text-sm font-semibold uppercase tracking-widest mb-4">Contato</p>
            <h2 className="text-4xl font-black text-[#0F172A] tracking-tight mb-6">Vamos conversar sobre o seu projeto</h2>
            <p className="text-[#475569] leading-relaxed mb-10">
              Me conta o que você está construindo. Respondo em menos de 24h com um resumo inicial e próximos passos.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { icon: Mail, label: "Email", value: "oi@lucas.com" },
                { icon: Phone, label: "WhatsApp", value: "+55 (11) 99999-9999" },
                { icon: MapPin, label: "Localização", value: "São Paulo, SP — remoto" },
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

            <div className="flex gap-3">
              {[
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Github, label: "GitHub" },
                { icon: Instagram, label: "Instagram" },
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Nome</label>
                  <input type="text" placeholder="Seu nome"
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Email</label>
                  <input type="email" placeholder="seu@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Empresa</label>
                <input type="text" placeholder="Nome da empresa (opcional)"
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20" />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Tipo de projeto</label>
                <select className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20 text-[#475569]">
                  <option>App Mobile ou Web</option>
                  <option>Design System</option>
                  <option>Identidade Visual + Site</option>
                  <option>Consultoria</option>
                  <option>Outro</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Mensagem</label>
                <textarea rows={4} placeholder="Me conta o que você está construindo..."
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20 resize-none" />
              </div>
              <button type="submit"
                className="w-full py-4 bg-[#0891B2] hover:bg-[#0670A0] text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-cyan-500/20 text-sm">
                Enviar mensagem
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
              Lucas<span className="text-[#0891B2]">.</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Designer e desenvolvedor front-end. Design e código que conversam desde o dia 1.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Github, Instagram].map((Icon, i) => (
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
              {[["Sobre", "#sobre"], ["Serviços", "#servicos"], ["Projetos", "#projetos"], ["Blog", "#blog"], ["Contato", "#contato"]].map(
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
                <Mail className="size-3.5 text-[#0891B2] shrink-0" /> oi@lucas.com
              </li>
              <li className="flex items-center gap-2.5 text-slate-400 text-sm">
                <Phone className="size-3.5 text-[#0891B2] shrink-0" /> +55 (11) 99999-9999
              </li>
              <li className="flex items-center gap-2.5 text-slate-400 text-sm">
                <MapPin className="size-3.5 text-[#0891B2] shrink-0" /> São Paulo, SP
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-xs">© 2025 Lucas. Todos os direitos reservados.</p>
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
