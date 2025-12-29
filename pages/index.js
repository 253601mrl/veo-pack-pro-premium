import React, { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const gerarArte = () => {
    if (!prompt) return alert("Descreva sua ideia primeiro!");
    setCarregando(true);
    setResultado(null);
    
    // Motor de IA Gratuito e Rápido
    const url = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${Math.random()}`;
    
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setResultado(url);
      setCarregando(false);
    };
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Header Luxo */}
      <header style={{ textAlign: 'center', marginTop: '40px', marginBottom: '30px' }}>
        <h1 style={{ color: '#D4AF37', fontSize: '35px', fontWeight: '900', letterSpacing: '-1px', fontStyle: 'italic', margin: '0' }}>VEO PACK PRO</h1>
        <p style={{ color: '#555', fontSize: '10px', trackingWidest: '3px', textTransform: 'uppercase', marginTop: '5px' }}>Premium AI Generation</p>
      </header>

      <main style={{ width: '100%', maxWidth: '400px' }}>
        {/* Campo de Entrada */}
        <div style={{ backgroundColor: '#111', borderRadius: '25px', padding: '20px', border: '1px solid #222', marginBottom: '20px' }}>
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Descreva o que você imagina..."
            style={{ width: '100%', backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: '16px', outline: 'none', resize: 'none' }}
            rows="3"
          />
        </div>

        {/* Botões de Ação */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          <button onClick={gerarArte} style={{ background: '#111', border: '1px solid #333', color: '#fff', padding: '12px', borderRadius: '15px', fontSize: '12px' }}>Imagem</button>
          <button onClick={gerarArte} style={{ background: '#111', border: '1px solid #333', color: '#fff', padding: '12px', borderRadius: '15px', fontSize: '12px' }}>Logo</button>
          <button onClick={gerarArte} style={{ background: '#111', border: '1px solid #333', color: '#fff', padding: '12px', borderRadius: '15px', fontSize: '12px' }}>Vídeo</button>
        </div>

        <button 
          onClick={gerarArte}
          style={{ width: '100%', backgroundColor: '#D4AF37', color: '#000', padding: '18px', borderRadius: '20px', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: 'pointer', boxShadow: '0 10px 20px rgba(212, 175, 55, 0.2)' }}
        >
          {carregando ? 'PROCESSANDO...' : 'CRIAR AGORA'}
        </button>

        {/* Área de Resultado */}
        {carregando && (
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <div style={{ width: '30px', height: '30px', border: '3px solid #D4AF37', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
            <p style={{ color: '#D4AF37', marginTop: '15px', fontSize: '14px' }}>A IA está moldando sua ideia...</p>
          </div>
        )}

        {resultado && (
          <div style={{ marginTop: '40px', animation: 'fadeIn 0.5s' }}>
            <img src={resultado} style={{ width: '100%', borderRadius: '25px', border: '1px solid #D4AF37', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} />
            <a href={resultado} download="ia-arte.png" style={{ display: 'block', textAlign: 'center', marginTop: '20px', color: '#D4AF37', textDecoration: 'none', fontWeight: 'bold' }}>BAIXAR OBRA</a>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}
