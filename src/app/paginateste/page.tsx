import Link from "next/link"

export default function PaginaTeste() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Nav ── */}
      <nav className="anim fade-in d0 flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div
            className="size-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#C4F233" }}
          >
            <span className="text-sm font-bold" style={{ color: "#1A3B1A" }}>P</span>
          </div>
          <span className="font-semibold text-gray-900">Pluma</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Funcionalidades", "Segurança", "Sobre nós"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Entrar
          </Link>
          <Link
            href="#"
            className="px-5 py-2 rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: "#1A3B1A" }}
          >
            Abra sua conta
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-8 pt-12 pb-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left — Copy */}
        <div className="space-y-7">

          {/* Badge */}
          <div
            className="anim fade-up d100 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{ backgroundColor: "#EDFAAA" }}
          >
            <span
              className="text-[11px] font-bold px-1.5 py-0.5 rounded"
              style={{ backgroundColor: "#C4F233", color: "#1A3B1A" }}
            >
              NOVO
            </span>
            <span className="text-sm font-medium" style={{ color: "#1A3B1A" }}>
              Assistente Financeiro IA
            </span>
          </div>

          {/* Heading */}
          <h1
            className="anim fade-up d200 text-5xl font-bold leading-[1.15] tracking-tight"
            style={{ color: "#111C11" }}
          >
            O primeiro agente<br />
            de IA que realmente<br />
            entende seu{" "}
            <em
              style={{
                fontStyle: "italic",
                fontFamily: "Georgia, 'Times New Roman', serif",
                color: "#D4660A",
                fontWeight: 700,
              }}
            >
              dinheiro
            </em>
          </h1>

          {/* Body */}
          <p className="anim fade-up d300 text-gray-500 text-base leading-relaxed max-w-[420px]">
            O Pluma é o único app que combina Open Finance com IA
            conversacional para dar respostas instantâneas sobre suas
            finanças — sem você precisar interpretar gráficos complicados
            ou fazer cálculos manuais.
          </p>

          {/* CTA */}
          <button
            className="anim fade-up d400 px-8 py-4 rounded-full text-base font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#C4F233", color: "#1A3B1A" }}
          >
            Teste grátis por 14 dias
          </button>

          {/* Trust badges */}
          <div className="anim fade-up d500 flex items-center gap-7 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <svg className="size-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Setup em 2 min
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="size-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Criptografia Militar
            </div>
          </div>
        </div>

        {/* Right — Phone mockup + floating cards */}
        <div className="relative flex justify-center items-center h-[520px]">

          {/* ── Phone ── */}
          <div
            className="anim fade-right d300 relative w-[220px] h-[430px] rounded-[2.5rem] shadow-2xl overflow-hidden z-10"
            style={{ backgroundColor: "#173317" }}
          >
            {/* Status bar */}
            <div className="flex justify-between items-center px-6 pt-5 pb-2">
              <span className="text-[10px] text-white/50">9:41</span>
              <div className="w-16 h-5 rounded-full bg-black mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
              <span className="text-[10px] text-white/50">●●●</span>
            </div>

            {/* Header */}
            <div className="px-5 pt-4">
              <p className="text-white/50 text-xs text-center mb-0.5">Financial</p>
              <p className="text-white text-center text-sm font-semibold">Financial</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 px-4 mt-3">
              {["🔔", "📊", "👤"].map((icon, i) => (
                <div
                  key={i}
                  className="flex-1 h-7 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: i === 1 ? "#C4F233" : "rgba(255,255,255,0.08)" }}
                >
                  <span className="text-sm">{icon}</span>
                </div>
              ))}
            </div>

            {/* Balance */}
            <div className="px-5 mt-5">
              <p className="text-white/50 text-[10px]">Saldo disponível</p>
              <p className="text-white text-xl font-bold mt-0.5">R$ 12,00</p>
            </div>

            {/* Mini chart */}
            <div className="px-5 mt-4 flex items-end gap-1 h-14">
              {[45, 65, 40, 80, 55, 90, 70, 100, 75, 85].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: `${h}%`,
                    backgroundColor: i === 9 ? "#C4F233" : "rgba(196,242,51,0.35)",
                  }}
                />
              ))}
            </div>

            {/* Card section */}
            <div className="px-4 mt-4">
              <div
                className="rounded-2xl p-3"
                style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
              >
                <p className="text-white/40 text-[10px]">Meu cartão</p>
                <p className="text-white text-xs font-mono mt-1">•••• •••• 4321</p>
              </div>
            </div>
          </div>

          {/* ── Floating card: Economia ── */}
          <div className="anim fade-in d500 absolute top-6 -left-2 bg-white rounded-2xl shadow-xl p-3 w-[200px] z-20">
            <div className="flex items-center gap-2.5">
              <div
                className="size-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#EDFAAA" }}
              >
                <span className="text-base">💸</span>
              </div>
              <div>
                <p className="text-[11px] text-gray-400 leading-none mb-0.5">Economia detectada</p>
                <p className="text-[12px] font-semibold text-gray-800 leading-tight">
                  Você economizou R$ 2.800!
                </p>
              </div>
            </div>
          </div>

          {/* ── Floating credit card ── */}
          <div
            className="anim fade-in d600 absolute top-[170px] -left-10 rounded-2xl p-4 w-[175px] shadow-2xl z-20"
            style={{ backgroundColor: "#1A3B1A" }}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-0.5">
                <div className="w-7 h-5 rounded-sm bg-yellow-400/80" />
              </div>
              <span className="text-white/30 text-[10px]">VISA</span>
            </div>
            <p className="text-white text-[11px] font-mono tracking-widest">1084 C234 CAR8</p>
            <p className="text-[10px] font-mono mt-1" style={{ color: "#C4F233" }}>#C4F233</p>
          </div>

          {/* ── Floating card: Meta Viagem ── */}
          <div className="anim fade-in d700 absolute bottom-14 -right-4 bg-white rounded-2xl shadow-xl p-3 w-[195px] z-20">
            <div className="flex items-center gap-2.5">
              <div
                className="size-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#EDFAAA" }}
              >
                <span className="text-base">✈️</span>
              </div>
              <div>
                <p className="text-[11px] text-gray-400 leading-none mb-0.5">Meta: Viagem</p>
                <p className="text-[12px] font-semibold text-gray-800 leading-tight">
                  Faltam R$ 800 para a sua meta!
                </p>
              </div>
            </div>
          </div>

          {/* ── Decorative: coin ── */}
          <div className="anim fade-in d800 absolute top-0 right-6 text-4xl z-10 drop-shadow-lg">🪙</div>

          {/* ── Decorative: money bag ── */}
          <div className="anim fade-in d800 absolute bottom-4 right-10 text-4xl z-10 drop-shadow-lg">💵</div>

        </div>
      </section>
    </div>
  )
}
