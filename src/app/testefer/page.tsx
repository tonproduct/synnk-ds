"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Observer } from "gsap/Observer"

gsap.registerPlugin(ScrollTrigger, Observer)

/* ─────────────────────────────────────
   Cursor magnético
───────────────────────────────────── */
function MagneticCursor() {
  const cursorOuter = useRef<HTMLDivElement>(null)
  const cursorInner = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = cursorOuter.current
    const inner = cursorInner.current
    if (!outer || !inner) return

    let mouseX = 0, mouseY = 0
    let outerX = 0, outerY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(inner, { x: mouseX, y: mouseY, duration: 0.08, ease: "none" })
    }

    const tick = () => {
      outerX += (mouseX - outerX) * 0.12
      outerY += (mouseY - outerY) * 0.12
      gsap.set(outer, { x: outerX, y: outerY })
    }

    window.addEventListener("mousemove", onMove)
    gsap.ticker.add(tick)

    // hover em links e botões
    const targets = document.querySelectorAll("a, button, [data-magnetic]")
    targets.forEach((t) => {
      t.addEventListener("mouseenter", () => {
        gsap.to(outer, { scale: 2.5, opacity: 0.6, duration: 0.3, ease: "power2.out" })
        gsap.to(inner, { scale: 0.4, duration: 0.3, ease: "power2.out" })
      })
      t.addEventListener("mouseleave", () => {
        gsap.to(outer, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" })
        gsap.to(inner, { scale: 1, duration: 0.3, ease: "power2.out" })
      })
    })

    return () => {
      window.removeEventListener("mousemove", onMove)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorOuter}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ width: 36, height: 36 }}
      >
        <div className="w-full h-full rounded-full border border-white/60 mix-blend-difference" />
      </div>
      <div
        ref={cursorInner}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ width: 6, height: 6 }}
      >
        <div className="w-full h-full rounded-full bg-white mix-blend-difference" />
      </div>
    </>
  )
}

/* ─────────────────────────────────────
   Texto animado char por char (manual SplitText)
───────────────────────────────────── */
function SplitHeadline({
  text,
  className = "",
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      const chars = el.querySelectorAll(".char")
      gsap.from(chars, {
        y: "110%",
        opacity: 0,
        rotateX: -80,
        transformOrigin: "50% 0%",
        stagger: 0.025,
        duration: 0.7,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      })
    })
  }, [delay])

  return (
    <h2 ref={ref} className={className} style={{ perspective: 800 }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h2>
  )
}

/* ─────────────────────────────────────
   Linha de borda animada
───────────────────────────────────── */
function AnimatedLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.from(ref.current, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 90%" },
    })
  }, [])

  return <div ref={ref} className={`h-px bg-white/20 ${className}`} />
}

/* ─────────────────────────────────────
   Card de projeto com hover 3D
───────────────────────────────────── */
function Card3D({
  title,
  tag,
  color,
  index,
}: {
  title: string
  tag: string
  color: string
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    // reveal on scroll
    gsap.from(card, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: index * 0.12,
      scrollTrigger: { trigger: card, start: "top 85%" },
    })

    // tilt 3D on hover
    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)
      gsap.to(card, {
        rotateY: dx * 10,
        rotateX: -dy * 10,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 800,
      })
    }
    const onLeave = () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" })
    }

    card.addEventListener("mousemove", onMove)
    card.addEventListener("mouseleave", onLeave)
    return () => {
      card.removeEventListener("mousemove", onMove)
      card.removeEventListener("mouseleave", onLeave)
    }
  }, [index])

  return (
    <div ref={cardRef} data-magnetic className="relative group cursor-pointer" style={{ transformStyle: "preserve-3d" }}>
      <div
        className="rounded-2xl p-8 h-56 flex flex-col justify-between overflow-hidden border border-white/10 transition-colors duration-300 group-hover:border-white/30"
        style={{ background: `linear-gradient(135deg, ${color}18, ${color}06)` }}
      >
        <span className="text-xs tracking-[0.2em] uppercase font-medium opacity-50">{tag}</span>
        <div>
          <p className="text-xl font-semibold leading-snug">{title}</p>
          <div
            className="mt-3 w-8 h-8 rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300"
            style={{ background: `${color}30` }}
          >
            <span className="text-xs">→</span>
          </div>
        </div>
        {/* blob decorativo */}
        <div
          className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{ background: color }}
        />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────
   Número contado
───────────────────────────────────── */
function CountUp({ from, to, suffix = "" }: { from: number; to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obj = { val: from }
    gsap.to(obj, {
      val: to,
      duration: 1.6,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = Math.round(obj.val) + suffix
      },
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    })
  }, [from, to, suffix])

  return <span ref={ref}>{from + suffix}</span>
}

/* ─────────────────────────────────────
   Página principal
───────────────────────────────────── */
export default function TesteFer() {
  const heroRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const bgNoiseRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // ── Hero entry timeline
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.from(navRef.current, { y: -40, opacity: 0, duration: 0.6 })
        .from(".hero-tag", { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
        .from(".hero-cta", { y: 20, opacity: 0, scale: 0.95, duration: 0.5 }, "-=0.2")
        .from(".hero-scroll-hint", { opacity: 0, duration: 0.4 }, "-=0.1")

      // ── Noise grain parallax
      gsap.to(bgNoiseRef.current, {
        y: "-20%",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      // ── Nav shrink on scroll
      ScrollTrigger.create({
        start: "top -60",
        onUpdate: (self) => {
          gsap.to(navRef.current, {
            backdropFilter: self.progress > 0 ? "blur(20px)" : "blur(0px)",
            background: self.progress > 0 ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0)",
            duration: 0.3,
          })
        },
      })
    })

    // ── Marquee infinito (CSS fallback + GSAP)
    const track = marqueeRef.current
    if (track) {
      gsap.to(track, {
        xPercent: -50,
        ease: "none",
        repeat: -1,
        duration: 20,
        modifiers: {
          xPercent: gsap.utils.unitize((x: number) => x % -50),
        },
      })
    }
  }, [])

  const cards = [
    { title: "Identidade Visual & Branding", tag: "Design", color: "#a78bfa" },
    { title: "Sites de alta conversão", tag: "Web", color: "#34d399" },
    { title: "Motion Design & 3D", tag: "Motion", color: "#f59e0b" },
    { title: "Campanhas & Growth", tag: "Marketing", color: "#60a5fa" },
    { title: "E-commerce & Lojas", tag: "Commerce", color: "#f472b6" },
    { title: "Apps & Plataformas SaaS", tag: "Dev", color: "#a78bfa" },
  ]

  const stats = [
    { label: "Projetos entregues", value: 200, suffix: "+" },
    { label: "Clientes ativos", value: 48, suffix: "" },
    { label: "Anos de estúdio", value: 7, suffix: "" },
    { label: "Taxa de retenção", value: 94, suffix: "%" },
  ]

  return (
    <main className="bg-[#080808] text-white min-h-screen overflow-x-hidden cursor-none">
      <MagneticCursor />

      {/* ─── NAV ─── */}
      <nav
        ref={navRef}
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 py-5"
      >
        <span className="font-bold text-lg tracking-tight">synnk</span>
        <div className="hidden md:flex gap-8 text-sm text-white/60">
          {["Trabalhos", "Serviços", "Sobre", "Contato"].map((l) => (
            <a key={l} href="#" className="hover:text-white transition-colors duration-200">
              {l}
            </a>
          ))}
        </div>
        <a
          href="#"
          className="text-sm px-4 py-2 rounded-full border border-white/20 hover:border-white/60 hover:bg-white/5 transition-all duration-300"
        >
          Falar com a gente
        </a>
      </nav>

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden"
      >
        {/* grade de fundo */}
        <div
          ref={bgNoiseRef}
          className="absolute inset-0 -top-1/4 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* gradient blob 1 */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }} />
        {/* gradient blob 2 */}
        <div className="absolute top-2/3 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="hero-tag inline-block text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
            Estúdio criativo · São Paulo
          </span>

          <SplitHeadline
            text="Criamos experiências"
            className="text-5xl md:text-7xl font-bold leading-none tracking-tight mb-2"
          />
          <SplitHeadline
            text="digitais memoráveis"
            className="text-5xl md:text-7xl font-bold leading-none tracking-tight mb-8 bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
            delay={0.3}
          />

          <p className="hero-tag max-w-lg mx-auto text-white/50 text-lg leading-relaxed mb-10">
            Design, desenvolvimento e motion design. Tudo integrado para marcas que recusam o ordinário.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform duration-300 active:scale-95"
            >
              Ver trabalhos
            </a>
            <a
              href="#"
              className="px-8 py-4 rounded-full border border-white/20 hover:border-white/50 hover:bg-white/5 transition-all duration-300"
            >
              Ver serviços
            </a>
          </div>
        </div>

        {/* scroll hint */}
        <div className="hero-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-white/40 animate-pulse" />
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="border-y border-white/10 py-5 overflow-hidden select-none">
        <div ref={marqueeRef} className="flex gap-16 whitespace-nowrap" style={{ width: "200%" }}>
          {Array(2).fill(null).map((_, gi) =>
            ["Design", "Branding", "Motion", "Web", "UX/UI", "E-commerce", "Apps", "Marketing"].map((t, i) => (
              <span key={`${gi}-${i}`} className="text-sm tracking-[0.15em] uppercase text-white/30 flex items-center gap-16">
                {t}
                <span className="text-white/10">✦</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ─── STATS ─── */}
      <section className="max-w-6xl mx-auto px-6 py-28">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <CountUp from={0} to={s.value} suffix={s.suffix} />
              </div>
              <p className="text-sm text-white/40">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <AnimatedLine className="max-w-6xl mx-auto px-6" />

      {/* ─── SERVIÇOS (cards 3D) ─── */}
      <section className="max-w-6xl mx-auto px-6 py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SplitHeadline
            text="O que fazemos"
            className="text-4xl md:text-5xl font-bold"
          />
          <p className="text-white/40 max-w-xs text-sm leading-relaxed">
            Cada projeto é construído do zero com atenção aos detalhes e obsessão por qualidade.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {cards.map((c, i) => (
            <Card3D key={i} {...c} index={i} />
          ))}
        </div>
      </section>

      <AnimatedLine className="max-w-6xl mx-auto px-6" />

      {/* ─── CTA FINAL ─── */}
      <section className="relative max-w-6xl mx-auto px-6 py-40 text-center overflow-hidden">
        <div
          className="absolute inset-0 rounded-3xl blur-[80px] opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, #7c3aed, transparent 70%)" }}
        />
        <SplitHeadline
          text="Pronto para começar?"
          className="text-4xl md:text-6xl font-bold mb-6 relative z-10"
        />
        <p className="text-white/40 max-w-md mx-auto mb-10 relative z-10">
          Vamos transformar sua ideia em algo que as pessoas não conseguem ignorar.
        </p>
        <a
          href="#"
          data-magnetic
          className="relative z-10 inline-block px-10 py-5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 font-semibold text-lg hover:scale-105 transition-transform duration-300 active:scale-95 shadow-[0_0_40px_rgba(124,58,237,0.4)]"
        >
          Iniciar projeto
        </a>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/10 px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
        <span>© 2026 Synnk Studio. Todos os direitos reservados.</span>
        <div className="flex gap-6">
          {["Instagram", "LinkedIn", "Behance"].map((s) => (
            <a key={s} href="#" className="hover:text-white transition-colors duration-200">{s}</a>
          ))}
        </div>
      </footer>
    </main>
  )
}
