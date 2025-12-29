import React from 'react';

export default function Home() {
  const [img, setImg] = React.useState(null);
  
  const gerar = () => {
    const p = prompt("O que deseja criar?");
    if(p) setImg(`https://pollinations.ai/p/${encodeURIComponent(p)}?width=1000&height=1000`);
  };

  return (
    <div style={{background:'#000', color:'#D4AF37', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif'}}>
      <h1 style={{fontSize:'32px', fontWeight:'bold'}}>VEO PACK PRO</h1>
      <button onClick={gerar} style={{marginTop:'20px', background:'#D4AF37', color:'#000', padding:'15px 30px', borderRadius:'10px', fontWeight:'bold', border:'none'}}>CRIAR IMAGEM</button>
      {img && <img src={img} style={{marginTop:'20px', width:'90%', maxWidth:'400px', borderRadius:'15px', border:'2px solid #D4AF37'}} />}
    </div>
  );
}
