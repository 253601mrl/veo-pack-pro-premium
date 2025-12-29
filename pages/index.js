import React, { useState, useEffect } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [resultado, setResultado] = useState(null);
  const [antes, setAntes] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [historico, setHistorico] = useState([]);
  const [sliderPos, setSliderPos] = useState(50);
  const [copiado, setCopiado] = useState(false);

  // 1. BIBLIOTECA COMPLETA POR CATEGORIAS (TRADUZIDA)
  const biblioteca = [
    {
      titulo: "📸 IMAGENS ULTRA-REAIS",
      items: [
        { n: "Retrato Épico", p: "Cinematic portrait, dramatic lighting, 8k, highly detailed, realistic skin texture" },
        { n: "Carro de Luxo", p: "Modern luxury sports car, neon lights, night city, 8k resolution" }
      ]
    },
    {
      titulo: "🎨 LOGOTIPOS (DESIGN)",
      items: [
        { n: "Minimalista", p: "Minimalist vector logo, white background, flat design, modern, clean lines" },
        { n: "Escudo Gaming", p: "Esports mascot logo, shield, vibrant colors, aggressive style, vector" }
      ]
    },
    {
      titulo: "⚽ FUTEBOL (PRO)",
      items: [
        { n: "Estádio Lotado", p: "Full soccer stadium at night, bright floodlights, green grass, cinematic, 8k" },
        { n: "Chute de Bicicleta", p: "Soccer player bicycle kick, epic action shot, rain, stadium lights, realistic" }
      ]
    },
    {
      titulo: "🎬 VÍDEOS (MOVIMENTO)",
      items: [
        { n: "Drone Montanhas", p: "Aerial drone view, snowy mountains, smooth camera movement, cinematic 4k" },
        { n: "Explosão Líquida", p: "Slow motion liquid explosion, colorful, macro view, high speed photography" }
      ]
    }
  ];

  // 2. TENDÊNCIAS EM PORTUGUÊS
  const tendencias = [
    { nome: "Disney 3D", p: "Disney Pixar 3d style character, cute, expressive, 8k render", cor: "#ff4757" },
    { nome: "Estilo GTA", p: "GTA V loading screen art, cel shaded, saturated colors", cor: "#2ed573" },
    { nome: "Cyberpunk", p: "Futuristic city, neon lights, rainy night, synthwave", cor: "#3742fa" },
    { nome: "Vintage", p: "90s vintage film photography, grainy aesthetic, retro", cor: "#ffa502" }
  ];

  useEffect(() => {
    const salvo = localStorage.getItem('veo_pack_history');
    if (salvo) setHistorico(JSON.parse(salvo));
  }, []);

  const copiarEPregar = (texto) => {
    navigator.clipboard.writeText(texto);
    setPrompt(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const melhorarPromptIA = () => {
    if (!prompt) return alert("Digite algo simples!");
    const extras = ["8k resolution", "masterpiece", "cinematic lighting", "ultra detailed"];
    setPrompt(`${prompt}, ${extras.join(', ')}`);
  };

  const gerar = async (pBase, isUpscale = false) => {
    const finalPrompt = pBase || prompt;
    if (!finalPrompt) return alert("Escreva algo ou escolha uma opção!");
    
    setCarregando(true);
    const seed = Math.floor(Math.random() * 999999);
    const refinado = isUpscale ? `${finalPrompt}, 16k, sharp focus, extreme quality` : finalPrompt;
    
    const url = `https://pollinations.ai/p/${encodeURIComponent(refinado)}?width=768&height=768&seed=${seed}&model=flux&nologo=true`;

    const img = new Image();
    img.src = url;
    img.onload = () => {
      if (isUpscale) { setAntes(resultado); setResultado(url); } 
      else { setResultado(url); setAntes(null); }
      setCarregando(false);
      const novoHist = [url, ...historico].slice(0, 10);
      setHistorico(novoHist);
      localStorage.setItem('veo_pack_history', JSON.stringify(novoHist));
    };
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', padding: '15px' }}>
      
      {/* HEADER FIXO */}
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#D4AF37', fontSize: '24px', fontWeight: '900', fontStyle: 'italic' }}>VEO PACK PRO</h1>
        {copiado && <div style={{ position: 'fixed', top: '15px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#D4AF37', color: '#000', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', zIndex: 1000, fontWeight: 'bold' }}>COPIADO!</div>}
      </header>

      <main style={{ maxWidth: '450px', margin: '0 auto' }}>
        
        {/* TENDÊNCIAS */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '11px', color: '#D4AF37', fontWeight: 'bold', marginBottom: '10px' }}>🔥 TENDÊNCIAS</p>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '10px', paddingBottom: '10px', scrollbarWidth: 'none' }}>
            {tendencias.map((t, i) => (
              <div key={i} onClick={() => { setPrompt(t.p); gerar(t.p); }} style={{ minWidth: '100px', backgroundColor: '#111', borderRadius: '12px', border: `1px solid ${t.cor}`, padding: '10px', textAlign: 'center', cursor: 'pointer', fontSize: '11px' }}>{t.nome}</div>
            ))}
          </div>
        </div>

        {/* ÁREA DE GERAÇÃO FIXA */}
        <div style={{ position: 'sticky', top: '0', backgroundColor: '#000', paddingBottom: '15px', zIndex: 100 }}>
          <div style={{ backgroundColor: '#111', borderRadius: '15px', border: '1px solid #222', padding: '12px', marginBottom: '10px' }}>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="O que vamos criar hoje?" style={{ width: '100%', backgroundColor: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '14px' }} rows="2" />
            <div style={{ textAlign: 'right' }}>
              <button onClick={melhorarPromptIA} style={{ background: 'none', border: 'none', color: '#D4AF37', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>🪄 IA MAGIC (MELHORAR)</button>
            </div>
          </div>
          <button onClick={() => gerar()} disabled={carregando} style={{ width: '100%', backgroundColor: '#D4AF37', color: '#000', padding: '15px', borderRadius: '12px', fontWeight: 'bold', border: 'none', fontSize: '15px' }}>
            {carregando ? 'A GERAR...' : 'CRIAR AGORA'}
          </button>
        </div>

        {/* EXIBIÇÃO + COMPARADOR */}
        {resultado && (
          <div style={{ marginTop: '15px' }}>
            <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', border: '2px solid #D4AF37', height: '350px' }}>
              <img src={resultado} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }} />
              {antes && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: `${sliderPos}%`, height: '100%', overflow: 'hidden', borderRight: '2px solid #fff', zIndex: 2 }}>
                  <img src={antes} style={{ width: '450px', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              {antes && <input type="range" min="0" max="100" value={sliderPos} onChange={(e) => setSliderPos(e.target.value)} style={{ position: 'absolute', bottom: '15px', left: '10%', width: '80%', zIndex: 10, accentColor: '#D4AF37' }} />}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
              <button onClick={() => gerar(null, true)} style={{ background: '#111', color: '#D4AF37', border: '1px solid #D4AF37', padding: '10px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold' }}>💎 UPSCALE 16K</button>
              <a href={resultado} download style={{ background: '#D4AF37', color: '#000', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', textDecoration: 'none' }}>💾 GUARDAR</a>
            </div>
          </div>
        )}

        {/* HISTÓRICO */}
        {historico.length > 0 && (
          <div style={{ margin: '25px 0' }}>
            <p style={{ fontSize: '11px', color: '#444', fontWeight: 'bold', marginBottom: '10px' }}>MINHAS CRIAÇÕES</p>
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
              {historico.map((img, i) => (
                <img key={i} src={img} onClick={() => setResultado(img)} style={{ height: '60px', borderRadius: '10px', border: '1px solid #222' }} />
              ))}
            </div>
          </div>
        )}

        {/* BIBLIOTECA POR CATEGORIAS COM BOTÃO COPIAR */}
        <div style={{ marginTop: '30px', paddingBottom: '40px' }}>
          {biblioteca.map((cat, i) => (
            <div key={i} style={{ marginBottom: '25px' }}>
              <h2 style={{ color: '#D4AF37', fontSize: '13px', marginBottom: '12px', borderLeft: '3px solid #D4AF37', paddingLeft: '10px' }}>{cat.titulo}</h2>
              {cat.items.map((item, idx) => (
                <div key={idx} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ overflow: 'hidden' }}>
                    <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold' }}>{item.n}</p>
                    <p style={{ margin: 0, fontSize: '10px', color: '#555', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.p}</p>
                  </div>
                  <button onClick={() => copiarEPregar(item.p)} style={{ background: '#111', color: '#D4AF37', border: '1px solid #D4AF37', padding: '6px 10px', borderRadius: '8px', fontSize: '10px', fontWeight: 'bold' }}>COPIAR</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>

      <style jsx>{`
        div::-webkit-scrollbar { display: none; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}
