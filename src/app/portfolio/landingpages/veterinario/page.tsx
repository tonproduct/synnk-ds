"use client"

import { useState, useEffect, useRef, ReactNode } from "react"
import {
  Stethoscope, Syringe, Scissors, Activity, Scan, Shield,
  ArrowRight, CheckCircle2,
  Menu, X, ChevronLeft, ChevronRight,
  Mail, Phone, MapPin, Instagram, Facebook, Youtube,
  Quote, Calendar, Clock, Star, Users, Heart,
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   FadeIn
   ───────────────────────────────────────────────────────────── */
function FadeIn({
  children, className = "", delay = 0, from = "bottom", style,
}: {
  children: ReactNode; className?: string; delay?: number; style?: React.CSSProperties
  from?: "bottom" | "left" | "right" | "top"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  const t: Record<string, string> = {
    bottom: "translateY(28px)", top: "translateY(-28px)",
    left: "translateX(-28px)", right: "translateX(28px)",
  }
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setV(true), delay); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el); return () => obs.disconnect()
  }, [delay])
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0, transform: v ? "none" : t[from],
      transition: `opacity .65s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .65s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      ...style,
    }}>{children}</div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Counter
   ───────────────────────────────────────────────────────────── */
function Counter({ to, suffix = "", duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [n, setN] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const s = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - s) / duration, 1)
          setN(Math.round((1 - Math.pow(1 - t, 3)) * to))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    obs.observe(el); return () => obs.disconnect()
  }, [to, duration])
  return <span ref={ref}>{n}{suffix}</span>
}

/* ─────────────────────────────────────────────────────────────
   Decorative elements
   ───────────────────────────────────────────────────────────── */
function Sparkle({ className = "", size = 20, color = "#0D0D3A" }: { className?: string; size?: number; color?: string }) {
  return (
    <svg className={`absolute pointer-events-none z-0 ${className}`} width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2 L13.2 10.8 L22 12 L13.2 13.2 L12 22 L10.8 13.2 L2 12 L10.8 10.8 Z" />
    </svg>
  )
}

function Squiggle({ className = "", color = "#FFD100" }: { className?: string; color?: string }) {
  return (
    <svg className={`absolute pointer-events-none z-0 ${className}`} width="64" height="44" viewBox="0 0 64 44" fill="none">
      <path d="M2 8 Q16 0 32 8 Q48 16 62 8" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M2 22 Q16 14 32 22 Q48 30 62 22" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M2 36 Q16 28 32 36 Q48 44 62 36" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function PawOutline({ className = "", size = 80, color = "#0D0D3A", opacity = 0.12 }: { className?: string; size?: number; color?: string; opacity?: number }) {
  return (
    <svg className={`absolute pointer-events-none z-0 ${className}`} width={size} height={size} viewBox="0 0 80 80" fill="none" stroke={color} strokeWidth="2" opacity={opacity}>
      <ellipse cx="40" cy="55" rx="18" ry="16" />
      <ellipse cx="18" cy="36" rx="8" ry="10" transform="rotate(-15 18 36)" />
      <ellipse cx="32" cy="24" rx="8" ry="10" />
      <ellipse cx="48" cy="24" rx="8" ry="10" />
      <ellipse cx="62" cy="36" rx="8" ry="10" transform="rotate(15 62 36)" />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────
   Data
   ───────────────────────────────────────────────────────────── */
const SERVICES = [
  { icon: Stethoscope, title: "Consulta Clínica", color: "#FF6B1A", desc: "Avaliação completa com exame físico detalhado e orientações personalizadas para seu pet." },
  { icon: Syringe, title: "Vacinação", color: "#FFD100", desc: "Calendário vacinal atualizado para cães, gatos e pequenos animais com registro e lembrete." },
  { icon: Scissors, title: "Banho & Tosa", color: "#4ADE80", desc: "Banho, tosa higiênica ou completa com produtos dermatologicamente testados e seguros." },
  { icon: Scan, title: "Exames & Diagnóstico", color: "#60A5FA", desc: "Laboratório completo, ultrassonografia, radiografia digital e eletrocardiograma no local." },
  { icon: Activity, title: "Emergência 24h", color: "#F87171", desc: "Plantão veterinário 24 horas por dia, 7 dias por semana, inclusive feriados e madrugadas." },
  { icon: Shield, title: "Cirurgia & Internação", color: "#A78BFA", desc: "Centro cirúrgico com monitoramento contínuo, anestesiologia e UTI veterinária." },
]

const STATS = [
  { label: "Animais atendidos", value: 8000, suffix: "+" },
  { label: "Anos de experiência", value: 15, suffix: "+" },
  { label: "Especialistas veterinários", value: 8, suffix: "" },
  { label: "Avaliações 5 estrelas", value: 850, suffix: "+" },
]

const TEAM = [
  {
    name: "Dra. Ana Rodrigues", role: "Clínica Geral & Medicina Interna", crmv: "CRMV-SP 12.345",
    img: "https://images.unsplash.com/photo-1559718062-361155fad299?w=400&h=480&fit=crop&q=80",
    color: "#FF6B1A",
  },
  {
    name: "Dr. Carlos Mendes", role: "Cirurgia Geral & Ortopedia", crmv: "CRMV-SP 23.456",
    img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=480&fit=crop&q=80",
    color: "#FFD100",
  },
  {
    name: "Dra. Beatriz Lima", role: "Dermatologia & Oftalmologia", crmv: "CRMV-SP 34.567",
    img: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=480&fit=crop&q=80",
    color: "#4ADE80",
  },
]

const TESTIMONIALS = [
  {
    name: "Mariana Costa", pet: "Tutora do Rex 🐕", stars: 5,
    text: "A PataVida salvou a vida do meu Golden! O atendimento de emergência às 2h da manhã foi incrível. A Dra. Ana é simplesmente maravilhosa — cuidadosa, humana e extremamente competente.",
    img: "https://picsum.photos/seed/client1v/80/80",
  },
  {
    name: "Pedro Alves", pet: "Tutor da Luna 🐈", stars: 5,
    text: "Minha gata Luna precisou de cirurgia e eu estava apavorado. A equipe inteira me deixou tranquilo durante todo o processo. Resultado perfeito, recuperação super rápida!",
    img: "https://picsum.photos/seed/client2v/80/80",
  },
  {
    name: "Julia Santos", pet: "Tutora do Bolt 🐕", stars: 5,
    text: "Clínica impecável, limpa e com equipamentos modernos. O Dr. Carlos é extremamente cuidadoso, explicou tudo com paciência. O Bolt adorou e eu saí super tranquila!",
    img: "https://picsum.photos/seed/client3v/80/80",
  },
]

const BLOG_PHOTOS = [
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=640&h=360&fit=crop&q=80",
  "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=640&h=360&fit=crop&q=80",
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=640&h=360&fit=crop&q=80",
]
const BLOG_POSTS = [
  { tag: "Saúde Pet", title: "Sinais de alerta que você não deve ignorar no seu pet", date: "10 Jan 2025", read: "5 min" },
  { tag: "Nutrição", title: "Alimentação natural: benefícios e cuidados essenciais", date: "22 Jan 2025", read: "7 min" },
  { tag: "Comportamento", title: "Como reduzir a ansiedade do seu pet na visita ao vet", date: "5 Fev 2025", read: "4 min" },
]

/* ─────────────────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────────────────── */
export default function VeterinarioPage() {
  const [scrolled, setScrolled] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [activeT, setActiveT] = useState(0)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]')
      if (!a) return
      const href = a.getAttribute("href")
      if (!href || href === "#") return
      const el = document.getElementById(href.slice(1))
      if (!el) return
      e.preventDefault(); el.scrollIntoView({ behavior: "smooth" })
    }
    document.addEventListener("click", fn); return () => document.removeEventListener("click", fn)
  }, [])

  const prevT = () => setActiveT(p => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const nextT = () => setActiveT(p => (p + 1) % TESTIMONIALS.length)

  return (
    <div className="font-sans overflow-x-hidden" style={{ color: "#1A1818" }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes floatR { 0%,100%{transform:translateY(0) rotate(3deg)} 50%{transform:translateY(-8px) rotate(3deg)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>

      {/* ══ NAV ══════════════════════════════════════════════════ */}
      <nav className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,248,240,.97)" : "transparent",
          boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,.06)" : "none",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 font-black text-xl shrink-0">
            <span className="size-9 rounded-xl flex items-center justify-center" style={{ background: "#FF6B1A" }}>
              <svg viewBox="0 0 24 24" className="size-5 text-white" fill="white">
                <path d="M4.5 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm15 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM8 7.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm8 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM12 22c-4 0-7-2.5-7-6.5C5 11 7.5 9 12 9s7 2 7 6.5c0 4-3 6.5-7 6.5z" />
              </svg>
            </span>
            Pata<span style={{ color: "#FF6B1A" }}>Vida</span>
          </a>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold" style={{ color: "#1A1818" }}>
            {[["Serviços", "#servicos"], ["Sobre nós", "#sobre"], ["Equipe", "#equipe"], ["Blog", "#blog"], ["Contato", "#contato"]].map(([l, h]) => (
              <a key={l} href={h} className="hover:text-[#FF6B1A] transition-colors">{l}</a>
            ))}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+551132650900" className="text-sm font-bold transition-colors" style={{ color: "#FF6B1A" }}>
              (11) 3265-0900
            </a>
            <a href="#contato"
              className="px-5 py-2.5 font-bold text-sm rounded-full transition-all hover:scale-[1.03]"
              style={{ background: "#FFD100", color: "#1A1818" }}>
              Agendar consulta
            </a>
          </div>

          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden p-2">
            {navOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {navOpen && (
          <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4" style={{ borderColor: "#F0E8DF" }}>
            {[["Serviços", "#servicos"], ["Sobre nós", "#sobre"], ["Equipe", "#equipe"], ["Blog", "#blog"], ["Contato", "#contato"]].map(([l, h]) => (
              <a key={l} href={h} onClick={() => setNavOpen(false)} className="text-sm font-semibold hover:text-[#FF6B1A] transition-colors">{l}</a>
            ))}
            <a href="#contato" className="font-bold text-sm pt-2 border-t" style={{ color: "#FF6B1A", borderColor: "#F0E8DF" }}>
              Agendar consulta →
            </a>
          </div>
        )}
      </nav>

      {/* ══ HERO ═════════════════════════════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#FFF5EF" }}>

        {/* Decorações fixas */}
        <Sparkle className="left-[8%] top-[22%]" size={24} color="#0D0D3A" />
        <Sparkle className="left-[38%] top-[18%]" size={18} color="#0D0D3A" />
        <Sparkle className="left-[18%] bottom-[12%]" size={14} color="#0D0D3A" />
        <Sparkle className="right-[38%] bottom-[8%]" size={16} color="#0D0D3A" />
        <PawOutline className="right-[3%] top-[6%]" size={90} color="#0D0D3A" opacity={0.14} />
        <Squiggle className="right-[28%] bottom-[18%]" color="#FFD100" />

        {/* Blob rosa */}
        <div className="absolute -bottom-24 -left-24 size-[340px] rounded-full pointer-events-none z-0"
          style={{ background: "#FFCDB8", opacity: 0.55 }} />

        {/* Círculo amarelo grande (atrás da foto) */}
        <div className="hidden sm:block absolute right-[-80px] top-[10%] size-[520px] rounded-full pointer-events-none z-0"
          style={{ background: "#FFD100", opacity: 0.85 }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 grid md:grid-cols-2 gap-8 items-center w-full">

          {/* Left */}
          <div className="max-w-xl">
            <FadeIn delay={0}>
              <p className="text-sm font-black uppercase tracking-wide mb-4" style={{ color: "#FF6B1A" }}>
                Porque Todo Pet Importa!
              </p>
            </FadeIn>

            <FadeIn delay={80}>
              <h1 className="font-black leading-[1.04] tracking-tight mb-5" style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", color: "#1A1818" }}>
                Cuidado e Amor<br />
                para <span style={{ color: "#1A1818" }}>Patas e </span>
                <span className="relative inline-block">
                  Pelos!
                  <span className="absolute left-0 -bottom-1 h-[5px] w-full rounded-full" style={{ background: "#FFD100" }} />
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={160}>
              <p className="text-base leading-relaxed mb-10 max-w-sm" style={{ color: "#5A4A42" }}>
                Somos sua clínica veterinária local, oferecendo cuidado completo e atenção especial para o seu melhor amigo.
              </p>
            </FadeIn>

            <FadeIn delay={240}>
              <div className="flex flex-wrap items-center gap-5">
                {/* Yellow CTA */}
                <a href="#contato"
                  className="inline-flex items-center gap-2 px-8 py-4 font-black text-sm rounded-full transition-all hover:scale-[1.04]"
                  style={{ background: "#FFD100", color: "#1A1818", boxShadow: "0 6px 20px rgba(255,209,0,.4)" }}>
                  Agendar Consulta
                  <ArrowRight className="size-4" />
                </a>

                {/* Phone CTA */}
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "#FF6B1A", boxShadow: "0 4px 16px rgba(255,107,26,.35)" }}>
                    <Phone className="size-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold" style={{ color: "#5A4A42" }}>Tem alguma dúvida?</div>
                    <a href="tel:+551132650900" className="font-black text-base" style={{ color: "#FF6B1A" }}>
                      (11) 3265-0900
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={340} className="flex flex-wrap gap-5 mt-10 text-sm font-semibold" style={{ color: "#5A4A42" }}>
              {["5.000+ animais atendidos", "Plantão 24h", "15+ anos de experiência"].map(b => (
                <div key={b} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 shrink-0" style={{ color: "#FF6B1A" }} />
                  {b}
                </div>
              ))}
            </FadeIn>
          </div>

          {/* Right — mosaico de pets */}
          <FadeIn delay={60} from="right" className="relative hidden md:flex justify-center items-center h-[580px]">
            <style>{`
              @keyframes petFloat0 {
                from { transform: rotate(-2deg)   translateY(0px); }
                to   { transform: rotate(-2deg)   translateY(-14px); }
              }
              @keyframes petFloat1 {
                from { transform: rotate(2.5deg)  translateY(0px); }
                to   { transform: rotate(2.5deg)  translateY(-9px); }
              }
              @keyframes petFloat2 {
                from { transform: rotate(-1.5deg) translateY(0px); }
                to   { transform: rotate(-1.5deg) translateY(-11px); }
              }
              @keyframes petFloat3 {
                from { transform: rotate(2deg)    translateY(0px); }
                to   { transform: rotate(2deg)    translateY(-16px); }
              }
            `}</style>
            <div className="grid grid-cols-2 gap-3 w-full max-w-[460px]">
              {[
                { src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop&q=80", alt: "Cachorro", h: 270, anim: "petFloat0", dur: 3.2,  delay: 0   },
                { src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&q=80", alt: "Gato",     h: 230, anim: "petFloat1", dur: 2.8,  delay: 500 },
                { src: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop&q=80", alt: "Coelho",   h: 230, anim: "petFloat2", dur: 3.6,  delay: 300 },
                { src: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=400&fit=crop&q=80", alt: "Pássaro",  h: 270, anim: "petFloat3", dur: 3.0,  delay: 800 },
              ].map((p) => (
                <div
                  key={p.alt}
                  className="rounded-3xl overflow-hidden shadow-xl"
                  style={{
                    height: p.h,
                    animation: `${p.anim} ${p.dur}s ease-in-out ${p.delay}ms infinite alternate`,
                    willChange: "transform",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.alt} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ STATS ════════════════════════════════════════════════ */}
      <section className="py-14" style={{ background: "#1A1818" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map(({ label, value, suffix }, i) => (
              <FadeIn key={label} delay={i * 80}>
                <div className="text-4xl font-black mb-1" style={{ color: "#FFD100" }}>
                  <Counter to={value} suffix={suffix} />
                </div>
                <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,.6)" }}>{label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICES ═════════════════════════════════════════════ */}
      <section id="servicos" className="relative py-14 md:py-28 overflow-hidden" style={{ background: "#FFF5EF" }}>
        <Sparkle className="right-[6%] top-[8%]" size={22} color="#0D0D3A" />
        <Sparkle className="left-[4%] bottom-[12%]" size={18} color="#FFD100" />
        <PawOutline className="left-[2%] top-[5%]" size={80} color="#FF6B1A" opacity={0.1} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-sm font-black uppercase tracking-widest mb-3" style={{ color: "#FF6B1A" }}>Nossos serviços</p>
            <h2 className="text-4xl md:text-5xl font-black" style={{ color: "#1A1818" }}>
              Tudo que seu pet precisa
            </h2>
            <p className="mt-3 max-w-md mx-auto text-base" style={{ color: "#5A4A42" }}>
              Atendimento completo do mais simples ao mais complexo, com a mesma dedicação.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map(({ icon: Icon, title, desc, color }, i) => (
              <FadeIn key={title} delay={i * 70}>
                <div className="group bg-white rounded-3xl p-7 border-2 border-transparent hover:border-[#FFD100] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-default"
                  style={{ boxShadow: "0 2px 16px rgba(0,0,0,.05)" }}>
                  <div className="size-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: `${color}18` }}>
                    <Icon className="size-7" style={{ color }} />
                  </div>
                  <h3 className="text-lg font-black mb-2" style={{ color: "#1A1818" }}>{title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#5A4A42" }}>{desc}</p>
                  <button className="flex items-center gap-1.5 text-sm font-bold transition-colors" style={{ color: "#FF6B1A" }}>
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
        <Squiggle className="right-[5%] top-[8%]" color="#FFD100" />
        <Sparkle className="left-[5%] top-[15%]" size={20} color="#0D0D3A" />
        <PawOutline className="right-[2%] bottom-[5%]" size={100} color="#FF6B1A" opacity={0.08} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* Photo side */}
            <FadeIn from="left">
              <div className="relative">
                {/* Yellow circle bg */}
                <div className="absolute -bottom-8 -left-8 size-72 rounded-full z-0" style={{ background: "#FFD100", opacity: 0.25 }} />
                <div className="absolute -top-6 -right-6 size-48 rounded-full z-0" style={{ background: "#FF6B1A", opacity: 0.12 }} />

                <div className="relative z-10 rounded-3xl overflow-hidden border-4 border-white"
                  style={{ boxShadow: "0 24px 60px rgba(0,0,0,.12)", aspectRatio: "4/5" }}>
                  <img
                    src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=640&h=800&fit=crop&q=80"
                    alt="Clínica PataVida"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating stat card */}
                <div className="absolute -right-8 bottom-12 z-20 bg-white rounded-2xl px-5 py-4 hidden sm:block"
                  style={{ boxShadow: "0 8px 32px rgba(0,0,0,.12)", animation: "float 3.2s ease-in-out infinite" }}>
                  <div className="text-3xl font-black" style={{ color: "#FF6B1A" }}>15+</div>
                  <div className="text-xs font-bold" style={{ color: "#5A4A42" }}>Anos de experiência</div>
                </div>
              </div>
            </FadeIn>

            {/* Text */}
            <div>
              <FadeIn from="right">
                <p className="text-sm font-black uppercase tracking-widest mb-4" style={{ color: "#FF6B1A" }}>Sobre nós</p>
                <h2 className="text-4xl md:text-5xl font-black leading-[1.05] mb-6" style={{ color: "#1A1818" }}>
                  Especialistas que
                  <span className="relative ml-3 inline-block">
                    amam
                    <span className="absolute left-0 -bottom-1 h-[4px] w-full rounded-full" style={{ background: "#FFD100" }} />
                  </span>
                  <br />cada animal
                </h2>
                <p className="leading-relaxed mb-5" style={{ color: "#5A4A42" }}>
                  Fundada em 2010, a PataVida nasceu do sonho de oferecer atendimento veterinário de alto nível com o calor humano que os pets e seus tutores merecem.
                </p>
                <p className="leading-relaxed mb-8" style={{ color: "#5A4A42" }}>
                  Nosso time reúne veterinários pós-graduados em diversas especialidades, prontos para cuidar do seu companheiro com dedicação, segurança e amor.
                </p>
              </FadeIn>

              <FadeIn from="right" delay={100}>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { icon: Heart, label: "Atendimento humanizado" },
                    { icon: Scan, label: "Tecnologia avançada" },
                    { icon: Clock, label: "Plantão 24 horas" },
                    { icon: Users, label: "Equipe pós-graduada" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: "#FFF5EF" }}>
                      <div className="size-8 rounded-xl shrink-0 flex items-center justify-center" style={{ background: "#FF6B1A18" }}>
                        <Icon className="size-4" style={{ color: "#FF6B1A" }} />
                      </div>
                      <span className="text-sm font-bold" style={{ color: "#1A1818" }}>{label}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn from="right" delay={180}>
                <a href="#contato"
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-black text-sm rounded-full transition-all hover:scale-[1.03]"
                  style={{ background: "#FFD100", color: "#1A1818", boxShadow: "0 6px 20px rgba(255,209,0,.4)" }}>
                  Conhecer a clínica <ArrowRight className="size-4" />
                </a>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TEAM ═════════════════════════════════════════════════ */}
      <section id="equipe" className="relative py-14 md:py-28 overflow-hidden" style={{ background: "#FFF5EF" }}>
        <Sparkle className="right-[8%] top-[10%]" size={20} color="#0D0D3A" />
        <Sparkle className="left-[6%] bottom-[8%]" size={16} color="#FFD100" />
        <PawOutline className="left-[3%] top-[8%]" size={80} color="#0D0D3A" opacity={0.08} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-sm font-black uppercase tracking-widest mb-3" style={{ color: "#FF6B1A" }}>Nossa equipe</p>
            <h2 className="text-4xl md:text-5xl font-black" style={{ color: "#1A1818" }}>
              Veterinários apaixonados
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {TEAM.map(({ name, role, crmv, img, color }, i) => (
              <FadeIn key={name} delay={i * 100}>
                <div className="group text-center">
                  <div className="relative w-52 h-52 mx-auto mb-5">
                    {/* Colored circle bg */}
                    <div className="absolute inset-0 rounded-full transition-transform group-hover:scale-110 duration-300"
                      style={{ background: color, opacity: 0.2 }} />
                    <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-white"
                      style={{ boxShadow: "0 8px 30px rgba(0,0,0,.12)" }}>
                      <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                  <h3 className="text-lg font-black mb-1" style={{ color: "#1A1818" }}>{name}</h3>
                  <p className="text-sm font-bold mb-1" style={{ color }}>  {role}</p>
                  <p className="text-xs" style={{ color: "#5A4A42" }}>{crmv}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═════════════════════════════════════════ */}
      <section className="relative py-14 md:py-28 overflow-hidden" style={{ background: "#1A1818" }}>
        <Sparkle className="left-[4%] top-[10%]" size={22} color="#FFD100" />
        <Sparkle className="right-[6%] bottom-[12%]" size={18} color="#FF6B1A" />
        <PawOutline className="right-[3%] top-[5%]" size={100} color="white" opacity={0.06} />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <p className="text-sm font-black uppercase tracking-widest mb-3" style={{ color: "#FF6B1A" }}>Depoimentos</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">O que os tutores dizem</h2>
          </FadeIn>

          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`transition-all duration-500 ${i === activeT ? "block opacity-100" : "hidden opacity-0"}`}>
              <div className="rounded-3xl p-8 md:p-10"
                style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)" }}>
                <Quote className="size-10 mb-5" style={{ color: "#FFD100", opacity: 0.6 }} />
                <p className="text-white text-lg leading-relaxed mb-8">{t.text}</p>
                <div className="flex items-center gap-4">
                  <img src={t.img} alt={t.name} className="size-12 rounded-full object-cover border-2" style={{ borderColor: "#FFD100" }} />
                  <div>
                    <div className="text-white font-black">{t.name}</div>
                    <div className="text-sm" style={{ color: "#FF6B1A" }}>{t.pet}</div>
                  </div>
                  <div className="ml-auto flex gap-1">
                    {[...Array(t.stars)].map((_, j) => <Star key={j} className="size-4 fill-[#FFD100] text-[#FFD100]" />)}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prevT} className="size-10 rounded-full border flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              style={{ background: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.15)" }}>
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActiveT(i)}
                  className="h-2 rounded-full transition-all"
                  style={{ width: i === activeT ? "24px" : "8px", background: i === activeT ? "#FFD100" : "rgba(255,255,255,.25)" }} />
              ))}
            </div>
            <button onClick={nextT} className="size-10 rounded-full border flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              style={{ background: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.15)" }}>
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ══ BLOG ═════════════════════════════════════════════════ */}
      <section id="blog" className="relative py-14 md:py-28 overflow-hidden" style={{ background: "#FFF5EF" }}>
        <Sparkle className="right-[4%] top-[8%]" size={18} color="#0D0D3A" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-sm font-black uppercase tracking-widest mb-3" style={{ color: "#FF6B1A" }}>Blog</p>
            <h2 className="text-4xl md:text-5xl font-black" style={{ color: "#1A1818" }}>Dicas para o seu pet</h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {BLOG_POSTS.map(({ tag, title, date, read }, i) => (
              <FadeIn key={i} delay={i * 80}>
                <article className="group bg-white rounded-3xl overflow-hidden border-2 border-transparent hover:border-[#FFD100] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                  style={{ boxShadow: "0 2px 16px rgba(0,0,0,.05)" }}>
                  <div className="h-48 relative overflow-hidden">
                    <img src={BLOG_PHOTOS[i]} alt={tag}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute bottom-3 left-3 text-xs font-black px-3 py-1 rounded-full"
                      style={{ background: "#FFD100", color: "#1A1818" }}>
                      {tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-black leading-snug mb-4 group-hover:text-[#FF6B1A] transition-colors" style={{ color: "#1A1818" }}>{title}</h3>
                    <div className="flex items-center gap-4 text-xs font-semibold" style={{ color: "#5A4A42" }}>
                      <span className="flex items-center gap-1"><Calendar className="size-3.5" /> {date}</span>
                      <span className="flex items-center gap-1"><Clock className="size-3.5" /> {read} de leitura</span>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══════════════════════════════════════════════ */}
      <section id="contato" className="relative py-14 md:py-28 bg-white overflow-hidden">
        <Squiggle className="left-[4%] top-[6%]" color="#FFD100" />
        <Sparkle className="right-[6%] bottom-[10%]" size={20} color="#0D0D3A" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

            {/* Info */}
            <FadeIn from="left">
              <p className="text-sm font-black uppercase tracking-widest mb-4" style={{ color: "#FF6B1A" }}>Contato</p>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6" style={{ color: "#1A1818" }}>
                Agende uma<br />
                <span className="relative inline-block">
                  consulta
                  <span className="absolute left-0 -bottom-1 h-[5px] w-full rounded-full" style={{ background: "#FFD100" }} />
                </span>
              </h2>
              <p className="leading-relaxed mb-8" style={{ color: "#5A4A42" }}>
                Entre em contato pelo formulário, WhatsApp ou telefone. Nossa equipe confirma seu agendamento em até 1 hora.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Phone, label: "WhatsApp / Telefone", value: "+55 (11) 3265-0900" },
                  { icon: Mail, label: "E-mail", value: "contato@patavida.com.br" },
                  { icon: MapPin, label: "Endereço", value: "R. Oscar Freire, 123 – Jardins, São Paulo – SP" },
                  { icon: Clock, label: "Funcionamento", value: "Seg–Sex: 8h–20h  |  Sáb: 8h–16h  |  Emergência: 24h" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-4 p-4 rounded-2xl" style={{ background: "#FFF5EF" }}>
                    <div className="size-10 rounded-xl shrink-0 flex items-center justify-center" style={{ background: "#FF6B1A18" }}>
                      <Icon className="size-4" style={{ color: "#FF6B1A" }} />
                    </div>
                    <div>
                      <div className="text-xs font-bold mb-0.5" style={{ color: "#5A4A42" }}>{label}</div>
                      <div className="text-sm font-bold" style={{ color: "#1A1818" }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn from="right">
              <div className="rounded-3xl p-8 border-2" style={{ background: "#FFF5EF", borderColor: "#FFD100" }}>
                <h3 className="text-xl font-black mb-6" style={{ color: "#1A1818" }}>Solicitar agendamento</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[["Nome do tutor", "Seu nome", "text"], ["Nome do pet", "Nome do pet", "text"]].map(([label, ph, type]) => (
                      <div key={label}>
                        <label className="text-xs font-black mb-1.5 block" style={{ color: "#5A4A42" }}>{label}</label>
                        <input type={type} placeholder={ph}
                          className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors bg-white"
                          style={{ borderColor: "#F0E8DF", color: "#1A1818" }} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="text-xs font-black mb-1.5 block" style={{ color: "#5A4A42" }}>Telefone / WhatsApp</label>
                    <input type="tel" placeholder="(11) 99999-9999"
                      className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors bg-white"
                      style={{ borderColor: "#F0E8DF", color: "#1A1818" }} />
                  </div>
                  <div>
                    <label className="text-xs font-black mb-1.5 block" style={{ color: "#5A4A42" }}>Serviço desejado</label>
                    <select className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors bg-white"
                      style={{ borderColor: "#F0E8DF", color: "#1A1818" }}>
                      <option value="">Selecione um serviço</option>
                      {SERVICES.map(s => <option key={s.title}>{s.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-black mb-1.5 block" style={{ color: "#5A4A42" }}>Mensagem (opcional)</label>
                    <textarea rows={3} placeholder="Descreva o motivo da consulta..."
                      className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors resize-none bg-white"
                      style={{ borderColor: "#F0E8DF", color: "#1A1818" }} />
                  </div>
                  <button className="w-full py-4 font-black text-sm rounded-xl transition-all hover:scale-[1.01]"
                    style={{ background: "#FFD100", color: "#1A1818", boxShadow: "0 4px 16px rgba(255,209,0,.4)" }}>
                    Solicitar agendamento →
                  </button>
                  <p className="text-xs text-center font-semibold" style={{ color: "#5A4A42" }}>
                    Retornamos em até 1 hora · Sem compromisso
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════ */}
      <footer style={{ background: "#0D0D1A", color: "white" }} className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 pb-10 border-b" style={{ borderColor: "rgba(255,255,255,.08)" }}>
            <div className="md:col-span-2">
              <a href="#hero" className="font-black text-2xl mb-4 inline-flex items-center gap-2">
                <span className="size-8 rounded-lg flex items-center justify-center" style={{ background: "#FF6B1A" }}>
                  <svg viewBox="0 0 24 24" className="size-4" fill="white">
                    <path d="M4.5 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm15 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM8 7.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm8 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM12 22c-4 0-7-2.5-7-6.5C5 11 7.5 9 12 9s7 2 7 6.5c0 4-3 6.5-7 6.5z" />
                  </svg>
                </span>
                Pata<span style={{ color: "#FF6B1A" }}>Vida</span>
              </a>
              <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "rgba(255,255,255,.5)" }}>
                Cuidando de animais com amor e dedicação desde 2010. Clínica veterinária completa no coração de São Paulo.
              </p>
              <div className="flex gap-3">
                {[Instagram, Facebook, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="size-9 rounded-xl flex items-center justify-center transition-colors"
                    style={{ background: "rgba(255,255,255,.08)" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#FF6B1A")}
                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,.08)")}>
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-black mb-4 text-sm uppercase tracking-wider" style={{ color: "#FF6B1A" }}>Serviços</h4>
              <ul className="space-y-2">
                {SERVICES.map(s => (
                  <li key={s.title}>
                    <a href="#servicos" className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,.5)" }}>{s.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-4 text-sm uppercase tracking-wider" style={{ color: "#FF6B1A" }}>Contato</h4>
              <ul className="space-y-3">
                {[
                  { I: Phone, t: "(11) 3265-0900" },
                  { I: Mail, t: "contato@patavida.com.br" },
                  { I: MapPin, t: "R. Oscar Freire, 123 – Jardins, SP" },
                  { I: Clock, t: "Emergência 24h" },
                ].map(({ I, t }) => (
                  <li key={t} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,.5)" }}>
                    <I className="size-3.5 shrink-0 mt-0.5" style={{ color: "#FF6B1A" }} /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ color: "rgba(255,255,255,.3)" }}>
            <span>© {new Date().getFullYear()} PataVida Clínica Veterinária. Todos os direitos reservados.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos de uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
