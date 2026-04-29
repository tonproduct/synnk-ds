"use client"

import { useState, useEffect, useRef, ReactNode } from "react"
import {
  Phone, Mail, MapPin, Menu, X, ChevronDown, ChevronRight,
  Bed, Bath, Maximize, Heart, Search, Star, Instagram,
  Facebook, Youtube, ArrowRight, Check
} from "lucide-react"

/* ─── palette ───────────────────────────────────────────────── */
const C = {
  primary: "#1B3559",
  primaryDark: "#122440",
  gold: "#C9973A",
  goldLight: "#E8B458",
}

/* ─── FadeIn ─────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, from = "bottom", className = "" }: {
  children: ReactNode; delay?: number; from?: "bottom" | "left" | "right" | "top"; className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  const t: Record<string, string> = {
    bottom: "translateY(28px)", top: "translateY(-28px)",
    left: "translateX(-28px)", right: "translateX(28px)",
  }
  useEffect(() => {
    if (window.location.hash.includes("figmacapture")) { setV(true); return }
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setV(true), delay); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? "none" : t[from],
      transition: `opacity .65s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .65s cubic-bezier(.16,1,.3,1) ${delay}ms`,
    }}>{children}</div>
  )
}

/* ─── DATA ───────────────────────────────────────────────────── */
const imoveis = [
  { tipo: "Venda",   tag: "Destaque",     nome: "Cobertura Garden Nobre",      local: "Jardins, São Paulo",      quartos: 4, banheiros: 3, area: 280, preco: "R$ 3.800.000",   img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=416&q=80&auto=format&fit=crop" },
  { tipo: "Aluguel", tag: "Novo",         nome: "Apartamento Alto Padrão",     local: "Itaim Bibi, São Paulo",   quartos: 3, banheiros: 2, area: 145, preco: "R$ 12.500/mês", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=416&q=80&auto=format&fit=crop" },
  { tipo: "Venda",   tag: "Exclusivo",    nome: "Casa em Condomínio Fechado",  local: "Alphaville, Barueri",     quartos: 5, banheiros: 4, area: 420, preco: "R$ 5.200.000",   img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=416&q=80&auto=format&fit=crop" },
  { tipo: "Aluguel", tag: "Premium",      nome: "Studio Mobiliado Moderno",    local: "Pinheiros, São Paulo",    quartos: 1, banheiros: 1, area:  52, preco: "R$ 4.800/mês",  img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=416&q=80&auto=format&fit=crop" },
  { tipo: "Venda",   tag: "Oportunidade", nome: "Terreno em Área Nobre",       local: "Morumbi, São Paulo",      quartos: 0, banheiros: 0, area: 600, preco: "R$ 2.100.000",   img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=416&q=80&auto=format&fit=crop" },
  { tipo: "Venda",   tag: "Lançamento",   nome: "Penthouse Vista Panorâmica",  local: "Vila Olímpia, São Paulo", quartos: 3, banheiros: 3, area: 210, preco: "R$ 4.400.000",   img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=416&q=80&auto=format&fit=crop" },
]

const servicos = [
  { icon: "🏘️", titulo: "Residencial", desc: "Casas, apartamentos e coberturas nas melhores localizações. Encontramos o lar ideal para cada perfil de família." },
  { icon: "🏗️", titulo: "Comercial", desc: "Salas, lajes corporativas e galpões logísticos. Soluções completas para o crescimento do seu negócio." },
  { icon: "📊", titulo: "Gestão de Ativos", desc: "Administração de imóveis para investidores. Rentabilidade com segurança e transparência total." },
  { icon: "💰", titulo: "Consultoria Financeira", desc: "Financiamento, permuta e análise de investimento. Planejamento personalizado para cada cliente." },
]

const equipe = [
  { nome: "Rafael Monteiro", cargo: "Diretor Executivo",        destaque: "320+ negócios fechados",  img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=352&q=85&auto=format&fit=crop&crop=faces" },
  { nome: "Camila Ferreira", cargo: "Especialista Residencial", destaque: "Jardins & Itaim",          img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=352&q=85&auto=format&fit=crop&crop=faces" },
  { nome: "André Castilho",  cargo: "Consultor Corporativo",    destaque: "Imóveis comerciais",       img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=352&q=85&auto=format&fit=crop&crop=faces" },
  { nome: "Juliana Ramos",   cargo: "Atendimento Premium",      destaque: "Clientes internacionais",  img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=352&q=85&auto=format&fit=crop&crop=faces" },
]

const depoimentos = [
  { nome: "Marcos Oliveira", local: "São Paulo, SP", texto: "Processo ágil e transparente. Encontraram exatamente o que eu buscava em menos de duas semanas. Recomendo sem hesitar.", stars: 5, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&q=80&auto=format&fit=crop" },
  { nome: "Patrícia Leal",   local: "Barueri, SP",   texto: "Atendimento diferenciado do começo ao fim. A equipe me orientou em cada etapa do financiamento. Experiência incrível.", stars: 5, img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&q=80&auto=format&fit=crop" },
  { nome: "Roberto Nunes",   local: "Campinas, SP",  texto: "Vendi meu imóvel pelo valor justo e no prazo que precisava. Profissionalismo e ética em tudo.", stars: 5,                  img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&q=80&auto=format&fit=crop" },
]

/* ─── TOPBAR ─────────────────────────────────────────────────── */
function Topbar() {
  return (
    <div className="hidden md:block text-white text-xs py-2 px-6" style={{ backgroundColor: C.primaryDark }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5"><Phone size={12} /> (11) 3456-7890</span>
          <span className="flex items-center gap-1.5"><Mail size={12} /> contato@horizonte.com.br</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:opacity-70 transition-opacity"><Instagram size={13} /></a>
          <a href="#" className="hover:opacity-70 transition-opacity"><Facebook size={13} /></a>
          <a href="#" className="hover:opacity-70 transition-opacity"><Youtube size={13} /></a>
        </div>
      </div>
    </div>
  )
}

/* ─── NAVBAR ─────────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])
  const links = [
    { label: "Início",              id: "inicio"       },
    { label: "Imóveis em Destaque", id: "imoveis"      },
    { label: "Soluções",            id: "solucoes"     },
    { label: "Quem Somos",          id: "quem-somos"   },
    { label: "Nossa Equipe",        id: "equipe"       },
    { label: "O Que Dizem",         id: "depoimentos"  },
  ]
  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setOpen(false)
  }
  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}
      style={{ backgroundColor: C.primary }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0">
          <span className="text-2xl font-black text-white tracking-tight">HORIZONTE</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: C.gold, color: "#fff" }}>IMÓVEIS</span>
        </button>
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-white/80">
          {links.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0">
              {l.label} {l.id === "imoveis" && <ChevronDown size={13} />}
            </button>
          ))}
        </div>
        <button className="hidden md:inline-flex items-center gap-2 text-white text-sm font-bold px-5 py-2 rounded transition-colors hover:opacity-90"
          style={{ backgroundColor: C.gold }}>
          Falar com Corretor <ArrowRight size={14} />
        </button>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-sm font-medium text-white/90"
          style={{ backgroundColor: C.primaryDark }}>
          {links.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)}
              className="hover:text-white text-left bg-transparent border-0 p-0 cursor-pointer">{l.label}</button>
          ))}
          <button className="text-white font-bold px-5 py-2 rounded w-fit" style={{ backgroundColor: C.gold }}>
            Falar com Corretor
          </button>
        </div>
      )}
    </nav>
  )
}

/* ─── HERO ───────────────────────────────────────────────────── */

// 8 itens em círculo (raio 165 · container 480×480 · centro 240,240)
// intercalados card / emoji, partindo do topo (-90°), passo 45°
const circleItems = [
  { t: "card",  emoji: "",    icon: "🏢", title: "Itaim Bibi",  sub: "R$ 3.800.000", top: "15.6%", left: "50%",   delay: 0.3, dur: 3.5 },
  { t: "emoji", emoji: "🔑", icon: "",   title: "",             sub: "",              top: "25.7%", left: "74.3%", delay: 0.8, dur: 3.2 },
  { t: "card",  emoji: "",    icon: "🏡", title: "Alphaville",  sub: "R$ 5.200.000", top: "50%",   left: "84.4%", delay: 1.1, dur: 4.2 },
  { t: "emoji", emoji: "🚗", icon: "",   title: "",             sub: "",              top: "74.3%", left: "74.3%", delay: 0.5, dur: 3.6 },
  { t: "card",  emoji: "",    icon: "🏆", title: "15+ anos",    sub: "de mercado",   top: "84.4%", left: "50%",   delay: 1.4, dur: 3.8 },
  { t: "emoji", emoji: "🛁", icon: "",   title: "",             sub: "",              top: "74.3%", left: "25.7%", delay: 0.2, dur: 3.9 },
  { t: "card",  emoji: "",    icon: "⭐", title: "Avaliação",   sub: "★★★★★",        top: "50%",   left: "15.6%", delay: 0.9, dur: 3.3 },
  { t: "emoji", emoji: "💎", icon: "",   title: "",             sub: "",              top: "25.7%", left: "25.7%", delay: 1.6, dur: 4.0 },
]

function Hero() {
  const [tipo, setTipo] = useState<"Comprar" | "Alugar">("Comprar")
  const [orbit, setOrbit] = useState(0)

  useEffect(() => {
    const fn = () => setOrbit(window.scrollY * 0.14)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const orbTr = "transform 0.55s cubic-bezier(.16,1,.3,1)"

  return (
    <section id="inicio" className="relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 60%, #0a1628 100%)`, minHeight: "92vh" }}>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center min-h-[92vh] py-20">

        {/* ── COLUNA ESQUERDA: título + subtítulo + busca ── */}
        <div>
          <FadeIn delay={0}>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-[1.1] mb-5">
              Realize o sonho do<br />
              <span style={{ color: C.goldLight }}>imóvel perfeito</span>
            </h1>
          </FadeIn>
          <FadeIn delay={120}>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-md">
              Mais de 15 anos conectando pessoas aos melhores imóveis de São Paulo e região. Atendimento exclusivo, resultados comprovados.
            </p>
          </FadeIn>

          {/* card de busca */}
          <FadeIn delay={240}>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex border-b border-neutral-100">
                {(["Comprar", "Alugar"] as const).map(t => (
                  <button key={t} onClick={() => setTipo(t)}
                    className="flex-1 py-3 text-sm font-bold transition-colors"
                    style={tipo === t ? { backgroundColor: C.gold, color: "#fff" } : { color: "#6b7280" }}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="p-4 grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-neutral-500 mb-1.5">Localização</label>
                  <div className="relative">
                    <select className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 pr-9 text-sm text-neutral-700 focus:outline-none appearance-none">
                      <option>Selecione a cidade</option>
                      <option>São Paulo</option>
                      <option>Barueri</option>
                      <option>Campinas</option>
                      <option>Santos</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 mb-1.5">Tipo</label>
                  <div className="relative">
                    <select className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 pr-9 text-sm text-neutral-700 focus:outline-none appearance-none">
                      <option>Todos</option>
                      <option>Apartamento</option>
                      <option>Casa</option>
                      <option>Cobertura</option>
                      <option>Terreno</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 mb-1.5">Quartos</label>
                  <div className="relative">
                    <select className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 pr-9 text-sm text-neutral-700 focus:outline-none appearance-none">
                      <option>Qualquer</option>
                      <option>1+</option><option>2+</option><option>3+</option><option>4+</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                  </div>
                </div>
                <div className="col-span-2">
                  <button className="w-full flex items-center justify-center gap-2 text-white font-bold rounded-lg py-3 text-sm transition-opacity hover:opacity-90"
                    style={{ backgroundColor: C.primary }}>
                    <Search size={15} /> Buscar imóveis
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>

        {/* ── COLUNA DIREITA: círculo intercalado + stats ── */}
        <FadeIn from="right" delay={200} className="hidden lg:flex flex-col items-end self-start gap-8">
          <div className="relative w-[480px] h-[480px]">

            {/* glow central */}
            <div className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 50%, ${C.gold}22, transparent 55%)` }} />

            {/* círculo outline externo — gira com o scroll */}
            <div className="absolute rounded-full border border-white/20 pointer-events-none"
              style={{ inset: "15.6%", transform: `rotate(${orbit}deg)`, transition: orbTr }} />

            {/* círculo tracejado interno — gira com o scroll */}
            <div className="absolute rounded-full pointer-events-none"
              style={{
                inset: "28%",
                border: "1.5px dashed rgba(255,255,255,0.18)",
                transform: `rotate(${orbit}deg)`,
                transition: orbTr,
              }} />

            {/* casa central — estática */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-[110px] select-none leading-none"
                style={{
                  filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.55))",
                  animationName: "heroFloat", animationDuration: "4.5s",
                  animationTimingFunction: "ease-in-out", animationIterationCount: "infinite",
                  animationDirection: "alternate",
                }}>🏠</div>
            </div>

            {/* anel giratório — container orbita, conteúdo contra-rota para ficar upright */}
            <div className="absolute inset-0 z-20"
              style={{ transform: `rotate(${orbit}deg)`, transition: orbTr }}>
              {circleItems.map((item, i) => (
                <div key={i} className="absolute"
                  style={{ top: item.top, left: item.left, transform: "translate(-50%, -50%)" }}>
                  <div style={{ transform: `rotate(${-orbit}deg)`, transition: orbTr }}>
                    <div style={{
                      animationName: "heroFloat", animationDuration: `${item.dur}s`,
                      animationTimingFunction: "ease-in-out", animationIterationCount: "infinite",
                      animationDirection: "alternate", animationDelay: `${item.delay}s`,
                    }}>
                      {item.t === "emoji" ? (
                        <span className="text-3xl select-none pointer-events-none block"
                          style={{ filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.45))" }}>
                          {item.emoji}
                        </span>
                      ) : (
                        <div className="bg-white rounded-xl shadow-lg p-2.5 w-28 text-center">
                          <p className="text-lg leading-none mb-0.5">{item.icon}</p>
                          <p className="text-xs font-black text-neutral-900 leading-tight">{item.title}</p>
                          <p className="text-xs font-semibold mt-0.5" style={{ color: C.gold }}>{item.sub}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* stats */}
          <div className="flex gap-8 pt-6 border-t border-white/10 w-[480px] justify-center">
            {[["1.200+", "Imóveis"], ["15 anos", "Mercado"], ["3.800+", "Clientes"], ["98%", "Satisfação"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <p className="text-xl font-black" style={{ color: C.goldLight }}>{val}</p>
                <p className="text-white/40 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      <style>{`
        @keyframes heroFloat {
          from { transform: translateY(0px); }
          to   { transform: translateY(-14px); }
        }
      `}</style>
    </section>
  )
}

/* ─── IMÓVEIS EM DESTAQUE ─────────────────────────────────────── */
function ImoveisDestaque() {
  const [favoritos, setFavoritos] = useState<number[]>([])
  const [filtro, setFiltro] = useState<"Todos" | "Venda" | "Aluguel">("Todos")
  const lista = filtro === "Todos" ? imoveis : imoveis.filter(i => i.tipo === filtro)
  return (
    <section id="imoveis" className="py-12 md:py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.gold }}>Portfólio</span>
              <h2 className="text-4xl font-black text-neutral-900 mt-2">Imóveis em Destaque</h2>
              <p className="text-neutral-500 mt-2 max-w-md">Seleção exclusiva das melhores oportunidades do mercado para você.</p>
            </div>
            <div className="flex gap-2">
              {(["Todos", "Venda", "Aluguel"] as const).map(f => (
                <button key={f} onClick={() => setFiltro(f)}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  style={filtro === f
                    ? { backgroundColor: C.primary, color: "#fff" }
                    : { backgroundColor: "#fff", color: "#6b7280", border: "1px solid #e5e7eb" }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lista.map((im, i) => (
            <FadeIn key={im.nome} delay={i * 80} from="bottom">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                {/* foto do imóvel */}
                <div className="h-52 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={im.img} alt={im.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: im.tipo === "Venda" ? C.primary : C.gold }}>{im.tipo}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/90"
                      style={{ color: C.primary }}>{im.tag}</span>
                  </div>
                  <button
                    onClick={() => setFavoritos(f => f.includes(i) ? f.filter(x => x !== i) : [...f, i])}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform">
                    <Heart size={14} fill={favoritos.includes(i) ? "#E8291C" : "none"} stroke={favoritos.includes(i) ? "#E8291C" : "#6b7280"} />
                  </button>
                </div>
                {/* info */}
                <div className="p-5">
                  <p className="text-2xl font-black mb-1" style={{ color: C.primary }}>{im.preco}</p>
                  <h3 className="font-bold text-neutral-900 mb-1">{im.nome}</h3>
                  <p className="flex items-center gap-1 text-neutral-500 text-sm mb-4">
                    <MapPin size={13} className="shrink-0" /> {im.local}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-neutral-500 pt-4 border-t border-neutral-100">
                    {im.quartos > 0 && <span className="flex items-center gap-1.5"><Bed size={14} /> {im.quartos} quartos</span>}
                    {im.banheiros > 0 && <span className="flex items-center gap-1.5"><Bath size={14} /> {im.banheiros} banh.</span>}
                    <span className="flex items-center gap-1.5 ml-auto"><Maximize size={14} /> {im.area}m²</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={300}>
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 font-bold px-8 py-3.5 rounded-full text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: C.primary }}>
              Ver todos os imóveis <ArrowRight size={16} />
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── SERVIÇOS ───────────────────────────────────────────────── */
function Servicos() {
  return (
    <section id="solucoes" className="py-12 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.gold }}>O que oferecemos</span>
            <h2 className="text-4xl font-black text-neutral-900 mt-2">Soluções Completas em Imóveis</h2>
            <p className="text-neutral-500 mt-3 max-w-lg mx-auto">
              Do primeiro atendimento ao pós-venda, cuidamos de cada detalhe para que sua experiência seja impecável.
            </p>
          </div>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicos.map((s, i) => (
            <FadeIn key={s.titulo} delay={i * 100} from="bottom">
              <div className="group p-7 rounded-2xl border border-neutral-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300 select-none">{s.icon}</div>
                <h3 className="font-black text-lg text-neutral-900 mb-2">{s.titulo}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <span className="text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
                  style={{ color: C.primary }}>
                  Saiba mais <ChevronRight size={14} />
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── POR QUE NÓS ────────────────────────────────────────────── */
function PorQueNos() {
  const diferenciais = [
    "Corretores certificados pelo CRECI",
    "Assessoria jurídica e financeira inclusa",
    "Avaliação gratuita do seu imóvel",
    "Fotos e tour virtual profissional",
    "Parceria com mais de 40 bancos",
    "Acompanhamento do início ao registro",
  ]
  return (
    <section id="quem-somos" className="py-12 md:py-24" style={{ background: `linear-gradient(135deg, ${C.primaryDark} 0%, ${C.primary} 100%)` }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <FadeIn from="left">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.goldLight }}>Por que escolher a Horizonte</span>
            <h2 className="text-4xl font-black text-white mt-3 mb-5 leading-tight">
              Mais de 15 anos transformando sonhos em <span style={{ color: C.goldLight }}>realidade</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-8">
              Somos especialistas no mercado imobiliário paulistano. Nossa equipe combina experiência, tecnologia e atendimento humanizado para entregar resultados que superam as expectativas.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {diferenciais.map(d => (
                <li key={d} className="flex items-center gap-2.5 text-white/80 text-sm">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: C.gold }}>
                    <Check size={11} color="#fff" />
                  </div>
                  {d}
                </li>
              ))}
            </ul>
            <button className="mt-8 inline-flex items-center gap-2 font-bold px-7 py-3 rounded-full text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: C.gold }}>
              Agendar conversa <ArrowRight size={15} />
            </button>
          </FadeIn>
          <FadeIn from="right" delay={150}>
            <div className="grid grid-cols-2 gap-4">
              {[["1.200+", "Imóveis negociados"], ["98%", "Clientes satisfeitos"], ["R$ 2,4Bi", "Em transações"], ["15 anos", "De experiência"]].map(([val, label]) => (
                <div key={label} className="rounded-2xl p-6 text-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
                  <p className="text-3xl font-black" style={{ color: C.goldLight }}>{val}</p>
                  <p className="text-white/50 text-sm mt-1">{label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ─── EQUIPE ─────────────────────────────────────────────────── */
function Equipe() {
  return (
    <section id="equipe" className="py-12 md:py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.gold }}>Especialistas</span>
            <h2 className="text-4xl font-black text-neutral-900 mt-2">Nossa Equipe</h2>
            <p className="text-neutral-500 mt-3 max-w-md mx-auto">
              Profissionais experientes e apaixonados por conectar pessoas ao lar ideal.
            </p>
          </div>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipe.map((m, i) => (
            <FadeIn key={m.nome} delay={i * 100} from="bottom">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow text-center group">
                <div className="h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.img} alt={m.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-black text-neutral-900">{m.nome}</h3>
                  <p className="text-sm mt-0.5" style={{ color: C.primary }}>{m.cargo}</p>
                  <p className="text-xs text-neutral-400 mt-1">{m.destaque}</p>
                  <div className="flex items-center justify-center gap-3 mt-4">
                    {[Instagram, Facebook].map((Icon, j) => (
                      <button key={j} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        style={{ backgroundColor: "#f3f4f6" }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = C.primary)}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#f3f4f6")}>
                        <Icon size={13} color="#6b7280" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── DEPOIMENTOS ─────────────────────────────────────────────── */
function Depoimentos() {
  return (
    <section id="depoimentos" className="py-12 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.gold }}>Depoimentos</span>
            <h2 className="text-4xl font-black text-neutral-900 mt-2">O que nossos clientes dizem</h2>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {depoimentos.map((d, i) => (
            <FadeIn key={d.nome} delay={i * 120} from="bottom">
              <div className="bg-neutral-50 rounded-2xl p-7 hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(d.stars)].map((_, j) => (
                    <Star key={j} size={15} fill={C.gold} stroke="none" />
                  ))}
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed mb-6">&ldquo;{d.texto}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={d.img} alt={d.nome} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 text-sm">{d.nome}</p>
                    <p className="text-neutral-400 text-xs">{d.local}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA ─────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section id="contato" className="py-10 md:py-20" style={{ backgroundColor: C.gold }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <h2 className="text-4xl font-black text-white mb-4">Pronto para encontrar o imóvel ideal?</h2>
          <p className="text-white/80 text-lg mb-8">
            Fale agora com um de nossos especialistas. Atendimento personalizado, sem compromisso.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="inline-flex items-center gap-2 font-bold px-8 py-3.5 rounded-full text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: C.primary, color: "#fff" }}>
              <Phone size={15} /> Ligar agora
            </button>
            <button className="inline-flex items-center gap-2 font-bold px-8 py-3.5 rounded-full text-sm bg-white transition-opacity hover:opacity-90"
              style={{ color: C.primary }}>
              Enviar mensagem <ArrowRight size={15} />
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── FOOTER ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="pt-16 pb-8 text-white/60" style={{ backgroundColor: C.primaryDark }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-black text-white">HORIZONTE</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: C.gold, color: "#fff" }}>IMÓVEIS</span>
            </div>
            <p className="text-sm leading-relaxed">Realizando sonhos desde 2009. Especialistas no mercado imobiliário de São Paulo e região.</p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <button key={i} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = C.gold)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}>
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Imóveis</h4>
            <ul className="flex flex-col gap-2 text-sm">
              {["Apartamentos", "Casas", "Coberturas", "Terrenos", "Comercial"].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Empresa</h4>
            <ul className="flex flex-col gap-2 text-sm">
              {["Sobre nós", "Equipe", "Serviços", "Blog", "Trabalhe conosco"].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Contato</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-2"><Phone size={14} className="mt-0.5 shrink-0" style={{ color: C.goldLight }} /> (11) 3456-7890</li>
              <li className="flex items-start gap-2"><Mail size={14} className="mt-0.5 shrink-0" style={{ color: C.goldLight }} /> contato@horizonte.com.br</li>
              <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0" style={{ color: C.goldLight }} /> Av. Paulista, 1000 — Bela Vista, São Paulo</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2025 Horizonte Imóveis. Todos os direitos reservados. CRECI-SP J-32456</p>
          <p>Desenvolvido com dedicação para o mercado imobiliário</p>
        </div>
      </div>
    </footer>
  )
}

/* ─── PAGE ───────────────────────────────────────────────────── */
export default function ImobiliariaPage() {
  return (
    <main className="min-h-screen bg-white">
      <Topbar />
      <Navbar />
      <Hero />
      <ImoveisDestaque />
      <Servicos />
      <PorQueNos />
      <Equipe />
      <Depoimentos />
      <CTA />
      <Footer />
    </main>
  )
}
