import React, { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const biblioteca = [
    { cat: "📸 IMAGENS", items: [
      { n: "Leão Realista", p: "Photo of a majestic lion, 8k, realistic" },
      { n: "Carro Luxo", p: "Luxury sports car, neon lights, studio" }
    ]},
    { cat: "🎨 LOGOS", items: [
      { n: "Logo Minimalista", p: "Minimalist vector logo, white background" },
      { n: "Logo Gaming", p: "Esports gaming mascot logo, vibrant" }
    ]},
    { cat: "⚽ FUTEBOL", items: [
      { n: "Estádio", p: "Soccer stadium, cinematic lighting, 8k" },
      { n: "Jogador", p: "Soccer player action shot, realistic" }
    ]}
  ];

  const gerar = () => {
    if (!prompt) return alert("Escolha um prompt abaixo!");
    setCarregando(true);
    setResultado(null);

    // USANDO SERVIDOR TURBO (AirForce/Flux)
    const url = `https://api.airforce/v1/image/generations?prompt=${encodeURIComponent(prompt)}&model=flux&size=1:1`;
    
    // Tentativa direta sem esperar buffer pesado
    setResultado(url);
    
    // Simula carregamento rápido
    setTimeout(() => {
      setCarregando(false);
    }, 2000);
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', padding: '15px' }}>
      
      <header style={{ textAlign: 'center', padding: '10px' }}>
        <h1 style={{ color: '#D4AF37', fontSize: '24px', fontWeight: 'bold' }}>VEO PACK PRO</h1>
      </header>

      <div style={{ maxWidth: '450px', margin: '0 auto' }}>
        
        {/* ZONA DE RESULTADO - Rápida */}
        {resultado && (
          <div style={{ marginBottom: '20px' }}>
            <img 
              src={resultado} 
              style={{ width: '100%', borderRadius: '15px', border: '1px solid #D4AF37' }} 
              alt="Resultado"
              onError={() => alert("Servidor ocupado, tente outro prompt")}
            />
          </div>
        )}

        {/* INPUT E BOTÃO FIXO */}
        <div style={{ backgroundColor: '#111', padding: '15px', borderRadius: '20px', border: '1px solid #333', marginBottom: '20px' }}>
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Clique num prompt abaixo..."
            style={{ width: '100%', backgroundColor: 'transparent', border: 'none', color: '#fff', outline: 'none' }}
          />
          <button 
            onClick={gerar}
            style={{ width: '100%', backgroundColor: '#D4AF37', color: '#000', padding: '12px', borderRadius: '10px', fontWeight: 'bold', marginTop: '10px', border: 'none' }}
          >
            {carregando ? 'GERANDO...' : 'GERAR AGORA'}
          </button>
        </div>

        {/* LISTAGEM DE CATEGORIAS */}
        <div style={{ height: '400px', overflowY: 'auto', paddingBottom: '50px' }}>
          {biblioteca.map((s, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <h2 style={{ color: '#D4AF37', fontSize: '14px', marginBottom: '10px' }}>{s.cat}</h2>
              {s.items.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setPrompt(item.p)}
                  style={{ backgroundColor: '#1a1a1a', padding: '12px', borderRadius: '10px', marginBottom: '8px', border: '1px solid #333' }}
                >
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold' }}>{item.n}</p>
                  <p style={{ margin: 0, fontSize: '11px', color: '#666' }}>{item.p}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
