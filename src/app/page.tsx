"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Observer } from "gsap/Observer"

interface SlideData {
  bg: string
  light?: boolean
  accent: string
  eyebrow?: string
  title?: string
  titleHTML?: string
  titleFont?: string
  titleSize?: string
  titleWeight?: string
  titleStyle?: string
  titleColor?: string
  eyeColor?: string
  descColor?: string
  descFont?: string
  descSize?: string
  descMaxWidth?: string
  ctaColor?: string
  ctaLabel?: string
  ctaIsButton?: boolean
  ctaSecondary?: { label: string; scrollDown?: boolean; href?: string }
  desc?: string
  descHTML?: string
  img?: string
  href?: string
  siteUrl?: string
  isHero?: boolean
  isPricing?: boolean
  mobileTitleSize?: string
  mobileImgPosition?: string
}

const DATA: SlideData[] = [
  {
    bg: '#050D1A', light: false, accent: '#FFE600',
    eyebrow: '',
    titleHTML: '<span style="color:#fff">Site profissional</span><br><span style="color:#fff">pronto em <span style="color:#FFE600">dias</span> por até <span style="color:#FFE600">R$ 699.</span></span>',
    titleFont: '"Inter", sans-serif',
    titleSize: 'clamp(40px,5.6vw,64px)',
    titleWeight: '900',
    titleStyle: 'normal',
    titleColor: '#ffffff',
    eyeColor: 'rgba(255,230,0,.7)',
    descColor: 'rgba(255,255,255,.55)',
    descFont: '"Inter", sans-serif',
    descSize: '20px',
    descMaxWidth: '560px',
    ctaColor: '#FFE600',
    ctaLabel: 'Quero minha landing page',
    ctaIsButton: true,
    ctaSecondary: { label: 'Ver projetos →', scrollDown: true },
    descHTML: 'Design feito pra <strong style="color:#fff;font-weight:600">atrair clientes</strong>, entregue sem enrolação. Parcele em até <strong style="color:#fff;font-weight:600">6× sem juros</strong> e comece a <strong style="color:#fff;font-weight:600">aparecer online</strong> ainda esse mês.',
    img: '__hero__',
    href: 'https://wa.me/5519989825980',
    isHero: true,
  },
  {
    bg: '#7C2D12', light: false, accent: '#F97316',
    eyebrow: 'Plataforma Web',
    title: 'Droneiros',
    titleColor: 'rgba(249,115,22,.65)',
    eyeColor: 'rgba(249,115,22,.7)',
    descColor: 'rgba(255,255,255,.6)',
    ctaColor: '#F97316',
    desc: 'Sistema completo para gestão de missões de resgate com drones. App iOS/Android, dashboard web e design system do zero.',
    img: '/droneiros/bgdroneiro2.jpg',
    href: '/portfolio/droneiros',
    siteUrl: '/droneiros',
  },
  {
    bg: '#0E0D0D', light: false, accent: '#FFE600',
    eyebrow: 'Plataforma Web',
    title: 'Horizonte Imóveis',
    titleColor: 'rgba(255,230,0,.55)',
    eyeColor: 'rgba(255,230,0,.6)',
    descColor: 'rgba(255,255,255,.6)',
    ctaColor: '#FFE600',
    desc: 'Plataforma imobiliária completa com busca avançada, filtros e integração com CRM para corretores.',
    img: '/droneiros/imobiliariabg.jpg',
    href: '/portfolio/imobiliaria',
    siteUrl: '/imobiliaria',
    mobileImgPosition: 'center center',
  },
  {
    bg: '#FFFFFF', light: true, accent: '#111111',
    eyebrow: 'Landing Page',
    title: 'SorrisoJá',
    titleColor: 'rgba(0,0,0,.2)',
    eyeColor: 'rgba(0,0,0,.4)',
    descColor: 'rgba(0,0,0,.55)',
    ctaColor: '#111111',
    desc: 'Landing page de alta conversão para clínica odontológica. Agendamento online integrado e SEO local.',
    img: '/droneiros/sorrisobg.png',
    href: '/portfolio/dentista',
    siteUrl: '/portfolio/landingpages/dentista',
  },
  {
    bg: '#14532D', light: false, accent: '#22C55E',
    eyebrow: 'Landing Page',
    title: 'PataVida',
    titleColor: 'rgba(34,197,94,.65)',
    eyeColor: 'rgba(34,197,94,.65)',
    descColor: 'rgba(255,255,255,.6)',
    ctaColor: '#22C55E',
    desc: 'Site institucional para clínica veterinária com agendamento online, emergência 24h e catálogo de serviços.',
    img: '/droneiros/bgvet.jpg',
    href: '/portfolio/veterinario',
    siteUrl: '/portfolio/landingpages/veterinario',
  },
  {
    bg: '#0E0D0E', light: false, accent: '#E2C9A8',
    eyebrow: 'Landing Page',
    title: 'Camila Magalhães',
    titleColor: 'rgba(226,201,168,.55)',
    eyeColor: 'rgba(226,201,168,.6)',
    descColor: 'rgba(255,255,255,.6)',
    ctaColor: '#E2C9A8',
    desc: 'Site para psicóloga clínica com storytelling humanizado, depoimentos e agendamento de sessões online.',
    img: '/droneiros/bgpsicologa.png',
    href: '/portfolio/psicologa',
    siteUrl: 'https://psicamilamagalhaes.com.br',
  },
  {
    bg: '#701A4A', light: false, accent: '#FF61B5',
    eyebrow: 'Site Institucional',
    titleHTML: '<span style="color:rgba(255,97,181,.65)">Doutores<br>da Alegria</span>',
    titleSize: 'clamp(58px,6.8vw,90px)',
    mobileTitleSize: '64px',
    titleColor: 'rgba(255,97,181,.65)',
    eyeColor: 'rgba(255,97,181,.65)',
    descColor: 'rgba(255,255,255,.6)',
    ctaColor: '#FF61B5',
    desc: 'Site institucional para ONG de saúde e arte, com área de doação, impacto social e 30 anos de história.',
    img: '/droneiros/bghomedoutores.png',
    href: '/portfolio/doutores',
    siteUrl: 'https://doutoresdaalegria.org.br',
  },
  {
    isPricing: true,
    bg: '#050D1A', accent: '#FFE600', light: false,
  },
]

const HERO_SVG = `
<svg width="100%" height="100%" viewBox="0 0 520 390" fill="none" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0">
  <defs>
    <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0A1628"/>
      <stop offset="1" stop-color="#050D1A"/>
    </linearGradient>
  </defs>
  <rect x="168" y="22" width="184" height="346" rx="28" fill="url(#pg)" stroke="rgba(255,230,0,.18)" stroke-width="1.5"/>
  <rect x="178" y="32" width="164" height="326" rx="20" fill="#080F1E"/>
  <rect x="226" y="36" width="68" height="10" rx="5" fill="rgba(255,255,255,.06)"/>
  <rect x="184" y="56" width="152" height="78" rx="6" fill="rgba(255,230,0,.06)" stroke="rgba(255,230,0,.12)" stroke-width="1"/>
  <rect x="196" y="68" width="90" height="9" rx="3" fill="rgba(255,230,0,.55)"/>
  <rect x="196" y="82" width="128" height="6" rx="2" fill="rgba(255,255,255,.14)"/>
  <rect x="196" y="93" width="108" height="6" rx="2" fill="rgba(255,255,255,.08)"/>
  <rect x="196" y="110" width="80" height="18" rx="4" fill="#FFE600"/>
  <text x="236" y="122" font-size="7" font-family="'Inter',sans-serif" fill="#111" font-weight="700" text-anchor="middle">AGENDAR AGORA</text>
  <rect x="184" y="144" width="152" height="42" rx="4" fill="rgba(255,255,255,.02)" stroke="rgba(255,255,255,.06)" stroke-width="1"/>
  <rect x="196" y="154" width="60" height="7" rx="2" fill="rgba(255,255,255,.18)"/>
  <rect x="196" y="166" width="128" height="5" rx="2" fill="rgba(255,255,255,.07)"/>
  <rect x="196" y="175" width="100" height="5" rx="2" fill="rgba(255,255,255,.04)"/>
  <rect x="184" y="194" width="70" height="42" rx="4" fill="rgba(255,255,255,.02)" stroke="rgba(255,255,255,.06)" stroke-width="1"/>
  <rect x="194" y="204" width="50" height="6" rx="2" fill="rgba(255,230,0,.3)"/>
  <rect x="194" y="215" width="48" height="5" rx="2" fill="rgba(255,255,255,.07)"/>
  <rect x="262" y="194" width="74" height="42" rx="4" fill="rgba(255,255,255,.02)" stroke="rgba(255,255,255,.06)" stroke-width="1"/>
  <rect x="272" y="204" width="54" height="6" rx="2" fill="rgba(255,230,0,.3)"/>
  <rect x="272" y="215" width="52" height="5" rx="2" fill="rgba(255,255,255,.07)"/>
  <rect x="184" y="244" width="152" height="28" rx="4" fill="rgba(255,255,255,.02)" stroke="rgba(255,255,255,.06)" stroke-width="1"/>
  <rect x="196" y="253" width="128" height="5" rx="2" fill="rgba(255,255,255,.07)"/>
  <rect x="196" y="263" width="96" height="5" rx="2" fill="rgba(255,255,255,.04)"/>
  <rect x="184" y="280" width="152" height="28" rx="4" fill="rgba(255,255,255,.02)" stroke="rgba(255,255,255,.06)" stroke-width="1"/>
  <rect x="196" y="289" width="104" height="5" rx="2" fill="rgba(255,255,255,.07)"/>
  <rect x="196" y="300" width="78" height="5" rx="2" fill="rgba(255,255,255,.04)"/>
  <rect x="228" y="348" width="64" height="4" rx="2" fill="rgba(255,255,255,.12)"/>
  <rect x="22" y="80" width="132" height="52" rx="8" fill="#0A1628" stroke="rgba(255,230,0,.2)" stroke-width="1"/>
  <text x="38" y="100" font-size="10" font-family="'Inter',sans-serif" fill="rgba(255,255,255,.38)" font-weight="500">PageSpeed</text>
  <text x="38" y="120" font-size="22" font-family="'Inter',sans-serif" fill="#FFE600" font-weight="800">94</text>
  <text x="72" y="120" font-size="12" font-family="'Inter',sans-serif" fill="rgba(255,230,0,.4)" font-weight="500">/100</text>
  <rect x="366" y="80" width="132" height="52" rx="8" fill="#0A1628" stroke="rgba(255,255,255,.07)" stroke-width="1"/>
  <text x="382" y="100" font-size="10" font-family="'Inter',sans-serif" fill="rgba(255,255,255,.38)" font-weight="500">Conversão</text>
  <text x="382" y="120" font-size="22" font-family="'Inter',sans-serif" fill="#fff" font-weight="800">+43%</text>
  <rect x="22" y="260" width="132" height="52" rx="8" fill="#0A1628" stroke="rgba(255,230,0,.16)" stroke-width="1"/>
  <text x="38" y="280" font-size="10" font-family="'Inter',sans-serif" fill="rgba(255,255,255,.38)" font-weight="500">Entrega em</text>
  <text x="38" y="300" font-size="22" font-family="'Inter',sans-serif" fill="#FFE600" font-weight="800">7 dias</text>
  <rect x="366" y="260" width="132" height="52" rx="8" fill="#0A1628" stroke="rgba(255,230,0,.16)" stroke-width="1"/>
  <text x="382" y="280" font-size="10" font-family="'Inter',sans-serif" fill="rgba(255,255,255,.38)" font-weight="500">6× de</text>
  <text x="382" y="300" font-size="20" font-family="'Inter',sans-serif" fill="#FFE600" font-weight="800">R$ 116</text>
  <line x1="154" y1="106" x2="168" y2="106" stroke="rgba(255,230,0,.14)" stroke-width="1" stroke-dasharray="3 3"/>
  <line x1="336" y1="106" x2="352" y2="106" stroke="rgba(255,230,0,.14)" stroke-width="1" stroke-dasharray="3 3"/>
  <line x1="154" y1="286" x2="168" y2="286" stroke="rgba(255,230,0,.1)" stroke-width="1" stroke-dasharray="3 3"/>
  <line x1="336" y1="286" x2="352" y2="286" stroke="rgba(255,230,0,.1)" stroke-width="1" stroke-dasharray="3 3"/>
</svg>`

const CSS = `
:root{
  --bg:#050D1A;--bg-el:#111F35;--bg-card:#0C1829;
  --yellow:#FFE600;--yellow-dim:rgba(255,230,0,.12);--yellow-glow:rgba(255,230,0,.2);
  --text:#FFFFFF;--text-sec:rgba(255,255,255,.55);--text-muted:rgba(255,255,255,.28);
  --border:rgba(255,255,255,.08);--border-y:rgba(255,230,0,.22);
  --font-d:'Inter',sans-serif;--font-b:'Inter',sans-serif;
  --r-sm:6px;--r-md:10px;--r-pill:999px;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{width:100%;height:100%;overflow:hidden;font-family:var(--font-b)}
#dot-grid{position:fixed;inset:0;z-index:1;pointer-events:none;background-image:radial-gradient(rgba(255,255,255,.035) 1px,transparent 1px);background-size:28px 28px;opacity:0;transition:opacity .5s ease;}
#dot-grid::after{content:'';position:absolute;bottom:0;left:0;right:0;height:200px;pointer-events:none;background:linear-gradient(to top,var(--bg),transparent);}
#pricing-section{position:fixed;inset:0;z-index:20;background:var(--bg);padding:48px 40px 32px;display:flex;flex-direction:column;align-items:center;overflow-y:auto;scrollbar-width:none;opacity:0;pointer-events:none;}
#pricing-section::-webkit-scrollbar{display:none;}
#pricing-section .pricing-label{font-family:var(--font-b);font-size:10px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:var(--yellow);margin-bottom:14px;text-align:center;width:100%;}
#pricing-section h2{font-family:var(--font-d);font-size:clamp(32px,4vw,52px);font-weight:900;color:var(--text);letter-spacing:-.04em;text-align:center;margin-bottom:10px;line-height:1.0;}
#pricing-section .pricing-sub{font-family:var(--font-b);font-size:15px;font-weight:300;color:var(--text-sec);text-align:center;max-width:420px;line-height:1.65;margin-bottom:56px;align-self:center;width:100%;}
.pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;width:100%;max-width:1040px;align-items:stretch;}
.pcard{background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:32px 28px 28px;display:flex;flex-direction:column;align-items:center;gap:0;position:relative;text-align:center;}
.pcard.featured{border-color:var(--border-y);background:linear-gradient(145deg,rgba(255,230,0,.05) 0%,var(--bg-card) 60%);box-shadow:0 0 0 1px rgba(255,230,0,.08),0 24px 60px rgba(0,0,0,.4);}
.pcard.featured .pcard-price{color:var(--yellow);}
.pcard-badge{display:inline-flex;align-items:center;background:var(--yellow);color:#111;font-family:var(--font-b);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;border-radius:999px;padding:4px 12px;margin-bottom:20px;align-self:center;}
.pcard-name{font-family:var(--font-d);font-size:16px;font-weight:700;color:var(--text);letter-spacing:-.01em;margin-bottom:20px;text-align:center;}
.pcard-price{font-family:var(--font-d);font-size:clamp(38px,4vw,52px);font-weight:900;line-height:1;letter-spacing:-.04em;margin-bottom:6px;text-align:center;color:var(--text);}
.pcard-installment{font-family:var(--font-b);font-size:12px;font-weight:300;color:var(--text-muted);margin-bottom:28px;text-align:center;}
.pcard-divider{height:1px;background:var(--border);margin-bottom:24px;}
.pcard-features{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:32px;flex:1;}
.pcard-features li{font-family:var(--font-b);font-size:13px;font-weight:400;color:var(--text-sec);line-height:1.45;display:flex;align-items:center;gap:10px;justify-content:flex-start;text-align:left;}
.pcard-features li::before{content:'';display:block;flex-shrink:0;width:14px;height:14px;margin-top:1px;background-image:url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='7' cy='7' r='6.5' stroke='%23FFE600' stroke-opacity='.35'/%3E%3Cpath d='M4 7l2 2 4-4' stroke='%23FFE600' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C%2Fsvg%3E");background-repeat:no-repeat;background-size:contain;}
.pcard.plain .pcard-features li::before{background-image:url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='7' cy='7' r='6.5' stroke='rgba(255,255,255,.2)'/%3E%3Cpath d='M4 7l2 2 4-4' stroke='rgba(255,255,255,.35)' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C%2Fsvg%3E");}
.pcard-features{align-self:stretch;}
.pcta{display:block;width:100%;padding:13px 20px;border-radius:6px;font-family:var(--font-d);font-size:13px;font-weight:700;letter-spacing:.02em;text-align:center;cursor:pointer;text-decoration:none;border:none;transition:transform .18s,box-shadow .18s,filter .18s;}
.pcta:hover{transform:translateY(-2px);}
.pcta.primary{background:var(--yellow);color:#111;}
.pcta.primary:hover{box-shadow:0 8px 28px rgba(255,230,0,.28);filter:brightness(1.06);}
.pcta.ghost{background:transparent;border:1px solid var(--border);color:var(--text-sec);}
.pcta.ghost:hover{border-color:rgba(255,255,255,.22);color:var(--text);}
.pcta.ghost-yellow{background:transparent;border:1px solid var(--border-y);color:var(--yellow);}
.pcta.ghost-yellow:hover{box-shadow:0 0 0 1px rgba(255,230,0,.2);}
.pricing-footer{margin-top:32px;font-family:var(--font-b);font-size:13px;font-weight:400;color:var(--text-muted);text-align:center;line-height:1.8;}
.ps-wrap{width:100%;max-width:1040px;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 0 60px;}
.ps-stats{display:flex;gap:48px;justify-content:center;margin-bottom:72px;flex-wrap:wrap;}
.ps-stat{text-align:center;}
.ps-stat-num{font-family:var(--font-d);font-size:clamp(40px,5vw,64px);font-weight:900;letter-spacing:-.04em;color:var(--yellow);line-height:1;display:block;margin-bottom:6px;}
.ps-stat-lbl{font-family:var(--font-b);font-size:12px;font-weight:400;color:var(--text-sec);letter-spacing:.04em;}
.ps-testimonials{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;width:100%;margin-bottom:64px;}
.ps-tcard{background:var(--bg-el);border:1px solid var(--border);border-radius:12px;padding:28px 24px;display:flex;flex-direction:column;gap:16px;}
.ps-tcard-quote{font-family:var(--font-b);font-size:14px;font-weight:300;color:var(--text-sec);line-height:1.7;font-style:italic;flex:1;}
.ps-tcard-quote strong{color:var(--text);font-weight:500;font-style:normal;}
.ps-tcard-author{display:flex;flex-direction:column;gap:3px;padding-top:16px;border-top:1px solid var(--border);}
.ps-tcard-name{font-family:var(--font-d);font-size:13px;font-weight:600;color:var(--text);}
.ps-tcard-role{font-family:var(--font-b);font-size:11px;font-weight:400;color:var(--text-muted);}
.ps-logos{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;}
.ps-logo-chip{padding:8px 20px;border:1px solid var(--border);border-radius:var(--r-pill);font-family:var(--font-d);font-size:12px;font-weight:600;color:var(--text-muted);letter-spacing:.04em;transition:border-color .2s,color .2s;}
.ps-logo-chip:hover{border-color:var(--border-y);color:var(--yellow);}
.site-footer{width:100%;max-width:1040px;border-top:1px solid var(--border);padding:48px 0 48px;margin-top:48px;display:flex;flex-direction:column;align-items:center;gap:20px;}
.footer-logo{font-family:var(--font-d);font-size:20px;font-weight:800;letter-spacing:.02em;text-transform:uppercase;color:var(--text);}
.footer-logo .nn{color:var(--yellow);}
.footer-links{display:flex;gap:28px;align-items:center;}
.footer-link{font-family:var(--font-b);font-size:12px;font-weight:400;color:var(--text-muted);text-decoration:none;transition:color .18s;}
.footer-link:hover{color:var(--text);}
.footer-copy{font-family:var(--font-b);font-size:11px;font-weight:300;color:var(--text-muted);text-align:center;line-height:1.6;}
#bg{position:fixed;inset:0;z-index:0;opacity:0;pointer-events:none;transition:background .85s ease,opacity .5s ease;}
#text-block{position:fixed;left:0;top:0;bottom:0;width:52%;z-index:3;display:flex;align-items:center;padding:0 80px;opacity:0;pointer-events:none;transition:opacity .5s ease;}
#text-inner{width:100%}
#eyebrow{display:block;font-family:var(--font-b);font-size:13px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;margin-bottom:18px;will-change:transform,opacity;}
#title-clip{margin-bottom:20px}
#title{display:block;font-family:var(--font-d);font-size:clamp(52px,7.5vw,110px);font-weight:900;font-style:normal;line-height:.95;letter-spacing:-.04em;word-break:normal;overflow-wrap:normal;white-space:pre-line;will-change:transform,opacity;}
#desc{font-family:var(--font-b);font-size:15px;font-weight:300;line-height:1.7;max-width:360px;white-space:pre-line;will-change:transform,opacity;}
#cta-wrap{display:flex;flex-direction:row;align-items:center;gap:12px;margin-top:32px;will-change:transform,opacity;}
#cta{display:inline-flex;align-items:center;gap:14px;font-family:var(--font-b);font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;text-decoration:none;cursor:pointer;}
.cta-line{display:inline-block;height:1px;width:36px;transition:width .3s}
#cta:hover .cta-line{width:56px}
#cta.cta-btn{padding:14px 28px;border-radius:var(--r-sm);background:var(--yellow);color:#111;font-size:12px;letter-spacing:.06em;font-weight:600;gap:0;text-transform:uppercase;transition:transform .18s,box-shadow .18s;}
#cta.cta-btn:hover{transform:translateY(-2px);box-shadow:0 10px 32px var(--yellow-glow);}
#cta.cta-ghost{padding:11px 18px;border-radius:var(--r-sm);border:1px solid transparent;font-size:11px;letter-spacing:.06em;font-weight:600;gap:0;text-transform:uppercase;transition:transform .18s,filter .18s;}
#cta.cta-ghost:hover{transform:translateY(-1px);filter:brightness(1.15);}
#cta-site{display:none;padding:12px 18px;border-radius:var(--r-sm);font-family:var(--font-b);font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;text-align:center;align-items:center;justify-content:center;cursor:pointer;transition:transform .18s,box-shadow .18s;}
#cta-site:hover{transform:translateY(-2px);filter:brightness(1.1);}
#cta2{display:none;padding:13px 28px;border-radius:var(--r-sm);background:transparent;border:1px solid var(--border);color:var(--text-sec);font-family:var(--font-b);font-weight:400;font-size:13px;cursor:pointer;text-decoration:none;align-self:flex-start;text-transform:uppercase;transition:transform .18s,border-color .18s,color .18s;}
#cta2:hover{transform:translateY(-2px);border-color:rgba(255,255,255,.22);color:var(--text);}
#img-track-wrap{position:fixed;right:0;top:0;bottom:0;width:56%;z-index:2;clip-path:inset(0);perspective:1000px;perspective-origin:50% 50%;opacity:0;pointer-events:none;transition:opacity .5s ease;}
#img-track{display:flex;flex-direction:column;align-items:center;gap:28px;position:absolute;left:0;right:0;top:0;transform-style:preserve-3d;will-change:transform;}
.img-card{width:72%;flex-shrink:0;border-radius:var(--r-sm);overflow:hidden;box-shadow:0 16px 50px rgba(0,0,0,.28);opacity:.2;transform:rotateY(-22deg) rotateZ(-5deg) scale(.88);transition:opacity .7s ease,transform .7s ease,box-shadow .7s ease;}
.img-card.active{opacity:1;transform:rotateY(-16deg) rotateZ(-3deg) scale(1);box-shadow:0 36px 100px rgba(0,0,0,.28);}
.img-card-inner{width:100%;aspect-ratio:4/3;position:relative;overflow:hidden;display:block;}
nav{position:fixed;top:0;left:0;right:0;z-index:40;display:flex;justify-content:space-between;align-items:center;padding:18px 52px;pointer-events:none;opacity:0;transition:opacity .5s ease,background .4s ease,backdrop-filter .4s ease;background:transparent;}
nav.glass{background:rgba(5,13,26,.72);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.06);}
.nav-links{display:flex;align-items:center;gap:32px;}
.nav-link{font-family:var(--font-b);font-size:12px;font-weight:500;letter-spacing:.04em;text-decoration:none;color:inherit;opacity:.7;transition:opacity .2s;cursor:pointer;background:none;border:none;pointer-events:auto;}
.nav-link:hover{opacity:1;}
.nav-cta{padding:9px 20px;border-radius:var(--r-sm);font-family:var(--font-b);font-size:12px;font-weight:600;background:var(--yellow);color:#111;text-decoration:none;cursor:pointer;border:none;transition:transform .18s,box-shadow .18s;white-space:nowrap;pointer-events:auto;}
.nav-cta:hover{transform:translateY(-1px);box-shadow:0 6px 20px var(--yellow-glow);}
.dots{position:fixed;right:26px;top:50%;transform:translateY(-50%);z-index:10;display:flex;flex-direction:column;gap:9px;opacity:0;pointer-events:none;transition:opacity .5s ease;}
.dot{width:4px;height:4px;border-radius:2px;cursor:pointer;transition:height .35s,background .5s;}
.dot.active{height:22px}
.progress{position:fixed;bottom:0;left:0;z-index:10;height:2px;transition:width .85s cubic-bezier(.76,0,.24,1),background .6s,opacity .5s;opacity:0;}
#fab-wa{position:fixed;bottom:32px;right:32px;z-index:50;display:flex;align-items:center;gap:12px;cursor:pointer;text-decoration:none;}
#fab-bubble{background:#fff;color:#111;font-family:var(--font-b);font-size:13px;font-weight:500;padding:9px 16px;border-radius:var(--r-pill);box-shadow:0 4px 20px rgba(0,0,0,.25);white-space:nowrap;transform:translateX(8px);opacity:0;transition:opacity .25s ease,transform .25s ease;pointer-events:none;}
#fab-bubble::after{content:'';position:absolute;right:-6px;top:50%;transform:translateY(-50%);border:6px solid transparent;border-left-color:#fff;border-right:0;}
#fab-btn{width:54px;height:54px;border-radius:50%;flex-shrink:0;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 24px rgba(37,211,102,.4);transition:transform .2s ease,box-shadow .2s ease;}
#fab-wa:hover #fab-btn{transform:scale(1.08);box-shadow:0 6px 32px rgba(37,211,102,.55);}
#fab-wa:hover #fab-bubble{opacity:1;transform:translateX(0);pointer-events:auto;}
@keyframes fabPulse{0%,100%{box-shadow:0 4px 24px rgba(37,211,102,.4)}50%{box-shadow:0 4px 32px rgba(37,211,102,.7),0 0 0 8px rgba(37,211,102,.12)}}
#fab-btn{animation:fabPulse 2.8s ease-in-out infinite;}
#mobile-img{display:none;position:fixed;left:12%;right:12%;bottom:0;border-radius:10px 10px 0 0;overflow:hidden;background-size:cover;background-position:center top;box-shadow:0 -8px 40px rgba(0,0,0,.16);opacity:0;pointer-events:none;}
#nav-burger{display:none;flex-direction:column;justify-content:center;gap:5px;background:none;border:none;cursor:pointer;color:inherit;padding:6px;margin-left:8px;pointer-events:auto;}
#nav-burger span{display:block;width:22px;height:2px;background:currentColor;border-radius:2px;transition:transform .3s ease,opacity .3s ease;}
#nav-burger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
#nav-burger.open span:nth-child(2){opacity:0;}
#nav-burger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
#mobile-menu{position:fixed;inset:0;z-index:35;background:rgba(5,13,26,.97);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;opacity:0;pointer-events:none;}
.mm-link{font-family:var(--font-d);font-size:clamp(28px,9vw,44px);font-weight:800;letter-spacing:-.03em;color:var(--text);opacity:.5;background:none;border:none;cursor:pointer;padding:10px 24px;transition:opacity .2s;}
.mm-link:hover{opacity:1;}
.mm-cta{margin-top:28px;padding:14px 36px;border-radius:var(--r-sm);background:var(--yellow);color:#111;font-family:var(--font-b);font-size:14px;font-weight:700;text-decoration:none;transition:transform .18s;}
.mm-cta:hover{transform:translateY(-2px);}
@media (max-width:1024px){
  #text-block{width:58%;padding:0 48px;}
  #img-track-wrap{width:48%;}
  nav{padding:18px 32px;}
}
@media (max-width:768px){
  nav{padding:36px 24px 16px;}
  .nav-links{display:none;}
  .nav-cta{display:none;}
  #nav-burger{display:flex;}
  #text-block{width:100%;top:88px;bottom:37vh;height:auto;padding:0 24px;justify-content:flex-start;align-items:flex-start;}
  #img-track-wrap{display:none;}
  #mobile-img{display:block;height:44vh;}
  #title{font-size:64px !important;white-space:normal;line-height:1.05;}
  #desc{font-size:14px !important;max-width:100% !important;line-height:1.6;}
  #eyebrow{font-size:9px;letter-spacing:.2em;}
  #cta-wrap{flex-direction:row;align-items:stretch;gap:10px;width:100%;}
  #cta-site{flex:0 0 auto;}
  #cta.cta-ghost{flex:1;text-align:center;justify-content:center;padding:14px 12px;}
  #cta.cta-btn{width:100%;text-align:center;justify-content:center;padding:15px 20px;}
  #cta2{width:100%;text-align:center;justify-content:center;}
  .dots{right:10px;}
  #pricing-section{padding:32px 20px 24px;}
  .ps-wrap{padding:60px 0 32px;min-height:auto;}
  #pricing-section h2{font-size:clamp(26px,7vw,40px);}
  #pricing-section .pricing-sub{font-size:14px;}
  .ps-testimonials{grid-template-columns:1fr;gap:16px;}
  .pricing-grid{grid-template-columns:1fr;max-width:480px;}
  .site-footer{padding:32px 0 28px;gap:16px;}
  .footer-links{gap:20px;flex-wrap:wrap;justify-content:center;}
  .footer-copy{font-size:10px;}
  #fab-wa{bottom:20px;right:16px;}
  #fab-btn{width:48px;height:48px;}
  #fab-bubble{font-size:12px;padding:8px 14px;}
}
@media (max-width:480px){
  nav{padding:12px 16px;}
  #text-block{bottom:42vh;padding:52px 20px 16px;}
  #title{font-size:clamp(26px,8vw,38px) !important;}
  #mobile-img{height:42vh;}
  .pcard{padding:24px 20px 20px;}
  #pricing-section{padding:28px 16px 20px;}
}
`

export default function Home() {
  const goToRef = useRef<(next: number, dir: 'up' | 'down') => void>(() => {})
  const goToPricingRef = useRef<(target: string) => void>(() => {})
  const closeMobileMenuRef = useRef<() => void>(() => {})

  useEffect(() => {
    gsap.registerPlugin(Observer)

    let current = 0
    let busy = false
    let menuOpen = false

    const TOTAL = DATA.length

    const pricingEl     = document.getElementById('pricing-section')!
    const imgTrackWrapEl = document.getElementById('img-track-wrap')!
    const navEl         = document.getElementById('nav')!
    const track         = document.getElementById('img-track')!
    const bgEl          = document.getElementById('bg')!
    const dotGridEl     = document.getElementById('dot-grid')!
    const eyebrowEl     = document.getElementById('eyebrow')!
    const titleEl       = document.getElementById('title')!
    const descEl        = document.getElementById('desc')!
    const ctaEl         = document.getElementById('cta') as HTMLAnchorElement
    const ctaSiteEl     = document.getElementById('cta-site') as HTMLAnchorElement
    const ctaLine       = document.getElementById('cta-line')!
    const ctaWrapEl     = document.getElementById('cta-wrap')!
    const cta2El        = document.getElementById('cta2') as HTMLAnchorElement
    const mobileImgEl   = document.getElementById('mobile-img')!
    const progressEl    = document.getElementById('progress')!
    const burgerEl      = document.getElementById('nav-burger')!
    const mobileMenuEl  = document.getElementById('mobile-menu')!
    const textBlockEl   = document.getElementById('text-block')!
    const dotsWrapEl    = document.querySelector('.dots') as HTMLElement
    const progressWrapEl = document.querySelector('.progress') as HTMLElement

    const cards   = [...document.querySelectorAll<HTMLElement>('.img-card')]
    const dots    = [...document.querySelectorAll<HTMLElement>('.dot')]
    const mmItems = [...mobileMenuEl.querySelectorAll<HTMLElement>('.mm-link, .mm-cta')]

    const carouselEls = [bgEl, textBlockEl, imgTrackWrapEl, dotsWrapEl, progressWrapEl]

    if (window.innerWidth <= 768) {
      textBlockEl.style.setProperty('justify-content', 'flex-start', 'important')
      textBlockEl.style.setProperty('padding-top', '16px', 'important')
      mobileImgEl.style.setProperty('left', '24px', 'important')
      mobileImgEl.style.setProperty('box-shadow', '0 -16px 60px rgba(0,0,0,.16)', 'important')
      mobileImgEl.style.setProperty('right', '24px', 'important')

    }

    function showCarouselUI() {
      carouselEls.forEach(el => {
        if (!el) return
        el.style.opacity = '1'
        el.style.pointerEvents = 'auto'
      })
    }

    function cardStep() { return cards[0].offsetHeight + 20 }
    function trackY(idx: number) {
      const wrapH = imgTrackWrapEl.offsetHeight
      const cardH = cards[0].offsetHeight
      return (wrapH / 2 - cardH / 2) - idx * cardStep()
    }
    function setActiveCard(idx: number) {
      const ci = Math.min(idx, cards.length - 1)
      cards.forEach((c, i) => c.classList.toggle('active', i === ci))
    }
    function updateUI(idx: number) {
      const s = DATA[idx]
      const fg   = s.light ? '#111' : '#fff'
      const fade = s.light ? 'rgba(0,0,0,.28)' : 'rgba(255,255,255,.22)'
      bgEl.style.background       = s.bg
      progressEl.style.width      = `${((idx + 1) / TOTAL) * 100}%`
      progressEl.style.background = s.accent
      navEl.style.color            = fg
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === idx)
        d.style.background = i === idx ? s.accent : fade
      })
    }
    function applyText(s: SlideData) {
      eyebrowEl.textContent   = s.eyebrow || ''
      eyebrowEl.style.color   = s.eyeColor || ''
      eyebrowEl.style.display = s.eyebrow ? 'block' : 'none'

      if (s.titleHTML) titleEl.innerHTML = s.titleHTML
      else titleEl.textContent = s.title || ''
      titleEl.style.color      = s.titleColor  || ''
      titleEl.style.fontFamily = s.titleFont   || ''
      titleEl.style.fontSize   = s.titleSize   || ''
      titleEl.style.fontWeight = s.titleWeight || ''
      if (window.innerWidth <= 768) {
        if (s.isHero) titleEl.style.setProperty('font-size', '40px', 'important')
        else if (!s.isPricing) {
          titleEl.style.setProperty('font-size', s.mobileTitleSize || '55px', 'important')
          descEl.style.setProperty('font-size', '15px', 'important')
          eyebrowEl.style.setProperty('font-size', '11px', 'important')
        }
      }
      titleEl.style.fontStyle  = s.titleStyle  || ''

      descEl.style.fontFamily = s.descFont    || ''
      descEl.style.fontSize   = s.descSize    || ''
      descEl.style.maxWidth   = s.descMaxWidth || '360px'
      if (s.descHTML) descEl.innerHTML = s.descHTML
      else descEl.textContent = s.desc || ''
      descEl.style.color = s.descColor || ''

      const isProject = !s.isHero && !s.isPricing

      if (s.ctaIsButton) {
        ctaEl.classList.add('cta-btn')
        ctaEl.classList.remove('cta-ghost')
        ctaLine.style.display  = 'none'
        ctaEl.style.color      = '#111'
        ctaEl.style.background = ''
        ctaEl.style.borderColor = ''
      } else {
        ctaEl.classList.remove('cta-btn')
        ctaEl.classList.add('cta-ghost')
        ctaLine.style.display   = 'none'
        ctaEl.style.color       = s.ctaColor || ''
        ctaEl.style.background  = (s.ctaColor || '') + '18'
        ctaEl.style.borderColor = (s.ctaColor || '') + '55'
      }
      ctaEl.style.visibility = 'visible'
      ctaEl.href = s.href || '#'
      const ctaLabelEl = document.getElementById('cta-label')!
      ctaLabelEl.textContent = s.ctaLabel || 'Ver case completo'

      if (window.innerWidth <= 768)
        ctaWrapEl.style.flexDirection = s.isHero ? 'column' : 'row'

      if (isProject && s.siteUrl) {
        ctaSiteEl.style.display = 'inline-flex'
        ctaSiteEl.href = s.siteUrl
        ctaSiteEl.target = '_blank'
        ctaSiteEl.style.background = s.ctaColor || s.accent
        ctaSiteEl.style.color = s.light ? '#fff' : '#111'
      } else {
        ctaSiteEl.style.display = 'none'
      }

      if (s.ctaSecondary) {
        cta2El.style.display = 'inline-flex'
        cta2El.textContent   = s.ctaSecondary.label
        if (s.ctaSecondary.scrollDown) {
          cta2El.removeAttribute('href')
          cta2El.onclick = (e) => { e.preventDefault(); goTo(current + 1, 'down') }
        } else {
          cta2El.href    = s.ctaSecondary.href || '#'
          cta2El.onclick = null
        }
      } else {
        cta2El.style.display = 'none'
        cta2El.onclick = null
      }

      dotGridEl.style.opacity = s.isHero ? '1' : '0'

      if (s.isHero) {
        mobileImgEl.innerHTML          = ''
        mobileImgEl.style.backgroundImage = 'none'
        mobileImgEl.style.cursor       = 'default'
        mobileImgEl.style.display      = 'none'
        mobileImgEl.onclick            = null
      } else if (s.img) {
        mobileImgEl.style.display      = ''
        mobileImgEl.innerHTML          = ''
        mobileImgEl.style.backgroundImage    = `url(${s.img})`
        mobileImgEl.style.backgroundPosition = s.mobileImgPosition || 'center top'
        if (s.siteUrl) {
          mobileImgEl.style.cursor        = 'pointer'
          mobileImgEl.style.pointerEvents = 'auto'
          mobileImgEl.onclick = () => s.siteUrl!.startsWith('http')
            ? window.open(s.siteUrl, '_blank')
            : (window.location.href = s.siteUrl!)
        } else {
          mobileImgEl.style.cursor        = 'default'
          mobileImgEl.style.pointerEvents = 'none'
          mobileImgEl.onclick             = null
        }
      } else {
        mobileImgEl.innerHTML          = ''
        mobileImgEl.style.backgroundImage = 'none'
        mobileImgEl.style.cursor       = 'default'
        mobileImgEl.onclick            = null
      }

    }

    function updateMobileImgHeight() {
      if (window.innerWidth > 768) return
      const ctaRect = ctaWrapEl.getBoundingClientRect()
      const gap = 24
      const newH = Math.max(60, window.innerHeight - ctaRect.bottom - gap)
      mobileImgEl.style.setProperty('height', `${newH}px`, 'important')
    }

    function _animateCarouselIn() {
      showCarouselUI()
      carouselObserver.enable()
      requestAnimationFrame(() => {
        const tl = gsap.timeline({ delay: .05 })
        tl.to(titleEl,    { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, 0)
        tl.to(eyebrowEl,  { opacity: 1, y: 0, duration: .7,  ease: 'power2.out' }, .2)
        tl.to(descEl,     { opacity: 1, y: 0, duration: .65, ease: 'power2.out' }, .28)
        tl.to(ctaWrapEl,  { opacity: 1, y: 0, duration: .55, ease: 'power2.out' }, .36)
        tl.to(mobileImgEl,{ opacity: 1, duration: .6,        ease: 'power2.out' }, .3)
      })
    }

    function goToPricingSection(target: string) {
      const pricingIdx = DATA.findIndex(s => s.isPricing)
      if (pricingIdx < 0) return
      const doScroll = () => {
        if (target === 'pricing') {
          const wrap = document.getElementById('pricing-wrap')
          if (wrap) wrap.scrollIntoView({ behavior: 'smooth' })
        } else {
          pricingEl.scrollTop = 0
        }
      }
      if (DATA[current].isPricing) { doScroll(); return }
      goTo(pricingIdx, 'down')
      setTimeout(doScroll, 1000)
    }

    function _showPricingSlide() {
      carouselObserver.disable()
      pricingEl.scrollTop = 0
      gsap.to(imgTrackWrapEl, { opacity: 0, duration: .3 })
      gsap.to(mobileImgEl,    { opacity: 0, duration: .3 })

      const clientesWrap = document.getElementById('clientes-wrap')!
      const label  = clientesWrap.querySelector('.pricing-label')!
      const h2     = clientesWrap.querySelector('h2')!
      const sub    = clientesWrap.querySelector('.pricing-sub')!
      const tcards = [...clientesWrap.querySelectorAll('.ps-tcard')]

      gsap.set([label, h2, sub], { opacity: 0, y: 24 })
      gsap.set(tcards, { opacity: 0, y: 48, scale: .97 })

      navEl.classList.add('glass')
      pricingEl.style.pointerEvents = 'auto'

      const tl = gsap.timeline({ delay: .1 })
      tl.to(pricingEl, { opacity: 1, duration: .35, ease: 'power2.out' }, 0)
      tl.to(label,     { opacity: 1, y: 0, duration: .4,  ease: 'power2.out' }, .12)
      tl.to(h2,        { opacity: 1, y: 0, duration: .65, ease: 'power3.out' }, .2)
      tl.to(sub,       { opacity: 1, y: 0, duration: .5,  ease: 'power2.out' }, .32)
      tl.to(tcards, { opacity: 1, y: 0, scale: 1, duration: .7, ease: 'power3.out', stagger: { amount: .3, from: 'start' } }, .48)
    }

    function _hidePricingSlide(onDone: () => void) {
      navEl.classList.remove('glass')
      pricingEl.style.pointerEvents = 'none'
      gsap.to(pricingEl,       { opacity: 0, duration: .35, ease: 'power2.in', onComplete: onDone })
      gsap.to(imgTrackWrapEl,  { opacity: 1, duration: .5,  delay: .2 })
    }

    function goTo(next: number, dir: 'up' | 'down') {
      if (busy || next === current || next < 0 || next >= TOTAL) return
      busy = true
      const d = dir === 'down' ? 1 : -1
      const s = DATA[next]
      const fromPricing = DATA[current].isPricing
      const toPricing   = s.isPricing

      bgEl.style.background = s.bg
      updateUI(next)

      if (fromPricing) {
        _hidePricingSlide(() => {
          setActiveCard(next)
          gsap.to(track, { y: trackY(next), duration: .85, ease: 'power3.inOut' })
          gsap.set(mobileImgEl, { opacity: 0 })
          applyText(s)
          gsap.set(ctaWrapEl, { y: 0 })
          updateMobileImgHeight()
          gsap.set(titleEl,   { y: d * 30 })
          gsap.set(eyebrowEl, { y: d * 16 })
          gsap.set(descEl,    { y: d * 18 })
          gsap.set(ctaWrapEl, { y: d * 12 })
          const inTl = gsap.timeline({ onComplete() { busy = false; current = next; carouselObserver.enable() } })
          inTl.to(titleEl,    { opacity: 1, y: 0, duration: .7,  ease: 'power3.out' }, 0)
          inTl.to(eyebrowEl,  { opacity: 1, y: 0, duration: .58, ease: 'power2.out' }, .1)
          inTl.to(descEl,     { opacity: 1, y: 0, duration: .55, ease: 'power2.out' }, .16)
          inTl.to(ctaWrapEl,  { opacity: 1, y: 0, duration: .48, ease: 'power2.out' }, .22)
          inTl.to(mobileImgEl,{ opacity: 1, duration: .6,        ease: 'power2.out' }, .2)
        })
        return
      }

      const outTl = gsap.timeline()
      outTl.to(titleEl,    { opacity: 0, y: -d * 28, duration: .35, ease: 'power2.in' }, 0)
      outTl.to(eyebrowEl,  { opacity: 0, y: -d * 14, duration: .28, ease: 'power2.in' }, 0)
      outTl.to(descEl,     { opacity: 0, y: -d * 16, duration: .3,  ease: 'power2.in' }, .04)
      outTl.to(ctaWrapEl,  { opacity: 0, y: -d * 10, duration: .25, ease: 'power2.in' }, .06)
      outTl.to(mobileImgEl,{ opacity: 0, duration: .25, ease: 'power2.in' }, 0)

      if (!toPricing) {
        setActiveCard(next)
        gsap.to(track, { y: trackY(next), duration: .85, ease: 'power3.inOut' })
      }

      outTl.call(() => {
        if (toPricing) {
          _showPricingSlide()
          busy = false; current = next
          return
        }
        gsap.set(mobileImgEl, { opacity: 0 })
        applyText(s)
        gsap.set(ctaWrapEl, { y: 0 })
        updateMobileImgHeight()
        gsap.set(titleEl,   { y: d * 30 })
        gsap.set(eyebrowEl, { y: d * 16 })
        gsap.set(descEl,    { y: d * 18 })
        gsap.set(ctaWrapEl, { y: d * 12 })
        const inTl = gsap.timeline({ onComplete() { busy = false; current = next } })
        inTl.to(titleEl,    { opacity: 1, y: 0, duration: .7,  ease: 'power3.out' }, 0)
        inTl.to(eyebrowEl,  { opacity: 1, y: 0, duration: .58, ease: 'power2.out' }, .1)
        inTl.to(descEl,     { opacity: 1, y: 0, duration: .55, ease: 'power2.out' }, .16)
        inTl.to(ctaWrapEl,  { opacity: 1, y: 0, duration: .48, ease: 'power2.out' }, .22)
        inTl.to(mobileImgEl,{ opacity: 1, duration: .6,        ease: 'power2.out' }, .2)
      })
    }

    const carouselObserver = Observer.create({
      type: 'wheel,touch,pointer',
      wheelSpeed: -1, tolerance: 14, preventDefault: true,
      onDown: () => current > 0 ? goTo(current - 1, 'up')  : undefined,
      onUp:   () => goTo(current + 1, 'down'),
    })
    carouselObserver.disable()

    ctaEl.addEventListener('click', () => {
      if (!DATA[current]?.isHero && !DATA[current]?.isPricing)
        sessionStorage.setItem('synnk_slide', String(current))
    })

    const cardListeners: { card: HTMLElement; onDown: EventListener; onUp: EventListener }[] = []
    cards.forEach((card) => {
      const realIdx = parseInt(card.id.split('-')[1])
      const url = DATA[realIdx]?.siteUrl
      if (!url) return
      let sx = 0, sy = 0
      const onDown = (e: Event) => { sx = (e as PointerEvent).clientX; sy = (e as PointerEvent).clientY }
      const onUp   = (e: Event) => {
        if (Math.abs((e as PointerEvent).clientX - sx) < 6 && Math.abs((e as PointerEvent).clientY - sy) < 6) {
          if (url.startsWith('http')) window.open(url, '_blank')
          else window.location.href = url
        }
      }
      card.addEventListener('pointerdown', onDown)
      card.addEventListener('pointerup', onUp)
      cardListeners.push({ card, onDown, onUp })
    })

    function openMobileMenu() {
      menuOpen = true
      burgerEl.classList.add('open')
      mobileMenuEl.style.pointerEvents = 'auto'
      gsap.set(mmItems, { opacity: 0, y: 24 })
      gsap.to(mobileMenuEl, { opacity: 1, duration: .3, ease: 'power2.out' })
      gsap.to(mmItems, { opacity: .6, y: 0, duration: .5, ease: 'power3.out', stagger: .07, delay: .12 })
    }
    function closeMobileMenu() {
      menuOpen = false
      burgerEl.classList.remove('open')
      mobileMenuEl.style.pointerEvents = 'none'
      gsap.to(mobileMenuEl, { opacity: 0, duration: .25, ease: 'power2.in' })
    }

    const burgerClick = () => menuOpen ? closeMobileMenu() : openMobileMenu()
    burgerEl.addEventListener('click', burgerClick)

    dots.forEach(d => d.addEventListener('click', () => {
      const i = +d.dataset.i!
      if (i !== current) goTo(i, i > current ? 'down' : 'up')
    }))

    goToRef.current            = goTo
    goToPricingRef.current     = goToPricingSection
    closeMobileMenuRef.current = closeMobileMenu

    const wheelHandler = (e: WheelEvent) => {
      if (!DATA[current]?.isPricing) return
      if (e.deltaY < 0 && pricingEl.scrollTop <= 0) goTo(current - 1, 'up')
    }
    const keydownHandler = (e: KeyboardEvent) => {
      if (DATA[current]?.isPricing) {
        if ((e.key === 'ArrowUp' || e.key === 'PageUp') && pricingEl.scrollTop <= 0) goTo(current - 1, 'up')
        return
      }
      if (e.key === 'ArrowDown' || e.key === 'PageDown') goTo(current + 1, 'down')
      if (e.key === 'ArrowUp'   || e.key === 'PageUp')   goTo(current - 1, 'up')
    }
    document.addEventListener('wheel', wheelHandler, { passive: true })
    document.addEventListener('keydown', keydownHandler)

    // Prevent pull-to-refresh on mobile
    document.documentElement.style.setProperty('overscroll-behavior', 'none', 'important')
    document.body.style.setProperty('overscroll-behavior', 'none', 'important')

    // Touch swipe up on pricing section goes back to projects
    let touchStartY = 0
    const touchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY }
    const touchMove = (e: TouchEvent) => {
      if (!DATA[current]?.isPricing) return
      if (touchStartY - e.touches[0].clientY < -40 && pricingEl.scrollTop <= 0) {
        e.preventDefault()
        goTo(current - 1, 'up')
      }
    }
    pricingEl.addEventListener('touchstart', touchStart, { passive: true })
    pricingEl.addEventListener('touchmove', touchMove, { passive: false })

    const _savedSlide = sessionStorage.getItem('synnk_slide')
    const startSlide  = _savedSlide
      ? (sessionStorage.removeItem('synnk_slide'), Math.min(parseInt(_savedSlide), TOTAL - 2))
      : 0
    current = startSlide

    applyText(DATA[startSlide])
    updateMobileImgHeight()
    bgEl.style.background = DATA[startSlide].bg
    bgEl.style.opacity    = '1'
    updateUI(startSlide)
    setActiveCard(startSlide)
    gsap.set(track, { y: trackY(startSlide) })
    gsap.set([eyebrowEl, titleEl, descEl, ctaWrapEl, mobileImgEl], { opacity: 0 })
    gsap.set(titleEl,   { y: 32 })
    gsap.set(eyebrowEl, { y: 16 })
    gsap.set(descEl,    { y: 18 })
    gsap.set(ctaWrapEl, { y: 12 })
    showCarouselUI()
    gsap.to(navEl, {
      opacity: 1, duration: .7, delay: .3, ease: 'power2.out',
      onStart() { navEl.style.pointerEvents = 'auto' },
    })
    requestAnimationFrame(() => _animateCarouselIn())

    const onResize = () => { if (window.innerWidth <= 768) updateMobileImgHeight() }
    window.addEventListener('resize', onResize)

    return () => {
      carouselObserver.kill()
      document.removeEventListener('wheel', wheelHandler)
      document.removeEventListener('keydown', keydownHandler)
      pricingEl.removeEventListener('touchstart', touchStart)
      pricingEl.removeEventListener('touchmove', touchMove)
      document.documentElement.style.removeProperty('overscroll-behavior')
      document.body.style.removeProperty('overscroll-behavior')
      burgerEl.removeEventListener('click', burgerClick)
      window.removeEventListener('resize', onResize)
      cardListeners.forEach(({ card, onDown, onUp }) => {
        card.removeEventListener('pointerdown', onDown)
        card.removeEventListener('pointerup', onUp)
      })
    }
  }, [])

  return (
    <>
      <style>{CSS}</style>

      <section id="pricing-section">
        <div className="ps-wrap" id="clientes-wrap">
          <p className="pricing-label">Clientes</p>
          <h2>Negócios que já estão no ar</h2>
          <p className="pricing-sub">Sites e landing pages entregues nos últimos 12 meses — com resultado real.</p>
          <div className="ps-testimonials">
            <div className="ps-tcard">
              <p className="ps-tcard-quote">&ldquo;Em 7 dias meu site estava no ar. <strong>Na primeira semana tive 3 orçamentos novos</strong> — algo que não acontecia com o site antigo.&rdquo;</p>
              <div className="ps-tcard-author">
                <span className="ps-tcard-name">Dr. Ricardo Lima</span>
                <span className="ps-tcard-role">Clínica SorrisoJá · Odontologia</span>
              </div>
            </div>
            <div className="ps-tcard">
              <p className="ps-tcard-quote">&ldquo;Precisava de algo profissional sem enrolação. <strong>A SYNNK entregou exatamente isso</strong> — sem reuniões infinitas, sem surpresas no prazo.&rdquo;</p>
              <div className="ps-tcard-author">
                <span className="ps-tcard-name">Mariana Costa</span>
                <span className="ps-tcard-role">PataVida · Clínica Veterinária</span>
              </div>
            </div>
            <div className="ps-tcard">
              <p className="ps-tcard-quote">&ldquo;O site <strong>refletiu de verdade o trabalho da ONG</strong>. A equipe entendeu nossa missão sem que eu precisasse explicar duas vezes.&rdquo;</p>
              <div className="ps-tcard-author">
                <span className="ps-tcard-name">Ana Paula Ramos</span>
                <span className="ps-tcard-role">Doutores da Alegria · ONG</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pricing-inner" id="pricing-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 1040 }}>
          <p className="pricing-label">Planos &amp; Preços</p>
          <h2>Quanto custa ter<br />um site que converte?</h2>
          <p className="pricing-sub">Escolha o plano certo para o momento do seu negócio.<br />Todos com entrega garantida e suporte incluso.</p>
          <div className="pricing-grid">
            <div className="pcard featured">
              <span className="pcard-badge">Mais popular</span>
              <div className="pcard-name">Landing Page</div>
              <div className="pcard-price">R$ 699</div>
              <div className="pcard-installment">ou 6× R$ 116 sem juros</div>
              <div className="pcard-divider"></div>
              <ul className="pcard-features">
                <li>Design personalizado</li>
                <li>Copy incluso</li>
                <li>Entrega em 7 dias</li>
                <li>Mobile-first</li>
                <li>Formulário de captura</li>
                <li>1 rodada de revisão</li>
              </ul>
              <a href="https://wa.me/5519989825980" target="_blank" rel="noopener noreferrer" className="pcta primary">Quero minha landing page</a>
            </div>
            <div className="pcard plain">
              <div className="pcard-name">Website</div>
              <div className="pcard-price"><span style={{ fontSize: 14, fontWeight: 400, letterSpacing: 0, display: 'block', marginBottom: 4, color: 'var(--text-sec)' }}>a partir de</span>R$ 1.099</div>
              <div className="pcard-installment">ou 6× R$ 183 sem juros</div>
              <div className="pcard-divider"></div>
              <ul className="pcard-features">
                <li>Até 6 páginas</li>
                <li>Blog integrado</li>
                <li>SEO on-page</li>
                <li>Painel de edição</li>
                <li>Formulários avançados</li>
                <li>2 rodadas de revisão</li>
              </ul>
              <a href="https://wa.me/5519989825980" target="_blank" rel="noopener noreferrer" className="pcta ghost">Quero um website</a>
            </div>
            <div className="pcard plain">
              <div className="pcard-name">Sistema / App</div>
              <div className="pcard-price">Sob consulta</div>
              <div className="pcard-installment">Escopo e prazo definidos juntos</div>
              <div className="pcard-divider"></div>
              <ul className="pcard-features">
                <li>Aplicação web completa</li>
                <li>Integrações e APIs</li>
                <li>Autenticação e banco de dados</li>
                <li>Painel administrativo</li>
                <li>Deploy e infraestrutura</li>
                <li>Suporte contínuo</li>
              </ul>
              <a href="https://wa.me/5519989825980" target="_blank" rel="noopener noreferrer" className="pcta ghost-yellow">Falar sobre meu projeto</a>
            </div>
          </div>
          <p className="pricing-footer"><strong style={{ color: 'var(--text)', fontWeight: 600 }}>Pix</strong>, <strong style={{ color: 'var(--text)', fontWeight: 600 }}>cartão de crédito</strong> ou <strong style={{ color: 'var(--text)', fontWeight: 600 }}>boleto</strong> · Parcelamento <strong style={{ color: 'var(--text)', fontWeight: 600 }}>sem juros em até 6×</strong></p>
        </div>

        <footer className="site-footer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Logo-synnk21.png" alt="SYNNK" style={{ height: 29, width: 'auto', objectFit: 'contain' }} />
          <div className="footer-links">
            <a className="footer-link" href="https://wa.me/5519989825980" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a className="footer-link" href="https://instagram.com/synnkdigital" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className="footer-link" href="mailto:oi@synnk.com.br">E-mail</a>
          </div>
          <p className="footer-copy">© 2025 SYNNK Digital Studio · Campinas, SP<br />Design &amp; desenvolvimento que entrega resultado.</p>
        </footer>
      </section>

      <div id="bg"></div>
      <div id="dot-grid"></div>

      <div id="text-block">
        <div id="text-inner">
          <span id="eyebrow"></span>
          <div id="title-clip"><span id="title"></span></div>
          <p id="desc"></p>
          <div id="cta-wrap">
            <a id="cta-site" href="#" target="_blank" rel="noopener noreferrer">Ver site</a>
            <a id="cta"><span className="cta-line" id="cta-line"></span><span id="cta-label">VER CASE COMPLETO</span></a>
            <a id="cta2" href="#"></a>
          </div>
        </div>
      </div>

      <div id="img-track-wrap">
        <div id="img-track">
          {DATA.map((s, i) => !s.isPricing && (
            <div key={i} className="img-card" id={`card-${i}`} style={s.siteUrl ? { cursor: 'pointer' } : {}}>
              <div className="img-card-inner" style={{ background: s.bg }}>
                {s.img === '__hero__' ? (
                  <div dangerouslySetInnerHTML={{ __html: HERO_SVG }} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
                ) : s.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.img} alt={s.title || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }} />
                ) : (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(255,255,255,.06)' }}>
                    <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,.14)' }}>reservado</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="mobile-img"></div>

      <nav id="nav">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/Logo-synnk21.png" alt="SYNNK" style={{ height: 22, width: 'auto', objectFit: 'contain', cursor: 'pointer' }} onClick={() => goToRef.current(0, 'up')} />
        <div className="nav-links">
          <button className="nav-link" onClick={() => goToRef.current(1, 'down')}>Projetos</button>
          <button className="nav-link" onClick={() => goToPricingRef.current('clientes')}>Avaliações</button>
          <button className="nav-link" onClick={() => goToPricingRef.current('pricing')}>Preços</button>
        </div>
        <a className="nav-cta" href="https://wa.me/5519989825980" target="_blank" rel="noopener noreferrer">Entre em contato</a>
        <button id="nav-burger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div id="mobile-menu">
        <button className="mm-link" onClick={() => { closeMobileMenuRef.current(); goToRef.current(1, 'down') }}>Projetos</button>
        <button className="mm-link" onClick={() => { closeMobileMenuRef.current(); goToPricingRef.current('clientes') }}>Avaliações</button>
        <button className="mm-link" onClick={() => { closeMobileMenuRef.current(); goToPricingRef.current('pricing') }}>Preços</button>
        <a className="mm-cta" href="https://wa.me/5519989825980" target="_blank" rel="noopener noreferrer" onClick={() => closeMobileMenuRef.current()}>Entre em contato</a>
      </div>

      <div className="dots" id="dots-wrap">
        {DATA.map((_, i) => (
          <div key={i} className="dot" data-i={String(i)}></div>
        ))}
      </div>
      <div className="progress" id="progress"></div>

      <a id="fab-wa" href="https://wa.me/5519989825980" target="_blank" rel="noopener noreferrer">
        <div id="fab-bubble">Entre em contato</div>
        <div id="fab-btn">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52ZM12 21.96a9.93 9.93 0 0 1-5.07-1.38l-.36-.22-3.77.99 1-3.67-.23-.38A9.93 9.93 0 0 1 2.04 12C2.04 6.5 6.5 2.04 12 2.04S21.96 6.5 21.96 12 17.5 21.96 12 21.96Zm5.43-7.44c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51H6.8c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.34Z" fill="white"/>
          </svg>
        </div>
      </a>
    </>
  )
}
