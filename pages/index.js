import React, { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);

  // Biblioteca de Categorias Completa
  const categorias = [
    { nome: '⚽ Futebol', prompt: 'Professional soccer player in action, epic stadium lighting, rain droplets, 8k hyper-realistic, motion blur' },
    { nome: '🏀 Basquete', prompt: 'Street basketball player dunking, sunset court background, urban cinematic style, highly detailed' },
    { nome: '🥊 Luta/UFC', prompt: 'MMA fighter training in dark gym, sweat texture, dramatic rim lighting, intense atmosphere, 4k' },
    { nome: '🏠 Arquitetura', prompt: 'Modern luxury villa, glass walls, infinity pool, sunset, architectural photography' },
    { nome: '👗 Moda', prompt: 'High-end fashion editorial, luxury outfit, vogue style, cinematic lighting' },
    { nome: '💉 Tatuagem', prompt: 'Blackwork tattoo design, geometric patterns, clean white background, professional stencil' },
    { nome: '💎 Logo Luxo', prompt: 'Minimalist golden logo design, premium brand identity, black background' }
  ];

  const gerar = async (tipo) => {
    if (!prompt) return alert("Escolha uma categoria ou digite sua ideia!");
    setCarregando(true);
    setResultado(null);

    let promptFinal = prompt;
    // Inteligência por trás dos botões
    if (tipo === 'Logo') promptFinal = `Professional minimalist logo, ${prompt}, white background, vector style`;
    if (tipo === 'Vídeo') promptFinal = `Cinematic slow motion, dynamic camera move, ${prompt}, 8k resolution`;

    const seed = Math.floor(Math.random() * 999999);
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptFinal)}?width=512&height=512&seed=${seed}&nologo=true`;

    const img = new Image();
    img.src = url;
    img.onload = () => {
      setResultado(url);
      setCarregando(false);
    };

    setTimeout(() => {
      if (!img.complete) {
        setResultado(url);
        setCarregando(false);
      }
    }, 9000);
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto' }}>
      
      <header style={{ textAlign: 'center', marginTop: '10px', marginBottom: '25px' }}>
        <h1 style={{ color: '#D4AF37', fontSize: '26px', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>VEO PACK PRO</h1>
        <p style={{ color: '#666', fontSize: '9px', letterSpacing: '3px' }}>ELITE AI GENERATOR</p>
      </header>

      <main style={{ width: '100%', maxWidth: '400px' }}>
        
        {/* Input de Texto */}
        <div style={{ backgroundColor: '#0a0a0a', borderRadius: '20px', padding: '15px', border: '1px solid #1a1a1a' }}>
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Descreva a cena ou escolha um esporte abaixo..."
            style={{ width: '100%', backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: '15px', outline: 'none', resize: 'none' }}
            rows="3"
          />
        </div>

        {/* Categorias com Esportes (Scroll Lateral) */}
        <div style={{ display: 'flex', overflowX: 'auto', gap: '8px', margin: '20px 0', paddingBottom: '10px' }}>
          {categorias.map((cat, i) => (
            <button key={i} onClick={() => setPrompt(cat.prompt)} style={{ background: '#111', border: '1px solid #222', color: '#fff', padding: '10px 20px', borderRadius: '50px', fontSize: '12px', whiteSpace: 'nowrap' }}>
              {cat.nome}
            </button>
          ))}
        </div>

        {/* Botões de Ação */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          <button onClick={() => gerar('Imagem')} style={{ background: '#111', border: '1px solid #333', color: '#fff', padding: '15px', borderRadius: '15px', fontSize: '10px', fontWeight: 'bold' }}>IMAGEM</button>
          <button onClick={() => gerar('Logo')} style={{ background: '#111', border: '1px solid #333', color: '#fff', padding: '15px', borderRadius: '15px', fontSize: '10px', fontWeight: 'bold' }}>LOGO</button>
          <button onClick={() => gerar('Vídeo')} style={{ background: '#111', border: '1px solid #333', color: '#fff', padding: '15px', borderRadius: '15px', fontSize: '10px', fontWeight: 'bold' }}>VÍDEO</button>
        </div>

        {carregando && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ width: '30px', height: '30px', border: '3px solid #D4AF37', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto' }}></div>
            <p style={{ color: '#D4AF37', marginTop: '15px', fontSize: '12px' }}>CRIANDO ARTE ÉPICA...</p>
          </div>
        )}

        {resultado && (
          <div style={{ marginTop: '10px', textAlign: 'center', paddingBottom: '50px' }}>
            <img src={resultado} style={{ width: '100%', borderRadius: '25px', border: '1px solid #D4AF37', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} />
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setPrompt('')} style={{ flex: 1, background: '#111', color: '#fff', padding: '12px', borderRadius: '15px', border: '1px solid #222' }}>Limpar</button>
              <a href={resultado} download target="_blank" style={{ flex: 2, background: '#D4AF37', color: '#000', padding: '12px', borderRadius: '15px', textDecoration: 'none', fontWeight: 'bold', textAlign: 'center' }}>BAIXAR AGORA</a>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
