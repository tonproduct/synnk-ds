"use client"

import { useState, useEffect, useRef } from "react"
import {
  Shield, Smile, Sparkles, Activity, Heart, Scan, CreditCard,
  ArrowRight, CheckCircle2, Menu, X,
  Mail, Phone, MapPin, Instagram, Star, Users, Calendar, Clock, Quote,
} from "lucide-react"

const C = {
  primary:     "#3B82F6",
  primaryDark: "#1D4ED8",
  cyan:        "#0891B2",
  purple:      "#7C3AED",
  green:       "#22C55E",
  cyanLight:   "#00E5FF",
  bg:          "#040F1C",
  bgAlt:       "#071828",
}

const SECTIONS = [
  { id: "colors",     label: "Colors",     num: "01" },
  { id: "typography", label: "Typography", num: "02" },
  { id: "buttons",    label: "Buttons",    num: "03" },
  { id: "badges",     label: "Badges",     num: "04" },
  { id: "cards",      label: "Cards",      num: "05" },
  { id: "icons",      label: "Icons",      num: "06" },
  { id: "navigation", label: "Navigation", num: "07" },
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

export default function DentistaDesignSystem() {
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
        }
      `}</style>

      {/* ── Sidebar ── */}
      <aside className="ds-sidebar" style={{
        width: 220,
        minWidth: 220,
        position: "sticky",
        top: 0,
        height: "100vh",
        backgroundColor: "#fff",
        borderRight: "1px solid #e4e4e7",
        display: "flex",
        flexDirection: "column",
        padding: "32px 0",
        overflowY: "auto",
      }}>
        {/* Logo */}
        <div style={{ padding: "0 20px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: C.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Smile size={15} color="#fff" />
            </div>
            <span style={{ fontSize: 15, fontWeight: 900, color: "#18181b", letterSpacing: "-0.02em" }}>SorrisoJa</span>
          </div>
          <p style={{ fontSize: 10, color: "#a1a1aa", fontWeight: 500, paddingLeft: 36 }}>Design System v1.0</p>
        </div>

        <div style={{ height: 1, backgroundColor: "#f4f4f5", marginBottom: 20 }} />

        {/* Nav items */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 2, padding: "0 12px" }}>
          {SECTIONS.map(({ id, label, num }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "8px 12px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                backgroundColor: active === id ? `${C.primary}12` : "transparent",
                transition: "background 0.15s",
              }}
            >
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                color: active === id ? C.primary : "#a1a1aa",
                fontVariantNumeric: "tabular-nums",
                minWidth: 20,
              }}>
                {num}
              </span>
              <span style={{
                fontSize: 13,
                fontWeight: active === id ? 600 : 400,
                color: active === id ? C.primary : "#52525b",
              }}>
                {label}
              </span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ marginTop: "auto", padding: "24px 20px 0", borderTop: "1px solid #f4f4f5" }}>
          <p style={{ fontSize: 10, color: "#d4d4d8" }}>SorrisoJá</p>
          <p style={{ fontSize: 10, color: "#d4d4d8" }}>© 2024</p>
        </div>
      </aside>

      {/* ── Content ── */}
      <main className="ds-main" style={{ flex: 1, padding: "64px 64px 120px", maxWidth: 960, overflowX: "hidden" }}>

        {/* Page header */}
        <div style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: C.primary, marginBottom: 8 }}>Design System</p>
          <h1 style={{ fontSize: 40, fontWeight: 900, color: "#18181b", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 12 }}>SorrisoJa</h1>
          <p style={{ fontSize: 14, color: "#71717a", lineHeight: 1.7, maxWidth: 560 }}>
            Documentação completa dos tokens de design, componentes e padrões visuais utilizados na landing page da SorrisoJá SorrisoJa.
          </p>
        </div>

        {/* ── 01 COLORS ── */}
        <section id="colors" style={{ marginBottom: 80 }}>
          <SectionTitle>01 — Colors</SectionTitle>

          <Block>
            <Label>Brand palette</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              {[
                { name: "Primary",      hex: C.primary,     desc: "Blue 500" },
                { name: "Primary Dark", hex: C.primaryDark, desc: "Blue 700" },
                { name: "Cyan",         hex: C.cyan,        desc: "Cyan 600" },
                { name: "Cyan Light",   hex: C.cyanLight,   desc: "Glow" },
                { name: "Purple",       hex: C.purple,      desc: "Violet 700" },
                { name: "Green",        hex: C.green,       desc: "Green 500" },
              ].map(c => (
                <div key={c.name}>
                  <div style={{ width: 72, height: 72, borderRadius: 10, backgroundColor: c.hex, marginBottom: 8, boxShadow: `0 4px 12px ${c.hex}40` }} />
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#18181b", marginBottom: 2 }}>{c.name}</p>
                  <p style={{ fontSize: 10, color: "#a1a1aa", fontFamily: "var(--font-geist-mono)" }}>{c.hex}</p>
                  <p style={{ fontSize: 10, color: "#d4d4d8" }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block>
            <Label>Dark backgrounds</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {[
                { name: "Hero / Default", hex: "#040F1C" },
                { name: "Alt section",    hex: "#071828" },
                { name: "Service card 2", hex: "#0A0514" },
                { name: "Service card 3", hex: "#051409" },
              ].map(c => (
                <div key={c.name}>
                  <div style={{ width: 160, height: 48, borderRadius: 8, backgroundColor: c.hex, marginBottom: 6, border: "1px solid rgba(255,255,255,0.08)" }} />
                  <p style={{ fontSize: 11, fontWeight: 600, color: "#18181b", marginBottom: 2 }}>{c.name}</p>
                  <p style={{ fontSize: 10, color: "#a1a1aa", fontFamily: "var(--font-geist-mono)" }}>{c.hex}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block>
            <Label>Gradients</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              {[
                { label: "Hero",       grad: `linear-gradient(135deg, ${C.primaryDark} 0%, #040F1C 100%)` },
                { label: "Card glow",  grad: `linear-gradient(135deg, ${C.cyan}22 0%, ${C.primary}11 100%)` },
                { label: "Overlay fade", grad: "linear-gradient(to bottom, rgba(4,15,28,0) 0%, rgba(4,15,28,1) 100%)" },
              ].map(g => (
                <div key={g.label}>
                  <div style={{ width: 200, height: 56, borderRadius: 10, background: g.grad, marginBottom: 6, border: "1px solid rgba(255,255,255,0.06)" }} />
                  <p style={{ fontSize: 11, color: "#52525b", fontFamily: "var(--font-geist-mono)" }}>{g.label}</p>
                </div>
              ))}
            </div>
          </Block>
        </section>

        {/* ── 02 TYPOGRAPHY ── */}
        <section id="typography" style={{ marginBottom: 80 }}>
          <SectionTitle>02 — Typography</SectionTitle>

          <Block>
            <Label>Display — Heading 1</Label>
            <p style={{ fontSize: 56, fontWeight: 900, color: "#18181b", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
              Seu sorriso,<br /><span style={{ color: C.primary }}>nossa missão</span>
            </p>
          </Block>

          <div className="ds-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Block>
              <Label>Heading 2</Label>
              <p style={{ fontSize: 32, fontWeight: 900, color: "#18181b", lineHeight: 1.2 }}>Tratamentos especializados</p>
              <p style={{ fontSize: 10, color: "#a1a1aa", marginTop: 8, fontFamily: "var(--font-geist-mono)" }}>32px · font-black</p>
            </Block>
            <Block>
              <Label>Heading 3</Label>
              <p style={{ fontSize: 20, fontWeight: 700, color: "#18181b" }}>Ortodontia Moderna</p>
              <p style={{ fontSize: 10, color: "#a1a1aa", marginTop: 8, fontFamily: "var(--font-geist-mono)" }}>20px · font-bold</p>
            </Block>
            <Block>
              <Label>Body Large</Label>
              <p style={{ fontSize: 17, color: "#71717a", lineHeight: 1.7 }}>
                Atendimento humanizado com tecnologia de ponta para garantir o melhor resultado.
              </p>
              <p style={{ fontSize: 10, color: "#a1a1aa", marginTop: 8, fontFamily: "var(--font-geist-mono)" }}>17px · regular · lh 1.7</p>
            </Block>
            <Block>
              <Label>Body Small</Label>
              <p style={{ fontSize: 14, color: "#71717a", lineHeight: 1.6 }}>
                Processo ágil e transparente. Me explicaram cada etapa e nunca me senti ansiosa.
              </p>
              <p style={{ fontSize: 10, color: "#a1a1aa", marginTop: 8, fontFamily: "var(--font-geist-mono)" }}>14px · regular · lh 1.6</p>
            </Block>
          </div>

          <Block>
            <Label>Special — Label · Counter · Caption</Label>
            <div style={{ display: "flex", gap: 40, alignItems: "flex-end", flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: 10, color: "#a1a1aa", marginBottom: 6 }}>Label</p>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.cyan }}>Prevenção & Diagnóstico</p>
              </div>
              <div>
                <p style={{ fontSize: 10, color: "#a1a1aa", marginBottom: 6 }}>Counter</p>
                <p style={{ fontSize: 44, fontWeight: 900, color: C.primary, lineHeight: 1 }}>2.400<span style={{ fontSize: 18, color: "#a1a1aa" }}>+</span></p>
                <p style={{ fontSize: 12, color: "#a1a1aa" }}>pacientes atendidos</p>
              </div>
              <div>
                <p style={{ fontSize: 10, color: "#a1a1aa", marginBottom: 6 }}>Caption</p>
                <p style={{ fontSize: 12, color: "#a1a1aa" }}>Implante · Estética · Ortodontia</p>
              </div>
            </div>
          </Block>
        </section>

        {/* ── 03 BUTTONS ── */}
        <section id="buttons" style={{ marginBottom: 80 }}>
          <SectionTitle>03 — Buttons</SectionTitle>

          <Block>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-end" }}>
              <div>
                <Label>Primary CTA</Label>
                <button style={{ backgroundColor: C.primary, color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px 24px", borderRadius: 50, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: `0 4px 16px ${C.primary}50` }}>
                  Agendar consulta <ArrowRight size={15} />
                </button>
              </div>
              <div>
                <Label>Ghost / Dark bg</Label>
                <button style={{ backgroundColor: "transparent", color: "#fff", fontWeight: 600, fontSize: 14, padding: "12px 24px", borderRadius: 50, border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer", background: C.bg }}>
                  Ver serviços
                </button>
              </div>
              <div>
                <Label>Outline</Label>
                <button style={{ backgroundColor: "transparent", color: C.primary, fontWeight: 600, fontSize: 14, padding: "10px 20px", borderRadius: 50, border: `1px solid ${C.primary}`, cursor: "pointer" }}>
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
                <Label>Icon only</Label>
                <button style={{ backgroundColor: "#fff", border: "1px solid #e4e4e7", borderRadius: 8, padding: "8px", cursor: "pointer", display: "flex" }}>
                  <Heart size={18} color="#a1a1aa" />
                </button>
              </div>
            </div>
          </Block>
        </section>

        {/* ── 04 BADGES ── */}
        <section id="badges" style={{ marginBottom: 80 }}>
          <SectionTitle>04 — Badges & Tags</SectionTitle>

          <div className="ds-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Block>
              <Label>Service tags (filled)</Label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  { label: "Implantes",    bg: C.cyan },
                  { label: "Ortodontia",   bg: C.purple },
                  { label: "Estética",     bg: C.primary },
                  { label: "Clareamento",  bg: "#0066FF" },
                  { label: "Prevenção",    bg: C.green },
                  { label: "Harmonização", bg: "#F59E0B" },
                ].map(t => (
                  <span key={t.label} style={{ fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 999, backgroundColor: t.bg, color: "#fff" }}>{t.label}</span>
                ))}
              </div>
            </Block>
            <Block>
              <Label>Article tags (outlined)</Label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Prevenção", "Ortodontia", "Estética", "Saúde Bucal"].map(t => (
                  <span key={t} style={{ fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 999, border: `1px solid ${C.primary}40`, color: C.primary, backgroundColor: `${C.primary}10` }}>{t}</span>
                ))}
              </div>
            </Block>
            <Block>
              <Label>Stars</Label>
              <div style={{ display: "flex", gap: 4 }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="#F59E0B" color="#F59E0B" />)}
              </div>
            </Block>
            <Block>
              <Label>Feature pill</Label>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, backgroundColor: `${C.primary}12`, border: `1px solid ${C.primary}25` }}>
                <CheckCircle2 size={13} color={C.primary} />
                <span style={{ fontSize: 12, fontWeight: 600, color: C.primary }}>Resultado garantido</span>
              </div>
            </Block>
          </div>
        </section>

        {/* ── 05 CARDS ── */}
        <section id="cards" style={{ marginBottom: 80 }}>
          <SectionTitle>05 — Cards</SectionTitle>

          <div className="ds-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <Block>
              <Label>Feature card (dark)</Label>
              <div style={{ width: "100%", padding: 24, borderRadius: 16, background: C.bg, border: `1px solid ${C.cyan}20` }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: `${C.cyan}20`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Shield size={22} color={C.cyan} />
                </div>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Prevenção & Diagnóstico</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>Exames de rotina e limpeza profissional para identificar problemas antes que causem dor.</p>
              </div>
            </Block>

            <Block>
              <Label>Testimonial card</Label>
              <div style={{ width: "100%", padding: 24, borderRadius: 16, backgroundColor: "#fff", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1px solid #f0f0f0" }}>
                <Quote size={20} color={C.primary} style={{ opacity: 0.35, marginBottom: 12 }} />
                <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                  {[1,2,3,4,5].map(i => <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />)}
                </div>
                <p style={{ fontSize: 13, color: "#71717a", lineHeight: 1.7, marginBottom: 16 }}>&ldquo;Sempre tive vergonha de sorrir em fotos. Depois das facetas, não consigo parar de sorrir.&rdquo;</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: `${C.primary}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.primary }}>F</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#18181b" }}>Fernanda Costa</p>
                    <p style={{ fontSize: 11, color: "#a1a1aa" }}>Paciente — Facetas de Porcelana</p>
                  </div>
                </div>
              </div>
            </Block>
          </div>

          <div className="ds-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Block>
              <Label>Service card (dark + badge)</Label>
              <div style={{ borderRadius: 16, overflow: "hidden", background: "#040F1C", border: "1px solid rgba(0,229,255,0.15)" }}>
                <div style={{ height: 120, background: "linear-gradient(135deg, #071828 0%, #040F1C 100%)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Activity size={40} color="#00E5FF" style={{ opacity: 0.25 }} />
                  <span style={{ position: "absolute", top: 12, left: 12, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 999, backgroundColor: "rgba(0,229,255,0.15)", color: "#00E5FF", border: "1px solid rgba(0,229,255,0.3)" }}>Implantes Dentários</span>
                </div>
                <div style={{ padding: 20 }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 10 }}>Implantes com tecnologia</p>
                  {["Implante unitário e múltiplo", "Protocolo All-on-4 e All-on-6"].map(b => (
                    <div key={b} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <CheckCircle2 size={13} color="#00E5FF" />
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Block>

            <Block>
              <Label>Article card</Label>
              <div style={{ borderRadius: 14, overflow: "hidden", backgroundColor: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", border: "1px solid #f0f0f0" }}>
                <div style={{ height: 100, backgroundColor: `${C.primary}10`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Smile size={36} color={C.primary} style={{ opacity: 0.3 }} />
                </div>
                <div style={{ padding: 16 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 999, backgroundColor: `${C.primary}12`, color: C.primary }}>Ortodontia</span>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#18181b", margin: "8px 0", lineHeight: 1.4 }}>Alinhadores vs. aparelho fixo: qual é o melhor?</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#a1a1aa" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}><Calendar size={11} /> 22 Jan 2025</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}><Clock size={11} /> 7 min</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <Label>Stat item</Label>
                <div style={{ display: "flex", gap: 24 }}>
                  {[["2.400+", "pacientes"], ["98%", "satisfação"], ["15 anos", "experiência"]].map(([v, l]) => (
                    <div key={l}>
                      <p style={{ fontSize: 26, fontWeight: 900, color: C.primary, lineHeight: 1 }}>{v}</p>
                      <p style={{ fontSize: 11, color: "#a1a1aa", marginTop: 2 }}>{l}</p>
                    </div>
                  ))}
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
                { icon: <Shield size={20} />,       name: "Shield" },
                { icon: <Smile size={20} />,         name: "Smile" },
                { icon: <Sparkles size={20} />,      name: "Sparkles" },
                { icon: <Activity size={20} />,      name: "Activity" },
                { icon: <Heart size={20} />,         name: "Heart" },
                { icon: <Scan size={20} />,          name: "Scan" },
                { icon: <CreditCard size={20} />,    name: "CreditCard" },
                { icon: <ArrowRight size={20} />,    name: "ArrowRight" },
                { icon: <CheckCircle2 size={20} />,  name: "CheckCircle2" },
                { icon: <Menu size={20} />,          name: "Menu" },
                { icon: <X size={20} />,             name: "X" },
                { icon: <Mail size={20} />,          name: "Mail" },
                { icon: <Phone size={20} />,         name: "Phone" },
                { icon: <MapPin size={20} />,        name: "MapPin" },
                { icon: <Instagram size={20} />,     name: "Instagram" },
                { icon: <Star size={20} />,          name: "Star" },
                { icon: <Users size={20} />,         name: "Users" },
                { icon: <Calendar size={20} />,      name: "Calendar" },
                { icon: <Clock size={20} />,         name: "Clock" },
                { icon: <Quote size={20} />,         name: "Quote" },
              ].map(item => (
                <div key={item.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: "#f4f4f5", color: C.primary }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: 10, color: "#a1a1aa" }}>{item.name}</span>
                </div>
              ))}
            </div>
          </Block>
        </section>

        {/* ── 07 NAVIGATION ── */}
        <section id="navigation" style={{ marginBottom: 80 }}>
          <SectionTitle>07 — Navigation</SectionTitle>

          <Block>
            <Label>Navbar (desktop)</Label>
            <div style={{ backgroundColor: "rgba(4,15,28,0.95)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0 24px", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: 7, backgroundColor: C.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Smile size={16} color="#fff" />
                </div>
                <span style={{ fontSize: 15, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>SorrisoJa</span>
              </div>
              <div style={{ display: "flex", gap: 24 }}>
                {["Início", "Serviços", "Casos", "Depoimentos", "Contato"].map(l => (
                  <span key={l} style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.55)" }}>{l}</span>
                ))}
              </div>
              <button style={{ backgroundColor: C.primary, color: "#fff", fontWeight: 700, fontSize: 13, padding: "8px 18px", borderRadius: 50, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                Agendar <ArrowRight size={13} />
              </button>
            </div>
          </Block>

          <Block>
            <Label>Mobile menu</Label>
            <div style={{ width: 280, backgroundColor: "#040F1C", borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 6, backgroundColor: C.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Smile size={13} color="#fff" />
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>SorrisoJa</span>
                </div>
                <X size={17} color="rgba(255,255,255,0.4)" />
              </div>
              {["Início", "Serviços", "Casos", "Depoimentos", "Blog"].map(l => (
                <div key={l} style={{ padding: "13px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 14, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{l}</div>
              ))}
              <div style={{ padding: 16 }}>
                <button style={{ width: "100%", backgroundColor: C.primary, color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px", borderRadius: 50, border: "none", cursor: "pointer" }}>
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
