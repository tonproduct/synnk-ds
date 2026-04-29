"use client"

import { useState, useEffect, useRef } from "react"
import {
  Stethoscope, Syringe, Scissors, Activity, Scan, Shield,
  ArrowRight, CheckCircle2, Menu, X, ChevronLeft, ChevronRight,
  Mail, Phone, MapPin, Instagram, Facebook, Youtube,
  Quote, Calendar, Clock, Star, Users, Heart,
} from "lucide-react"

const C = {
  yellow:  "#FFD100",
  orange:  "#FF6B1A",
  dark:    "#1A1818",
  cream:   "#FFF8F2",
  green:   "#4ADE80",
  blue:    "#60A5FA",
  red:     "#F87171",
  purple:  "#A78BFA",
}

const SECTIONS = [
  { id: "colors",     label: "Colors",     num: "01" },
  { id: "typography", label: "Typography", num: "02" },
  { id: "buttons",    label: "Buttons",    num: "03" },
  { id: "badges",     label: "Badges",     num: "04" },
  { id: "cards",      label: "Cards",      num: "05" },
  { id: "icons",      label: "Icons",      num: "06" },
  { id: "decorative", label: "Decorative", num: "07" },
  { id: "navigation", label: "Navigation", num: "08" },
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
      <h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#a1a1aa", whiteSpace: "nowrap" }}>
        {children}
      </h2>
      <div style={{ flex: 1, height: 1, backgroundColor: "#e4e4e7" }} />
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 10 }}>
      {children}
    </p>
  )
}

function Block({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e4e4e7", marginBottom: 16, ...style }}>
      {children}
    </div>
  )
}

export default function VeterinarioDesignSystem() {
  const [active, setActive] = useState("colors")
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-30% 0px -60% 0px" }
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.current?.observe(el)
    })
    return () => observer.current?.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f4f5", fontFamily: "var(--font-geist-sans)" }}>
      <style>{`
        @media (max-width: 767px) {
          .ds-sidebar { display: none !important; }
          .ds-main { padding: 28px 20px 64px !important; }
          .ds-2col { grid-template-columns: 1fr !important; }
          .ds-3col { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* ── Sidebar ── */}
      <aside className="ds-sidebar" style={{
        width: 220, minWidth: 220,
        position: "sticky", top: 0, height: "100vh",
        backgroundColor: "#fff", borderRight: "1px solid #e4e4e7",
        display: "flex", flexDirection: "column",
        padding: "32px 0", overflowY: "auto",
      }}>
        {/* Logo */}
        <div style={{ padding: "0 20px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: C.yellow, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="15" height="15" viewBox="0 0 80 80" fill="none" stroke={C.dark} strokeWidth="6">
                <ellipse cx="40" cy="55" rx="18" ry="16" />
                <ellipse cx="18" cy="36" rx="8" ry="10" transform="rotate(-15 18 36)" />
                <ellipse cx="32" cy="24" rx="8" ry="10" />
                <ellipse cx="48" cy="24" rx="8" ry="10" />
                <ellipse cx="62" cy="36" rx="8" ry="10" transform="rotate(15 62 36)" />
              </svg>
            </div>
            <span style={{ fontSize: 15, fontWeight: 900, color: "#18181b", letterSpacing: "-0.02em" }}>PataVida</span>
          </div>
          <p style={{ fontSize: 10, color: "#a1a1aa", fontWeight: 500, paddingLeft: 36 }}>Design System v1.0</p>
        </div>

        <div style={{ height: 1, backgroundColor: "#f4f4f5", marginBottom: 20 }} />

        <nav style={{ display: "flex", flexDirection: "column", gap: 2, padding: "0 12px" }}>
          {SECTIONS.map(({ id, label, num }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "8px 12px", borderRadius: 8, border: "none",
                cursor: "pointer", textAlign: "left",
                backgroundColor: active === id ? `${C.yellow}30` : "transparent",
                transition: "background 0.15s",
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 700, color: active === id ? C.orange : "#a1a1aa", minWidth: 20 }}>
                {num}
              </span>
              <span style={{ fontSize: 13, fontWeight: active === id ? 600 : 400, color: active === id ? C.orange : "#52525b" }}>
                {label}
              </span>
            </button>
          ))}
        </nav>

        <div style={{ marginTop: "auto", padding: "24px 20px 0", borderTop: "1px solid #f4f4f5" }}>
          <p style={{ fontSize: 10, color: "#d4d4d8" }}>Clínica Veterinária</p>
          <p style={{ fontSize: 10, color: "#d4d4d8" }}>© 2024</p>
        </div>
      </aside>

      {/* ── Content ── */}
      <main className="ds-main" style={{ flex: 1, padding: "64px 64px 120px", maxWidth: 960, overflowX: "hidden" }}>

        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: C.orange, marginBottom: 8 }}>Design System</p>
          <h1 style={{ fontSize: 40, fontWeight: 900, color: "#18181b", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 12 }}>PataVida</h1>
          <p style={{ fontSize: 14, color: "#71717a", lineHeight: 1.7, maxWidth: 560 }}>
            Documentação dos tokens de design, componentes e padrões visuais da landing page da Clínica Veterinária PataVida.
          </p>
        </div>

        {/* ── 01 COLORS ── */}
        <section id="colors" style={{ marginBottom: 80 }}>
          <SectionTitle>01 — Colors</SectionTitle>

          <Block>
            <Label>Brand palette</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              {[
                { name: "Yellow",  hex: C.yellow,  desc: "Primary CTA" },
                { name: "Orange",  hex: C.orange,  desc: "Accent / Labels" },
                { name: "Dark",    hex: C.dark,    desc: "Backgrounds" },
                { name: "Cream",   hex: C.cream,   desc: "Hero bg" },
              ].map(c => (
                <div key={c.name}>
                  <div style={{ width: 72, height: 72, borderRadius: 10, backgroundColor: c.hex, marginBottom: 8, boxShadow: `0 4px 12px ${c.hex}50`, border: c.hex === C.cream ? "1px solid #e4e4e7" : "none" }} />
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#18181b", marginBottom: 2 }}>{c.name}</p>
                  <p style={{ fontSize: 10, color: "#a1a1aa", fontFamily: "var(--font-geist-mono)" }}>{c.hex}</p>
                  <p style={{ fontSize: 10, color: "#d4d4d8" }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block>
            <Label>Service accent colors</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              {[
                { name: "Consulta",   hex: C.orange  },
                { name: "Vacinação",  hex: C.yellow  },
                { name: "Banho & Tosa", hex: C.green },
                { name: "Diagnóstico", hex: C.blue   },
                { name: "Emergência", hex: C.red     },
                { name: "Cirurgia",   hex: C.purple  },
              ].map(c => (
                <div key={c.name} style={{ textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 12, backgroundColor: c.hex, marginBottom: 6, boxShadow: `0 4px 12px ${c.hex}40` }} />
                  <p style={{ fontSize: 10, fontWeight: 600, color: "#18181b" }}>{c.name}</p>
                  <p style={{ fontSize: 10, color: "#a1a1aa", fontFamily: "var(--font-geist-mono)" }}>{c.hex}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block>
            <Label>Backgrounds & gradients</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ width: 180, height: 56, borderRadius: 10, backgroundColor: C.cream, marginBottom: 6, border: "1px solid #e4e4e7" }} />
                <p style={{ fontSize: 11, color: "#52525b" }}>Hero — Cream</p>
                <p style={{ fontSize: 10, color: "#a1a1aa", fontFamily: "var(--font-geist-mono)" }}>#FFF8F2</p>
              </div>
              <div>
                <div style={{ width: 180, height: 56, borderRadius: 10, backgroundColor: C.dark, marginBottom: 6, border: "1px solid rgba(255,255,255,0.1)" }} />
                <p style={{ fontSize: 11, color: "#52525b" }}>Stats / Footer</p>
                <p style={{ fontSize: 10, color: "#a1a1aa", fontFamily: "var(--font-geist-mono)" }}>#1A1818</p>
              </div>
              <div>
                <div style={{ width: 180, height: 56, borderRadius: 10, background: "linear-gradient(135deg, #FFF8F2 0%, #FFE8D0 100%)", marginBottom: 6, border: "1px solid #f0d0b8" }} />
                <p style={{ fontSize: 11, color: "#52525b" }}>Hero warm gradient</p>
              </div>
            </div>
          </Block>
        </section>

        {/* ── 02 TYPOGRAPHY ── */}
        <section id="typography" style={{ marginBottom: 80 }}>
          <SectionTitle>02 — Typography</SectionTitle>

          <Block>
            <Label>Display — Heading 1</Label>
            <p style={{ fontSize: 52, fontWeight: 900, color: C.dark, lineHeight: 1.04, letterSpacing: "-0.03em" }}>
              Cuidado e Amor<br />
              <span>para </span>
              <span style={{ position: "relative", display: "inline-block" }}>
                Patas e Pelos!
                <span style={{ position: "absolute", left: 0, bottom: -4, height: 5, width: "100%", borderRadius: 999, background: C.yellow }} />
              </span>
            </p>
          </Block>

          <div className="ds-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Block>
              <Label>Heading 2</Label>
              <p style={{ fontSize: 30, fontWeight: 900, color: C.dark, lineHeight: 1.2 }}>Nossos Serviços</p>
              <p style={{ fontSize: 10, color: "#a1a1aa", marginTop: 8, fontFamily: "var(--font-geist-mono)" }}>30px · font-black</p>
            </Block>
            <Block>
              <Label>Heading 3</Label>
              <p style={{ fontSize: 20, fontWeight: 700, color: C.dark }}>Consulta Clínica</p>
              <p style={{ fontSize: 10, color: "#a1a1aa", marginTop: 8, fontFamily: "var(--font-geist-mono)" }}>20px · font-bold</p>
            </Block>
            <Block>
              <Label>Body Large</Label>
              <p style={{ fontSize: 16, color: "#5A4A42", lineHeight: 1.7 }}>
                Somos sua clínica veterinária local, oferecendo cuidado completo e atenção especial para o seu melhor amigo.
              </p>
              <p style={{ fontSize: 10, color: "#a1a1aa", marginTop: 8, fontFamily: "var(--font-geist-mono)" }}>16px · lh 1.7</p>
            </Block>
            <Block>
              <Label>Special — Label & Counter</Label>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: C.orange, marginBottom: 16 }}>
                Porque Todo Pet Importa!
              </p>
              <p style={{ fontSize: 40, fontWeight: 900, color: C.yellow, lineHeight: 1 }}>8.000<span style={{ fontSize: 16, color: "#a1a1aa" }}>+</span></p>
              <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 4 }}>animais atendidos</p>
            </Block>
          </div>
        </section>

        {/* ── 03 BUTTONS ── */}
        <section id="buttons" style={{ marginBottom: 80 }}>
          <SectionTitle>03 — Buttons</SectionTitle>

          <Block>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-end" }}>
              <div>
                <Label>Primary CTA (Yellow)</Label>
                <button style={{ backgroundColor: C.yellow, color: C.dark, fontWeight: 900, fontSize: 14, padding: "14px 28px", borderRadius: 50, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: `0 6px 20px ${C.yellow}55` }}>
                  Agendar Consulta <ArrowRight size={15} />
                </button>
              </div>
              <div>
                <Label>Secondary (Orange bg)</Label>
                <button style={{ backgroundColor: C.orange, color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px 24px", borderRadius: 50, border: "none", cursor: "pointer", boxShadow: `0 4px 16px ${C.orange}40` }}>
                  Ver Serviços
                </button>
              </div>
              <div>
                <Label>Ghost / Outline</Label>
                <button style={{ backgroundColor: "transparent", color: C.dark, fontWeight: 600, fontSize: 14, padding: "12px 24px", borderRadius: 50, border: `2px solid ${C.dark}`, cursor: "pointer" }}>
                  Saiba mais
                </button>
              </div>
              <div>
                <Label>WhatsApp</Label>
                <button style={{ backgroundColor: "#25D366", color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px 24px", borderRadius: 50, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.553 4.103 1.522 5.828L.057 23.786l6.062-1.591A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.916 0-3.716-.502-5.272-1.38l-.378-.224-3.598.944.96-3.51-.246-.402A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                  Falar no WhatsApp
                </button>
              </div>
              <div>
                <Label>Phone CTA</Label>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: C.orange, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 16px ${C.orange}35` }}>
                    <Phone size={20} color="#fff" />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: "#5A4A42" }}>Tem alguma dúvida?</p>
                    <p style={{ fontSize: 15, fontWeight: 900, color: C.orange }}>(11) 3265-0900</p>
                  </div>
                </div>
              </div>
            </div>
          </Block>
        </section>

        {/* ── 04 BADGES ── */}
        <section id="badges" style={{ marginBottom: 80 }}>
          <SectionTitle>04 — Badges & Tags</SectionTitle>

          <div className="ds-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Block>
              <Label>Service tags</Label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  { label: "Consulta",    bg: C.orange },
                  { label: "Vacinação",   bg: C.yellow, color: C.dark },
                  { label: "Banho & Tosa", bg: C.green, color: C.dark },
                  { label: "Diagnóstico", bg: C.blue,  color: C.dark },
                  { label: "Emergência",  bg: C.red,   color: C.dark },
                  { label: "Cirurgia",    bg: C.purple },
                ].map(t => (
                  <span key={t.label} style={{ fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 999, backgroundColor: t.bg, color: t.color ?? "#fff" }}>{t.label}</span>
                ))}
              </div>
            </Block>
            <Block>
              <Label>Blog tags</Label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Saúde Pet", "Nutrição", "Comportamento"].map(t => (
                  <span key={t} style={{ fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 999, border: `1px solid ${C.orange}40`, color: C.orange, backgroundColor: `${C.orange}10` }}>{t}</span>
                ))}
              </div>
            </Block>
            <Block>
              <Label>Stars & checkmarks</Label>
              <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="#FFD100" color="#FFD100" />)}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {["5.000+ animais atendidos", "Plantão 24h", "15+ anos de experiência"].map(b => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 size={14} color={C.orange} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#5A4A42" }}>{b}</span>
                  </div>
                ))}
              </div>
            </Block>
            <Block>
              <Label>CRMV badge</Label>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 999, backgroundColor: "#f4f4f5", color: "#71717a", border: "1px solid #e4e4e7", display: "inline-block" }}>
                CRMV-SP 12.345
              </span>
            </Block>
          </div>
        </section>

        {/* ── 05 CARDS ── */}
        <section id="cards" style={{ marginBottom: 80 }}>
          <SectionTitle>05 — Cards</SectionTitle>

          <div className="ds-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <Block>
              <Label>Service card</Label>
              <div style={{ padding: 20, borderRadius: 16, backgroundColor: C.cream, border: `1px solid ${C.orange}20` }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: `${C.orange}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <Stethoscope size={22} color={C.orange} />
                </div>
                <p style={{ fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 6 }}>Consulta Clínica</p>
                <p style={{ fontSize: 12, color: "#5A4A42", lineHeight: 1.6 }}>Avaliação completa com exame físico detalhado e orientações personalizadas para seu pet.</p>
              </div>
            </Block>

            <Block>
              <Label>Testimonial card</Label>
              <div style={{ padding: 24, borderRadius: 16, backgroundColor: "#fff", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1px solid #f0f0f0" }}>
                <Quote size={20} color={C.orange} style={{ opacity: 0.4, marginBottom: 12 }} />
                <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
                  {[1,2,3,4,5].map(i => <Star key={i} size={13} fill={C.yellow} color={C.yellow} />)}
                </div>
                <p style={{ fontSize: 12, color: "#5A4A42", lineHeight: 1.7, marginBottom: 14 }}>&ldquo;A PataVida salvou a vida do meu Golden! O atendimento foi incrível.&rdquo;</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: `${C.yellow}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.orange }}>M</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Mariana Costa</p>
                    <p style={{ fontSize: 11, color: "#a1a1aa" }}>Tutora do Rex 🐕</p>
                  </div>
                </div>
              </div>
            </Block>
          </div>

          <div className="ds-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Block>
              <Label>Team card</Label>
              <div style={{ borderRadius: 16, overflow: "hidden", backgroundColor: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0" }}>
                <div style={{ height: 120, background: `linear-gradient(135deg, ${C.orange}20 0%, ${C.yellow}15 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Users size={40} color={C.orange} style={{ opacity: 0.3 }} />
                </div>
                <div style={{ padding: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 2 }}>Dra. Ana Rodrigues</p>
                  <p style={{ fontSize: 12, color: "#5A4A42", marginBottom: 8 }}>Clínica Geral & Medicina Interna</p>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 999, backgroundColor: "#f4f4f5", color: "#71717a" }}>CRMV-SP 12.345</span>
                </div>
              </div>
            </Block>

            <Block>
              <Label>Blog article card</Label>
              <div style={{ borderRadius: 14, overflow: "hidden", backgroundColor: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", border: "1px solid #f0f0f0" }}>
                <div style={{ height: 100, backgroundColor: `${C.yellow}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Heart size={36} color={C.orange} style={{ opacity: 0.3 }} />
                </div>
                <div style={{ padding: 16 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 999, backgroundColor: `${C.orange}12`, color: C.orange }}>Saúde Pet</span>
                  <p style={{ fontSize: 13, fontWeight: 700, color: C.dark, margin: "8px 0", lineHeight: 1.4 }}>Sinais de alerta que você não deve ignorar no seu pet</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#a1a1aa" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}><Calendar size={11} /> 10 Jan 2025</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}><Clock size={11} /> 5 min</span>
                  </div>
                </div>
              </div>
            </Block>
          </div>
        </section>

        {/* ── 06 ICONS ── */}
        <section id="icons" style={{ marginBottom: 80 }}>
          <SectionTitle>06 — Icons (Lucide)</SectionTitle>

          <Block>
            <Label>Used in project</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              {[
                { icon: <Stethoscope size={20} />, name: "Stethoscope" },
                { icon: <Syringe size={20} />,     name: "Syringe" },
                { icon: <Scissors size={20} />,    name: "Scissors" },
                { icon: <Activity size={20} />,    name: "Activity" },
                { icon: <Scan size={20} />,        name: "Scan" },
                { icon: <Shield size={20} />,      name: "Shield" },
                { icon: <ArrowRight size={20} />,  name: "ArrowRight" },
                { icon: <CheckCircle2 size={20} />,name: "CheckCircle2" },
                { icon: <Menu size={20} />,        name: "Menu" },
                { icon: <X size={20} />,           name: "X" },
                { icon: <ChevronLeft size={20} />, name: "ChevronLeft" },
                { icon: <ChevronRight size={20} />,name: "ChevronRight" },
                { icon: <Mail size={20} />,        name: "Mail" },
                { icon: <Phone size={20} />,       name: "Phone" },
                { icon: <MapPin size={20} />,      name: "MapPin" },
                { icon: <Instagram size={20} />,   name: "Instagram" },
                { icon: <Facebook size={20} />,    name: "Facebook" },
                { icon: <Youtube size={20} />,     name: "Youtube" },
                { icon: <Quote size={20} />,       name: "Quote" },
                { icon: <Calendar size={20} />,    name: "Calendar" },
                { icon: <Clock size={20} />,       name: "Clock" },
                { icon: <Star size={20} />,        name: "Star" },
                { icon: <Users size={20} />,       name: "Users" },
                { icon: <Heart size={20} />,       name: "Heart" },
              ].map(item => (
                <div key={item.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: "#f4f4f5", color: C.orange }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: 10, color: "#a1a1aa" }}>{item.name}</span>
                </div>
              ))}
            </div>
          </Block>
        </section>

        {/* ── 07 DECORATIVE ── */}
        <section id="decorative" style={{ marginBottom: 80 }}>
          <SectionTitle>07 — Decorative Elements</SectionTitle>

          <div className="ds-3col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <Block style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <Label>Sparkle</Label>
              <svg width="40" height="40" viewBox="0 0 24 24" fill={C.dark}>
                <path d="M12 2 L13.2 10.8 L22 12 L13.2 13.2 L12 22 L10.8 13.2 L2 12 L10.8 10.8 Z" />
              </svg>
              <p style={{ fontSize: 10, color: "#a1a1aa", textAlign: "center" }}>Dark corners of hero</p>
            </Block>
            <Block style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <Label>Squiggle</Label>
              <svg width="64" height="44" viewBox="0 0 64 44" fill="none">
                <path d="M2 8 Q16 0 32 8 Q48 16 62 8" stroke={C.yellow} strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M2 22 Q16 14 32 22 Q48 30 62 22" stroke={C.yellow} strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M2 36 Q16 28 32 36 Q48 44 62 36" stroke={C.yellow} strokeWidth="3.5" strokeLinecap="round" fill="none" />
              </svg>
              <p style={{ fontSize: 10, color: "#a1a1aa", textAlign: "center" }}>Yellow wave accents</p>
            </Block>
            <Block style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <Label>Paw Outline</Label>
              <svg width="64" height="64" viewBox="0 0 80 80" fill="none" stroke={C.dark} strokeWidth="2" opacity="0.4">
                <ellipse cx="40" cy="55" rx="18" ry="16" />
                <ellipse cx="18" cy="36" rx="8" ry="10" transform="rotate(-15 18 36)" />
                <ellipse cx="32" cy="24" rx="8" ry="10" />
                <ellipse cx="48" cy="24" rx="8" ry="10" />
                <ellipse cx="62" cy="36" rx="8" ry="10" transform="rotate(15 62 36)" />
              </svg>
              <p style={{ fontSize: 10, color: "#a1a1aa", textAlign: "center" }}>Background texture</p>
            </Block>
          </div>

          <Block>
            <Label>Yellow circle blob (hero)</Label>
            <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
              <div style={{ width: 120, height: 120, borderRadius: "50%", backgroundColor: C.yellow, opacity: 0.85 }} />
              <div>
                <p style={{ fontSize: 13, color: "#52525b", marginBottom: 4 }}>Posicionado atrás do mosaico de fotos no hero.</p>
                <p style={{ fontSize: 10, color: "#a1a1aa", fontFamily: "var(--font-geist-mono)" }}>520×520px · right-[-80px] · top-[10%] · opacity: 0.85</p>
              </div>
            </div>
          </Block>
        </section>

        {/* ── 08 NAVIGATION ── */}
        <section id="navigation" style={{ marginBottom: 80 }}>
          <SectionTitle>08 — Navigation</SectionTitle>

          <Block>
            <Label>Navbar — default (transparent)</Label>
            <div style={{ backgroundColor: "transparent", borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "0 24px", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, background: C.cream }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: 7, backgroundColor: C.yellow, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 80 80" fill="none" stroke={C.dark} strokeWidth="7">
                    <ellipse cx="40" cy="55" rx="18" ry="16" />
                    <ellipse cx="18" cy="36" rx="8" ry="10" transform="rotate(-15 18 36)" />
                    <ellipse cx="32" cy="24" rx="8" ry="10" />
                    <ellipse cx="48" cy="24" rx="8" ry="10" />
                    <ellipse cx="62" cy="36" rx="8" ry="10" transform="rotate(15 62 36)" />
                  </svg>
                </div>
                <span style={{ fontSize: 15, fontWeight: 900, color: C.dark, letterSpacing: "-0.02em" }}>PataVida</span>
              </div>
              <div style={{ display: "flex", gap: 24 }}>
                {["Serviços", "Equipe", "Depoimentos", "Blog", "Contato"].map(l => (
                  <span key={l} style={{ fontSize: 13, fontWeight: 500, color: "#5A4A42" }}>{l}</span>
                ))}
              </div>
              <button style={{ backgroundColor: C.yellow, color: C.dark, fontWeight: 900, fontSize: 13, padding: "8px 18px", borderRadius: 50, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                Agendar <ArrowRight size={13} />
              </button>
            </div>
          </Block>

          <Block>
            <Label>Navbar — scrolled (white + shadow)</Label>
            <div style={{ backgroundColor: "#fff", boxShadow: "0 2px 20px rgba(0,0,0,0.08)", padding: "0 24px", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: 7, backgroundColor: C.yellow, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 80 80" fill="none" stroke={C.dark} strokeWidth="7">
                    <ellipse cx="40" cy="55" rx="18" ry="16" />
                    <ellipse cx="18" cy="36" rx="8" ry="10" transform="rotate(-15 18 36)" />
                    <ellipse cx="32" cy="24" rx="8" ry="10" />
                    <ellipse cx="48" cy="24" rx="8" ry="10" />
                    <ellipse cx="62" cy="36" rx="8" ry="10" transform="rotate(15 62 36)" />
                  </svg>
                </div>
                <span style={{ fontSize: 15, fontWeight: 900, color: C.dark, letterSpacing: "-0.02em" }}>PataVida</span>
              </div>
              <div style={{ display: "flex", gap: 24 }}>
                {["Serviços", "Equipe", "Depoimentos", "Blog", "Contato"].map(l => (
                  <span key={l} style={{ fontSize: 13, fontWeight: 500, color: "#5A4A42" }}>{l}</span>
                ))}
              </div>
              <button style={{ backgroundColor: C.yellow, color: C.dark, fontWeight: 900, fontSize: 13, padding: "8px 18px", borderRadius: 50, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                Agendar <ArrowRight size={13} />
              </button>
            </div>
          </Block>

          <Block>
            <Label>Mobile menu</Label>
            <div style={{ width: 280, backgroundColor: "#fff", borderRadius: 14, border: "1px solid #f0f0f0", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #f5f5f5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 15, fontWeight: 900, color: C.dark }}>PataVida</span>
                <X size={18} color="#a1a1aa" />
              </div>
              {["Serviços", "Equipe", "Depoimentos", "Blog", "Contato"].map(l => (
                <div key={l} style={{ padding: "13px 20px", borderBottom: "1px solid #fafafa", fontSize: 14, color: "#374151", fontWeight: 500 }}>{l}</div>
              ))}
              <div style={{ padding: 16 }}>
                <button style={{ width: "100%", backgroundColor: C.yellow, color: C.dark, fontWeight: 900, fontSize: 14, padding: "12px", borderRadius: 50, border: "none", cursor: "pointer" }}>
                  Agendar consulta
                </button>
              </div>
            </div>
          </Block>
        </section>

      </main>
    </div>
  )
}
