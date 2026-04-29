"use client"

import { useState, useRef, useEffect } from "react"
import type { CSSProperties, ReactNode } from "react"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

/* ── Assets from Figma ─────────────────────────────────────── */
const imgHero        = "/droneiros/hero.png"
const imgHowItWorks  = "/droneiros/how-it-works.png"
const imgDrone       = "/droneiros/drone.png"
const imgCard1       = "/droneiros/card1.png"
const imgCard2       = "/droneiros/card2.png"
const imgCard3       = "/droneiros/card3.png"
const imgCardBg      = "/droneiros/retangle.png"
const imgLevelCard1  = "/droneiros/level-card1.png"
const imgLevelCard2  = "/droneiros/level-card2.png"
const imgInfoSection = "/droneiros/info-section.png"
const imgCtaBg       = "/droneiros/cta-bg.png"
const imgPilot       = "/droneiros/pilot.png"
const imgLogoMark    = "/droneiros/logo-mark.svg"
const imgLogoFull    = "/droneiros/logo-full.png"
const imgCheck       = "/droneiros/check.svg"

/* ── Palette ───────────────────────────────────────────────── */
const bg     = "#121212"
const orange = "#f97316"
const cream  = "#fffcf0"

/* ── Font CSS variables ─────────────────────────────────────── */
const fInter    = "var(--font-inter), sans-serif"
const fBarlow   = "var(--font-barlow), sans-serif"
const fDmSans   = "var(--font-dm-sans), sans-serif"
const fOpenSans = "var(--font-open-sans), sans-serif"
const fArchivo  = "var(--font-archivo), sans-serif"

/* ── Nav links ──────────────────────────────────────────────── */
const navLinks = [
  { label: "Inicio",                id: "inicio"                },
  { label: "Como funciona",         id: "como-funciona"         },
  { label: "Níveis de Voluntários", id: "niveis-de-voluntarios" },
  { label: "Porque existimos",      id: "porque-existimos"      },
]

/* ══════════════════════════════════════════════════════════════
   Animation helpers
══════════════════════════════════════════════════════════════ */

const ease = "cubic-bezier(.16,1,.3,1)"

/** Fires `true` once when the element enters the viewport */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible] as const
}

/** Simple parallax: offset = scrollY × speed (good for hero background) */
function useScrollParallax(speed = 0.2) {
  const [y, setY] = useState(0)
  useEffect(() => {
    const fn = () => setY(window.scrollY * speed)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [speed])
  return y
}

/** Element-relative parallax: offset based on element's distance from viewport center */
function useElementParallax(speed = 0.18) {
  const ref = useRef<HTMLDivElement>(null)
  const [y, setY] = useState(0)
  useEffect(() => {
    const update = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      setY((rect.top + rect.height / 2 - window.innerHeight / 2) * speed)
    }
    window.addEventListener("scroll", update, { passive: true })
    update()
    return () => window.removeEventListener("scroll", update)
  }, [speed])
  return [ref, y] as const
}

/** Slides + fades in when element enters the viewport */
function Reveal({
  children, delay = 0, from = "bottom", style: s, className = "",
}: {
  children: ReactNode
  delay?: number
  from?: "bottom" | "left" | "right" | "top"
  style?: CSSProperties
  className?: string
}) {
  const [ref, visible] = useInView()
  const hiddenTransform = {
    bottom: "translateY(44px)",
    top:    "translateY(-44px)",
    left:   "translateX(-44px)",
    right:  "translateX(44px)",
  }[from]
  return (
    <div ref={ref} className={className} style={{
      opacity:    visible ? 1 : 0,
      transform:  visible ? "none" : hiddenTransform,
      transition: `opacity .75s ${ease} ${delay}ms, transform .75s ${ease} ${delay}ms`,
      willChange: "opacity, transform",
      ...s,
    }}>
      {children}
    </div>
  )
}

/* ── Navbar ─────────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false)

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10"
      style={{ background: "linear-gradient(90deg,rgba(0,0,0,0.32),rgba(0,0,0,0.32)),rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">

        <span style={{
          display: "block", flexShrink: 0,
          width: 80, height: 51,
          backgroundImage: `url(${imgLogoMark})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left center",
        }} />

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)}
              className="text-white/80 hover:text-white text-base transition-colors bg-transparent border-0 cursor-pointer"
              style={{ fontFamily: fInter }}>
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <button className="px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: cream, color: "#454545", fontFamily: fDmSans }}>
            Seja voluntário
          </button>
          <button className="px-5 py-2.5 rounded-full text-sm font-semibold text-white border-2 border-white bg-transparent cursor-pointer hover:bg-white/10 transition-colors"
            style={{ fontFamily: fDmSans }}>
            Entrar
          </button>
        </div>

        <button className="lg:hidden text-white text-2xl bg-transparent border-0 cursor-pointer" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="lg:hidden px-6 pb-6 flex flex-col gap-4" style={{ backgroundColor: bg }}>
          {navLinks.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)}
              className="text-white/80 text-left bg-transparent border-0 cursor-pointer py-1"
              style={{ fontFamily: fInter }}>
              {l.label}
            </button>
          ))}
          <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
            <button className="px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer"
              style={{ backgroundColor: cream, color: "#454545", fontFamily: fDmSans }}>
              Seja voluntário
            </button>
            <button className="px-5 py-2.5 rounded-full text-sm font-semibold text-white border-2 border-white bg-transparent cursor-pointer"
              style={{ fontFamily: fDmSans }}>
              Entrar
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

/* ── Hero ───────────────────────────────────────────────────── */
function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  const bgParallax = useScrollParallax(0.2)

  const anim = (delay = 0): CSSProperties => ({
    opacity:    mounted ? 1 : 0,
    transform:  mounted ? "none" : "translateY(36px)",
    transition: `opacity .9s ${ease} ${delay}ms, transform .9s ${ease} ${delay}ms`,
  })

  return (
    <section id="inicio" className="relative overflow-hidden" style={{ minHeight: 572, backgroundColor: bg }}>
      <div className="absolute inset-0" style={{ overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgHero} alt=""
          className="absolute w-full object-cover object-center"
          style={{
            inset: "-12% 0",
            height: "124%",
            transform: `translateY(${bgParallax}px)`,
          }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(-28deg,rgba(0,0,0,0) 42%,rgba(18,18,18,0.8) 75%),linear-gradient(180deg,rgba(0,0,0,0) 67%,rgba(18,18,18,1) 100%),linear-gradient(90deg,rgba(255,80,41,0.12),rgba(255,80,41,0.12))"
        }} />
      </div>
      <div className="relative z-10 flex items-center" style={{ minHeight: 572 }}>
        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-10 py-20 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-[#f7f7f7] leading-[1.15] tracking-[-1px]"
              style={{ fontSize: "clamp(32px,5vw,60px)", fontFamily: fInter, maxWidth: 835, ...anim(0) }}>
              Conectando voluntários<br />com operações reais
            </h1>
            <p className="text-[#e5e7eb] leading-relaxed"
              style={{ fontSize: "clamp(16px,1.8vw,20px)", fontFamily: fBarlow, maxWidth: 580, ...anim(130) }}>
              Conheça a plataforma que conecta pilotos de drone com operações da Defesa Civil que exigem apoio aéreo especializado
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap" style={anim(260)}>
            <button className="px-8 py-4 rounded-full text-white font-normal text-base cursor-pointer hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: orange,
                border: "1px solid rgba(255,255,255,0.56)",
                boxShadow: "0px 1px 2px rgba(62,34,13,0.5),0px 0px 0px 4px #671d13",
                fontFamily: fDmSans,
              }}>
              Seja um voluntário
            </button>
            <button className="px-8 py-4 rounded-full text-white text-base border border-white cursor-pointer hover:bg-white/10 transition-colors"
              style={{ backgroundColor: "rgba(255,255,255,0.14)", fontFamily: fDmSans }}>
              Sou defesa civil
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Brand ──────────────────────────────────────────────────── */
function Brand() {
  return (
    <section style={{ backgroundColor: bg, minHeight: 600 }} className="py-20 md:py-52 flex items-center">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        <Reveal from="left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgLogoFull} alt="Droneiros Voluntários"
            className="d-brand-logo" />
        </Reveal>
        <Reveal from="right" delay={160}>
          <p className="text-[#e5e7eb] leading-[1.7] opacity-80"
            style={{ fontSize: "clamp(16px,1.6vw,20px)", fontFamily: fBarlow }}>
            Transformamos entusiastas de drone em recursos estratégicos para resposta a emergências. Nossa plataforma garante que quando a Defesa Civil precisa de visão aérea, há pilotos qualificados, próximos e equipados prontos para contribuir.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Como Funciona ──────────────────────────────────────────── */
function ComoFunciona() {
  const steps = [
    { n: 1, title: "JUNTE-SE À REDE",  desc: "Cadastre-se e faça parte da rede nacional de pilotos voluntários",                img: imgCard1 },
    { n: 2, title: "Receba chamados",   desc: "Responda a chamados reais de Defesas Civis quando estiver disponível",             img: imgCard2 },
    { n: 3, title: "FORTALEÇA A REDE", desc: "Seus voos alimentam operações da Defesa Civil em dezenas de cidades brasileiras",  img: imgCard3 },
  ]

  const [droneRef, droneY] = useElementParallax(0.14)

  return (
    <section id="como-funciona" className="relative overflow-hidden" style={{ backgroundColor: bg }}>
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgHowItWorks} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.45 }} />
        <div className="absolute inset-0" style={{ background: "rgba(255,80,41,0.06)" }} />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%]" style={{ minHeight: 620 }}>

          {/* ── Left column: drone image + title ── */}
          <div className="flex flex-col pt-10 pb-12 pr-0 lg:pr-8">
            <div ref={droneRef} className="flex-1 flex items-start" style={{ minHeight: 280 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgDrone} alt="Drone"
                className="w-full h-full object-contain object-top"
                style={{ maxHeight: 380, transform: `scaleX(-1) translateY(${droneY}px)` }} />
            </div>
            <Reveal from="left" delay={80}>
              <h2 className="font-bold leading-none mt-6"
                style={{
                  fontSize: "clamp(42px,5vw,64px)", fontFamily: fInter,
                  background: "linear-gradient(180deg,#fff 60%,#888 140%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                Como<br />funciona
              </h2>
            </Reveal>
          </div>

          {/* ── Right column: cards ── */}
          <div className="flex items-center py-10 lg:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full -mr-6 md:-mr-10">
              {steps.map((s, i) => (
                <Reveal key={s.n} from="bottom" delay={i * 130}>
                  <div className="rounded-xl border border-[#747474] overflow-hidden flex flex-col"
                    style={{ backgroundColor: bg, height: 360 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.img} alt="" className="w-full object-cover flex-shrink-0" style={{ height: 200 }} />
                    <div className="p-5 flex flex-col gap-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[11px] leading-none flex items-center justify-center rounded-full flex-shrink-0"
                          style={{ width: 22, height: 22, backgroundColor: orange, color: "white", fontFamily: fInter }}>
                          {s.n}
                        </span>
                        <p className="text-white font-bold text-[13px] uppercase tracking-wide" style={{ fontFamily: fInter }}>{s.title}</p>
                      </div>
                      <p className="text-white/60 text-[12px] leading-relaxed" style={{ fontFamily: fInter, fontWeight: 300 }}>{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ── Níveis ──────────────────────────────────────────────────── */
function Niveis() {
  const levels = [
    {
      title: "Iniciante",     sub: "Começando agora",          img: imgCardBg,
      features: ["Drone recreativo básico", "Missões simples", "Treinamento incluído", "Suporte da comunidade"],
    },
    {
      title: "Intermediário", sub: "Piloto experiente",        img: imgLevelCard1,
      features: ["Equipamento semi-profissional", "Missões complexas", "Certificação ANAC", "Coordenação de equipes"],
    },
    {
      title: "Avançado",      sub: "Especialista operacional", img: imgLevelCard2,
      features: ["Equipamento profissional", "Operações críticas", "Liderança de missões", "Treinamento avançado"],
    },
  ]

  return (
    <section id="niveis-de-voluntarios" className="d-big-padding overflow-hidden" style={{ backgroundColor: bg }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-9 items-start">

          {levels.map((l, i) => (
            <Reveal key={l.title} from="bottom" delay={i * 120}>
              <div className="rounded-[15px] overflow-hidden relative flex flex-col"
                style={{ minHeight: 460 }}>
                <div className="absolute inset-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.img} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.72)" }} />
                </div>
                <div className="relative z-10 flex-1 flex flex-col" style={{ padding: 22, paddingBottom: 40 }}>
                  <div>
                    <p className="font-bold text-[30px] leading-normal" style={{ color: cream, fontFamily: fInter }}>{l.title}</p>
                    <p className="text-[17px] mt-2 mb-8"                    style={{ color: cream, fontFamily: fArchivo }}>{l.sub}</p>
                    <div className="flex flex-col gap-5">
                      {l.features.map(f => (
                        <div key={f} className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={imgCheck} alt="" className="shrink-0" style={{ width: 16, height: 16, display: "block" }} />
                          <span className="text-[17px]" style={{ color: cream, fontFamily: fInter }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="w-full py-3 rounded-lg text-sm font-medium cursor-pointer hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "rgba(255,252,240,0.16)", border: `1px solid ${cream}`, color: cream, fontFamily: fInter, marginTop: "auto" }}>
                    Cadastre-se
                  </button>
                </div>
              </div>
            </Reveal>
          ))}

          {/* 4th column: title */}
          <Reveal from="right" delay={360}>
            <div className="flex items-start pt-2">
              <h2 className="font-bold leading-none"
                style={{
                  fontSize: "clamp(36px,3.5vw,52px)", fontFamily: fInter,
                  background: "linear-gradient(180deg,#fff 60%,#888 140%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                Veja<br />onde<br />você se<br />encaixa
              </h2>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}

/* ── Informação Rápida ───────────────────────────────────────── */
function InfoRapida() {
  return (
    <section id="porque-existimos" className="relative overflow-hidden py-20" style={{ backgroundColor: bg }}>
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgInfoSection} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(255,80,41,0.08)" }} />
      </div>
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10">
        <Reveal from="bottom">
          <h2 className="font-bold text-[#f7f7f7] mb-12 leading-tight"
            style={{ fontSize: "clamp(28px,4vw,48px)", fontFamily: fInter, maxWidth: 382 }}>
            Informação rápida em momentos críticos
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[700px]">
          <Reveal from="left" delay={120}>
            <div className="rounded-3xl p-6 flex flex-col gap-4" style={{ backgroundColor: "rgba(63,63,63,0.92)", minHeight: 368 }}>
              <p className="font-bold text-[24px]" style={{ color: cream, fontFamily: fInter }}>Sem apoio aéreo</p>
              <div className="text-white/80 text-[17px] leading-relaxed" style={{ fontFamily: fInter }}>
                <p className="mb-3">Equipes dependem de:</p>
                <ul className="list-disc pl-5 flex flex-col gap-3">
                  {["Reconhecimento lento", "Informação fragmentada", "Exposição a riscos", "Dados incompletos", "Áreas inacessíveis"].map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal from="right" delay={240}>
            <div className="rounded-3xl p-6 flex flex-col gap-4" style={{ backgroundColor: "rgba(255,255,255,0.52)", minHeight: 368 }}>
              <p className="font-bold text-[24px] text-[#202020]" style={{ fontFamily: fInter }}>Com voluntários</p>
              <div className="text-[#202020] text-[15px] leading-relaxed" style={{ fontFamily: fInter }}>
                <p className="mb-3">Operações ganham:</p>
                <ul className="list-disc pl-5 flex flex-col gap-3">
                  {["Mapeamento rápido e seguro", "Visão completa da situação", "Dados precisos e atualizados", "Decisões mais assertivas", "Acesso a áreas remotas", "Coordenadas exatas"].map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ── Stats Bento ─────────────────────────────────────────────── */
function Stats() {
  const statsRef = useRef<HTMLDivElement>(null)

  const bentoColors = [cream, orange, "#848484", "#848484"]
  const bentoTextColors = ["#343434", "white", "#343434", "white"]
  const bentoAligns = ["text-left", "text-right", "text-left", "text-right"]
  const bentoLabels = ["+500\npilotos", "150\nmissões", "+15\nestados", "15mil km²\nmapeados"]

  return (
    <section className="d-big-padding" style={{ backgroundColor: bg }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left text */}
          <Reveal from="left">
            <div className="flex flex-col gap-6">
              <h2 className="font-bold text-[#f7f7f7] leading-tight"
                style={{ fontSize: "clamp(26px,3vw,40px)", fontFamily: fInter, maxWidth: 261 }}>
                Rede nacional de resposta aérea voluntária
              </h2>
              <p className="text-[#e5e7eb] opacity-80 leading-relaxed"
                style={{ fontSize: "clamp(16px,1.6vw,20px)", fontFamily: fBarlow, maxWidth: 261 }}>
                Uma rede nacional de pilotos prontos para agir quando mais precisam
              </p>
              <p className="font-bold text-[#f7f7f7] leading-tight"
                style={{ fontSize: "clamp(16px,2vw,24px)", fontFamily: fInter }}>
                Já são 500+ pilotos atendendo<br />30 municípios em todo o Brasil
              </p>
            </div>
          </Reveal>

          {/* Mobile-only pilot image */}
          <div className="block lg:hidden relative w-full max-w-xs mx-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgPilot} alt="" className="w-full" style={{ height: "auto" }} />
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
              style={{ background: `linear-gradient(to bottom, transparent, ${bg})` }} />
          </div>

          {/* Bento grid */}
          <div ref={statsRef} className="hidden lg:block relative">
            <div className="grid grid-cols-2 gap-4">
              {bentoLabels.map((label, i) => (
                <Reveal key={label} from="bottom" delay={i * 90}>
                  <div className="rounded-3xl flex flex-col justify-end p-6"
                    style={{ backgroundColor: bentoColors[i], height: 272 }}>
                    <p className={`font-bold leading-tight ${bentoAligns[i]}`}
                      style={{ fontSize: "clamp(22px,2.5vw,34px)", fontFamily: fInter, color: bentoTextColors[i] }}>
                      {label.split("\n").map((line, j) => (
                        <span key={j}>{line}{j < label.split("\n").length - 1 && <br />}</span>
                      ))}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Pilot image with element-relative parallax */}
            <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgPilot} alt=""
                style={{ height: 560, width: "auto", display: "block" }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ── CTA Banner ──────────────────────────────────────────────── */
function CtaBanner() {
  return (
    <section className="relative overflow-hidden border-y-4 border-[#2f2f2f]">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgCtaBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(18,18,18,0.65),rgba(18,18,18,0.65)),rgba(255,80,41,0.08)" }} />
      </div>
      <div className="relative z-10 py-24 px-6 md:px-10 flex flex-col items-center gap-6">
        <Reveal from="top">
          <div className="px-6 py-3 rounded-full border border-white/40" style={{ backgroundColor: "rgba(255,255,255,0.14)" }}>
            <p className="font-bold text-[13px] text-[#f7f7f7] text-center tracking-wide" style={{ fontFamily: fInter }}>
              Projeto COPPE/UFRJ · Parceiro oficial da Defesa Civil
            </p>
          </div>
        </Reveal>
        <Reveal from="bottom" delay={100}>
          <h2 className="font-bold text-[#f7f7f7] text-center leading-snug"
            style={{ fontSize: "clamp(20px,2.8vw,32px)", fontFamily: fInter, maxWidth: 640 }}>
            Conectando pilotos certificados com missões reais de mapeamento
          </h2>
        </Reveal>
        <Reveal from="bottom" delay={220}>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <button className="px-8 py-4 rounded-full text-white text-base cursor-pointer hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: orange, border: "1px solid rgba(255,255,255,0.56)",
                boxShadow: "0px 1px 2px rgba(62,34,13,0.5),0px 0px 0px 4px #671d13",
                fontFamily: fDmSans,
              }}>
              Seja um voluntário
            </button>
            <button className="px-8 py-4 rounded-full text-white text-base border border-white/60 cursor-pointer hover:bg-white/10 transition-colors"
              style={{ backgroundColor: "rgba(255,255,255,0.14)", fontFamily: fDmSans }}>
              Sou Defesa Civil
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Footer ──────────────────────────────────────────────────── */
function Footer() {
  const links = [
    { label: "Como funciona",           id: "como-funciona"          },
    { label: "Níveis de voluntários",   id: "niveis-de-voluntarios"  },
    { label: "Para a Defesa Civil",     id: "porque-existimos"       },
    { label: "Seja voluntário",         id: "inicio"                 },
  ]

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer style={{ backgroundColor: bg }} className="pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-24 mb-16">

          <Reveal from="left">
            <div className="flex flex-col gap-6" style={{ maxWidth: 340 }}>
              <span style={{
                display: "block",
                width: 80, height: 51,
                backgroundImage: `url(${imgLogoMark})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
              }} />
              <p className="text-white/60 text-[15px] leading-relaxed" style={{ fontFamily: fOpenSans }}>
                Transformamos entusiastas de drone em recursos estratégicos para resposta a emergências em todo o Brasil.
              </p>
              <div className="flex items-center gap-5">
                {[
                  { Icon: Facebook,  href: "#" },
                  { Icon: Twitter,   href: "#" },
                  { Icon: Instagram, href: "#" },
                  { Icon: Youtube,   href: "#" },
                ].map(({ Icon, href }, i) => (
                  <a key={i} href={href}
                    className="text-white/50 hover:text-white transition-colors cursor-pointer">
                    <Icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal from="right" delay={120}>
            <div className="flex flex-col gap-3">
              <p className="font-bold text-[16px] text-white mb-2 uppercase tracking-widest"
                style={{ fontFamily: fOpenSans }}>
                Navegação
              </p>
              <div className="w-8 h-px mb-1" style={{ backgroundColor: orange }} />
              {links.map(l => (
                <button key={l.id} onClick={() => scrollTo(l.id)}
                  className="text-white/60 text-[15px] text-left hover:text-white transition-colors bg-transparent border-0 cursor-pointer p-0"
                  style={{ fontFamily: fOpenSans }}>
                  {l.label}
                </button>
              ))}
            </div>
          </Reveal>

        </div>

        <div className="h-px mb-6" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />

      </div>

      <div className="w-full py-4" style={{ backgroundColor: "#d5ccb3" }}>
        <p className="text-[16px] text-[#1c1410] text-center" style={{ fontFamily: fOpenSans }}>
          © 2025 <strong>Droneiros Voluntários</strong>. Todos os direitos reservados.
        </p>
      </div>

    </footer>
  )
}

/* ── Page ────────────────────────────────────────────────────── */
export default function Droneiros() {
  return (
    <div style={{ backgroundColor: bg }}>
      <style>{`
        .d-big-padding { padding-top: 80px; padding-bottom: 80px; }
        .d-brand-logo { width: 200px; height: auto; margin-left: 0; display: block; }
        @media (min-width: 768px) {
          .d-big-padding { padding-top: 200px; padding-bottom: 200px; }
          .d-brand-logo { width: 343px; height: 98px; margin-left: 160px; }
        }
      `}</style>
      <Navbar />
      <Hero />
      <Brand />
      <ComoFunciona />
      <Niveis />
      <InfoRapida />
      <Stats />
      <CtaBanner />
      <Footer />
    </div>
  )
}
