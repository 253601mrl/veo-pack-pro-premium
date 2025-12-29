import React, { useState, useEffect } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [progresso, setProgresso] = useState(0);

  // Efeito para animar a barra de progresso
  useEffect(() => {
    let intervalo;
    if (carregando) {
      setProgresso(0);
      intervalo = setInterval(() => {
        setProgresso((prev) => (prev < 95 ? prev + 5 : prev));
      }, 200);
    } else {
      setProgresso(0);
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [carregando]);

  const gerar = (tipo) => {
    if (!prompt) return alert("Descreva sua ideia!");
    setCarregando(true);
    setResultado(null);
    
    const seed = Math.floor(Math.random() * 1000000);
    const url = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${seed}&model=flux`;
    
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setProgresso(100);
      setTimeout(() => {
        setResultado({url, tipo});
        setCarregando(false);
      }, 500);
    };
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <header style={{ textAlign: 'center', marginTop: '30px' }}>
        <h1 style={{ color: '#D4AF37', fontSize: '32px', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>VEO PACK PRO</h1>
        <p style={{ color: '#555', fontSize: '10px', letterSpacing: '2px' }}>ULTRA FAST AI</p>
      </header>

      <main style={{ width: '100%', maxWidth: '400px', marginTop: '30px' }}>
        <div style={{ backgroundColor: '#111', borderRadius: '20px', padding: '15px', border: '1px solid #222' }}>
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="O que você quer criar hoje?"
            style={{ width: '100%', backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: '16px', outline: 'none', resize: 'none' }}
            rows="3"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', margin: '20px 0' }}>
          <button onClick={() => gerar('Imagem')} style={{ background: '#111', border: '1px solid #333', color: '#fff', padding: '15px', borderRadius: '15px', fontSize: '10px', fontWeight: 'bold' }}>IMAGEM</button>
          <button onClick={() => gerar('Logo')} style={{ background: '#111', border: '1px solid #333', color: '#fff', padding: '15px', borderRadius: '15px', fontSize: '10px', fontWeight: 'bold' }}>LOGO</button>
          <button onClick={() => gerar('Vídeo')} style={{ background: '#111', border: '1px solid #333', color: '#fff', padding: '15px', borderRadius: '15px', fontSize: '10px', fontWeight: 'bold' }}>VÍDEO</button>
        </div>

        {/* BARRA DE PROGRESSO LUXO */}
        {carregando && (
          <div style={{ width: '100%', marginTop: '10px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ color: '#D4AF37', fontSize: '12px' }}>Processando...</span>
              <span style={{ color: '#D4AF37', fontSize: '12px' }}>{progresso}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', backgroundColor: '#111', borderRadius: '10px', overflow: 'hidden', border: '1px solid #222' }}>
              <div style={{ width: `${progresso}%`, height: '100%', backgroundColor: '#D4AF37', transition: 'width 0.3s ease-out', boxShadow: '0 0 10px #D4AF37' }}></div>
            </div>
          </div>
        )}

        <button 
          onClick={() => gerar('Imagem')}
          disabled={carregando}
          style={{ width: '100%', backgroundColor: carregando ? '#333' : '#D4AF37', color: '#000', padding: '18px', borderRadius: '20px', fontWeight: '900', fontSize: '16px', border: 'none', transition: '0.3s' }}
        >
          {carregando ? 'GERANDO...' : 'CRIAR AGORA'}
        </button>

        {resultado && (
          <div style={{ marginTop: '30px', textAlign: 'center', animation: 'fadeIn 0.8s' }}>
            <img src={resultado.url} style={{ width: '100%', borderRadius: '25px', border: '1px solid #D4AF37', boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)' }} />
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
               <a href={resultado.url} download style={{ color: '#000', background: '#D4AF37', textDecoration: 'none', fontSize: '12px', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold' }}>Baixar</a>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
