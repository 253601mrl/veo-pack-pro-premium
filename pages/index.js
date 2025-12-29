import React, { useState, useEffect } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);

  // OPÇÃO 4: CATEGORIAS DE TENDÊNCIAS (TRENDING)
  const tendencias = [
    { nome: "Disney Pixar", p: "3D animation style, Disney Pixar movie character, cute, expressive, 8k render", cor: "#ff4757" },
    { nome: "GTA V Style", p: "Grand Theft Auto V loading screen art, cel shaded, saturated colors, digital illustration", cor: "#2ed573" },
    { nome: "Old Money", p: "Quiet luxury aesthetic, vintage film photography, elegant lifestyle, grainy texture, 90s style", cor: "#ffa502" },
    { nome: "Hyper-Glow", p: "Neon bioluminescence, glowing flowers and animals, dark forest, mystical, vibrant contrast", cor: "#3742fa" },
    { nome: "Baroque Art", p: "Classical oil painting, Caravaggio style, dramatic shadows, gold frames, historic masterpiece", cor: "#747d8c" }
  ];

  const gerar = async (pBase) => {
    const finalPrompt = pBase || prompt;
    if (!finalPrompt) return alert("Escreve algo ou seleciona uma tendência!");
    
    setCarregando(true);
    setResultado(null);

    const seed = Math.floor(Math.random() * 999999);
    const url = `https://pollinations.ai/p/${encodeURIComponent(finalPrompt)}?width=768&height=768&seed=${seed}&model=flux&nologo=true`;

    const img = new Image();
    img.src = url;
    img.onload = () => {
      setResultado(url);
      setCarregando(false);
    };
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', padding: '15px' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#D4AF37', fontSize: '24px', fontWeight: '900', fontStyle: 'italic' }}>VEO PACK PRO</h1>
        <p style={{ color: '#444', fontSize: '10px', letterSpacing: '2px' }}>V3.5 • PREMIUM EDITION</p>
      </header>

      <main style={{ maxWidth: '450px', margin: '0 auto' }}>
        
        {/* SEÇÃO TRENDING (OPÇÃO 4) */}
        <div style={{ marginBottom: '25px' }}>
          <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#D4AF37', marginBottom: '10px', letterSpacing: '1px' }}>🔥 TENDÊNCIAS DO MOMENTO</p>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '12px', paddingBottom: '10px', scrollbarWidth: 'none' }}>
            {tendencias.map((t, i) => (
              <div 
                key={i} 
                onClick={() => { setPrompt(t.p); gerar(t.p); }}
                style={{ minWidth: '120px', height: '150px', backgroundColor: '#111', borderRadius: '15px', border: `1px solid ${t.cor}`, padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', top: '10px', left: '10px', width: '8px', height: '8px', backgroundColor: t.cor, borderRadius: '50%', boxShadow: `0 0 10px ${t.cor}` }}></div>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>{t.nome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* INPUT DE TEXTO PERSONALIZADO */}
        <div style={{ backgroundColor: '#111', borderRadius: '20px', padding: '15px', border: '1px solid #222', marginBottom: '15px' }}>
          <textarea 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)} 
            placeholder="Ou escreve a tua ideia aqui..." 
            style={{ width: '100%', backgroundColor: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '14px' }}
            rows="2"
          />
        </div>

        <button 
          onClick={() => gerar()} 
          style={{ width: '100%', backgroundColor: '#D4AF37', color: '#000', padding: '16px', borderRadius: '15px', fontWeight: 'bold', border: 'none', marginBottom: '20px' }}
        >
          {carregando ? 'A GERAR...' : 'GERAR AGORA'}
        </button>

        {/* ÁREA DE RESULTADO */}
        {resultado && (
          <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s' }}>
            <img src={resultado} style={{ width: '100%', borderRadius: '20px', border: '2px solid #D4AF37' }} />
            <a href={resultado} download style={{ display: 'block', color: '#D4AF37', marginTop: '15px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>✓ GUARDAR NA GALERIA</a>
          </div>
        )}

      </main>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
