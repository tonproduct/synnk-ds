"use client";

import React, { useState, useEffect, useRef } from "react";

const imgEmojiFire = "/emoji-fire.svg";

/* ─── Flat SVG icons ─── */
const Ic = {
  Search: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  Bell: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  Star: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Fire: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z"/>
    </svg>
  ),
  Medal: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  Trending: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
    </svg>
  ),
  Tag: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  ),
  Crown: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M2 19h20v2H2v-2zM12 2L8 10 3 7l2 12h14l2-12-5 3-4-8z"/>
    </svg>
  ),
  Award: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  Help: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  File: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  ),
  Check: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Facebook: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  Twitter: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Instagram: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
};

/* ─── Scroll-reveal wrapper ─── */
function FadeUp({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity .45s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .45s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─── Split coupon button ─── */
function CouponButton({ code }: { code: string }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div
      onClick={() => setRevealed(true)}
      style={{
        position: "relative", width: 200, height: 46, borderRadius: 4,
        overflow: "hidden", cursor: "pointer", flexShrink: 0,
        userSelect: "none",
      }}
    >
      {/* Background (light green — code area) */}
      <div style={{
        position: "absolute", inset: 0,
        background: "#c8e6c9", borderRadius: 4,
        display: "flex", alignItems: "center", justifyContent: "flex-end",
        paddingRight: 14,
      }}>
        <span style={{
          fontWeight: 700, fontSize: 14, color: "#1b5e20",
          filter: revealed ? "none" : "blur(5px)",
          transition: "filter .3s ease",
          letterSpacing: 1,
        }}>
          {code}
        </span>
      </div>
      {/* Left "Ver Cupom" part */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0,
        width: revealed ? "0%" : "81.33%",
        background: "#4caf50",
        borderRight: "2px dashed #1b5e20",
        borderRadius: "4px 0 0 4px",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "width .4s cubic-bezier(.16,1,.3,1)",
        overflow: "hidden",
      }}>
        <span style={{ fontWeight: 700, fontSize: 14, color: "#fff", whiteSpace: "nowrap" }}>
          Ver Cupom
        </span>
      </div>
    </div>
  );
}

/* ─── Store logos grid ─── */
const STORES = [
  { name: "Magalu",        coupons: 6,   img: "/moms/magalu.png" },
  { name: "Dafiti",        coupons: 10,  img: "/moms/dafiti.png" },
  { name: "Centauro",      coupons: 16,  img: "/moms/centauro.png" },
  { name: "Beleza na Web", coupons: 4,   img: "/moms/beleza-na-web.png" },
  { name: "C&A",           coupons: 16,  img: "/moms/ca.png" },
  { name: "MAC Cosmetics", coupons: 4,   img: "/moms/mac.png" },
  { name: "Nike",          coupons: 179, img: "/moms/nike.png" },
  { name: "Netshoes",      coupons: 88,  img: "/moms/netshoes.png" },
  { name: "Fast Shop",     coupons: 19,  img: "/moms/fastshop.png" },
  { name: "Natura",        coupons: 19,  img: "/moms/natura.png" },
  { name: "Adidas",        coupons: 10,  img: "/moms/adidas.png" },
  { name: "Puma",          coupons: 89,  img: "/moms/puma.png" },
];

/* ─── Software coupons carousel ─── */
const SOFTWARE_COUPONS = [
  {
    brand: "Figma",
    iconImg: "/moms/figma.svg",
    iconBg: "#212121",
    title: "20% de Desconto na Sua Primeira Compra",
    desc: "Aproveite essa oferta exclusiva e economize nas suas compras",
    offers: 30,
  },
  {
    brand: "Mailchimp",
    iconImg: "/moms/mailchimp.svg",
    iconBg: "#FFE01B",
    title: "25% de Desconto no Mailchimp Agora",
    desc: "Não perca a chance de aproveitar essa promoção imperdível",
    offers: 16,
  },
  {
    brand: "Adobe",
    iconImg: "/moms/adobe.svg",
    iconBg: "#FB0F01",
    title: "Adobe: 20% Off em Planos Anuais",
    desc: "Renove seu software e crie com os melhores preços do mercado!",
    offers: 10,
  },
  {
    brand: "Dropbox",
    iconImg: "/moms/dropbox.svg",
    iconBg: "#0061FF",
    title: "Desconto de R$ 50 no Dropbox Hoje",
    desc: "Aproveite a chance de armazenar arquivos e economizar já!",
    offers: 8,
  },
  {
    brand: "GitHub",
    iconImg: "/moms/gitlab.svg",
    iconBg: "#F4F4F4",
    title: "GitHub: 30% Off em Assinaturas!",
    desc: "Desenvolva seu projeto com preços incríveis e vantagens!",
    offers: 4,
  },
];

/* ─── Coupon list ─── */
const COUPONS = [
  {
    brand: "Samsung",
    img: "/moms/samsung.png",
    category: "Celulares",
    title: "Samsung com Até 30% de Desconto",
    desc: "Descontos imperdíveis em smartphones Samsung, com até 30% OFF. Aproveite para re...",
    seller: "Samsung",
    sellerColor: "#1428A0",
    code: "SAMSUNG30",
    tags: ["Primeira compra", "Cupom exclusivo", "Top 10"],
  },
  {
    brand: "Apple",
    img: "/moms/apple.png",
    category: "Destaques",
    title: "Apple: Desconto de 20% em iPhones",
    desc: "Renove seu celular com 20% OFF em iPhones selecionados. Promoção válida para todo...",
    seller: "Apple",
    sellerColor: "#555",
    code: "APPLE20",
    tags: ["Primeira compra", "Cupom exclusivo", "Top 10"],
  },
  {
    brand: "Xiaomi",
    img: "/moms/xiaomi.png",
    category: "Destaques",
    title: "Xiaomi com 25% OFF em Smartphones",
    desc: "Aproveite 25% de desconto em celulares Xiaomi. Promoção válida para todo o site, exc...",
    seller: "Xiaomi",
    sellerColor: "#FF6900",
    code: "XIAOMI25",
    tags: ["Primeira compra", "Cupom exclusivo", "Top 10"],
  },
  {
    brand: "LG",
    img: "/moms/lg.png",
    category: "Destaques",
    title: "LG com 15% de Desconto em Celulares",
    desc: "Renove seu smartphone LG com 15% OFF! Válido para todo o site, exceto produtos App...",
    seller: "LG",
    sellerColor: "#A50034",
    code: "LG15OFF",
    tags: ["Primeira compra", "Cupom exclusivo", "Top 10"],
  },
];

const POPULAR_STORES = [
  "Samsung", "Apple", "LG", "Sony",
  "Nokia", "Huawei", "Asus", "Dell",
  "Lenovo", "HP", "Canon", "Fossil",
  "Acer", "OnePlus",
];

const FILTERS = ["Destaques", "Populares", "Top Descontos", "Tendências"];
const FILTER_ICON_COMPONENTS = [Ic.Star, Ic.Fire, Ic.Medal, Ic.Trending];

export default function MomsPage() {
  const [activeFilter, setActiveFilter] = useState(0);
  const [hideExpired, setHideExpired] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#fff", color: "#111" }}>
      <style>{`
        @media (max-width: 767px) {
          .moms-nav-links { display: none !important; }
          .moms-nav-search { display: none !important; }
          .moms-nav-right { display: none !important; }
          .moms-hamburger { display: flex !important; }
          .moms-store-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .moms-sw-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .moms-main-grid { grid-template-columns: 1fr !important; }
          .moms-sidebar { display: none !important; }
          .moms-coupon-card { grid-template-columns: 80px 1fr !important; }
          .moms-coupon-logo img { width: 56px !important; height: 56px !important; }
          .moms-coupon-cta { grid-column: 1 / -1 !important; border-top: 1px solid #eee; justify-content: flex-start !important; padding: 12px 16px !important; }
          .moms-footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @media (min-width: 768px) {
          .moms-hamburger { display: none !important; }
          .moms-mobile-nav { display: none !important; }
        }
      `}</style>

      {/* ─── NAV ─── */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", gap: 24 }}>
          {/* Logo */}
          <span style={{ fontWeight: 900, fontSize: 22, color: "#FF6600", letterSpacing: -1, flexShrink: 0 }}>MOMS.</span>

          {/* Links */}
          <div className="moms-nav-links" style={{ display: "flex", gap: 20, alignItems: "center", fontSize: 14, color: "#444" }}>
            <a href="#" style={{ color: "#FF6600", fontWeight: 600, textDecoration: "none" }}>Página inicial</a>
            <a href="#" style={{ textDecoration: "none", color: "#444" }}>Lojas</a>
            <a href="#" style={{ textDecoration: "none", color: "#444" }}>Categorias ▾</a>
          </div>

          {/* Search */}
          <div className="moms-nav-search" style={{ flex: 1, maxWidth: 340, margin: "0 8px", position: "relative" }}>
            <input
              placeholder="Search..."
              style={{ width: "100%", padding: "8px 36px 8px 14px", borderRadius: 8, border: "1px solid #ddd", fontSize: 13, outline: "none", background: "#f7f7f7", boxSizing: "border-box" }}
            />
            <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "#888", display: "flex" }}><Ic.Search /></span>
          </div>

          {/* Right actions */}
          <div className="moms-nav-right" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16, fontSize: 13, color: "#444", flexShrink: 0 }}>
            <a href="#" style={{ textDecoration: "none", color: "#444" }}>Sobre</a>
            <a href="#" style={{ textDecoration: "none", color: "#444" }}>Contato</a>
            <a href="#" style={{ textDecoration: "none", color: "#888", fontSize: 12 }}>Política de privacidade</a>
            <span style={{ cursor: "pointer", display: "flex", color: "#444" }}><Ic.Bell /></span>
            <button style={{ background: "linear-gradient(159.567deg, #FDD819 0%, #E80505 100%)", color: "#fff", border: "none", borderRadius: 32, padding: "7px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              Cupons
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="moms-hamburger"
            onClick={() => setNavOpen(!navOpen)}
            style={{ display: "none", marginLeft: "auto", background: "none", border: "none", cursor: "pointer", padding: 6, color: "#444", alignItems: "center" }}
          >
            {navOpen
              ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            }
          </button>
        </div>

        {/* Mobile menu */}
        {navOpen && (
          <div className="moms-mobile-nav" style={{ borderTop: "1px solid #eee", padding: "12px 24px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
            <a href="#" style={{ fontSize: 14, color: "#FF6600", fontWeight: 600, textDecoration: "none" }}>Página inicial</a>
            <a href="#" style={{ fontSize: 14, color: "#444", textDecoration: "none" }}>Lojas</a>
            <a href="#" style={{ fontSize: 14, color: "#444", textDecoration: "none" }}>Categorias</a>
            <a href="#" style={{ fontSize: 14, color: "#444", textDecoration: "none" }}>Entrar</a>
            <a href="#" style={{ fontSize: 14, color: "#444", textDecoration: "none" }}>Contato</a>
            <button style={{ background: "linear-gradient(159.567deg, #FDD819 0%, #E80505 100%)", color: "#fff", border: "none", borderRadius: 32, padding: "7px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer", alignSelf: "flex-start" }}>
              Cupons
            </button>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section style={{ background: "#f8f8f8", padding: "56px 24px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <FadeUp>
            <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 900, lineHeight: 1.15, margin: "0 0 12px" }}>
              Descontos Exclusivos para Você Economizar Hoje{" "}
              <img src={imgEmojiFire} alt="" style={{ display: "inline-block", width: 32.75, height: 37.9, verticalAlign: "middle", marginLeft: 4, marginBottom: 8 }} />
            </h1>
            <p style={{ color: "#666", fontSize: 16, margin: "0 0 40px" }}>
              Explore cupons incríveis e ofertas especiais nas lojas mais populares
            </p>
          </FadeUp>

          {/* Store grid */}
          <FadeUp delay={150}>
          <div className="moms-store-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
            {STORES.map((store) => (
              <div
                key={store.name}
                style={{
                  background: "#fff",
                  border: "1px solid #eee",
                  borderRadius: 12,
                  padding: "16px 8px 12px",
                  cursor: "pointer",
                  transition: "box-shadow .2s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.10)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                {/* Logo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={store.img} alt={store.name} style={{ width: 64, height: 64, objectFit: "contain" }} />
                <span style={{ fontWeight: 700, fontSize: 12, textAlign: "center" }}>{store.name}</span>
                <span style={{ fontSize: 11, color: "#888" }}>{store.coupons} Cupons</span>
              </div>
            ))}
          </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── SOFTWARE CAROUSEL ─── */}
      <section style={{ background: "linear-gradient(109.87deg, rgb(113,113,113) 6%, rgb(62,62,62) 97%)", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1312, margin: "0 auto" }}>
          <FadeUp>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ color: "#f5f5f5", fontSize: 24, fontWeight: 700, margin: "0 0 8px", letterSpacing: -0.96 }}>
              Cupons exclusivos em{" "}
              <span style={{ borderBottom: "2px solid #f5f5f5", paddingBottom: 2 }}>Softwares ▾</span>
            </h2>
            <p style={{ color: "#f5f5f5", fontSize: 18, margin: 0, letterSpacing: -0.72 }}>
              Economize nas melhores lojas de tecnologia com{" "}
              <strong>cupons exclusivos </strong>
              <span style={{ color: "#ff9800", fontWeight: 600 }}>somente hoje</span>
            </p>
          </div>
          </FadeUp>

          {/* Cards — 5 colunas, todos visíveis */}
          <div className="moms-sw-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 24 }}>
            {SOFTWARE_COUPONS.map((coupon, idx) => (
              <FadeUp key={coupon.brand} delay={idx * 80}>
              <div
                style={{
                  background: "#f7f6fa",
                  borderRadius: 12,
                  padding: "24px 16px",
                  border: "1px solid #e9e9e9",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                  transition: "box-shadow .2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,.15)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                {/* Icon */}
                <div style={{
                  width: 64, height: 64, borderRadius: 20,
                  background: coupon.iconBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={coupon.iconImg} alt={coupon.brand} style={{ width: 36, height: 36, objectFit: "contain" }} />
                </div>
                {/* Text */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center", textAlign: "center", flex: 1 }}>
                  <p style={{ color: "#333", fontWeight: 600, fontSize: 16, margin: 0, letterSpacing: -0.64, lineHeight: 1.3 }}>{coupon.title}</p>
                  <p style={{ color: "#86838b", fontSize: 14, margin: 0, letterSpacing: -0.56, lineHeight: 1.4 }}>{coupon.desc}</p>
                </div>
                {/* Badge */}
                <div style={{
                  border: "1px solid #9ca3af",
                  borderRadius: 999,
                  padding: "4px 8px",
                  fontSize: 14,
                  color: "#4b5563",
                  lineHeight: "20px",
                }}>
                  + {coupon.offers} ofertas
                </div>
              </div>
              </FadeUp>
            ))}
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
            {[0,1,2,3,4].map((i) => (
              <div key={i} style={{
                width: 12, height: 12, borderRadius: "50%",
                background: i === 0 ? "#FF6600" : "rgba(255,255,255,0.4)",
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section style={{ background: "#fff", padding: "40px 24px 64px" }}>
        <div className="moms-main-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 300px", gap: 32 }}>

          {/* Left: filters + coupon list */}
          <div>
            {/* Filter row */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
              {FILTERS.map((f, i) => {
                const FilterIcon = FILTER_ICON_COMPONENTS[i];
                return (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(i)}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "8px 16px", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer",
                      border: activeFilter === i ? "none" : "1px solid #eee",
                      background: activeFilter === i ? "#FF6600" : "#f5f5f5",
                      color: activeFilter === i ? "#fff" : "#444",
                      transition: "all .2s",
                    }}
                  >
                    <FilterIcon /> {f}
                  </button>
                );
              })}

              {/* Toggle */}
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#444" }}>
                <span>Ocultar expirados</span>
                <button
                  onClick={() => setHideExpired((v) => !v)}
                  style={{
                    width: 44, height: 24, borderRadius: 999, border: "none", cursor: "pointer",
                    background: hideExpired ? "#FF6600" : "#ccc",
                    position: "relative", transition: "background .2s",
                  }}
                >
                  <span style={{
                    position: "absolute", top: 3,
                    left: hideExpired ? "calc(100% - 21px)" : 3,
                    width: 18, height: 18, borderRadius: "50%", background: "#fff",
                    transition: "left .2s",
                  }} />
                </button>
              </div>
            </div>

            {/* Coupon cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {COUPONS.map((c, idx) => (
                <FadeUp key={c.brand} delay={idx * 80}>
                  <div
                    className="moms-coupon-card"
                    style={{
                      background: "#fff",
                      border: "1px solid #eee",
                      borderRadius: 14,
                      overflow: "hidden",
                      display: "grid",
                      gridTemplateColumns: "160px 1fr auto",
                      boxShadow: "0 1px 4px rgba(0,0,0,.06)",
                      transition: "box-shadow .2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.10)")}
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,.06)")}
                  >
                    {/* Brand logo */}
                    <div className="moms-coupon-logo" style={{
                      background: "#f5f5f5",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      padding: 16, flexShrink: 0,
                    }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.img} alt={c.brand} style={{ width: 120, height: 120, objectFit: "contain" }} />
                    </div>

                    {/* Info */}
                    <div style={{ padding: "18px 16px" }}>
                      <span style={{
                        display: "inline-block",
                        background: "#DCFCE7", color: "#16A34A",
                        fontSize: 11, fontWeight: 600,
                        padding: "2px 10px", borderRadius: 999, marginBottom: 8,
                      }}>
                        {c.category}
                      </span>
                      <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700, color: "#222" }}>{c.title}</h3>
                      <p style={{ margin: "0 0 8px", fontSize: 13, color: "#666", lineHeight: 1.5 }}>{c.desc}</p>
                      <div style={{ fontSize: 13, color: "#888", marginBottom: 10 }}>
                        Vendido por{" "}
                        <span style={{ color: c.sellerColor, fontWeight: 600 }}>{c.seller}</span>{" "}
                        <span style={{ display: "inline-flex", verticalAlign: "middle" }}><Ic.Check /></span>
                      </div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {c.tags.map((tag) => (
                          <span key={tag} style={{
                            fontSize: 11, padding: "4px 10px", borderRadius: 999,
                            background: "#f3f4f6", color: "#555",
                            display: "flex", alignItems: "center", gap: 4,
                          }}>
                            {tag === "Primeira compra" && <Ic.Tag />}
                            {tag === "Cupom exclusivo" && <Ic.Crown />}
                            {tag === "Top 10" && <Ic.Award />}
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="moms-coupon-cta" style={{ display: "flex", alignItems: "center", padding: "18px 20px", flexShrink: 0 }}>
                      <CouponButton code={c.code} />
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Right: sidebar */}
          <div className="moms-sidebar">
            <div style={{ background: "#f8f8f8", borderRadius: 14, padding: "20px", marginBottom: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, margin: "0 0 14px" }}>Lojas Populares</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {POPULAR_STORES.map((s) => (
                  <button
                    key={s}
                    style={{
                      fontSize: 12, padding: "5px 12px", borderRadius: 999,
                      border: "1px solid #ddd", background: "#fff",
                      cursor: "pointer", fontWeight: 500, color: "#333",
                      transition: "border-color .15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#FF6600")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#ddd")}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div style={{ margin: "16px 0 0", display: "flex", flexDirection: "column", gap: 10 }}>
                <button style={{
                  background: "none", border: "1px solid #ddd", borderRadius: 8,
                  padding: "10px 14px", fontSize: 13, cursor: "pointer", textAlign: "left",
                  color: "#444", fontWeight: 500, display: "flex", alignItems: "center", gap: 8,
                }}>
                  <Ic.Help /> Como usar o cupom
                </button>
                <button style={{
                  background: "none", border: "1px solid #ddd", borderRadius: 8,
                  padding: "10px 14px", fontSize: 13, cursor: "pointer", textAlign: "left",
                  color: "#444", fontWeight: 500, display: "flex", alignItems: "center", gap: 8,
                }}>
                  <Ic.File /> Termos e condições
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: "#111", color: "#fff", padding: "56px 24px 36px" }}>
        <div className="moms-footer-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "start" }}>
          {/* Left */}
          <div style={{ maxWidth: 440 }}>
            <span style={{ fontWeight: 900, fontSize: 22, color: "#FF6600", letterSpacing: -1, display: "block", marginBottom: 14 }}>MOMS.</span>
            <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 14px", lineHeight: 1.3 }}>
              Transforme Suas Compras em Economias
            </h2>
            <p style={{ color: "#aaa", fontSize: 14, lineHeight: 1.7, margin: "0 0 24px" }}>
              Assine nossa newsletter e descubra cupons exclusivos e as melhores ofertas.
              Junte-se às nossas redes sociais para dicas e promoções imperdíveis.
              Comece a economizar agora e aproveite cada compra.
            </p>
            {/* Social */}
            <div style={{ display: "flex", gap: 16 }}>
              {([Ic.Facebook, Ic.Twitter, Ic.Instagram] as React.FC[]).map((Icon, i) => (
                <button
                  key={i}
                  style={{
                    width: 36, height: 36, borderRadius: "50%", border: "1px solid #333",
                    background: "none", color: "#aaa", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          {/* Right: navigation */}
          <div>
            <h4 style={{ color: "#fff", fontSize: 13, fontWeight: 700, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 1 }}>
              Navegação
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 32px" }}>
              {["Página inicial", "Contato", "Sobre", "Sobre", "Lojas", "Política de privacidade", "Categorias"].map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{ color: "#aaa", fontSize: 13, textDecoration: "none", transition: "color .15s" }}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#FF6600")}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#aaa")}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1100, margin: "32px auto 0", borderTop: "1px solid #222", paddingTop: 20, fontSize: 12, color: "#555", textAlign: "center" }}>
          © 2024 MOMS. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
