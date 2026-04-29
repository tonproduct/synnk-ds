export default function Paleta() {
  const bg = "#050D1A"
  const gold = "#FFE600"

  const blues = [
    { hex: "#0047AB", nome: "Cobalto / Royal" },
    { hex: "#0055CC", nome: "Cobalt Médio" },
    { hex: "#0066FF", nome: "Elétrico (atual)" },
    { hex: "#3B82F6", nome: "Blue-500" },
    { hex: "#4F8EF7", nome: "Elétrico Suave" },
    { hex: "#60A5FA", nome: "Blue-400 (claro)" },
  ]

  return (
    <div style={{ backgroundColor: bg, minHeight: "100vh", padding: "60px 40px", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "white", fontSize: 28, fontWeight: 900, marginBottom: 8 }}>
        Paleta de cores
      </h1>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 48 }}>
        Fundo: {bg} · Dourado: {gold}
      </p>

      {/* Gold reference */}
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>
        Referência — dourado
      </p>
      <div style={{ display: "flex", gap: 16, marginBottom: 56 }}>
        <div>
          <div style={{ width: 120, height: 120, borderRadius: 16, backgroundColor: gold }} />
          <p style={{ color: "white", fontSize: 13, marginTop: 10, fontWeight: 700 }}>{gold}</p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 2 }}>Dourado</p>
        </div>
      </div>

      {/* Blues */}
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>
        Azuis candidatos
      </p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 56 }}>
        {blues.map(({ hex, nome }) => (
          <div key={hex}>
            <div style={{ width: 120, height: 120, borderRadius: 16, backgroundColor: hex }} />
            <p style={{ color: "white", fontSize: 13, marginTop: 10, fontWeight: 700 }}>{hex}</p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 2 }}>{nome}</p>
          </div>
        ))}
      </div>

      {/* Combinações lado a lado */}
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>
        Combinação azul + dourado
      </p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {blues.map(({ hex, nome }) => (
          <div key={hex} style={{ display: "flex", gap: 4 }}>
            <div style={{ width: 60, height: 120, borderRadius: "16px 0 0 16px", backgroundColor: hex }} />
            <div style={{ width: 60, height: 120, borderRadius: "0 16px 16px 0", backgroundColor: gold }} />
            <div style={{ paddingLeft: 8, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ color: "white", fontSize: 11, fontWeight: 700 }}>{nome}</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, marginTop: 2 }}>{hex}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
