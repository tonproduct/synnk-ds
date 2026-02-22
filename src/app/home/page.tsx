export default function HomePage() {
  return (
    <div
      className="min-h-screen font-sans overflow-x-hidden"
      style={{
        backgroundColor: "#f6f6f6",
        backgroundImage: "radial-gradient(#c8c8c8 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      {/* ── Nav ── */}
      <nav className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="size-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#0f172a" }}
          >
            <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none">
              <rect x="2" y="2" width="7" height="7" rx="1" fill="white" />
              <rect x="11" y="2" width="7" height="7" rx="1" fill="white" />
              <rect x="2" y="11" width="7" height="7" rx="1" fill="white" />
              <path d="M14.5 11v6M11.5 14h6" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-bold text-gray-900">Logoipsum</span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1.5">
          {["Company", "Products", "Services", "Resources", "Industries"].map((item) => (
            <button
              key={item}
              className="flex items-center gap-1 px-3.5 py-1.5 text-sm text-gray-600 rounded-full border border-gray-200 bg-white/70 hover:bg-white hover:shadow-sm transition-all"
            >
              {item}
              <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 text-gray-400" fill="none">
                <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          className="px-5 py-2.5 text-sm font-semibold text-white rounded-full hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#2563eb" }}
        >
          Get In Touch
        </button>
      </nav>

      {/* ── Hero ── */}
      <section className="relative text-center px-6 pt-6 pb-0 overflow-hidden">

        {/* ── Floating icons LEFT ── */}

        {/* Cursor */}
        <div
          className="anim fade-up d100 absolute size-14 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center"
          style={{ left: "6%", top: "5px" }}
        >
          <svg viewBox="0 0 100 100" className="w-8 h-8">
            <rect width="100" height="100" rx="22" fill="#000" />
            <path d="M32 22L32 78L50 60L61 82L70 78L59 56L78 56Z" fill="white" />
          </svg>
        </div>

        {/* React */}
        <div
          className="anim fade-up d200 absolute size-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center"
          style={{ left: "2%", top: "138px" }}
        >
          <svg viewBox="0 0 100 100" className="w-7 h-7" fill="none">
            <circle cx="50" cy="50" r="8" fill="#61DAFB" />
            <ellipse cx="50" cy="50" rx="46" ry="17" stroke="#61DAFB" strokeWidth="3.5" />
            <ellipse cx="50" cy="50" rx="46" ry="17" stroke="#61DAFB" strokeWidth="3.5" transform="rotate(60 50 50)" />
            <ellipse cx="50" cy="50" rx="46" ry="17" stroke="#61DAFB" strokeWidth="3.5" transform="rotate(120 50 50)" />
          </svg>
        </div>

        {/* n8n */}
        <div
          className="anim fade-up d300 absolute size-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center"
          style={{ left: "7%", top: "272px" }}
        >
          <svg viewBox="0 0 100 60" className="w-8 h-5" fill="none">
            <circle cx="16" cy="30" r="13" stroke="#FF6D5A" strokeWidth="5" />
            <circle cx="84" cy="30" r="13" stroke="#FF6D5A" strokeWidth="5" />
            <line x1="29" y1="30" x2="71" y2="30" stroke="#FF6D5A" strokeWidth="5" />
            <circle cx="50" cy="30" r="8" fill="#FF6D5A" />
          </svg>
        </div>

        {/* ── Floating icons RIGHT ── */}

        {/* Vercel */}
        <div
          className="anim fade-up d200 absolute size-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center"
          style={{ right: "6%", top: "15px" }}
        >
          <svg viewBox="0 0 100 87" className="w-7 h-6">
            <path d="M50 0L100 87H0Z" fill="#000" />
          </svg>
        </div>

        {/* Figma */}
        <div
          className="anim fade-up d100 absolute size-14 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center"
          style={{ right: "2%", top: "138px" }}
        >
          <svg viewBox="0 0 38 57" className="w-5 h-8">
            <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
            <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83" />
            <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262" />
            <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
            <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
          </svg>
        </div>

        {/* Supabase */}
        <div
          className="anim fade-up d300 absolute size-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center"
          style={{ right: "7%", top: "268px" }}
        >
          <svg viewBox="0 0 100 100" className="w-6 h-6">
            <path d="M62 6L18 54H44L37 94 82 42H56Z" fill="#3ECF8E" />
          </svg>
        </div>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm mb-8"
          style={{
            background: "linear-gradient(135deg, #f5f0ff 0%, #eff6ff 100%)",
            border: "1px solid #c4b5fd",
            color: "#6d28d9",
          }}
        >
          <span style={{ color: "#8b5cf6" }}>✦</span>
          Trusted by businesses in finance, healthcare, logistics, retail, and beyond.
        </div>

        {/* Heading */}
        <h1
          className="text-[64px] font-black text-gray-950 tracking-tight leading-[1.08] mb-6 mx-auto"
          style={{ maxWidth: "640px" }}
        >
          Automate,
          <br />
          Accelerate &amp;{" "}
          <span
            style={{
              color: "#2563eb",
              background: "rgba(147, 197, 253, 0.35)",
              borderRadius: "6px",
              padding: "0 6px 2px",
            }}
          >
            Scale
          </span>
        </h1>

        {/* Body */}
        <p
          className="text-gray-500 text-base leading-relaxed mx-auto mb-8"
          style={{ maxWidth: "420px" }}
        >
          Unlock the future of work with AI Agents, Workflow Automation, and Smart Data
          Architecture. From startups to enterprises, we help businesses cut costs, save time,
          and grow faster without the tech headaches.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            className="px-7 py-3 text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#2563eb" }}
          >
            Get Started
          </button>
          <button className="px-7 py-3 bg-white text-gray-700 text-sm font-semibold rounded-full border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
            See How It Works
          </button>
        </div>

        {/* ── Globe ── */}
        <div className="relative w-full" style={{ height: "360px" }}>
          <svg
            viewBox="0 0 1000 440"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{ width: "min(1100px, 110vw)", height: "auto" }}
            fill="none"
          >
            {/* Globe base circle */}
            <circle cx="500" cy="560" r="340" fill="#e2e2e2" />

            {/* Continent silhouettes */}
            {/* North America */}
            <path d="M250 295 Q285 268 340 278 Q392 272 408 316 Q420 354 382 385 Q342 406 298 386 Q250 358 248 318 Z" fill="#cecece" />
            {/* South America */}
            <path d="M312 420 Q346 402 368 426 Q386 458 368 506 Q346 540 318 530 Q288 510 290 472 Z" fill="#cecece" />
            {/* Europe */}
            <path d="M454 272 Q484 258 510 268 Q530 283 518 308 Q502 328 474 320 Q448 304 444 283 Z" fill="#cecece" />
            {/* Africa */}
            <path d="M460 342 Q494 326 520 346 Q542 372 530 426 Q510 465 482 458 Q450 440 442 400 Q432 362 452 345 Z" fill="#cecece" />
            {/* Asia */}
            <path d="M538 262 Q600 246 658 262 Q706 282 692 324 Q670 360 612 364 Q548 360 524 330 Q510 304 528 272 Z" fill="#cecece" />
            {/* Australia */}
            <path d="M644 396 Q678 384 704 400 Q724 422 712 448 Q690 468 664 460 Q642 442 640 418 Z" fill="#cecece" />

            {/* ── Orbital ring 1 — gentle left tilt ── */}
            <g transform="rotate(-13, 500, 500)">
              <ellipse cx="500" cy="500" rx="445" ry="82" stroke="#151515" strokeWidth="1.4" />
              {/* Dots: left end, upper-right, right end, lower-left */}
              <circle cx="55"  cy="500" r="6.5" fill="#151515" />
              <circle cx="945" cy="500" r="6.5" fill="#151515" />
              <circle cx="295" cy="424" r="5"   fill="#151515" />
              <circle cx="762" cy="572" r="5"   fill="#151515" />
            </g>

            {/* ── Orbital ring 2 — moderate right tilt ── */}
            <g transform="rotate(20, 500, 500)">
              <ellipse cx="500" cy="500" rx="405" ry="74" stroke="#151515" strokeWidth="1.4" />
              <circle cx="95"  cy="500" r="5.5" fill="#151515" />
              <circle cx="905" cy="500" r="6.5" fill="#151515" />
              <circle cx="500" cy="426" r="5"   fill="#151515" />
            </g>

            {/* ── Orbital ring 3 — steep left tilt ── */}
            <g transform="rotate(-42, 500, 500)">
              <ellipse cx="500" cy="500" rx="375" ry="68" stroke="#151515" strokeWidth="1.4" />
              <circle cx="125" cy="500" r="5.5" fill="#151515" />
              <circle cx="875" cy="500" r="6.5" fill="#151515" />
              <circle cx="680" cy="434" r="5"   fill="#151515" />
            </g>
          </svg>
        </div>
      </section>
    </div>
  )
}
