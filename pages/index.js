import React, { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const gerarArte = async () => {
    if (!prompt) return alert("Descreva sua ideia!");
    setCarregando(true);
    setResultado(null);

    // USANDO O MOTOR "FLUX SPEED" - O MAIS RÁPIDO DO MUNDO ATUALMENTE
    const url = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=768&height=768&seed=${Math.random()}&model=flux-pro&nologo=true`;

    const img = new Image();
    img.src = url;
    img.onload = () => {
      setResultado(url);
      setCarregando(false);
    };
    
    // Fallback caso o servidor principal demore (Segurança)
    setTimeout(() => {
      if(carregando) {
         setResultado(url);
         setCarregando(false);
      }
    }, 8000);
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <h1 style={{ color: '#D4AF37', fontSize: '30px', fontWeight: '900', marginTop: '30px', fontStyle: 'italic' }}>VEO PACK PRO</h1>
      <p style={{ color: '#444', fontSize: '10px', letterSpacing: '3px', marginBottom: '30px' }}>ESTÚDIO DE ALTA VELOCIDADE</p>

      <div style={{ width: '100%', maxWidth: '400px', background: '#111', borderRadius: '25px', padding: '5px', border: '1px solid #222' }}>
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="O que vamos criar agora?"
          style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', padding: '15px', outline: 'none', fontSize: '16px', resize: 'none' }}
          rows="3"
        />
      </div>

      <button 
        onClick={gerarArte}
        disabled={carregando}
        style={{ width: '100%', maxWidth: '400px', background: carregando ? '#222' : 'linear-gradient(45deg, #D4AF37, #F9E272)', color: '#000', padding: '20px', borderRadius: '20px', fontWeight: 'bold', fontSize: '16px', border: 'none', marginTop: '20px', boxShadow: '0 10px 20px rgba(212, 175, 55, 0.2)' }}
      >
        {carregando ? 'GERANDO EM ALTA VELOCIDADE...' : 'CRIAR ARTE AGORA'}
      </button>

      {carregando && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid #D4AF37', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.5s linear infinite', margin: '0 auto' }}></div>
        </div>
      )}

      {resultado && (
        <div style={{ marginTop: '30px', animation: 'fadeIn 0.4s ease' }}>
          <img src={resultado} style={{ width: '100%', maxWidth: '400px', borderRadius: '20px', border: '1px solid #333' }} />
          <p style={{ textAlign: 'center', color: '#D4AF37', marginTop: '15px', fontSize: '12px' }}>✓ Gerado instantaneamente</p>
        </div>
      )}

      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
  
