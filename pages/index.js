<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Veo Pack Pro</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #000; color: #fff; font-family: sans-serif; }
        .gold-text { color: #D4AF37; }
        .gold-border { border: 1px solid #D4AF37; }
    </style>
</head>
<body class="flex flex-col items-center p-6">

    <div class="text-center mt-10 mb-8">
        <h1 class="text-4xl font-black gold-text">VEO PACK PRO</h1>
        <p class="text-zinc-500 text-xs tracking-widest mt-1">INTELIGÊNCIA ARTIFICIAL</p>
    </div>

    <div class="w-full max-w-sm bg-zinc-900 rounded-3xl p-4 border border-zinc-800">
        <textarea id="prompt" class="w-full bg-transparent text-white outline-none p-2" rows="3" placeholder="Ex: Um leão de cristal..."></textarea>
    </div>

    <button onclick="gerar()" class="w-full max-w-sm mt-6 bg-zinc-900 gold-border gold-text py-4 rounded-2xl font-bold active:scale-95 transition">
        CRIAR AGORA
    </button>

    <div id="loading" class="hidden mt-6 text-yellow-500 italic animate-pulse">
        IA processando sua ideia...
    </div>

    <div id="resultado" class="hidden mt-8 w-full max-w-sm bg-zinc-900 p-2 rounded-3xl border border-zinc-800">
        <img id="imagem" src="" class="w-full rounded-2xl shadow-2xl">
        <p class="text-center text-xs text-zinc-500 mt-2 p-2">Toque na imagem para salvar</p>
    </div>

    <script>
        function gerar() {
            const p = document.getElementById('prompt').value;
            if(!p) return alert("Escreva algo primeiro!");
            
            document.getElementById('loading').classList.remove('hidden');
            document.getElementById('resultado').classList.add('hidden');

            setTimeout(() => {
                const url = "https://pollinations.ai/p/" + encodeURIComponent(p) + "?width=1024&height=1024&seed=" + Math.random();
                document.getElementById('imagem').src = url;
                document.getElementById('loading').classList.add('hidden');
                document.getElementById('resultado').classList.remove('hidden');
            }, 3000);
        }
    </script>

</body>
</html>
