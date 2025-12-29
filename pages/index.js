import React, { useState, useEffect } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [resultado, setResultado] = useState(null);
  const [antes, setAntes] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [historico, setHistorico] = useState([]);
  const [sliderPos, setSliderPos] = useState(50);
  const [feedback, setFeedback] = useState('');

  // Carregar histórico local
  useEffect(() => {
    const salvo = localStorage.getItem('veo_pro_history');
    if (salvo) setHistorico(JSON.parse(salvo));
  }, []);

  const aviso = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(''), 3000);
  };

  // Funções de Utilidade
  const copiarPrompt = (texto) => {
    setPrompt(texto);
    aviso('Prompt selecionado!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const melhorarIA = () => {
    if (!prompt) return aviso('Escreva algo primeiro!');
    const termos = "ultra-realista, iluminação cinematográfica, 8k, detalhes intrincados, obra-prima";
    setPrompt(`${prompt}, ${termos}`);
    aviso('IA Magic ativado!');
  };

  // MOTOR DE GERAÇÃO (SERVIDOR PRO ESTÁVEL)
  const gerar = async (pBase, upscale = false) => {
    const promptFinal = pBase || prompt;
    if (!promptFinal) return alert("Por favor, insira um prompt!");

    setCarregando(true);
    if (!upscale) setResultado(null);

    const seed = Math.floor(Math.random() * 1000000);
    // Usando motor Flux via rota dedicada de alta performance
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptFinal)}?width=${upscale ? 1024 : 768}&height=${upscale ? 1024 : 768}&seed=${seed}&model=flux&nologo=true&enhance=true`;

    const img = new Image();
    img.src = url;

    img.onload = () => {
      if (upscale) {
        setAntes(resultado);
        setResultado(url);
      } else {
        setResultado(url);
        setAntes(null);
      }
      setCarregando(false);
      
      const novoHist = [url, ...historico].slice(0, 12);
      setHistorico(novoHist);
      localStorage.setItem('veo_pro_history', JSON.stringify(novoHist));
    };

    img.onerror = () => {
      setCarregando(false);
      alert("Erro na conexão. Tente novamente.");
    };
  };

  const biblioteca = [
    { t: "📸 IMAGENS", i: [{ n: "Leão Realista", p: "Realistic lion portrait, gold lighting" }, { n: "Cidade 2077", p: "Cyberpunk city, neon, rain" }] },
    { t: "🎨 LOGOTIPOS", i: [{ n: "Logo Minimal", p: "Modern minimalist logo, vector" }, { n: "Logo Gaming", p: "Esports mascot logo, gaming style" }] },
    { t: "⚽ FUTEBOL", i: [{ n: "Estádio 8K", p: "Soccer stadium, cinematic view" }, { n: "Jogador", p: "Action soccer shot, 8k" }] },
    { t: "🎬 VÍDEOS", i: [{ n: "Drone", p: "Cinematic drone shot, mountains" }, { n: "Explosão", p: "Slow motion color explosion" }] }
  ];

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#D4AF37', fontSize: '28px', fontWeight: '900', fontStyle: 'italic' }}>VEO PACK PRO</h1>
        <p style={{ color: '#444', fontSize: '10px' }}>SISTEMA DE GERAÇÃO PROFISSIONAL</p>
      </header>

      {feedback && (
        <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#D4AF37', color: '#000', padding: '10px 20px', borderRadius: '30px', fontWeight: 'bold', zIndex: 2000 }}>
          {feedback}
        </div>
      )}

      <main style={{ maxWidth: '500px', margin: '0 auto' }}>
        
        {/* ENTRADA DE DADOS */}
        <div style={{ position: 'sticky', top: '0', backgroundColor: '#000', paddingBottom: '20px', zIndex: 500 }}>
          <div style={{ backgroundColor: '#111', borderRadius: '20px', border: '1px solid #222', padding: '15px', marginBottom: '10px' }}>
            <textarea 
              value={prompt} 
              onChange={(e) => setPrompt(e.target.value)} 
              placeholder="O que deseja criar hoje?" 
              style={{ width: '100%', backgroundColor: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '16px' }}
              rows="2"
            />
            <button onClick={melhorarIA} style={{ background: 'none', border: 'none', color: '#D4AF37', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
              🪄 MELHORAR COM IA
            </button>
          </div>
          <button 
            onClick={() => gerar()} 
            disabled={carregando}
            style={{ width: '100%', backgroundColor: '#D4AF37', color: '#000', padding: '18px', borderRadius: '15px', fontWeight: 'bold', fontSize: '16px', border: 'none' }}
          >
            {carregando ? 'GERANDO...' : 'CRIAR AGORA'}
          </button>
        </div>

        {/* ÁREA DE RESULTADO COM SLIDER */}
        {resultado && (
          <div style={{ marginBottom: '30px', animation: 'fadeIn 0.5s' }}>
            <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', border: '3px solid #D4AF37', height: '400px' }}>
              <img src={resultado} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {antes && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: `${sliderPos}%`, height: '100%', overflow: 'hidden', borderRight: '2px solid #fff' }}>
                  <img src={antes} style={{ width: '500px', height: '400px', objectFit: 'cover' }} />
                </div>
              )}
              {antes && (
                <input type="range" min="0" max="100" value={sliderPos} onChange={(e) => setSliderPos(e.target.value)} style={{ position: 'absolute', bottom: '20px', left: '10%', width: '80%', accentColor: '#D4AF37' }} />
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '15px' }}>
              <button onClick={() => gerar(null, true)} style={{ backgroundColor: '#111', color: '#D4AF37', border: '1px solid #D4AF37', padding: '12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>💎 UPSCALE 16K</button>
              <a href={resultado} download style={{ backgroundColor: '#fff', color: '#000', padding: '12px', borderRadius: '12px', textAlign: 'center', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px' }}>💾 SALVAR</a>
            </div>
          </div>
        )}

        {/* HISTÓRICO */}
        {historico.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <p style={{ fontSize: '12px', color: '#444', marginBottom: '10px', fontWeight: 'bold' }}>HISTÓRICO</p>
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
              {historico.map((img, i) => (
                <img key={i} src={img} onClick={() => setResultado(img)} style={{ height: '80px', borderRadius: '12px', cursor: 'pointer', border: '1px solid #222' }} />
              ))}
            </div>
          </div>
        )}

        {/* BIBLIOTECA COMPLETA */}
        {biblioteca.map((cat, i) => (
          <div key={i} style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#D4AF37', fontSize: '14px', marginBottom: '15px' }}>{cat.t}</h3>
            {cat.i.map((item, idx) => (
              <div key={idx} style={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', padding: '15px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>{item.n}</p>
                  <p style={{ margin: 0, fontSize: '11px', color: '#555' }}>{item.p.substring(0, 30)}...</p>
                </div>
                <button onClick={() => copiarPrompt(item.p)} style={{ backgroundColor: '#111', color: '#D4AF37', border: '1px solid #D4AF37', padding: '8px 15px', borderRadius: '10px', fontSize: '11px' }}>USAR</button>
              </div>
            ))}
          </div>
        ))}
      </main>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
