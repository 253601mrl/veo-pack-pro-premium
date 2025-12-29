
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [resultado, setResultado] = useState(null);
  const [antes, setAntes] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [historico, setHistorico] = useState([]);
  const [sliderPos, setSliderPos] = useState(50);
  const [copiado, setCopiado] = useState(false);

  // CATEGORIAS COMPLETAS
  const biblioteca = [
    {
      titulo: "📸 IMAGENS",
      items: [
        { n: "Retrato Épico", p: "Cinematic portrait, dramatic lighting, 8k, photorealistic" },
        { n: "Cyberpunk", p: "Future city, neon lights, rainy street, cinematic" }
      ]
    },
    {
      titulo: "🎨 LOGOTIPOS",
      items: [
        { n: "Minimalista", p: "Minimalist vector logo, white background, flat design" },
        { n: "Gaming", p: "Esports mascot logo, shield, vibrant colors" }
      ]
    },
    {
      titulo: "⚽ FUTEBOL",
      items: [
        { n: "Estádio", p: "Soccer stadium at night, bright floodlights, 8k" },
        { n: "Gol Épico", p: "Soccer player bicycle kick, epic action shot" }
      ]
    },
    {
      titulo: "🎬 VÍDEOS",
      items: [
        { n: "Drone", p: "Aerial drone view, mountains, smooth movement" },
        { n: "Explosão", p: "Slow motion liquid explosion, macro 4k" }
      ]
    }
  ];

  const tendencias = [
    { nome: "Disney 3D", p: "Disney Pixar character, 8k render", cor: "#ff4757" },
    { nome: "GTA V", p: "GTA V loading screen art, cel shaded", cor: "#2ed573" },
    { nome: "Vintage", p: "90s vintage film photography", cor: "#ffa502" }
  ];

  useEffect(() => {
    const salvo = localStorage.getItem('veo_history');
    if (salvo) setHistorico(JSON.parse(salvo));
  }, []);

  const copiarEPregar = (texto) => {
    setPrompt(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const gerar = async (pBase, isUpscale = false) => {
    const finalPrompt = pBase || prompt;
    if (!finalPrompt) return alert("Escreva algo primeiro!");
    
    setCarregando(true);
    const seed = Math.floor(Math.random() * 999999);
    
    // NOVO SERVIDOR RÁPIDO (FORÇANDO MODELO FLUX)
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=768&height=768&seed=${seed}&model=flux&nologo=true`;

    // Tentativa de carregar a imagem
    const img = new Image();
    img.src = url;
    
    img.onload = () => {
      if (isUpscale) { setAntes(resultado); setResultado(url); } 
      else { setResultado(url); setAntes(null); }
      setCarregando(false);
      
      const novoHist = [url, ...historico].slice(0, 10);
      setHistorico(novoHist);
      localStorage.setItem('veo_history', JSON.stringify(novoHist));
    };

    img.onerror = () => {
      setCarregando(false);
      alert("Servidor ocupado. Clique em GERAR novamente.");
    };
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', padding: '15px' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#D4AF37', fontSize: '24px', fontWeight: '900' }}>VEO PACK PRO</h1>
        {copiado && <div style={{ position: 'fixed', top: '15px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#D4AF37', color: '#000', padding: '5px 15px', borderRadius: '20px', zIndex: 1000 }}>PRONTO!</div>}
      </header>

      <main style={{ maxWidth: '450px', margin: '0 auto' }}>
        
        {/* INPUT FIXO NO TOPO */}
        <div style={{ position: 'sticky', top: '0', backgroundColor: '#000', paddingBottom: '15px', zIndex: 100 }}>
          <div style={{ backgroundColor: '#111', borderRadius: '15px', border: '1px solid #222', padding: '12px', marginBottom: '10px' }}>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Digite sua ideia..." style={{ width: '100%', backgroundColor: 'transparent', border: 'none', color: '#fff', outline: 'none' }} rows="2" />
          </div>
          <button onClick={() => gerar()} disabled={carregando} style={{ width: '100%', backgroundColor: '#D4AF37', color: '#000', padding: '16px', borderRadius: '12px', fontWeight: 'bold', border: 'none' }}>
            {carregando ? 'GERANDO...' : 'CRIAR AGORA'}
          </button>
        </div>

        {/* ÁREA DE RESULTADO */}
        {resultado && (
          <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', border: '2px solid #D4AF37', height: '350px', marginBottom: '15px' }}>
            <img src={resultado} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }} />
            {antes && (
              <div style={{ position: 'absolute', top: 0, left: 0, width: `${sliderPos}%`, height: '100%', overflow: 'hidden', borderRight: '2px solid #fff', zIndex: 2 }}>
                <img src={antes} style={{ width: '450px', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            {antes && <input type="range" min="0" max="100" value={sliderPos} onChange={(e) => setSliderPos(e.target.value)} style={{ position: 'absolute', bottom: '15px', left: '10%', width: '80%', zIndex: 10 }} />}
          </div>
        )}

        {/* TENDÊNCIAS */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginBottom: '20px', paddingBottom: '5px' }}>
          {tendencias.map((t, i) => (
            <button key={i} onClick={() => { setPrompt(t.p); gerar(t.p); }} style={{ minWidth: '100px', background: '#111', border: `1px solid ${t.cor}`, color: '#fff', padding: '10px', borderRadius: '10px', fontSize: '11px' }}>{t.nome}</button>
          ))}
        </div>

        {/* LISTA DE CATEGORIAS */}
        {biblioteca.map((cat, i) => (
          <div key={i} style={{ marginBottom: '25px' }}>
            <h3 style={{ color: '#D4AF37', fontSize: '14px', marginBottom: '10px' }}>{cat.titulo}</h3>
            {cat.items.map((item, idx) => (
              <div key={idx} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px' }}>{item.n}</span>
                <button onClick={() => copiarEPregar(item.p)} style={{ background: 'none', border: '1px solid #D4AF37', color: '#D4AF37', padding: '4px 8px', borderRadius: '5px', fontSize: '10px' }}>COPIAR</button>
              </div>
            ))}
          </div>
        ))}
      </main>
    </div>
  );
}
