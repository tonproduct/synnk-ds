"use client"

import { useEffect, useState } from "react"

/* ─────────────────────────────────────────
   CSS — scoped to #v2-root
   ───────────────────────────────────────── */
const STYLES = `
  /* ── Google Fonts are loaded via JS ── */

  /* ── Reset inside v2 ── */
  #v2-root *, #v2-root *::before, #v2-root *::after {
    box-sizing: border-box;
  }
  /* margin/padding reset só em elementos de texto — não em containers de layout */
  #v2-root h1, #v2-root h2, #v2-root h3, #v2-root h4,
  #v2-root p, #v2-root ul, #v2-root ol, #v2-root li, #v2-root figure {
    margin: 0;
    padding: 0;
  }

  /* ── CSS Variables ── */
  #v2-root {
    --bg:      #050D1A;
    --yellow:  #FFE600;
    --white:   #FFFFFF;
    --muted:   rgba(255,255,255,0.5);
    --card-bg: rgba(255,255,255,0.04);
    --card-bd: rgba(255,255,255,0.08);
    --font:    'Inter', -apple-system, sans-serif;

    --side: clamp(24px, 6vw, 80px);

    font-family: var(--font);
    background:  var(--bg);
    color:       var(--white);
    overflow-x:  hidden;
    min-height:  100vh;
    cursor: none;
    -webkit-font-smoothing: antialiased;
    will-change: background-color;
  }

  /* ── Scrollbar ── */
  #v2-root::-webkit-scrollbar             { width: 4px; }
  #v2-root::-webkit-scrollbar-track       { background: var(--bg); }
  #v2-root::-webkit-scrollbar-thumb       { background: var(--yellow); border-radius: 2px; }

  /* ── Selection ── */
  #v2-root ::selection { background: var(--yellow); color: var(--bg); }

  /* ── Custom Cursor ── */
  .v2-cursor {
    position: fixed;
    width: 10px;
    height: 10px;
    background: var(--yellow, #FFE600);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    mix-blend-mode: difference;
    transition: width .2s ease, height .2s ease;
    will-change: transform;
  }
  .v2-cursor.expand { width: 36px; height: 36px; }

  /* ── Header ── */
  #v2-header {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 24px var(--side);
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background .35s ease, backdrop-filter .35s ease, border-bottom .35s ease;
  }
  #v2-header.scrolled {
    background: rgba(5,13,26,.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,.06);
  }

  .v2-logo {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -.5px;
    text-decoration: none;
    color: var(--white);
  }
  .v2-logo span { color: var(--yellow); }

  /* ── Hamburger ── */
  .v2-hamburger {
    background: none;
    border: none;
    cursor: none;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    z-index: 200;
    position: relative;
  }
  .v2-hamburger span {
    display: block;
    width: 28px; height: 2px;
    background: white;
    border-radius: 2px;
    transition: all .3s ease;
    transform-origin: center;
  }
  .v2-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .v2-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .v2-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* ── Nav Overlay ── */
  .v2-nav-overlay {
    position: fixed;
    inset: 0;
    background: #030912;
    z-index: 150;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity .4s ease;
  }
  .v2-nav-overlay.open { opacity: 1; pointer-events: all; }

  .v2-nav-links { list-style: none; text-align: center; display: flex; flex-direction: column; gap: 48px; }
  .v2-nav-links li a {
    font-size: clamp(40px, 7vw, 80px);
    font-weight: 700;
    letter-spacing: -2px;
    color: white;
    text-decoration: none;
    display: inline-block;
    opacity: 0;
    transform: translateY(30px);
    transition: color .2s ease, opacity .4s ease, transform .4s ease;
  }
  .v2-nav-overlay.open .v2-nav-links li a       { opacity: 1; transform: translateY(0); }
  .v2-nav-overlay.open .v2-nav-links li:nth-child(1) a { transition-delay: .10s; }
  .v2-nav-overlay.open .v2-nav-links li:nth-child(2) a { transition-delay: .15s; }
  .v2-nav-overlay.open .v2-nav-links li:nth-child(3) a { transition-delay: .20s; }
  .v2-nav-overlay.open .v2-nav-links li:nth-child(4) a { transition-delay: .25s; }
  .v2-nav-links li a:hover { color: var(--yellow); }

  /* ── Hero ── */
  #v2-hero {
    height: 100vh;
    min-height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 var(--side);
    position: relative;
    overflow: hidden;
  }

  .v2-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,230,0,.08);
    border: 1px solid rgba(255,230,0,.2);
    color: var(--yellow);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: .5px;
    padding: 8px 16px;
    border-radius: 100px;
    margin-bottom: 40px;
    width: fit-content;
    opacity: 0;
  }

  .v2-hero-headline {
    font-size: clamp(52px, 7.5vw, 92px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -3px;
    margin-bottom: 32px;
  }
  .v2-hero-headline .line        { display: block; overflow: hidden; }
  .v2-hero-headline .line-inner  { display: block; opacity: 0; transform: translateY(100%); will-change: transform, opacity; }
  .v2-hero-headline .yellow      { color: var(--yellow); }

  .v2-hero-sub {
    font-size: clamp(15px, 1.4vw, 18px);
    color: var(--muted);
    line-height: 1.75;
    max-width: 520px;
    margin-bottom: 48px;
    opacity: 0;
    transform: translateY(20px);
  }

  /* ── Buttons ── */
  .v2-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 15px 36px;
    border: 1.5px solid var(--yellow);
    color: var(--yellow);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 4px;
    transition: background .3s ease, color .3s ease;
    background: transparent;
    cursor: none;
    opacity: 0;
    transform: translateY(20px);
    will-change: transform, opacity;
  }
  .v2-btn:hover                { background: var(--yellow); color: var(--bg); }
  .v2-btn-pill                 { border-radius: 100px; font-size: 16px; padding: 20px 52px; letter-spacing: 1.5px; }

  /* ── Stats ── */
  .v2-hero-stats {
    display: flex;
    gap: 56px;
    margin-top: 72px;
    opacity: 0;
    transform: translateY(20px);
  }
  .v2-stat strong {
    display: block;
    font-size: 38px;
    font-weight: 800;
    letter-spacing: -1.5px;
    color: white;
  }
  .v2-stat strong span { color: var(--yellow); }
  .v2-stat p { font-size: 13px; color: var(--muted); margin-top: 4px; }

  /* ── Deco code ── */
  .v2-deco-code {
    position: absolute;
    right: 6%;
    top: 50%;
    transform: translateY(-50%);
    font-size: clamp(80px, 14vw, 200px);
    font-weight: 800;
    color: rgba(255,230,0,.035);
    font-family: 'Courier New', monospace;
    letter-spacing: -4px;
    user-select: none;
    pointer-events: none;
    will-change: transform;
    line-height: 1;
  }

  /* ── Shared section styles ── */
  .v2-section   { padding: 130px var(--side); }
  .v2-label     { font-size: 11px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: var(--yellow); margin-bottom: 20px; display: block; }
  .v2-section-title { font-size: clamp(34px, 4vw, 54px); font-weight: 800; letter-spacing: -2px; line-height: 1.1; max-width: 680px; margin-bottom: 64px; }

  /* ── Reveal (clip-path wipe) ── */
  .reveal { clip-path: inset(100% 0 0 0); will-change: clip-path, opacity, transform; }

  /* ── Service Cards ── */
  .v2-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

  .v2-service-card {
    background: var(--card-bg);
    border: 1px solid var(--card-bd);
    border-radius: 16px;
    padding: 48px 40px;
    position: relative;
    overflow: hidden;
    transform-style: preserve-3d;
    transition: border-color .3s ease, transform .4s ease;
    will-change: transform;
  }
  .v2-service-card::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,230,0,.06) 0%, transparent 60%);
    opacity: 0;
    transition: opacity .3s ease;
  }
  .v2-service-card:hover::before { opacity: 1; }
  .v2-service-card:hover { border-color: rgba(255,230,0,.25); }
  .v2-service-icon { width: 48px; height: 48px; margin-bottom: 28px; color: var(--yellow); }
  .v2-service-card h3 { font-size: 22px; font-weight: 700; letter-spacing: -.5px; margin-bottom: 12px; }
  .v2-service-card p  { font-size: 15px; color: var(--muted); line-height: 1.7; }

  /* ── Cases ── */
  #v2-cases { transition: background-color .6s ease; overflow: hidden; }

  /* ── Cases horizontal track (desktop) ── */
  @media (min-width: 769px) {
    .v2-cases-track { display: flex; will-change: transform; }
    #v2-cases .v2-case { width: 100vw; height: 100vh; min-height: unset; flex-shrink: 0; }
  }

  .v2-case {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 120px var(--side);
    position: relative;
    overflow: hidden;
  }
  /* Doutores case allows mockup to overflow when scaling */
  #v2-case-doutores { overflow: visible; z-index: 0; }
  #v2-case-doutores .v2-case-mockup { will-change: transform; transform-origin: center center; }
  .v2-case-inner {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }
  .v2-case-meta        { display: flex; flex-direction: column; gap: 4px; margin-bottom: 20px; }
  .v2-case-num         { font-size: 11px; font-weight: 600; letter-spacing: 3px; color: var(--muted); }
  .v2-case-type        { font-size: 11px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: var(--yellow); }
  .v2-case h2          { font-size: clamp(40px, 5vw, 66px); font-weight: 800; letter-spacing: -2px; line-height: 1.05; margin-bottom: 24px; }
  .v2-case-desc        { font-size: 16px; color: var(--muted); line-height: 1.75; margin-bottom: 40px; }

  .v2-case-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: white;
    text-decoration: none;
    cursor: none;
    transition: color .2s ease;
  }
  .v2-case-link:hover            { color: var(--yellow); }
  .v2-case-link .arrow           { display: inline-block; transition: transform .3s ease; }
  .v2-case-link:hover .arrow     { transform: translateX(6px); }

  /* Case mockup */
  .v2-case-mockup {
    aspect-ratio: 16/10;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,.07);
    position: relative;
    background: rgba(255,255,255,.025);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .v2-case-mockup-bar {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 36px;
    background: rgba(255,255,255,.04);
    display: flex;
    align-items: center;
    padding: 0 16px;
    gap: 7px;
  }
  .v2-case-mockup-bar span { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,.12); }
  .v2-case-mockup-name { font-size: clamp(28px, 4vw, 52px); font-weight: 800; letter-spacing: -2px; opacity: .08; }

  /* ── Clients ── */
  .v2-clients-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 24px; align-items: center; margin-top: 64px; }
  .v2-client-logo {
    text-align: center;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,.25);
    transition: color .3s ease;
    cursor: none;
    padding: 16px 8px;
  }
  .v2-client-logo:hover { color: rgba(255,255,255,.8); }

  /* ── CTA Final ── */
  #v2-cta {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 80px var(--side);
    position: relative;
    overflow: hidden;
  }
  .v2-grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
    background-size: 64px 64px;
    pointer-events: none;
  }
  .v2-cta-inner          { position: relative; z-index: 1; }
  .v2-cta-inner h2       { font-size: clamp(44px, 6vw, 80px); font-weight: 800; letter-spacing: -3px; line-height: 1.05; margin-bottom: 52px; max-width: 800px; }
  .v2-cta-deco {
    position: absolute;
    font-size: clamp(48px, 9vw, 130px);
    font-weight: 800;
    color: rgba(255,230,0,.025);
    font-family: 'Courier New', monospace;
    letter-spacing: -3px;
    user-select: none;
    pointer-events: none;
    will-change: transform;
    bottom: 8%;
    right: 5%;
  }

  /* ── Footer ── */
  #v2-footer {
    padding: 48px var(--side);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(255,255,255,.06);
    flex-wrap: wrap;
    gap: 24px;
  }
  .v2-footer-links { display: flex; gap: 32px; align-items: center; }
  .v2-footer-links a { font-size: 13px; color: var(--muted); text-decoration: none; letter-spacing: .5px; transition: color .2s ease; cursor: none; }
  .v2-footer-links a:hover { color: white; }
  .v2-footer-copy { font-size: 12px; color: rgba(255,255,255,.2); }

  /* ── Light mode (cases 3 e 4) ── */
  #v2-root.v2-light { --muted: rgba(0,0,0,0.45); }
  #v2-root.v2-light .v2-case-type          { color: rgba(0,0,0,0.55); }
  #v2-root.v2-light .v2-case-num           { color: rgba(0,0,0,0.35); }
  #v2-root.v2-light .v2-case-link          { color: #1a1a1a; }
  #v2-root.v2-light .v2-case-link:hover    { color: #000; }
  #v2-root.v2-light .v2-case-mockup        { background: rgba(0,0,0,0.04); border-color: rgba(0,0,0,0.1); }
  #v2-root.v2-light .v2-case-mockup-bar    { background: rgba(0,0,0,0.05); }
  #v2-root.v2-light .v2-case-mockup-bar span { background: rgba(0,0,0,0.12); }
  #v2-root.v2-light .v2-btn               { border-color: #0d0d0d; color: #0d0d0d; }
  #v2-root.v2-light .v2-btn:hover         { background: #0d0d0d; color: #fff; }
  #v2-root.v2-light #v2-header:not(.scrolled) .v2-logo { color: #0d0d0d; }
  #v2-root.v2-light #v2-header:not(.scrolled) .v2-hamburger span { background: #0d0d0d; }
  #v2-root.v2-light #v2-footer { border-top-color: rgba(0,0,0,0.1); }
  #v2-root.v2-light .v2-footer-links a { color: rgba(0,0,0,0.5); }
  #v2-root.v2-light .v2-footer-links a:hover { color: #0d0d0d; }
  #v2-root.v2-light .v2-footer-copy { color: rgba(0,0,0,0.3); }
  #v2-root.v2-light .v2-grid-bg {
    background-image:
      linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
  }


  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .v2-services-grid  { grid-template-columns: 1fr 1fr; }
    .v2-clients-grid   { grid-template-columns: repeat(4, 1fr); }
    .v2-case-inner     { grid-template-columns: 1fr; gap: 48px; }
  }
  @media (max-width: 768px) {
    #v2-header         { padding-top: 20px; padding-bottom: 20px; }
    .v2-section        { padding-top: 80px; padding-bottom: 80px; }
    .v2-hero-stats     { flex-direction: column; gap: 28px; margin-top: 48px; }
    .v2-services-grid  { grid-template-columns: 1fr; }
    .v2-clients-grid   { grid-template-columns: repeat(3, 1fr); }
    .v2-case           { padding-top: 80px; padding-bottom: 80px; min-height: auto; }
    .v2-deco-code      { display: none; }
    #v2-footer         { padding-top: 40px; padding-bottom: 40px; }
    #v2-cta            { padding-top: 80px; padding-bottom: 80px; }
    .v2-hero-headline  { letter-spacing: -1.5px; }
  }
  @media (max-width: 480px) {
    .v2-clients-grid   { grid-template-columns: repeat(2, 1fr); }
    #v2-footer         { flex-direction: column; align-items: flex-start; }
  }
`

/* ─────────────────────────────────────────
   Data
   ───────────────────────────────────────── */
const CASES = [
  { num: '01', type: 'Landing Page',     name: 'Camila Magalhães',     desc: 'Site pessoal para nutricionista com foco em conversão e agendamentos online.' },
  { num: '02', type: 'Site Institucional', name: 'Doutores da Alegria', desc: 'Plataforma de comunicação e captação de doações para a ONG.' },
  { num: '03', type: 'Landing Page',     name: 'MOMS Cupons',          desc: 'Landing page de alta conversão para plataforma de cupons e benefícios.' },
  { num: '04', type: 'Plataforma Web',   name: 'Droneiros Voluntários', desc: 'Sistema de gestão para voluntários que usam drones em missões humanitárias.' },
  { num: '05', type: 'Plataforma Web',   name: 'Horizonte Imóveis',    desc: 'Plataforma imobiliária com busca avançada e painel de gestão de imóveis.' },
]
/* ── Paleta greyscale dark → light → dark ─────────────────
   Hero + Serviços → preto base
   Case 1-2        → chumbo escuro (texto branco)
   Case 3-4        → chumbo claro / quase branco (texto dark) ← pico
   Case 5          → chumbo escuro (retorna ao dark)
   Clientes + CTA  → preto base
────────────────────────────────────────────────────────── */
const BG = {
  base:  '#0f0f0f',  // preto base
  cases: '#141414',  // todos os cases — sutil, quase imperceptível
  end:   '#0f0f0f',  // clientes — preto
  cta:   '#fafafa',  // CTA — único momento claro
}
const CASE_BGS = [BG.cases, BG.cases, BG.cases, BG.cases, BG.cases]

const CLIENTS = ['AgroPlace', 'Doutores da Alegria', 'DUP', 'FertyBio', 'Playtime', 'Águas do Brasil', 'Resenha Fut']

/* ─────────────────────────────────────────
   SVG Icons
   ───────────────────────────────────────── */
const IconLanding = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="10" width="36" height="28" rx="3"/>
    <line x1="6" y1="18" x2="42" y2="18"/>
    <circle cx="11" cy="14" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="16" cy="14" r="1.5" fill="currentColor" stroke="none"/>
    <rect x="14" y="24" width="20" height="7" rx="2"/>
  </svg>
)
const IconSite = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="8" width="36" height="32" rx="3"/>
    <line x1="6" y1="18" x2="42" y2="18"/>
    <rect x="12" y="24" width="10" height="10" rx="1.5"/>
    <line x1="28" y1="26" x2="36" y2="26"/>
    <line x1="28" y1="30" x2="33" y2="30"/>
  </svg>
)
const IconPlatform = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7"  y="7"  width="14" height="14" rx="2"/>
    <rect x="27" y="7"  width="14" height="14" rx="2"/>
    <rect x="7"  y="27" width="14" height="14" rx="2"/>
    <rect x="27" y="27" width="14" height="14" rx="2"/>
  </svg>
)

const SERVICES = [
  { title: 'Landing Pages',        desc: 'Para campanhas, lançamentos e captação de leads. Páginas focadas em conversão.',               Icon: IconLanding  },
  { title: 'Sites Institucionais', desc: 'Presença digital profissional que transmite credibilidade e conecta sua marca ao público.',      Icon: IconSite     },
  { title: 'Plataformas Web',      desc: 'Sistemas sob medida: dashboards, portais, integrações e automações para seu negócio.',          Icon: IconPlatform },
]

/* ─────────────────────────────────────────
   Component
   ───────────────────────────────────────── */
export default function SynnkV2() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled,  setScrolled]  = useState(false)

  /* ── Menu body overflow ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* ── Main effect: fonts · cursor · scroll · GSAP ── */
  useEffect(() => {
    /* Google Fonts */
    const link = document.createElement('link')
    link.rel  = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
    document.head.appendChild(link)

    /* Body background */
    document.body.style.background = '#050D1A'

    /* Scroll → header */
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })

    /* ── Custom cursor ── */
    const cursor = document.createElement('div')
    cursor.className = 'v2-cursor'
    document.body.appendChild(cursor)
    let mx = 0, my = 0, cx = 0, cy = 0
    const onMouseMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', onMouseMove)
    let rafId: number
    const animCursor = () => {
      cx += (mx - cx) * 0.14
      cy += (my - cy) * 0.14
      cursor.style.left = cx + 'px'
      cursor.style.top  = cy + 'px'
      rafId = requestAnimationFrame(animCursor)
    }
    animCursor()

    /* expand cursor on clickable */
    const onEnter = () => cursor.classList.add('expand')
    const onLeave = () => cursor.classList.remove('expand')
    const addCursorListeners = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    addCursorListeners()

    /* ── 3D Tilt on service cards ── */
    const bindTilt = () => {
      document.querySelectorAll<HTMLElement>('.v2-service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const r   = card.getBoundingClientRect()
          const x   = (e.clientX - r.left) / r.width  - 0.5
          const y   = (e.clientY - r.top)  / r.height - 0.5
          card.style.transform = `perspective(700px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.02,1.02,1.02)`
          card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width  * 100).toFixed(1)}%`)
          card.style.setProperty('--my', `${((e.clientY - r.top)  / r.height * 100).toFixed(1)}%`)
        })
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
        })
      })
    }
    bindTilt()

    /* ── Load GSAP from CDN ── */
    const loadScript = (src: string) => new Promise<void>(res => {
      const s = document.createElement('script')
      s.src = src
      s.onload = () => res()
      document.head.appendChild(s)
    })

    let gsapLoaded = false
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js')
      .then(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js'))
      .then(() => {
        gsapLoaded = true
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { gsap, ScrollTrigger } = window as any
        gsap.registerPlugin(ScrollTrigger)

        /* ── Hero entrance ── */
        const tl = gsap.timeline({ delay: 0.15 })
        tl.to('.v2-hero-badge',  { opacity: 1, duration: 0.6, ease: 'power3.out' })
          .to('.line-inner',     { y: '0%', opacity: 1, duration: 0.85, stagger: 0.14, ease: 'power4.out' }, '-=0.35')
          .to('.v2-hero-sub',    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
          .to('.v2-hero-cta',    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.25')
          .to('.v2-hero-stats',  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')

        /* ── Scroll reveals — clip-path wipe ── */
        document.querySelectorAll('.reveal').forEach(el => {
          gsap.fromTo(el,
            { clipPath: 'inset(100% 0 0 0)', opacity: 0, y: 20 },
            { clipPath: 'inset(0% 0 0 0)',   opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 87%' } }
          )
        })

        /* ── Stats counter ── */
        const statsMap = [
          { sel: '.v2-stat-50',  end: 50,  suffix: '+' },
          { sel: '.v2-stat-7',   end: 7,   suffix: '+' },
          { sel: '.v2-stat-100', end: 100, suffix: '%' },
        ]
        statsMap.forEach(({ sel, end, suffix }) => {
          const el = document.querySelector(sel)
          if (!el) return
          const obj = { val: 0 }
          ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            once: true,
            onEnter: () => {
              gsap.to(obj, {
                val: end, duration: 1.6, ease: 'power2.out',
                onUpdate() { el.textContent = Math.round(obj.val) + suffix },
              })
            },
          })
        })

        /* ── Hero deco parallax + mousemove ── */
        const deco = document.querySelector<HTMLElement>('.v2-deco-code')
        if (deco) {
          gsap.to(deco, { y: '-=180', ease: 'none',
            scrollTrigger: { trigger: '#v2-hero', start: 'top top', end: 'bottom top', scrub: 0.6 } })

          window.addEventListener('mousemove', (e: MouseEvent) => {
            gsap.to(deco, {
              x: (e.clientX / window.innerWidth  - 0.5) * 28,
              y: (e.clientY / window.innerHeight - 0.5) * 20,
              duration: 1.8, ease: 'power3.out',
            })
          }, { passive: true })
        }

        /* ── Transição dark → light → dark ──────────────────────
           bgTo anima background + color herdado + alterna .v2-light
           para sobrescrever elementos com cor explícita (muted, links…)
        ─────────────────────────────────────────────────────── */
        const rootEl = document.querySelector<HTMLElement>('#v2-root')

        const bgTo = (bg: string, light = false) => {
          gsap.to('#v2-root', {
            backgroundColor: bg,
            color: light ? '#0d0d0d' : '#ffffff',
            duration: 0.9,
            ease: 'power2.inOut',
          })
          rootEl?.style.setProperty('--muted', light ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.5)')
          rootEl?.classList.toggle('v2-light', light)
        }

        // Cases — muda cor ao entrar na seção (horizontal scroll)
        ScrollTrigger.create({
          trigger: '#v2-cases',
          start: 'top 60%',
          onEnter:     () => bgTo(BG.cases, false),
          onLeaveBack: () => bgTo(BG.base, false),
        })

        // Clientes → preto
        // end + onEnterBack garante que ao subir do CTA de volta para clientes
        // o dark é restaurado antes que o branco apareça
        const clientesEl = document.querySelector('#v2-sobre')
        if (clientesEl) {
          ScrollTrigger.create({
            trigger: clientesEl,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter:      () => bgTo(BG.end, false),
            onEnterBack:  () => bgTo(BG.end, false),
            onLeaveBack:  () => bgTo(BG.cases, false),
          })
        }

        // CTA → único momento claro
        const ctaEl = document.querySelector('#v2-cta')
        if (ctaEl) {
          ScrollTrigger.create({
            trigger: ctaEl,
            start: 'top 60%',
            onEnter:     () => bgTo(BG.cta, true),
            onLeaveBack: () => bgTo(BG.end, false),
          })
        }

        /* ── CTA deco parallax ── */
        const ctaDeco = document.querySelector<HTMLElement>('.v2-cta-deco')
        if (ctaDeco) {
          window.addEventListener('mousemove', (e: MouseEvent) => {
            gsap.to(ctaDeco, {
              x: (e.clientX / window.innerWidth  - 0.5) * 22,
              y: (e.clientY / window.innerHeight - 0.5) * 16,
              duration: 1.8, ease: 'power3.out',
            })
          }, { passive: true })
        }

        /* ── Horizontal scroll — Cases ── */
        const mm = gsap.matchMedia()
        mm.add('(min-width: 769px)', () => {
          const track = document.querySelector<HTMLElement>('.v2-cases-track')
          if (!track) return

          const hScrollTween = gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: 'none',
            scrollTrigger: {
              trigger: '#v2-cases',
              start: 'top top',
              end: () => '+=' + (track.scrollWidth - window.innerWidth),
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })

          /* ── Doutores da Alegria — zoom quando chega ao centro ── */
          const doutorescasEl  = document.querySelector<HTMLElement>('#v2-case-doutores')
          const doutoresMockup = document.querySelector<HTMLElement>('#v2-case-doutores .v2-case-mockup')
          const doutoresText   = document.querySelector<HTMLElement>('#v2-case-doutores .v2-case-inner > div:first-child')
          if (doutorescasEl && doutoresMockup && doutoresText) {

            // Texto sai ANTES do mockup chegar ao centro
            // trigger no mockup: quando center do mockup passa de 90% → 65%
            gsap.to(doutoresText, {
              opacity: 0, x: -24,
              ease: 'power2.in',
              scrollTrigger: {
                trigger: doutoresMockup,
                containerAnimation: hScrollTween,
                start: 'center 90%',   // mockup entrando pela direita
                end:   'center 60%',   // mockup ainda à direita do centro — texto já sumiu
                scrub: 1,
              },
            })

            // Zoom: cresce conforme mockup se aproxima do centro (50%)
            // e diminui simétricamente ao sair — pico exato em center 50%
            gsap.timeline({
              scrollTrigger: {
                trigger: doutoresMockup,
                containerAnimation: hScrollTween,
                start: 'center 75%',   // começa a zoom na chegada
                end:   'center 25%',   // termina o zoom na saída
                scrub: 1.8,
              },
            })
            .to(doutoresMockup, { scale: 1.65, ease: 'power2.out', duration: 0.5 })
            .to(doutoresMockup, { scale: 1,    ease: 'power2.in',  duration: 0.5 })

            // Texto volta depois que o mockup passou do centro
            gsap.to(doutoresText, {
              opacity: 1, x: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: doutoresMockup,
                containerAnimation: hScrollTween,
                start: 'center 40%',   // mockup saindo pela esquerda
                end:   'center 10%',
                scrub: 1,
              },
            })
          }
        })


        /* ── Magnetic buttons ── */
        document.querySelectorAll<HTMLElement>('.v2-btn').forEach(btn => {
          btn.addEventListener('mousemove', (e: MouseEvent) => {
            const r = btn.getBoundingClientRect()
            const dx = e.clientX - (r.left + r.width  / 2)
            const dy = e.clientY - (r.top  + r.height / 2)
            gsap.to(btn, { x: dx * 0.35, y: dy * 0.35, duration: 0.4, ease: 'power3.out' })
          })
          btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
          })
        })

        /* ── Text scramble on case links ── */
        const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!'
        document.querySelectorAll<HTMLElement>('.v2-case-link').forEach(link => {
          const textNode = Array.from(link.childNodes).find(n => n.nodeType === 3) as Text | undefined
          if (!textNode) return
          const original = textNode.textContent || ''
          let tid: ReturnType<typeof setInterval>
          link.addEventListener('mouseenter', () => {
            clearInterval(tid)
            let iter = 0
            tid = setInterval(() => {
              textNode.textContent = original.split('').map((c, i) => {
                if (c === ' ') return ' '
                if (i < iter * 0.55) return original[i]
                return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
              }).join('')
              if (iter++ > original.length * 2) {
                clearInterval(tid)
                textNode.textContent = original
              }
            }, 35)
          })
          link.addEventListener('mouseleave', () => {
            clearInterval(tid)
            textNode.textContent = original
          })
        })

        ScrollTrigger.refresh()
        void gsapLoaded
      })

    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
      if (document.body.contains(cursor)) document.body.removeChild(cursor)
      document.body.style.background = ''
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div id="v2-root">

        {/* ────────── HEADER ────────── */}
        <header id="v2-header" className={scrolled ? 'scrolled' : ''}>
          <a href="#v2-root" className="v2-logo">SYNNK<span>.</span></a>
          <button
            className={`v2-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            <span /><span /><span />
          </button>
        </header>

        {/* ────────── NAV OVERLAY ────────── */}
        <div className={`v2-nav-overlay${menuOpen ? ' open' : ''}`} role="navigation">
          <ul className="v2-nav-links">
            {['Sobre', 'Serviços', 'Cases', 'Contato'].map(item => (
              <li key={item}>
                <a
                  href={`#v2-${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ────────── HERO ────────── */}
        <section id="v2-hero">
          <div className="v2-hero-badge">
            <span>•</span> Transformando ideias em presença digital há mais de 7 anos
          </div>

          <h1 className="v2-hero-headline">
            <span className="line"><span className="line-inner">Landing pages, sites</span></span>
            <span className="line"><span className="line-inner yellow">e plataformas web,</span></span>
            <span className="line"><span className="line-inner">feitos sob medida.</span></span>
          </h1>

          <p className="v2-hero-sub">
            Soluções web feitas para converter. Cada projeto construído por etapas.<br />
            Você acompanha, aprova e recebe exatamente o que viu.
          </p>

          <a href="#v2-contato" className="v2-btn v2-hero-cta">
            ENTRAR EM CONTATO
          </a>

          <div className="v2-hero-stats">
            <div className="v2-stat">
              <strong><span className="v2-stat-50">50+</span></strong>
              <p>projetos entregues</p>
            </div>
            <div className="v2-stat">
              <strong><span className="v2-stat-7">7+</span></strong>
              <p>anos de experiência</p>
            </div>
            <div className="v2-stat">
              <strong><span className="v2-stat-100">100%</span></strong>
              <p>no prazo</p>
            </div>
          </div>

          <div className="v2-deco-code" aria-hidden="true">&lt;&gt;</div>
        </section>

        {/* ────────── SERVIÇOS ────────── */}
        <section id="v2-serviços" className="v2-section">
          <span className="v2-label reveal">SERVIÇOS</span>
          <h2 className="v2-section-title reveal">
            Soluções digitais que convertem visitantes em clientes
          </h2>
          <div className="v2-services-grid">
            {SERVICES.map(({ title, desc, Icon }, i) => (
              <div key={i} className="v2-service-card reveal">
                <div className="v2-service-icon"><Icon /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ────────── CASES ────────── */}
        <div id="v2-cases">
          <div className="v2-cases-track">
          {CASES.map(({ num, type, name, desc }, i) => (
            <div key={i} className="v2-case" id={i === 1 ? 'v2-case-doutores' : undefined}>
              <div className="v2-case-inner">

                {/* Text side */}
                <div>
                  <div className="v2-case-meta">
                    <span className="v2-case-num">{num} / 05</span>
                    <span className="v2-case-type">{type}</span>
                  </div>
                  <h2>{name}</h2>
                  <p className="v2-case-desc">{desc}</p>
                  <a href="#" className="v2-case-link">
                    Ver case <span className="arrow">→</span>
                  </a>
                </div>

                {/* Mockup side */}
                <div className="v2-case-mockup">
                  {i === 1 && (
                    <img
                      src="/droneiros/bghomedoutores.png"
                      alt="Doutores da Alegria"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', opacity: 0.85, borderRadius: 12 }}
                    />
                  )}
                  <div className="v2-case-mockup-bar">
                    <span /><span /><span />
                  </div>
                  <div className="v2-case-mockup-name" aria-hidden="true">
                    {name.split(' ')[0]}
                  </div>
                </div>

              </div>
            </div>
          ))}
          </div>
        </div>

        {/* ────────── CLIENTES ────────── */}
        <section id="v2-sobre" className="v2-section">
          <span className="v2-label reveal">QUEM CONFIA NA SYNNK</span>
          <div className="v2-clients-grid">
            {CLIENTS.map((name, i) => (
              <div key={i} className="v2-client-logo reveal">
                {name}
              </div>
            ))}
          </div>
        </section>

        {/* ────────── CTA FINAL ────────── */}
        <section id="v2-contato">
          <div id="v2-cta">
            <div className="v2-grid-bg" aria-hidden="true" />
            <div className="v2-cta-deco" aria-hidden="true">&lt;SYNNK/&gt;</div>
            <div className="v2-cta-inner">
              <h2 className="reveal">
                Vamos construir algo<br />incrível juntos?
              </h2>
              <a
                href="mailto:ola@synnk.com.br"
                className="v2-btn v2-btn-pill reveal"
              >
                DIGA OLÁ
              </a>
            </div>
          </div>
        </section>

        {/* ────────── FOOTER ────────── */}
        <footer id="v2-footer">
          <a href="#v2-root" className="v2-logo">SYNNK<span>.</span></a>
          <div className="v2-footer-links">
            <a href="https://instagram.com/synnk" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
          <p className="v2-footer-copy">© 2025 Synnk. Todos os direitos reservados.</p>
        </footer>

      </div>
    </>
  )
}
