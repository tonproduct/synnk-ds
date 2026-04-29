"use client"

import { useEffect, useState } from "react"

const AC = '#FFE600'

const STYLES = `
  html, body { overflow-x: hidden; }
  html::-webkit-scrollbar { width: 3px; }
  html::-webkit-scrollbar-track { background: #080808; }
  html::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); }
  #v3-root *, #v3-root *::before, #v3-root *::after { box-sizing: border-box; }
  #v3-root h1,#v3-root h2,#v3-root h3,#v3-root h4,
  #v3-root p,#v3-root ul,#v3-root ol,#v3-root li,#v3-root figure { margin:0;padding:0; }

  #v3-root {
    --bg: #080808; --fg: #f0ede8;
    --ac: ${AC}; --muted: rgba(240,237,232,0.42);
    --bd: rgba(255,255,255,0.07);
    --side: clamp(28px,6vw,120px);
    --max: 1400px;
    --font: 'Inter',-apple-system,sans-serif;
    font-family: var(--font);
    background: var(--bg); color: var(--fg);
    cursor: none;
    -webkit-font-smoothing: antialiased;
    transition: background-color 0.9s ease, color 0.9s ease;
  }
  #v3-root.v3-light { background: #f0ede8; color: #080808; }
  #v3-root.v3-light .v3-sec-tag { color: rgba(8,8,8,0.45); }
  #v3-root.v3-light .v3-sec-h2 { color: #080808; }
  #v3-root.v3-light .v3-case-idx { color: rgba(8,8,8,0.4); }
  #v3-root.v3-light .v3-case-name { color: #080808; }
  #v3-root.v3-light .v3-case-desc { color: rgba(8,8,8,0.55); }
  #v3-root.v3-light .v3-case-result { color: rgba(8,8,8,0.55); border-left-color: #FFE600; }
  #v3-root.v3-light .v3-case-cta { color: #080808; }
  #v3-root.v3-light .v3-case-tag { background: rgba(0,0,0,0.06); border-color: rgba(0,0,0,0.12); color: #080808; }
  #v3-root.v3-light .v3-slide-img { background: rgba(0,0,0,0.04); border-color: rgba(0,0,0,0.1); }
  #v3-root.v3-light #v3-nav { background: rgba(240,237,232,0.9); border-bottom-color: rgba(0,0,0,0.08); }
  #v3-root.v3-light .v3-logo { color: #080808; }
  #v3-root.v3-light .v3-nav-links a { color: rgba(8,8,8,0.5); }
  #v3-root.v3-light .v3-nav-links a:hover { color: #080808; }
  #v3-root.v3-light .v3-nav-cta { background: #080808; color: #f0ede8; }
  #v3-root::-webkit-scrollbar { display: none; }
  #v3-root ::selection { background: var(--ac); color: var(--bg); }

  /* Cursor */
  .v3-cur {
    position: fixed; width: 8px; height: 8px;
    background: ${AC}; border-radius: 50%;
    pointer-events: none; z-index: 9999;
    transform: translate(-50%,-50%);
    will-change: transform;
    transition: width .25s, height .25s, background .25s, border .25s;
  }
  .v3-cur.big {
    width: 48px; height: 48px;
    background: rgba(255,255,255,0.95);
    mix-blend-mode: difference;
  }

  /* Mouse light */
  #v3-light {
    position: fixed; inset: 0; pointer-events: none; z-index: 1;
    background: radial-gradient(
      280px circle at var(--mx, -999px) var(--my, -999px),
      rgba(212,255,79,0.10) 0%,
      transparent 70%
    );
    transition: opacity .4s;
  }

  /* Nav */
  #v3-nav {
    position: fixed; top:0;left:0;right:0; z-index:100;
    padding: 26px var(--side);
    display: flex; align-items: center; justify-content: space-between;
    transition: background .4s, border .4s;
  }
  #v3-nav.scrolled {
    background: rgba(8,8,8,.9);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--bd);
  }
  .v3-logo { font-size: 19px; font-weight: 800; letter-spacing: -.3px; color: var(--fg); text-decoration: none; }
  .v3-logo em { color: var(--ac); font-style: normal; }
  .v3-nav-links { display: flex; gap: 36px; list-style: none; }
  .v3-nav-links a { font-size: 13px; font-weight: 500; color: var(--muted); text-decoration: none; cursor: none; transition: color .2s; }
  .v3-nav-links a:hover { color: var(--fg); }
  .v3-nav-cta {
    font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--bg); background: var(--ac); padding: 11px 26px; border-radius: 3px;
    text-decoration: none; cursor: none; transition: opacity .2s;
  }
  .v3-nav-cta:hover { opacity: .85; }
  .v3-burger { display: none; background: none; border: none; cursor: none; flex-direction: column; gap: 5px; padding: 6px; }
  .v3-burger span { display: block; width: 24px; height: 2px; background: var(--fg); border-radius: 2px; transition: all .3s; }
  .v3-burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .v3-burger.open span:nth-child(2) { opacity: 0; }
  .v3-burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  .v3-mobile-nav {
    position: fixed; inset: 0; background: var(--bg); z-index: 90;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; pointer-events: none; transition: opacity .35s;
  }
  .v3-mobile-nav.open { opacity: 1; pointer-events: all; }
  .v3-mobile-links { list-style: none; text-align: center; display: flex; flex-direction: column; gap: 40px; }
  .v3-mobile-links a { font-size: clamp(36px,7vw,72px); font-weight: 800; letter-spacing: -2px; color: var(--fg); text-decoration: none; }

  /* Hero */
  #v3-hero {
    height: 100vh; min-height: 700px;
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    padding: 80px var(--side) 80px;
    position: relative; overflow: hidden;
  }
  .v3-hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background: var(--bg);
  }
  #v3-spotlight {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background: radial-gradient(ellipse 60% 50% at var(--sx, 50%) -10%, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.10) 50%, transparent 80%);
  }
  #v3-map {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 0; overflow: hidden;
  }
  .v3-map-street {
    fill: none; stroke: rgba(255,255,255,0.07);
    stroke-width: 0.8; stroke-linecap: round; stroke-linejoin: round;
  }
  .v3-map-route {
    fill: none; stroke: #FFE600;
    stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round;
    opacity: 0.55;
  }
  .v3-map-waypoint {
    fill: none; stroke: #FFE600; stroke-width: 1.2; opacity: 0;
  }
  .v3-map-waypoint-dot {
    fill: #FFE600; opacity: 0;
  }
  .v3-map-label-bg {
    fill: rgba(8,8,8,0.85); rx: 3; opacity: 0;
  }
  .v3-map-label-bg.last { fill: rgba(255,230,0,0.15); }
  .v3-map-label {
    fill: rgba(255,255,255,0.6); font-size: 7px; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
    font-family: 'Inter', -apple-system, sans-serif;
    opacity: 0;
  }
  .v3-map-label.last { fill: #FFE600; }
  .v3-hero-inner {
    position: relative; z-index: 1;
    max-width: min(780px, calc(100% - 2 * var(--side)));
    text-align: center;
    display: flex; flex-direction: column; align-items: center;
  }
  .v3-tag {
    display: inline-block;
    font-size: 14px; font-weight: 400; font-style: italic;
    letter-spacing: 0.3px; text-transform: none;
    color: var(--muted); margin-bottom: 32px; opacity: 0;
  }
  .v3-h1 {
    font-size: clamp(36px,4.2vw,72px); font-weight: 800;
    letter-spacing: -2.5px; line-height: 1.05; margin-bottom: 0;
    text-align: center;
  }
  .v3-word { display: inline-block; overflow: hidden; vertical-align: bottom; margin-right: .22em; padding-bottom: 0.15em; margin-bottom: -0.15em; }
  .v3-wi { display: inline-block; transform: translateY(110%); will-change: transform; }
  #v3-root .v3-sub {
    font-size: clamp(14px,1.1vw,16px); color: var(--muted); line-height: 1.65;
    padding-top: 20px; margin-bottom: 0; opacity: 0; transform: translateY(14px);
    text-align: center; max-width: 560px;
  }
  #v3-root .v3-sub strong { color: var(--fg); font-weight: 600; }
  .v3-ctas { display: flex; gap: 20px; align-items: center; justify-content: center; opacity: 0; transform: translateY(14px); margin-top: 24px; }
  .v3-btn-p {
    display: inline-flex; align-items: center; gap: 12px;
    background: #f0ede8; color: #080808;
    font-size: 13px; font-weight: 600; letter-spacing: 0.2px;
    text-decoration: none; padding: 16px 36px; border-radius: 100px; cursor: none;
    transition: opacity .2s, transform .2s;
  }
  .v3-btn-p:hover { opacity: .85; transform: translateY(-2px); }
  .v3-btn-g {
    display: inline-flex; align-items: center; gap: 10px;
    background: none; border: 1px solid rgba(255,255,255,.18);
    color: var(--fg); font-size: 13px; font-weight: 500;
    text-decoration: none; padding: 16px 36px; border-radius: 100px; cursor: none;
    transition: border-color .2s, color .2s;
  }
  .v3-btn-g:hover { border-color: rgba(255,255,255,.45); color: white; }
  .v3-hero-deco {
    position: absolute; right: var(--side); top: 50%; transform: translateY(-50%);
    width: clamp(180px,22vw,340px); aspect-ratio: 1;
    pointer-events: auto; will-change: transform;
  }
  .v3-hero-deco > svg { width: 100%; height: 100%; pointer-events: none; display: block; position: absolute; inset: 0; }
  .v3-radar-base { opacity: 1; }
  .v3-radar-anim { opacity: 1; }
  /* Camada de animação — GSAP controla tudo */
  .v3-radar-anim {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; overflow: visible;
  }
  .v3-radar-anim line { stroke: white; stroke-width: 1.2; }
  .v3-radar-anim .rc  { stroke: #FFE600; stroke-width: 1.2; fill: none; }
  .v3-radar-ping { opacity: 0; }

  /* Centro interativo */
  .v3-radar-center {
    position: absolute; left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    width: 48px; height: 48px; z-index: 4; border-radius: 50%;
  }
  .v3-radar-center::before {
    content: ''; position: absolute; inset: 50%; transform: translate(-50%,-50%);
    width: 4px; height: 4px; border-radius: 50%;
    background: white; opacity: 0.4;
    transition: opacity 0.3s, width 0.3s, height 0.3s;
  }
  .v3-radar-center:hover::before { opacity: 1; width: 8px; height: 8px; }

  /* Frase do radar */
  .v3-radar-phrase {
    position: absolute; inset: 0; border-radius: 50%;
    background: rgba(8,8,8,0.88);
    backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
    opacity: 0; transition: opacity 0.35s ease; pointer-events: none;
  }
  .v3-radar-phrase.visible { opacity: 1; }
  .rp-s1, .rp-s2 {
    position: absolute; inset: 0; padding: 28px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    transition: opacity 0.4s ease;
  }
  .rp-s2 { opacity: 0; pointer-events: none; }
  .v3-hero-deco.s2 .rp-s1 { opacity: 0; pointer-events: none; }
  .v3-hero-deco.s2 .rp-s2 { opacity: 1; pointer-events: auto; }
  .v3-radar-phrase-inner {
    font-size: 10px; font-weight: 600; letter-spacing: 0.4px; line-height: 1.9;
    color: #FFE600; font-family: 'Courier New', monospace;
    white-space: pre-wrap; text-align: center;
    text-shadow: 0 0 10px rgba(255,230,0,0.5);
  }

  /* Loading bar */
  .rp-loader {
    width: 36%; height: 1px; background: rgba(255,230,0,0.15);
    border-radius: 1px; overflow: hidden; margin-top: 20px;
  }
  .rp-loader-fill { height: 100%; width: 0; background: #FFE600; }
  .rp-loader-fill.run { width: 100%; transition: width 2.8s linear; }

  /* Stage 1: todos os badges aparecem */
  .v3-hero-deco.s1 .v3-rbadge-dot { opacity: 1; transform: translate(-50%,-50%) scale(1.6); }
  .v3-hero-deco.s1 .v3-rbadge-label.above { opacity: 1; transform: translateX(-50%) translateY(0); transition-delay: var(--bd,0s); }
  .v3-hero-deco.s1 .v3-rbadge-label.below { opacity: 1; transform: translateX(-50%) translateY(0); transition-delay: var(--bd,0s); }

  /* Stage 2: dots ficam (via s1), labels saem */
  .v3-hero-deco.s1.s2 .v3-rbadge-label.above,
  .v3-hero-deco.s1.s2 .v3-rbadge-label.below { opacity: 0; transform: translateX(-50%) translateY(6px); }
  .v3-hero-deco.s2 .v3-radar-center::before { background: #fff; opacity: 1; width: 10px; height: 10px; box-shadow: 0 0 10px #fff; }

  /* Stage 2: botão */
  .v3-radar-cta-btn {
    display: inline-block; margin-top: 20px;
    background: #FFE600; color: #080808;
    padding: 11px 28px; font-size: 10px; font-weight: 800; letter-spacing: 2px;
    text-transform: uppercase; border-radius: 3px; text-decoration: none;
    opacity: 0; transform: translateY(10px);
    transition: opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s, box-shadow 0.2s;
  }
  .v3-hero-deco.s2 .v3-radar-cta-btn { opacity: 1; transform: translateY(0); }
  @keyframes btn-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255,230,0,0.45); }
    60%       { box-shadow: 0 0 0 12px rgba(255,230,0,0); }
  }
  .v3-hero-deco.s2 .v3-radar-cta-btn { animation: btn-pulse 2s ease-out infinite 0.9s; }
  .v3-radar-s2-phrase {
    font-size: 13px; font-weight: 700; letter-spacing: 0.3px; line-height: 1.65;
    color: #f0ede8; text-align: center; margin-bottom: 4px;
  }

  /* Radar badges */
  .v3-rbadge {
    position: absolute; width: 24px; height: 24px;
    transform: translate(-50%, -50%); z-index: 3;
  }
  .v3-rbadge-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #FFE600; opacity: 0.5;
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    transition: opacity .25s, transform .25s;
  }
  .v3-rbadge:hover .v3-rbadge-dot { opacity: 1; transform: translate(-50%,-50%) scale(1.6); }
  .v3-rbadge-label {
    position: absolute; left: 50%;
    background: rgba(8,8,8,0.95); border: 1px solid rgba(255,230,0,0.35);
    color: #FFE600; font-size: 9px; font-weight: 700; letter-spacing: 2.5px;
    text-transform: uppercase; white-space: nowrap; padding: 6px 12px; border-radius: 2px;
    opacity: 0; pointer-events: none;
    transition: opacity .2s ease, transform .2s ease;
  }
  .v3-rbadge-label.above {
    bottom: calc(100% + 8px);
    transform: translateX(-50%) translateY(6px);
  }
  .v3-rbadge:hover .v3-rbadge-label.above { opacity: 1; transform: translateX(-50%) translateY(0); }
  .v3-rbadge-label.below {
    top: calc(100% + 8px);
    transform: translateX(-50%) translateY(-6px);
  }
  .v3-rbadge:hover .v3-rbadge-label.below { opacity: 1; transform: translateX(-50%) translateY(0); }
  .v3-scroll-cue { display: none; }

  /* Hero clients strip */
  #v3-hero-clients {
    position: absolute; bottom: 0; left: 0; right: 0; z-index: 2;
    padding: 28px 0 32px; margin-bottom: -40px;
    display: flex; flex-direction: column; align-items: center; gap: 16px;
    border-top: 1px solid rgba(255,255,255,0.06);
    opacity: 0;
  }
  .v3-hero-clients-label {
    font-size: 12px; color: var(--muted); text-align: center; letter-spacing: 0.2px;
  }
  .v3-hero-clients-track {
    overflow: hidden; width: 100%; position: relative;
  }
  .v3-hero-clients-track::before,
  .v3-hero-clients-track::after {
    content: ''; position: absolute; top: 0; bottom: 0; width: 140px; z-index: 2; pointer-events: none;
  }
  .v3-hero-clients-track::before { left: 0; background: linear-gradient(to right, var(--bg), transparent); }
  .v3-hero-clients-track::after  { right: 0; background: linear-gradient(to left, var(--bg), transparent); }
  .v3-hero-clients-logos {
    display: flex; gap: 72px; width: max-content;
    animation: v3mq 26s linear infinite;
    align-items: center; padding: 0 36px;
  }
  .v3-hero-clients-logo {
    font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
    color: rgba(255,255,255,0.28); white-space: nowrap;
    transition: color .3s;
  }
  .v3-hero-clients-logo:hover { color: rgba(255,255,255,0.6); }

  /* Shared */
  .v3-sec {
    padding-top: clamp(120px,13vh,180px);
    padding-bottom: clamp(120px,13vh,180px);
    padding-left:  max(var(--side), calc((100% - var(--max)) / 2));
    padding-right: max(var(--side), calc((100% - var(--max)) / 2));
  }
  .v3-sec-tag { font-size: 11px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: var(--ac); display: block; margin-bottom: 20px; }
  .v3-sec-h2 { font-size: clamp(36px,4.5vw,58px); font-weight: 800; letter-spacing: -2px; line-height: 1.06; max-width: 700px; margin-bottom: 72px; }
  .v3-reveal { clip-path: inset(100% 0 0 0); will-change: clip-path,opacity,transform; }

  /* Amplitude orbs */
  #v3-orbs {
    position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 0;
  }
  .v3-orb {
    position: absolute; border-radius: 50%;
    background: #FFE600;
    opacity: 0; will-change: transform, opacity;
  }

  /* Amplitude */
  #v3-amplitude { border-top: 1px solid var(--bd); position: relative; }
  #v3-pillars-pin { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 60px 0; }
  .v3-amp-header { margin-bottom: 0; }
  .v3-amp-header .v3-sec-h2 { margin-bottom: 80px; }
  .v3-pillars { display: grid; grid-template-columns: repeat(4,1fr); }
  .v3-pillar {
    padding: 56px 44px 64px; border: 1px solid var(--bd);
    position: relative; transition: background .3s, border-color .3s;
  }
  .v3-pillar:not(:first-child) { border-left: none; }
  .v3-pillar:hover { background: rgba(212,255,79,.025); border-color: rgba(212,255,79,.18); }
  .v3-pillar.filled { background: #FFE600; border: 1px solid #323232; }
  .v3-pillar.filled .v3-pnum { color: #323232; }
  .v3-pillar.filled h3 { color: #323232; }
  .v3-pillar.filled p { color: #323232; }
  .v3-pillar.filled .v3-ptag { background: rgba(0,0,0,.1); border-color: rgba(50,50,50,.2); color: #323232; }
  .v3-pnum { font-size: 11px; font-weight: 700; letter-spacing: 3px; color: var(--ac); display: block; margin-bottom: 44px; }
  .v3-pillar-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .v3-check {
    width: 32px; height: 32px; border-radius: 50%;
    background: #323232; display: flex; align-items: center; justify-content: center;
    transform: scale(0); transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
    flex-shrink: 0;
  }
  .v3-check svg { width: 16px; height: 16px; }
  .v3-pillar.filled .v3-check { transform: scale(1); background: #323232; }
  .v3-pillar h3 { font-size: 22px; font-weight: 700; letter-spacing: -.5px; margin-bottom: 16px; }
  .v3-pillar p { font-size: 14px; color: var(--muted); line-height: 1.75; margin-bottom: 28px; }
  .v3-ptags { display: flex; flex-wrap: wrap; gap: 6px; }
  .v3-ptag { font-size: 11px; font-weight: 600; color: var(--muted); background: rgba(255,255,255,.04); border: 1px solid var(--bd); padding: 5px 11px; border-radius: 2px; letter-spacing: .3px; }
  .v3-line-svg { display: block; width: 100%; margin-top: 3px; overflow: visible; }

  /* Domínio */
  #v3-dominio { border-top: 1px solid var(--bd); }
  .v3-dom-header .v3-sec-h2 { margin-bottom: 80px; }
  .v3-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: var(--bd); }
  .v3-stat { background: var(--bg); padding: 64px 48px; }
  .v3-stat strong { display: block; font-size: clamp(52px,5.5vw,76px); font-weight: 800; letter-spacing: -3px; line-height: 1; margin-bottom: 18px; }
  .v3-stat strong em { color: var(--ac); font-style: normal; }
  .v3-stat p { font-size: 15px; color: var(--muted); line-height: 1.65; max-width: 220px; }

  /* Portfólio */
  #v3-portfolio { overflow: hidden; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; }
  .v3-port-head {
    padding-top: clamp(120px,13vh,180px);
    padding-bottom: 24px;
    padding-left:  max(var(--side), calc((100% - var(--max)) / 2));
    padding-right: max(var(--side), calc((100% - var(--max)) / 2));
  }
  .v3-port-head .v3-sec-h2 { margin-bottom: 0; }
  .v3-cases-track { display: flex; will-change: transform; padding: 60px 0 80px; align-items: center; }
  .v3-slide {
    min-width: 62vw; width: 62vw;
    padding: 0 max(var(--side), calc((100vw - var(--max)) / 2));
    flex-shrink: 0; display: grid; grid-template-columns: 0.6fr 1.4fr;
    gap: 52px; align-items: center;
  }
  .v3-slide-img {
    aspect-ratio: 4/3; border-radius: 20px; overflow: hidden;
    position: relative; background: rgba(0,0,0,.06);
    box-shadow: 0 40px 100px rgba(0,0,0,0.18);
    border: none;
  }
  .v3-slide-img img { width:100%; height:115%; object-fit:cover; object-position:top; display:block; will-change:transform; }
  .v3-slide-info { display: flex; flex-direction: column; align-items: flex-start; position: relative; }
  .v3-case-deco {
    display: block; font-size: clamp(80px,10vw,130px); font-weight: 900;
    letter-spacing: -6px; line-height: 1; color: rgba(8,8,8,0.07);
    margin-bottom: -0.25em; pointer-events: none; user-select: none;
  }
  #v3-root:not(.v3-light) .v3-case-deco { color: rgba(255,255,255,0.05); }
  .v3-case-name { font-size: clamp(28px,3vw,44px); font-weight: 800; letter-spacing: -1.5px; line-height: 1.05; margin-bottom: 16px; overflow: hidden; }
  .v3-case-name-in { display: block; transform: translateY(105%); will-change: transform; }
  .v3-case-tags { display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 20px; }
  .v3-case-tag { font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); background: none; border: none; padding: 0; }
  .v3-case-desc { font-size: 14px; color: var(--muted); line-height: 1.75; margin-bottom: 0; max-width: 340px; }
  .v3-case-cta {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
    color: var(--muted); background: none; border: none; padding: 0;
    margin-top: 32px;
    text-decoration: none; cursor: none;
    transition: color .2s; width: fit-content;
  }
  .v3-case-cta:hover { color: var(--fg); }
  #v3-root.v3-light .v3-case-cta { color: rgba(8,8,8,0.45); }
  #v3-root.v3-light .v3-case-cta:hover { color: #080808; }
  .v3-case-cta .arr { transition: transform .3s; }
  .v3-case-cta:hover .arr { transform: translateX(4px); }

  /* Processo */
  #v3-processo { border-top: 1px solid var(--bd); position: relative; }
  .v3-proc-grid { display: grid; grid-template-columns: clamp(280px,28%,420px) 1fr; gap: 140px; align-items: start; }
  .v3-proc-sticky { position: sticky; top: 30vh; }
  .v3-proc-sticky .v3-sec-h2 { font-size: clamp(32px,3.2vw,48px); margin-bottom: 0; }
  .v3-steps { display: flex; flex-direction: column; position: relative; }
  .v3-step { display: grid; grid-template-columns: 80px 1fr; gap: 32px; padding: 64px 0; border-bottom: 1px solid var(--bd); align-items: start; }
  .v3-step:last-child { border-bottom: none; }
  .v3-step-num { font-size: 56px; font-weight: 800; letter-spacing: -3px; color: rgba(255,255,255,.08); line-height: 1; transition: color .5s; }
  .v3-step.active .v3-step-num { color: var(--ac); }
  .v3-step-body h3 { font-size: 22px; font-weight: 700; letter-spacing: -.5px; margin-bottom: 12px; margin-top: 12px; }
  .v3-step-body p { font-size: 16px; color: var(--muted); line-height: 1.75; max-width: 500px; }
  .v3-step-body p strong { color: var(--ac); font-weight: 700; }
  .v3-pline { position: absolute; right: 0; left: auto; top: 0; bottom: 0; width: 1px; background: var(--bd); }
  .v3-pfill { position: absolute; top: 0; left: 0; right: 0; background: var(--ac); transform-origin: top; transform: scaleY(0); will-change: transform; height: 100%; }

  /* Social Proof */
  #v3-proof { overflow: hidden; }
  .v3-marquee-outer {
    overflow: hidden; padding: 44px 0;
    border-bottom: 1px solid var(--bd);
    margin-bottom: 112px; position: relative;
  }
  .v3-marquee-outer::before,
  .v3-marquee-outer::after {
    content: ''; position: absolute; top: 0; bottom: 0; width: 180px; z-index: 2; pointer-events: none;
  }
  .v3-marquee-outer::before {
    left: 0;
    background: linear-gradient(to right, var(--bg) 0%, transparent 100%);
  }
  .v3-marquee-outer::after {
    right: 0;
    background: linear-gradient(to left, var(--bg) 0%, transparent 100%);
  }
  .v3-marquee { display: flex; gap: 88px; width: max-content; animation: v3mq 22s linear infinite; }
  @keyframes v3mq { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .v3-mq-item { font-size: 12px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(255,255,255,.18); white-space: nowrap; cursor: none; transition: color .3s; }
  .v3-mq-item:hover { color: rgba(255,255,255,.55); }
  .v3-proof-header .v3-sec-h2 { margin-bottom: 96px; }
  .v3-testimonials { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--bd); }
  .v3-testi {
    padding: 56px 48px; background: var(--bg);
    display: flex; flex-direction: column; justify-content: space-between;
    position: relative; overflow: hidden;
    transition: background .3s;
  }
  .v3-testi::before {
    content: '\u201C';
    position: absolute; top: 32px; right: 40px;
    font-size: 120px; line-height: 1; font-weight: 800;
    color: var(--ac); opacity: 0.12;
    pointer-events: none; font-family: Georgia, serif;
  }
  .v3-testi:hover { background: rgba(255,255,255,.03); }
  .v3-testi q { display: block; font-size: 15px; line-height: 1.85; color: var(--fg); font-style: normal; margin-bottom: 48px; quotes: none; }
  .v3-testi q::before { content: none; }
  .v3-testi-author strong { display: block; font-size: 14px; font-weight: 700; margin-bottom: 5px; }
  .v3-testi-author span { font-size: 12px; color: var(--muted); letter-spacing: .3px; }

  /* CTA Final */
  #v3-cta {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    flex-direction: column; text-align: center; padding: 120px var(--side); position: relative; overflow: hidden;
  }
  .v3-cta-bg {
    position: absolute; inset: 0; z-index: 0;
    background: radial-gradient(ellipse 65% 50% at 50% 50%, rgba(212,255,79,.055) 0%, transparent 70%);
    animation: v3ctap 7s ease-in-out infinite alternate;
  }
  @keyframes v3ctap { from{opacity:.6} to{opacity:1} }
  .v3-cta-inner { position: relative; z-index: 1; max-width: 680px; width: 100%; }
  .v3-cta-h2 { font-size: clamp(44px,6vw,82px); font-weight: 800; letter-spacing: -3px; line-height: 1.0; margin-bottom: 64px; will-change: transform; }
  .v3-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 72px; }
  .v3-divider { font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin: 28px 0; position: relative; text-align: center; }
  .v3-divider::before,.v3-divider::after { content:''; position: absolute; top: 50%; width: 38%; height: 1px; background: var(--bd); }
  .v3-divider::before { left: 0; } .v3-divider::after { right: 0; }
  .v3-form { width: 100%; max-width: 500px; margin: 0 auto; display: flex; flex-direction: column; gap: 10px; text-align: left; }
  .v3-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .v3-input { width:100%; padding:14px 18px; background:rgba(255,255,255,.05); border:1px solid var(--bd); border-radius:4px; color:var(--fg); font-size:14px; font-family:var(--font); outline:none; transition:border-color .2s; }
  .v3-input:focus { border-color: rgba(212,255,79,.35); }
  .v3-input::placeholder { color: var(--muted); }
  .v3-textarea { resize: none; height: 88px; }
  .v3-submit { width:100%; padding:16px; background:var(--ac); color:var(--bg); font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; border:none; border-radius:4px; cursor:none; transition:opacity .2s; margin-top:4px; }
  .v3-submit:hover { opacity: .85; }
  .v3-form-note { font-size: 11px; color: var(--muted); text-align: center; margin-top: 6px; }

  /* Footer */
  #v3-footer { padding: 44px var(--side); border-top: 1px solid var(--bd); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
  .v3-footer-links { display: flex; gap: 28px; }
  .v3-footer-links a { font-size: 13px; color: var(--muted); text-decoration: none; cursor: none; transition: color .2s; }
  .v3-footer-links a:hover { color: var(--fg); }
  .v3-copy { font-size: 12px; color: rgba(255,255,255,.18); }

  /* WhatsApp float */
  #v3-wa {
    position: fixed; bottom: 28px; right: 28px; z-index: 200;
    width: 54px; height: 54px; border-radius: 50%;
    background: #25D366; display: flex; align-items: center; justify-content: center;
    text-decoration: none; cursor: none;
    box-shadow: 0 8px 28px rgba(37,211,102,.35);
    opacity: 0; transform: scale(0.8) translateY(12px); filter: blur(8px);
    will-change: transform,opacity,filter; transition: box-shadow .3s, transform .3s;
  }
  #v3-wa:hover { box-shadow: 0 12px 40px rgba(37,211,102,.5); transform: scale(1.07) translateY(-2px) !important; }
  #v3-wa svg { width: 26px; height: 26px; fill: white; }

  /* Responsive */
  @media (max-width: 1024px) {
    .v3-pillars { grid-template-columns: 1fr 1fr; }
    .v3-pillar:nth-child(2) { border-left: 1px solid var(--bd); }
    .v3-pillar:nth-child(3),.v3-pillar:nth-child(4) { border-top: none; }
    .v3-stats { grid-template-columns: 1fr 1fr; }
    .v3-slide { min-width: 90vw; width: 90vw; grid-template-columns: 1fr; }
    .v3-slide-img { aspect-ratio: 16/9; }
    .v3-proc-grid { grid-template-columns: 1fr; gap: 48px; }
    .v3-proc-sticky { position: static; }
    .v3-testimonials { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 768px) {
    #v3-nav { padding-top: 20px; padding-bottom: 20px; }
    .v3-nav-links,.v3-nav-cta { display: none; }
    .v3-burger { display: flex; }
    .v3-pillars { grid-template-columns: 1fr; }
    .v3-pillar:not(:first-child) { border-left: 1px solid var(--bd); border-top: none; }
    .v3-stats { grid-template-columns: 1fr; }
    .v3-ctas { flex-direction: column; align-items: center; }
    .v3-testimonials { grid-template-columns: 1fr; }
    .v3-form-row { grid-template-columns: 1fr; }
    .v3-slide { min-width: 95vw; width: 95vw; padding: 0 20px; }
    .v3-cta-btns { flex-direction: column; align-items: center; }
  }
`

const PILLARS = [
  { num: '01', title: 'Design', desc: 'Identidade visual, UI/UX e Design Systems que comunicam e convertem.', tags: ['Identidade Visual', 'UI/UX', 'Design Systems'] },
  { num: '02', title: 'Desenvolvimento', desc: 'Sites, apps, sistemas e landing pages com código limpo e performance real.', tags: ['Sites', 'Apps', 'Landing Pages'] },
  { num: '03', title: 'Automação & IA', desc: 'Agentes inteligentes, fluxos automatizados e integrações que economizam horas.', tags: ['Agentes IA', 'N8N', 'Integrações'] },
  { num: '04', title: 'Estratégia Digital', desc: 'Posicionamento, gestão de mídia e conteúdo para crescer com consistência.', tags: ['Mídia Social', 'Conteúdo', 'Posicionamento'] },
]

const CASES = [
  { idx: '01', name: 'Doutores da Alegria', desc: 'Plataforma de comunicação e captação de doações para uma das maiores ONGs do Brasil.', tags: ['Design', 'Dev'], result: 'Site entregue em 18 dias. Aumento na taxa de doações.', img: '/droneiros/bghomedoutores.png' },
  { idx: '02', name: 'MOMS Cupons', desc: 'Landing page de alta conversão para plataforma de cupons e benefícios.', tags: ['Design', 'Dev', 'Estratégia'], result: 'Redução de 68% na taxa de rejeição após o redesign.', img: '/droneiros/momsbg.png' },
  { idx: '03', name: 'Droneiros Voluntários', desc: 'Sistema de gestão para voluntários com drones em missões humanitárias.', tags: ['Design', 'Dev', 'Plataforma'], result: 'Plataforma ativa com 200+ voluntários cadastrados.', img: '/droneiros/bg-droneiro.jpg' },
  { idx: '04', name: 'Horizonte Imóveis', desc: 'Plataforma imobiliária com busca avançada, painel de gestão e automações.', tags: ['Design', 'Dev', 'Automação'], result: 'Redução de 15h semanais de trabalho manual.', img: '/droneiros/bg-imobiliaria.png' },
]

const STEPS = [
  { num: '01', title: 'Conversa', desc: 'Você conta o desafio. A gente escuta antes de propor.' },
  { num: '02', title: 'Estratégia', desc: 'Desenhamos a solução certa pro seu contexto e orçamento.' },
  { num: '03', title: 'Execução', desc: 'Design, código e automação trabalhando juntos desde o dia um.' },
  { num: '04', title: 'Entrega & suporte', desc: 'Produto no ar. Acompanhamento contínuo. <strong>Sem sumiço.</strong>' },
]

const CLIENTS = ['AgroPlace', 'Doutores da Alegria', 'DUP', 'FertyBio', 'Playtime', 'Águas do Brasil', 'Resenha Fut', 'MOMS', 'Horizonte Imóveis', 'AgroPlace', 'Doutores da Alegria', 'DUP', 'FertyBio', 'Playtime', 'Águas do Brasil', 'Resenha Fut', 'MOMS', 'Horizonte Imóveis']

const TESTIMONIALS = [
  { quote: 'A Synnk entregou em 2 semanas o que outra agência levou 3 meses para não entregar. Processo claro, comunicação honesta.', name: 'Marina Costa', role: 'CEO, FertyBio' },
  { quote: 'Não é só uma agência de site. Eles entenderam o negócio e propuseram automações que mudaram nossa operação inteira.', name: 'Rafael Souza', role: 'Fundador, AgroPlace' },
  { quote: 'Design bonito é o mínimo. O que nos surpreendeu foi a qualidade do código e a velocidade de entrega.', name: 'Juliana Alves', role: 'Diretora de Marketing, Playtime' },
]

const HEADLINE_WORDS = ['Presença', 'digital', 'à', 'altura', 'do', 'seu', 'negócio.']

// Grid quadrado — linhas a cada 100px (viewBox 1000 x 500)
const GRID_SIZE = 100
const MAP_STREETS = [
  ...Array.from({ length: Math.floor(1000 / GRID_SIZE) + 1 }, (_, i) =>
    `M ${i * GRID_SIZE},0 L ${i * GRID_SIZE},500`
  ),
  ...Array.from({ length: Math.floor(500 / GRID_SIZE) + 1 }, (_, i) =>
    `M 0,${i * GRID_SIZE} L 1000,${i * GRID_SIZE}`
  ),
]

// Rota: sobe borda esq → quebra direita → sobe → quebra direita → centro
const MAP_ROUTE = "M -10,400 L 1010,400"

const MAP_WAYPOINTS = [
  { cx: 100, cy: 400, label: 'Diagnóstico',    anchor: 'middle', dy: 22 },
  { cx: 300, cy: 400, label: 'Estratégia',     anchor: 'middle', dy: 22 },
  { cx: 500, cy: 400, label: 'Design',         anchor: 'middle', dy: 22 },
  { cx: 700, cy: 400, label: 'Desenvolvimento',anchor: 'middle', dy: 22 },
  { cx: 900, cy: 400, label: 'Resultado',      anchor: 'middle', dy: 22 },
]

// 4 cardinais no r=160 + 4 diagonais no r=110 → distribuição uniforme em estrela
const RADAR_BADGES = [
  { label: 'Objetivo',   x: 50,   y: 5.6,  dir: 'below' }, // N  r=160
  { label: 'Resultado',  x: 94.4, y: 50,   dir: 'above' }, // E  r=160
  { label: 'Conversão',  x: 50,   y: 94.4, dir: 'above' }, // S  r=160
  { label: 'Estratégia', x: 5.6,  y: 50,   dir: 'above' }, // W  r=160
  { label: 'Impacto',    x: 71.6, y: 28.4, dir: 'below' }, // NE r=110
  { label: 'Sucesso',    x: 71.6, y: 71.6, dir: 'above' }, // SE r=110
  { label: 'Presença',   x: 28.4, y: 71.6, dir: 'above' }, // SW r=110
  { label: 'Inovação',   x: 28.4, y: 28.4, dir: 'below' }, // NW r=110
]

export default function SynnkV3() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    // Fonts
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
    document.head.appendChild(link)

    document.body.style.background = '#080808'

    // Scroll → nav
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })

    // Mouse light
    const light = document.createElement('div')
    light.id = 'v3-light'
    document.body.appendChild(light)
    const onLight = (e: MouseEvent) => {
      light.style.setProperty('--mx', e.clientX + 'px')
      light.style.setProperty('--my', e.clientY + 'px')
    }
    document.addEventListener('mousemove', onLight)

    // Custom cursor
    const cur = document.createElement('div')
    cur.className = 'v3-cur'
    document.body.appendChild(cur)
    let mx = 0, my = 0
    const onMM = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      cur.style.left = mx + 'px'
      cur.style.top  = my + 'px'
    }
    document.addEventListener('mousemove', onMM)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => cur.classList.add('big'))
      el.addEventListener('mouseleave', () => cur.classList.remove('big'))
    })
    let raf: number
    const animCur = () => { raf = requestAnimationFrame(animCur) }
    animCur()

    // Load GSAP
    const loadScript = (src: string) => new Promise<void>(res => {
      if (document.querySelector(`script[src="${src}"]`)) { res(); return }
      const s = document.createElement('script')
      s.src = src; s.onload = () => res()
      document.head.appendChild(s)
    })

    loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js')
      .then(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js'))
      .then(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { gsap, ScrollTrigger } = window as any
        gsap.registerPlugin(ScrollTrigger)

        /* ── Hero entrance ── */
        gsap.set('.v3-tag',          { filter: 'blur(8px)' })
        gsap.set('.v3-h1',           { filter: 'blur(12px)' })
        gsap.set('.v3-sub',          { filter: 'blur(8px)' })
        gsap.set('.v3-ctas',         { filter: 'blur(6px)' })
        gsap.set('#v3-hero-clients', { filter: 'blur(6px)' })

        /* ── Hero luz superior oscilando ── */
        const spotlight = document.getElementById('v3-spotlight')
        if (spotlight) {
          gsap.to({ x: 20 }, {
            x: 80,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            onUpdate: function() {
              spotlight.style.setProperty('--sx', `${this.targets()[0].x}%`)
            }
          })
        }

        /* ── City map drawing — aparece primeiro ── */
        const MAP_START = 0.2
        gsap.fromTo('#v3-map', { opacity: 0 }, { opacity: 1, duration: 1.0, delay: MAP_START, ease: 'power2.inOut' })

        const routePath = document.querySelector<SVGPathElement>('.v3-map-route')
        if (routePath) {
          const len = routePath.getTotalLength()
          gsap.set(routePath, { strokeDasharray: len, strokeDashoffset: len })
          gsap.to(routePath, { strokeDashoffset: 0, duration: 3, delay: MAP_START + 0.4, ease: 'power1.inOut' })
        }
        // Rota: x=-10 até x=1010, duração 3s, começa em MAP_START+0.4
        // Cada wp aparece quando a linha chega em seu x
        const routeDuration = 3
        const routeStart = MAP_START + 0.4
        const routeLen = 1020
        const wpXs = [100, 300, 500, 700, 900]
        const wpDelays = wpXs.map(x => routeStart + ((x + 10) / routeLen) * routeDuration)
        document.querySelectorAll<SVGCircleElement>('.v3-map-waypoint').forEach((el, i) => {
          gsap.to(el, { opacity: 1, duration: 0.4, delay: wpDelays[i], ease: 'back.out(2)' })
        })
        document.querySelectorAll<SVGCircleElement>('.v3-map-waypoint-dot').forEach((el, i) => {
          gsap.to(el, { opacity: 1, duration: 0.3, delay: wpDelays[i] + 0.1, ease: 'power2.out' })
          if (i === 4) {
            gsap.to(el, { scale: 1.4, repeat: -1, yoyo: true, duration: 0.9, delay: wpDelays[i] + 0.4, ease: 'sine.inOut', transformOrigin: 'center' })
          }
        })
        document.querySelectorAll<SVGTextElement>('.v3-map-label').forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, y: 4 },
            { opacity: 1, y: 0, duration: 0.4, delay: wpDelays[i] + 0.15, ease: 'power2.out' }
          )
        })
        document.querySelectorAll<SVGRectElement>('.v3-map-label-bg').forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, delay: wpDelays[i] + 0.12, ease: 'power2.out' }
          )
        })

        /* ── Hero text — aparece junto com o mapa ── */
        const tl = gsap.timeline({ delay: 0.8 })
        tl.to('.v3-wi',   { y: '0%', filter: 'blur(0px)', duration: 0.8, stagger: 0.07, ease: 'power3.out' })
          .to('.v3-h1',   { filter: 'blur(0px)', duration: 0.9, ease: 'power2.out' }, '<')
          .to('.v3-sub',  { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' }, '-=0.3')
          .to('.v3-ctas', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' }, '-=0.25')
          .to('#v3-hero-clients', { opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' }, '-=0.1')

        /* Hero deco parallax */
        const deco = document.querySelector<HTMLElement>('.v3-hero-deco')
        if (deco) {
          window.addEventListener('mousemove', (e: MouseEvent) => {
            gsap.to(deco, {
              x: (e.clientX / window.innerWidth  - .5) * 30,
              y: (e.clientY / window.innerHeight - .5) * 20,
              duration: 2, ease: 'power3.out',
            })
          }, { passive: true })
          gsap.to(deco, { y: '-=120', ease: 'none', scrollTrigger: { trigger: '#v3-hero', start: 'top top', end: 'bottom top', scrub: 0.8 } })
        }

        /* ── Generic clip-path reveals ── */
        document.querySelectorAll('.v3-reveal').forEach(el => {
          gsap.fromTo(el,
            { clipPath: 'inset(100% 0 0 0)', opacity: 0, y: 16, filter: 'blur(10px)' },
            { clipPath: 'inset(0% 0 0 0)', opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.85, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%' } }
          )
        })

        /* ── Testimonials stagger ── */
        gsap.fromTo('.v3-testi',
          { opacity: 0, y: 60, filter: 'blur(10px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
            stagger: 0.18,
            scrollTrigger: { trigger: '.v3-testimonials', start: 'top 82%' }
          }
        )

        /* ── Amplitude: floating orbs on scroll ── */
        const orbEls = document.querySelectorAll<HTMLElement>('.v3-orb')
        // z=0 → far (slow, faded), z=3 → close (fast, opaque)
        const zSpeed = [0.45, 0.70, 0.95, 1.25]
        orbEls.forEach((orb) => {
          const z = parseInt(orb.style.zIndex || '0', 10)
          const speed = zSpeed[z] ?? 0.7
          const maxOpacity = parseFloat(orb.dataset.maxOpacity ?? '0.7')
          gsap.fromTo(orb,
            { y: 0, opacity: 0, filter: 'blur(20px)' },
            {
              y: () => -(window.innerHeight * 1.9 * speed),
              opacity: maxOpacity,
              filter: 'blur(0px)',
              ease: 'none',
              scrollTrigger: {
                trigger: '#v3-serviços',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          )
        })

        /* ── Amplitude: pin + fill cards sequentially ── */
        const linePath = document.querySelector<SVGGeometryElement>('.v3-line-path')
        const lineLen = linePath?.getTotalLength?.() ?? 1200
        if (linePath) gsap.set(linePath, { strokeDasharray: lineLen, strokeDashoffset: lineLen })

        const pillars = document.querySelectorAll<HTMLElement>('.v3-pillar')

        ScrollTrigger.create({
          trigger: '#v3-pillars-pin',
          start: 'top top',
          end: '+=120%',
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          onUpdate: (self: { progress: number }) => {
            if (linePath) gsap.set(linePath, { strokeDashoffset: lineLen * (1 - self.progress) })
            pillars.forEach((p, i) => {
              p.classList.toggle('filled', self.progress >= i / pillars.length)
            })
          }
        })

        /* ── Pillars entrance ── */
        gsap.fromTo('.v3-pillar',
          { opacity: 0, y: 40, filter: 'blur(12px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: '.v3-pillars', start: 'top 88%', once: true }
          }
        )

        /* ── Domínio: counters ── */
        const counters = [
          { sel: '.v3-cnt-7',  end: 7  },
          { sel: '.v3-cnt-50', end: 50 },
          { sel: '.v3-cnt-3',  end: 3.5 },
        ]
        counters.forEach(({ sel, end }) => {
          const el = document.querySelector(sel)
          if (!el) return
          const obj = { val: Number.isInteger(end) ? 0 : 0.1 }
          ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true,
            onEnter: () => gsap.to(obj, { val: end, duration: 1.8, ease: 'power2.out', onUpdate() { el.textContent = Number.isInteger(end) ? String(Math.round(obj.val)) : obj.val.toFixed(1) } })
          })
        })

        /* ── Portfólio horizontal scroll ── */
        const mm = gsap.matchMedia()
        mm.add('(min-width: 769px)', () => {
          const track = document.querySelector<HTMLElement>('.v3-cases-track')
          if (!track) return
          const root = document.getElementById('v3-root')
          const portTween = gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: 'none',
            scrollTrigger: {
              trigger: '#v3-portfolio',
              start: 'top top',
              end: () => '+=' + (track.scrollWidth - window.innerWidth),
              pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
              onEnter:     () => root?.classList.add('v3-light'),
              onLeave:     () => root?.classList.remove('v3-light'),
              onEnterBack: () => root?.classList.add('v3-light'),
              onLeaveBack: () => root?.classList.remove('v3-light'),
            }
          })

          /* Slide image entrance (skip first) */
          document.querySelectorAll<HTMLElement>('.v3-slide-img').forEach((imgWrap, i) => {
            if (i === 0) return
            gsap.fromTo(imgWrap,
              { opacity: 0, scale: 0.95, y: 120, filter: 'blur(12px)' },
              {
                opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', ease: 'power3.out',
                immediateRender: false,
                scrollTrigger: {
                  trigger: imgWrap.closest('.v3-slide'),
                  containerAnimation: portTween,
                  start: 'left right',
                  end: 'left 55%',
                  scrub: 0.7,
                }
              }
            )
          })

          /* Image parallax per slide */
          document.querySelectorAll('.v3-slide-img img').forEach(img => {
            gsap.fromTo(img, { y: '0%' }, {
              y: '-12%', ease: 'none',
              scrollTrigger: {
                trigger: img.closest('.v3-slide'),
                containerAnimation: portTween,
                start: 'left right', end: 'right left', scrub: 1,
              }
            })
          })

          /* Case name mask reveal */
          document.querySelectorAll('.v3-case-name-in').forEach(el => {
            gsap.fromTo(el,
              { y: '100%', filter: 'blur(8px)' },
              { y: '0%', filter: 'blur(0px)', duration: 0.6, ease: 'power3.out',
                scrollTrigger: {
                  trigger: el.closest('.v3-slide'),
                  containerAnimation: portTween,
                  start: 'left 85%', end: 'left 55%', scrub: 0.6,
                }
              }
            )
          })
        })

        /* ── Processo: vertical line + step activation ── */
        gsap.to('.v3-pfill', {
          scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: '.v3-steps', start: 'top 65%', end: 'bottom 35%', scrub: 1 }
        })
        document.querySelectorAll('.v3-step').forEach((step, i) => {
          gsap.fromTo(step,
            { opacity: 0, y: 30, filter: 'blur(10px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out',
              delay: i * 0.08,
              scrollTrigger: { trigger: step, start: 'top 88%', once: true }
            }
          )
        })
        document.querySelectorAll('.v3-step').forEach(step => {
          ScrollTrigger.create({
            trigger: step, start: 'top 60%', end: 'bottom 40%',
            onEnter: () => step.classList.add('active'),
            onLeave: () => step.classList.remove('active'),
            onEnterBack: () => step.classList.add('active'),
            onLeaveBack: () => step.classList.remove('active'),
          })
        })

        /* ── CTA headline scale ── */
        gsap.fromTo('.v3-cta-h2',
          { scale: 0.96, opacity: 0, filter: 'blur(14px)' },
          { scale: 1, opacity: 1, filter: 'blur(0px)', ease: 'none',
            scrollTrigger: { trigger: '#v3-cta', start: 'top bottom', end: 'center center', scrub: 1 }
          }
        )

        /* ── Catch-all blur reveal ── */
        const catchAll = [
          '.v3-amp-header', '.v3-dom-header', '.v3-port-head',
          '.v3-proof-header', '.v3-proc-sticky',
          '.v3-divider', '.v3-form', '.v3-form-note',
          '.v3-marquee-outer', '#v3-footer',
        ]
        document.querySelectorAll<HTMLElement>(catchAll.join(', ')).forEach(el => {
          gsap.fromTo(el,
            { opacity: 0, y: 24, filter: 'blur(14px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 90%', once: true }
            }
          )
        })

        /* ── WhatsApp float entrance ── */
        gsap.to('#v3-wa', { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'back.out(1.6)', delay: 1.8 })

        /* ── Magnetic buttons ── */
        document.querySelectorAll<HTMLElement>('.v3-btn-p, .v3-btn-g').forEach(btn => {
          btn.addEventListener('mousemove', (e: MouseEvent) => {
            const r = btn.getBoundingClientRect()
            gsap.to(btn, { x: (e.clientX - r.left - r.width/2) * 0.12, y: (e.clientY - r.top - r.height/2) * 0.12, duration: 0.4, ease: 'power3.out' })
          })
          btn.addEventListener('mouseleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' }))
        })

        ScrollTrigger.refresh()

        /* ── Radar: two-stage interaction (GSAP) ── */
        const radarDeco   = document.querySelector<HTMLElement>('.v3-hero-deco')
        const radarCenter = document.querySelector<HTMLElement>('.v3-radar-center')
        const radarPhrase = document.getElementById('v3-radar-phrase')
        const radarText   = document.getElementById('v3-radar-text')
        const loaderFill  = document.getElementById('v3-rp-loader')
        const radarBadges = document.querySelectorAll<HTMLElement>('.v3-rbadge')
        const animLines   = document.querySelectorAll<SVGLineElement>('.v3-radar-anim line')
        const animCircles = document.querySelectorAll<SVGCircleElement>('.v3-radar-anim .rc')
        const PHRASE1     = 'Temos tudo o que\nvocê precisa para\nchegar no seu alvo.'
        const CHARS       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%&$'
        const circleLens  = [377, 691, 1005]
        let s1Timer: ReturnType<typeof setTimeout> | null = null
        let s2Timer: ReturnType<typeof setTimeout> | null = null
        let sRaf:    number | null = null
        let active   = false

        // Stagger delay nos badges
        radarBadges.forEach((b, i) => b.style.setProperty('--bd', `${i * 0.07}s`))

        // Estado inicial — tudo invisível via GSAP
        gsap.set(animLines, { strokeDasharray: 160, strokeDashoffset: 160 })
        animCircles.forEach((c, i) => gsap.set(c, { strokeDasharray: circleLens[i], strokeDashoffset: circleLens[i] }))

        function animateRadar() {
          // linha DOM index → badge DOM index (E,W,N,S,NE,SW,SE,NW → badges array)
          const badgeMap = [1, 3, 0, 2, 4, 6, 5, 7]
          const badgesArr = Array.from(radarBadges)
          const delays = [0, 0.06, 0.12, 0.18, 0.24, 0.30, 0.36, 0.42].sort(() => Math.random() - 0.5)

          Array.from(animLines).forEach((line, i) => {
            gsap.to(line, {
              strokeDashoffset: 0, duration: 0.65, ease: 'power2.inOut', delay: delays[i],
              onComplete: () => {
                const dot = badgesArr[badgeMap[i]]?.querySelector<HTMLElement>('.v3-rbadge-dot')
                if (dot) gsap.to(dot, { backgroundColor: 'white', opacity: 1, duration: 0.25, ease: 'power2.out' })
              }
            })
          })
          animCircles.forEach((c, i) => {
            gsap.to(c, { strokeDashoffset: 0, duration: 0.8 + i * 0.15, ease: 'power2.inOut', delay: 0.45 + i * 0.1 })
          })
          gsap.to('.v3-radar-anim', {
            filter: 'drop-shadow(0 0 4px white) drop-shadow(0 0 10px rgba(255,255,255,0.25))',
            duration: 0.5, delay: 1.7
          })
        }

        function resetRadar() {
          gsap.killTweensOf([...Array.from(animLines), ...Array.from(animCircles), document.querySelector('.v3-radar-anim')])
          gsap.set(animLines, { strokeDashoffset: 160 })
          animCircles.forEach((c, i) => gsap.set(c, { strokeDashoffset: circleLens[i] }))
          gsap.set('.v3-radar-anim', { filter: 'none' })
          document.querySelectorAll<HTMLElement>('.v3-rbadge-dot').forEach(dot => {
            gsap.set(dot, { clearProps: 'backgroundColor,opacity' })
          })
        }

        function scramble(el: HTMLElement, text: string) {
          let frame = 0; const total = 70
          function tick() {
            el.textContent = text.split('').map((ch, i) => {
              if (ch === '\n') return '\n'
              if (frame / total > i / text.length) return ch
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            }).join('')
            frame++
            if (frame <= total) sRaf = requestAnimationFrame(tick)
            else el.textContent = text
          }
          tick()
        }

        function startStage1() {
          if (!radarDeco || !radarPhrase || !radarText || !loaderFill || active) return
          active = true
          radarPhrase.classList.add('visible')
          radarDeco.classList.add('s1')
          scramble(radarText, PHRASE1)
          requestAnimationFrame(() => loaderFill.classList.add('run'))
          s2Timer = setTimeout(startStage2, 2900)
        }

        function startStage2() {
          radarDeco?.classList.add('s2')
        }

        function reset() {
          active = false
          if (s1Timer) clearTimeout(s1Timer)
          if (s2Timer) clearTimeout(s2Timer)
          if (sRaf)    cancelAnimationFrame(sRaf)
          resetRadar()
          radarDeco?.classList.remove('s1', 's2')
          radarPhrase?.classList.remove('visible')
          if (radarText) radarText.textContent = ''
          if (loaderFill) {
            loaderFill.classList.remove('run')
            loaderFill.style.transition = 'none'
            loaderFill.style.width = '0'
            requestAnimationFrame(() => { if (loaderFill) loaderFill.style.transition = '' })
          }
        }

        if (radarCenter) {
          radarCenter.addEventListener('mouseenter', () => {
            animateRadar()
            s1Timer = setTimeout(startStage1, 1750)
          })
          radarCenter.addEventListener('mouseleave', reset)
        }
      })

    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mousemove', onMM)
      document.removeEventListener('mousemove', onLight)
      cancelAnimationFrame(raf)
      if (document.body.contains(cur)) document.body.removeChild(cur)
      if (document.body.contains(light)) document.body.removeChild(light)
      document.body.style.background = ''
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div id="v3-root">

        {/* ── NAV ── */}
        <nav id="v3-nav" className={scrolled ? 'scrolled' : ''}>
          <a href="#v3-root" className="v3-logo">SYNNK<em>.</em></a>
          <ul className="v3-nav-links">
            {['Serviços', 'Portfólio', 'Processo', 'Contato'].map(l => (
              <li key={l}><a href={`#v3-${l.toLowerCase()}`}>{l}</a></li>
            ))}
          </ul>
          <a href="https://wa.me/5511999999999" className="v3-nav-cta" target="_blank" rel="noopener noreferrer">Fale com a gente</a>
          <button className={`v3-burger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </nav>

        {/* Mobile nav */}
        <div className={`v3-mobile-nav${menuOpen ? ' open' : ''}`}>
          <ul className="v3-mobile-links">
            {['Serviços', 'Portfólio', 'Processo', 'Contato'].map(l => (
              <li key={l}><a href={`#v3-${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{l}</a></li>
            ))}
          </ul>
        </div>

        {/* ── HERO ── */}
        <section id="v3-hero">
          <div className="v3-hero-bg" aria-hidden="true" />
          <div id="v3-spotlight" aria-hidden="true" />
          <svg id="v3-map" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{overflow:'hidden'}}>
            <defs>
              {/* Máscara da rota — some nas bordas */}
              <radialGradient id="mapFade" cx="50%" cy="50%" r="50%" gradientTransform="scale(1 0.6) translate(0 0.33)">
                <stop offset="0%"   stopColor="black" stopOpacity="1" />
                <stop offset="45%"  stopColor="black" stopOpacity="0.85" />
                <stop offset="75%"  stopColor="black" stopOpacity="0.3" />
                <stop offset="100%" stopColor="black" stopOpacity="0" />
              </radialGradient>
              <mask id="mapMask">
                <rect width="1000" height="500" fill="white" />
                <rect width="1000" height="500" fill="url(#mapFade)" />
              </mask>
              {/* Máscara do grid — apaga o centro, mantém as bordas */}
              <radialGradient id="gridFade" cx="50%" cy="50%" r="50%" gradientTransform="scale(1 0.7) translate(0 0.21)">
                <stop offset="0%"   stopColor="white" stopOpacity="0" />
                <stop offset="40%"  stopColor="white" stopOpacity="0" />
                <stop offset="70%"  stopColor="white" stopOpacity="0.6" />
                <stop offset="100%" stopColor="white" stopOpacity="1" />
              </radialGradient>
              <mask id="gridMask">
                <rect width="1000" height="500" fill="url(#gridFade)" />
              </mask>
            </defs>
            {/* Grid uniforme */}
            <g>
              {MAP_STREETS.map((d, i) => (
                <path key={i} className="v3-map-street" d={d} />
              ))}
            </g>
            {/* Rota */}
            <path className="v3-map-route" d={MAP_ROUTE} />
            {MAP_WAYPOINTS.map(({ cx, cy, label, anchor, dy }, i) => {
              const isLast = i === MAP_WAYPOINTS.length - 1
              const pw = label.length * 5 + 12
              const ph = 14
              const tx = anchor === 'end' ? cx - 10 : anchor === 'start' ? cx + 10 : cx
              const rx = anchor === 'end' ? tx - pw : anchor === 'start' ? tx : tx - pw / 2
              return (
                <g key={i}>
                  <circle className="v3-map-waypoint" cx={cx} cy={cy} r={4} />
                  <circle className="v3-map-waypoint-dot" cx={cx} cy={cy} r={1.5} />
                  <rect
                    className={`v3-map-label-bg${isLast ? ' last' : ''}`}
                    x={rx} y={dy < 0 ? cy + dy - ph + 3 : cy + dy - 10}
                    width={pw} height={ph} rx={2}
                  />
                  <text
                    className={`v3-map-label${isLast ? ' last' : ''}`}
                    x={tx} y={cy + dy}
                    textAnchor={anchor}
                  >{label}</text>
                </g>
              )
            })}
          </svg>
          <div className="v3-hero-inner">
            <h1 className="v3-h1">
              {HEADLINE_WORDS.map((w, i) => (
                <span key={i} className="v3-word"><span className="v3-wi">{w}</span></span>
              ))}
            </h1>
            <p className="v3-sub">
              Combinamos <strong>design de alto nível</strong> e <strong>estratégia de negócios</strong> para traçar a rota do seu crescimento.
            </p>
            <div className="v3-ctas">
              <a href="https://wa.me/5511999999999" className="v3-btn-p" target="_blank" rel="noopener noreferrer">
                Fale com a gente
              </a>
            </div>
          </div>

          {/* Clientes no rodapé do hero */}
          <div id="v3-hero-clients">
            <div className="v3-hero-clients-track">
              <div className="v3-hero-clients-logos">
                {[...CLIENTS, ...CLIENTS].map((c, i) => (
                  <span key={i} className="v3-hero-clients-logo">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── AMPLITUDE ── */}
        <section id="v3-serviços" className="v3-sec" style={{ paddingBottom: 0 }}>
          <div id="v3-amplitude">
            <div id="v3-orbs" aria-hidden="true">
              {[
                // { size, left, top, blur, maxOpacity, z }
                { size: 10, left: '8%',  top: '115%', blur: 5,  maxOpacity: 0.25, z: 0 },
                { size: 40, left: '15%', top: '130%', blur: 0,  maxOpacity: 0.90, z: 2 },
                { size: 8,  left: '28%', top: '120%', blur: 8,  maxOpacity: 0.18, z: 0 },
                { size: 56, left: '44%', top: '112%', blur: 0,  maxOpacity: 1.00, z: 3 },
                { size: 20, left: '55%', top: '138%', blur: 3,  maxOpacity: 0.60, z: 1 },
                { size: 14, left: '63%', top: '108%', blur: 7,  maxOpacity: 0.22, z: 0 },
                { size: 32, left: '73%', top: '125%', blur: 1,  maxOpacity: 0.80, z: 2 },
                { size: 6,  left: '82%', top: '140%', blur: 10, maxOpacity: 0.15, z: 0 },
                { size: 24, left: '89%', top: '118%', blur: 2,  maxOpacity: 0.70, z: 2 },
                { size: 12, left: '22%', top: '148%', blur: 6,  maxOpacity: 0.20, z: 0 },
                { size: 18, left: '37%', top: '155%', blur: 4,  maxOpacity: 0.45, z: 1 },
                { size: 48, left: '93%', top: '135%', blur: 0,  maxOpacity: 0.85, z: 3 },
              ].map((o, i) => (
                <div
                  key={i}
                  className="v3-orb"
                  style={{
                    width: o.size, height: o.size,
                    left: o.left, top: o.top,
                    filter: o.blur > 0 ? `blur(${o.blur}px)` : undefined,
                    zIndex: o.z,
                  }}
                  data-max-opacity={o.maxOpacity}
                />
              ))}
            </div>
            <div className="v3-amp-header">
              <span className="v3-sec-tag v3-reveal">O que fazemos</span>
              <h2 className="v3-sec-h2 v3-reveal">Tudo que o seu negócio<br />precisa. Em um só lugar</h2>
            </div>
            <div id="v3-pillars-pin">
              <div className="v3-pillars">
                {PILLARS.map(({ num, title, desc, tags }) => (
                  <div key={num} className="v3-pillar">
                    <div className="v3-pillar-top">
                      <span className="v3-pnum">{num}</span>
                      <div className="v3-check">
                        <svg viewBox="0 0 16 16" fill="none" stroke="#FFE600" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3,8 6.5,11.5 13,4.5" />
                        </svg>
                      </div>
                    </div>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                    <div className="v3-ptags">
                      {tags.map(t => <span key={t} className="v3-ptag">{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
              {/* SVG connecting line */}
              <svg className="v3-line-svg" height="3" viewBox="0 0 1200 3" preserveAspectRatio="none">
                <path d="M0 1.5 L1200 1.5" stroke={AC} strokeWidth="2.5" fill="none" className="v3-line-path" />
              </svg>
            </div>
          </div>
        </section>

        {/* ── DOMÍNIO ── */}
        <section id="v3-dominio" className="v3-sec">
          <div className="v3-dom-header">
            <span className="v3-sec-tag v3-reveal">Por que a Synnk</span>
            <h2 className="v3-sec-h2 v3-reveal">7 anos transformando<br />negócios através do digital.</h2>
          </div>
          <div className="v3-stats">
            <div className="v3-stat v3-reveal">
              <strong><span className="v3-cnt-7">0</span><em>+</em></strong>
              <p>anos de experiência em design e produto digital</p>
            </div>
            <div className="v3-stat v3-reveal">
              <strong><span className="v3-cnt-50">0</span><em>+</em></strong>
              <p>projetos entregues de ponta a ponta</p>
            </div>
            <div className="v3-stat v3-reveal">
              <strong><span className="v3-cnt-3">0.1</span><em>x</em></strong>
              <p>mais rápido que agências tradicionais, seguindo um processo linear</p>
            </div>
          </div>
        </section>

        {/* ── PORTFÓLIO ── */}
        <section id="v3-portfólio">
          <div className="v3-port-head">
            <span className="v3-sec-tag v3-reveal">Portfólio</span>
            <h2 className="v3-sec-h2 v3-reveal">Alguns dos projetos<br />que nos orgulhamos.</h2>
          </div>
          <div id="v3-portfolio">
            <div className="v3-cases-track">
              {CASES.map(({ idx, name, desc, tags, img }) => (
                <div key={idx} className="v3-slide">
                  <div className="v3-slide-info">
                    <span className="v3-case-deco">{idx}</span>
                    <div className="v3-case-name"><span className="v3-case-name-in">{name}</span></div>
                    <div className="v3-case-tags">
                      {tags.map(t => <span key={t} className="v3-case-tag">{t}</span>)}
                    </div>
                    <p className="v3-case-desc">{desc}</p>
                    <a href="#" className="v3-case-cta">Ver projeto <span className="arr">→</span></a>
                  </div>
                  <div className="v3-slide-img">
                    <img src={img} alt={name} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESSO ── */}
        <section id="v3-processo" className="v3-sec">
          <div className="v3-proc-grid">
            <div className="v3-proc-sticky">
              <span className="v3-sec-tag v3-reveal">Como trabalhamos</span>
              <h2 className="v3-sec-h2 v3-reveal">
                Simples de entender.<br />Simples de acompanhar.
              </h2>
            </div>
            <div className="v3-steps" style={{ position: 'relative' }}>
              <div className="v3-pline"><div className="v3-pfill" /></div>
              {STEPS.map(({ num, title, desc }) => (
                <div key={num} className="v3-step">
                  <div className="v3-step-num">{num}</div>
                  <div className="v3-step-body">
                    <h3>{title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: desc }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF ── */}
        <section id="v3-proof" className="v3-sec" style={{ paddingTop: 0 }}>
          <div className="v3-marquee-outer">
            <div className="v3-marquee">
              {CLIENTS.map((c, i) => <span key={i} className="v3-mq-item">{c}</span>)}
            </div>
          </div>
          <div className="v3-proof-header">
            <span className="v3-sec-tag v3-reveal">O que dizem</span>
            <h2 className="v3-sec-h2 v3-reveal">Quem confia<br />na Synnk.</h2>
          </div>
          <div className="v3-testimonials">
            {TESTIMONIALS.map(({ quote, name, role }, i) => (
              <div key={i} className="v3-testi">
                <q>{quote}</q>
                <div className="v3-testi-author">
                  <strong>{name}</strong>
                  <span>{role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section id="v3-contato">
          <div id="v3-cta">
            <div className="v3-cta-bg" aria-hidden="true" />
            <div className="v3-cta-inner">
              <h2 className="v3-cta-h2">
                Pronto pra elevar<br />sua presença digital?
              </h2>
              <div className="v3-cta-btns">
                <a href="https://wa.me/5511999999999" className="v3-btn-p" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Falar pelo WhatsApp
                </a>
              </div>
              <div className="v3-divider">ou deixe seus dados</div>
              <form className="v3-form" onSubmit={e => e.preventDefault()}>
                <div className="v3-form-row">
                  <input className="v3-input" placeholder="Seu nome" type="text" required />
                  <input className="v3-input" placeholder="WhatsApp" type="tel" required />
                </div>
                <textarea className="v3-input v3-textarea" placeholder="O que você precisa?" required />
                <button className="v3-submit" type="submit">Enviar mensagem</button>
                <p className="v3-form-note">Respondemos em até 2h em dias úteis.</p>
              </form>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer id="v3-footer">
          <a href="#v3-root" className="v3-logo">SYNNK<em>.</em></a>
          <div className="v3-footer-links">
            <a href="https://instagram.com/synnk" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
          <p className="v3-copy">© 2025 Synnk. Todos os direitos reservados.</p>
        </footer>

        {/* ── WhatsApp float ── */}
        <a id="v3-wa" href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>

      </div>
    </>
  )
}
