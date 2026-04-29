"use client"

import Script from "next/script"
import { Search, Phone, Mail, MapPin, ArrowRight, Check, Bed, Bath, Maximize, Heart, Star, ChevronDown, Menu, X, Instagram, Facebook, Youtube } from "lucide-react"

const C = {
  primary: "#1B3559",
  primaryDark: "#122440",
  gold: "#C9973A",
  goldLight: "#E8B458",
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-20">
      <div className="flex items-center gap-4 mb-8">
        <h2 style={{ fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af" }}>{title}</h2>
        <div className="flex-1 h-px bg-neutral-100" />
      </div>
      {children}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 8 }}>
      {children}
    </p>
  )
}

export default function DesignSystem() {
  return (
    <div className="ds-imob" style={{ fontFamily: "var(--font-geist-sans)", background: "#fafafa", minHeight: "100vh", padding: "64px 80px" }}>
      <style>{`
        @media (max-width: 767px) {
          .ds-imob { padding: 28px 20px 64px !important; }
        }
      `}</style>
      <Script src="https://mcp.figma.com/mcp/html-to-design/capture.js" strategy="afterInteractive" />

      {/* Header */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-3">
          <span style={{ fontSize: 28, fontWeight: 900, color: C.primary, letterSpacing: "-0.02em" }}>HORIZONTE</span>
          <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6, backgroundColor: C.gold, color: "#fff", letterSpacing: "0.05em" }}>IMÓVEIS</span>
        </div>
        <p style={{ fontSize: 13, color: "#9ca3af" }}>Design System — Cores · Tipografia · Componentes · Ícones</p>
      </div>

      {/* ── 1. COLORS ── */}
      <Section title="1 — Colors">
        <div className="flex flex-wrap gap-6">

          {/* Brand */}
          <div>
            <Label>Brand</Label>
            <div className="flex gap-3">
              {[
                { name: "Primary", hex: C.primary },
                { name: "Primary Dark", hex: C.primaryDark },
                { name: "Gold", hex: C.gold },
                { name: "Gold Light", hex: C.goldLight },
              ].map(c => (
                <div key={c.name}>
                  <div style={{ width: 80, height: 80, borderRadius: 12, backgroundColor: c.hex, marginBottom: 8 }} />
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#374151" }}>{c.name}</p>
                  <p style={{ fontSize: 11, color: "#9ca3af", fontFamily: "var(--font-geist-mono)" }}>{c.hex}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Neutrals */}
          <div>
            <Label>Neutrals</Label>
            <div className="flex gap-3">
              {[
                { name: "White", hex: "#ffffff", border: true },
                { name: "50", hex: "#fafafa" },
                { name: "100", hex: "#f5f5f5" },
                { name: "200", hex: "#e5e5e5" },
                { name: "400", hex: "#a3a3a3" },
                { name: "600", hex: "#525252" },
                { name: "900", hex: "#171717" },
              ].map(c => (
                <div key={c.name}>
                  <div style={{ width: 56, height: 56, borderRadius: 10, backgroundColor: c.hex, marginBottom: 6, border: c.border ? "1px solid #e5e5e5" : "none" }} />
                  <p style={{ fontSize: 10, fontWeight: 700, color: "#374151" }}>{c.name}</p>
                  <p style={{ fontSize: 10, color: "#9ca3af", fontFamily: "var(--font-geist-mono)" }}>{c.hex}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Gradients */}
        <div className="mt-8">
          <Label>Gradients</Label>
          <div className="flex gap-4">
            <div>
              <div style={{ width: 200, height: 64, borderRadius: 12, background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 60%, #0a1628 100%)`, marginBottom: 6 }} />
              <p style={{ fontSize: 11, color: "#6b7280", fontFamily: "var(--font-geist-mono)" }}>Hero gradient</p>
            </div>
            <div>
              <div style={{ width: 200, height: 64, borderRadius: 12, background: `linear-gradient(135deg, ${C.primaryDark} 0%, ${C.primary} 100%)`, marginBottom: 6 }} />
              <p style={{ fontSize: 11, color: "#6b7280", fontFamily: "var(--font-geist-mono)" }}>Section gradient</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 2. TYPOGRAPHY ── */}
      <Section title="2 — Typography">
        <div className="flex flex-col gap-8">

          <div>
            <Label>Heading 1 — text-6xl · font-black · leading-[1.1]</Label>
            <p style={{ fontSize: 60, fontWeight: 900, color: C.primary, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Realize o sonho do<br />
              <span style={{ color: C.goldLight }}>imóvel perfeito</span>
            </p>
          </div>

          <div>
            <Label>Heading 2 — text-4xl · font-black</Label>
            <p style={{ fontSize: 36, fontWeight: 900, color: C.primary, lineHeight: 1.2 }}>Imóveis em Destaque</p>
          </div>

          <div>
            <Label>Heading 3 — text-xl · font-bold</Label>
            <p style={{ fontSize: 20, fontWeight: 700, color: C.primary }}>Cobertura Garden Nobre</p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-16">
            <div>
              <Label>Body Large — text-lg · regular</Label>
              <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.7, maxWidth: 380 }}>
                Mais de 15 anos conectando pessoas aos melhores imóveis de São Paulo e região. Atendimento exclusivo, resultados comprovados.
              </p>
            </div>
            <div>
              <Label>Body — text-sm · regular</Label>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, maxWidth: 320 }}>
                Processo ágil e transparente. Encontraram exatamente o que eu buscava em menos de duas semanas.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-start">
            <div>
              <Label>Label — text-xs · bold · uppercase · tracking-widest</Label>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.goldLight }}>Por que escolher a Horizonte</p>
            </div>
            <div>
              <Label>Caption — text-xs · regular</Label>
              <p style={{ fontSize: 12, color: "#9ca3af" }}>3 quartos · 2 banheiros · 145 m²</p>
            </div>
            <div>
              <Label>Price — text-lg · font-black</Label>
              <p style={{ fontSize: 18, fontWeight: 900, color: C.primary }}>R$ 3.800.000</p>
            </div>
          </div>

        </div>
      </Section>

      {/* ── 3. BUTTONS ── */}
      <Section title="3 — Buttons">
        <div className="flex flex-wrap gap-6 items-end">

          <div>
            <Label>Primary</Label>
            <button style={{ backgroundColor: C.primary, color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer" }}>
              Saiba mais
            </button>
          </div>

          <div>
            <Label>CTA / Gold</Label>
            <button style={{ backgroundColor: C.gold, color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              Falar com Corretor <ArrowRight size={14} />
            </button>
          </div>

          <div>
            <Label>Search</Label>
            <button style={{ backgroundColor: C.primary, color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px 20px", borderRadius: 8, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, width: "100%" }}>
              <Search size={15} /> Buscar imóveis
            </button>
          </div>

          <div>
            <Label>Ghost / White</Label>
            <button style={{ backgroundColor: "transparent", color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 20px", borderRadius: 8, border: "2px solid rgba(255,255,255,0.4)", cursor: "pointer", background: C.primaryDark }}>
              Ver todos os imóveis
            </button>
          </div>

          <div>
            <Label>Icon only</Label>
            <button style={{ backgroundColor: "white", border: "1px solid #e5e5e5", borderRadius: 8, padding: "8px", cursor: "pointer", display: "flex" }}>
              <Heart size={18} color="#9ca3af" />
            </button>
          </div>

        </div>

        {/* Tabs */}
        <div className="mt-8">
          <Label>Tabs — Search card</Label>
          <div style={{ display: "flex", width: 280, border: "1px solid #f0f0f0", borderRadius: 12, overflow: "hidden" }}>
            <button style={{ flex: 1, padding: "10px", fontSize: 14, fontWeight: 700, backgroundColor: C.gold, color: "#fff", border: "none", cursor: "pointer" }}>Comprar</button>
            <button style={{ flex: 1, padding: "10px", fontSize: 14, fontWeight: 700, backgroundColor: "transparent", color: "#6b7280", border: "none", cursor: "pointer" }}>Alugar</button>
          </div>
        </div>
      </Section>

      {/* ── 4. BADGES ── */}
      <Section title="4 — Badges & Tags">
        <div className="flex flex-wrap gap-8">
          <div>
            <Label>Property type</Label>
            <div className="flex gap-2">
              {["Venda", "Aluguel"].map(t => (
                <span key={t} style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 4, backgroundColor: t === "Venda" ? C.primary : C.gold, color: "#fff" }}>{t}</span>
              ))}
            </div>
          </div>
          <div>
            <Label>Property tags</Label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Destaque", bg: C.gold },
                { label: "Novo", bg: "#10b981" },
                { label: "Exclusivo", bg: C.primary },
                { label: "Premium", bg: "#7c3aed" },
                { label: "Oportunidade", bg: "#f59e0b" },
                { label: "Lançamento", bg: "#ef4444" },
              ].map(t => (
                <span key={t.label} style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 4, backgroundColor: t.bg, color: "#fff" }}>{t.label}</span>
              ))}
            </div>
          </div>
          <div>
            <Label>Filter tabs</Label>
            <div className="flex gap-2">
              {["Todos", "Venda", "Aluguel"].map((t, i) => (
                <button key={t} style={{ fontSize: 13, fontWeight: 700, padding: "6px 16px", borderRadius: 999, border: "none", cursor: "pointer", backgroundColor: i === 0 ? C.primary : "transparent", color: i === 0 ? "#fff" : "#9ca3af" }}>{t}</button>
              ))}
            </div>
          </div>
          <div>
            <Label>Stars</Label>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} size={14} fill={C.gold} color={C.gold} />)}
            </div>
          </div>
        </div>
      </Section>

      {/* ── 5. CARDS ── */}
      <Section title="5 — Cards">
        <div className="flex flex-wrap gap-6 items-start">

          {/* Property card */}
          <div>
            <Label>Property card</Label>
            <div style={{ width: 280, borderRadius: 16, overflow: "hidden", backgroundColor: "#fff", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
              <div style={{ position: "relative" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=560&h=360&q=80&auto=format&fit=crop" alt="" style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }} />
                <span style={{ position: "absolute", top: 10, left: 10, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 4, backgroundColor: C.gold, color: "#fff" }}>Destaque</span>
                <button style={{ position: "absolute", top: 10, right: 10, backgroundColor: "rgba(255,255,255,0.9)", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", display: "flex" }}>
                  <Heart size={16} color="#9ca3af" />
                </button>
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, backgroundColor: C.primary, color: "#fff" }}>Venda</span>
                </div>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#171717", margin: "8px 0 2px" }}>Cobertura Garden Nobre</p>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
                  <MapPin size={11} color="#9ca3af" />
                  <p style={{ fontSize: 12, color: "#9ca3af" }}>Jardins, São Paulo</p>
                </div>
                <div style={{ display: "flex", gap: 12, paddingTop: 10, borderTop: "1px solid #f5f5f5" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#6b7280" }}><Bed size={12} /> 4</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#6b7280" }}><Bath size={12} /> 3</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#6b7280" }}><Maximize size={12} /> 280 m²</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                  <p style={{ fontSize: 16, fontWeight: 900, color: C.primary }}>R$ 3.800.000</p>
                  <button style={{ fontSize: 12, fontWeight: 700, color: C.gold, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}>Ver <ChevronDown size={12} /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Service card */}
          <div>
            <Label>Service card</Label>
            <div style={{ width: 220, padding: 24, borderRadius: 16, backgroundColor: "#fff", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid #f5f5f5" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🏘️</div>
              <p style={{ fontSize: 15, fontWeight: 700, color: C.primary, marginBottom: 6 }}>Residencial</p>
              <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.6 }}>Casas, apartamentos e coberturas nas melhores localizações.</p>
            </div>
          </div>

          {/* Team card */}
          <div>
            <Label>Team card</Label>
            <div style={{ width: 200, borderRadius: 16, overflow: "hidden", backgroundColor: "#fff", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=320&q=85&auto=format&fit=crop&crop=faces" alt="" style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }} />
              <div style={{ padding: 14 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#171717" }}>Rafael Monteiro</p>
                <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>Diretor Executivo</p>
                <p style={{ fontSize: 11, fontWeight: 700, marginTop: 6, padding: "3px 8px", borderRadius: 4, backgroundColor: "#f0f4ff", color: C.primary, display: "inline-block" }}>320+ negócios</p>
              </div>
            </div>
          </div>

          {/* Testimonial card */}
          <div>
            <Label>Testimonial card</Label>
            <div style={{ width: 280, padding: 24, borderRadius: 16, backgroundColor: "#fff", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid #f5f5f5" }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={13} fill={C.gold} color={C.gold} />)}
              </div>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, marginBottom: 16 }}>&ldquo;Processo ágil e transparente. Encontraram exatamente o que eu buscava.&rdquo;</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&q=80&auto=format&fit=crop" alt="" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#171717" }}>Marcos Oliveira</p>
                  <p style={{ fontSize: 11, color: "#9ca3af" }}>São Paulo, SP</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stat card */}
          <div>
            <Label>Stat item</Label>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[["1.200+", "Imóveis"], ["15 anos", "Mercado"], ["98%", "Satisfação"]].map(([val, label]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 22, fontWeight: 900, color: C.goldLight }}>{val}</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Section>

      {/* ── 6. FORM ELEMENTS ── */}
      <Section title="6 — Form Elements">
        <div className="flex flex-wrap gap-8 items-end">

          <div>
            <Label>Select — default</Label>
            <div style={{ position: "relative", width: 200 }}>
              <select style={{ width: "100%", border: "1px solid #e5e5e5", borderRadius: 8, padding: "10px 36px 10px 12px", fontSize: 14, color: "#374151", appearance: "none", outline: "none", backgroundColor: "#fff" }}>
                <option>Selecione a cidade</option>
                <option>São Paulo</option>
              </select>
              <ChevronDown size={14} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
            </div>
          </div>

          <div>
            <Label>Search card</Label>
            <div style={{ width: 300, borderRadius: 16, overflow: "hidden", backgroundColor: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
              <div style={{ display: "flex", borderBottom: "1px solid #f5f5f5" }}>
                <button style={{ flex: 1, padding: "10px", fontSize: 13, fontWeight: 700, backgroundColor: C.gold, color: "#fff", border: "none", cursor: "pointer" }}>Comprar</button>
                <button style={{ flex: 1, padding: "10px", fontSize: 13, fontWeight: 700, backgroundColor: "transparent", color: "#6b7280", border: "none", cursor: "pointer" }}>Alugar</button>
              </div>
              <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ position: "relative" }}>
                  <select style={{ width: "100%", border: "1px solid #e5e5e5", borderRadius: 8, padding: "9px 36px 9px 12px", fontSize: 13, color: "#374151", appearance: "none", outline: "none", backgroundColor: "#fff" }}>
                    <option>Selecione a cidade</option>
                  </select>
                  <ChevronDown size={13} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
                </div>
                <button style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: C.primary, color: "#fff", fontWeight: 700, fontSize: 13, padding: "10px", borderRadius: 8, border: "none", cursor: "pointer" }}>
                  <Search size={14} /> Buscar imóveis
                </button>
              </div>
            </div>
          </div>

        </div>
      </Section>

      {/* ── 7. ICONS ── */}
      <Section title="7 — Icons (Lucide)">
        <div>
          <Label>Used in project</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
            {[
              { icon: <Phone size={20} />, name: "Phone" },
              { icon: <Mail size={20} />, name: "Mail" },
              { icon: <MapPin size={20} />, name: "MapPin" },
              { icon: <Menu size={20} />, name: "Menu" },
              { icon: <X size={20} />, name: "X" },
              { icon: <ChevronDown size={20} />, name: "ChevronDown" },
              { icon: <Bed size={20} />, name: "Bed" },
              { icon: <Bath size={20} />, name: "Bath" },
              { icon: <Maximize size={20} />, name: "Maximize" },
              { icon: <Heart size={20} />, name: "Heart" },
              { icon: <Search size={20} />, name: "Search" },
              { icon: <Star size={20} />, name: "Star" },
              { icon: <Instagram size={20} />, name: "Instagram" },
              { icon: <Facebook size={20} />, name: "Facebook" },
              { icon: <Youtube size={20} />, name: "Youtube" },
              { icon: <ArrowRight size={20} />, name: "ArrowRight" },
              { icon: <Check size={20} />, name: "Check" },
            ].map(item => (
              <div key={item.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ padding: 12, borderRadius: 10, backgroundColor: "#fff", border: "1px solid #f0f0f0", color: C.primary }}>{item.icon}</div>
                <span style={{ fontSize: 10, color: "#9ca3af" }}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Label>Emoji icons</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {[
              { emoji: "🏠", name: "House (hero)" },
              { emoji: "🏢", name: "Building" },
              { emoji: "🏡", name: "House garden" },
              { emoji: "🏆", name: "Trophy" },
              { emoji: "⭐", name: "Star" },
              { emoji: "🔑", name: "Key" },
              { emoji: "🚗", name: "Car" },
              { emoji: "🛁", name: "Bath" },
              { emoji: "💎", name: "Diamond" },
              { emoji: "🏘️", name: "Residential" },
              { emoji: "🏗️", name: "Commercial" },
              { emoji: "📊", name: "Assets" },
              { emoji: "💰", name: "Finance" },
            ].map(item => (
              <div key={item.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ fontSize: 28, padding: "8px 12px", borderRadius: 10, backgroundColor: "#fff", border: "1px solid #f0f0f0" }}>{item.emoji}</div>
                <span style={{ fontSize: 10, color: "#9ca3af", textAlign: "center", maxWidth: 60 }}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 8. NAVBAR ── */}
      <Section title="8 — Navigation">
        <Label>Topbar</Label>
        <div style={{ backgroundColor: C.primaryDark, padding: "8px 24px", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 20 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.7)" }}><Phone size={11} /> (11) 3456-7890</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.7)" }}><Mail size={11} /> contato@horizonte.com.br</span>
          </div>
          <div style={{ display: "flex", gap: 12, color: "rgba(255,255,255,0.7)" }}>
            <Instagram size={13} /><Facebook size={13} /><Youtube size={13} />
          </div>
        </div>

        <Label>Navbar</Label>
        <div style={{ backgroundColor: C.primary, padding: "0 24px", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>HORIZONTE</span>
            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, backgroundColor: C.gold, color: "#fff" }}>IMÓVEIS</span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Início", "Imóveis em Destaque", "Soluções", "Quem Somos", "Nossa Equipe", "O Que Dizem"].map(l => (
              <span key={l} style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.75)" }}>{l}</span>
            ))}
          </div>
          <button style={{ backgroundColor: C.gold, color: "#fff", fontWeight: 700, fontSize: 13, padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
            Falar com Corretor <ArrowRight size={13} />
          </button>
        </div>
      </Section>

    </div>
  )
}
