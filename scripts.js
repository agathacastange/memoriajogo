let cartas = [];
let cartasViradas = [];
let paresEncontrados = 0;
let erros = 0;
let modoDeJogo = 'solo';
let temporizador;
let segundos = 0;

function iniciarJogo(modo) {
  modoDeJogo = modo;
  document.getElementById('menu').classList.add('escondido');
  document.getElementById('jogo').classList.remove('escondido');
  document.getElementById('modo').innerText = modo === 'solo' ? 'Modo Solo' : 'Modo Dupla';
  
  inicializarCartas();
  iniciarTemporizador();
}

function inicializarCartas() {
  const tabuleiro = document.getElementById('tabuleiro');
  tabuleiro.innerHTML = '';
  
  const valores = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  cartas = [...valores, ...valores].sort(() => 0.5 - Math.random());
  
  cartas.forEach((valor, index) => {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.valor = valor;
    carta.addEventListener('click', () => virarCarta(carta));
    tabuleiro.appendChild(carta);
  });
}

function virarCarta(carta) {
  if (cartasViradas.length < 2 && !carta.classList.contains('virada')) {
    carta.classList.add('virada');
    carta.innerText = carta.dataset.valor;
    cartasViradas.push(carta);

    if (cartasViradas.length === 2) {
      verificarPar();
    }
  }
}

function verificarPar() {
  const [carta1, carta2] = cartasViradas;
  
  if (carta1.dataset.valor === carta2.dataset.valor) {
    paresEncontrados++;
    cartasViradas = [];
    if (paresEncontrados === cartas.length / 2) {
      finalizarJogo();
    }
  } else {
    setTimeout(() => {
      carta1.classList.remove('virada');
      carta1.innerText = '';
      carta2.classList.remove('virada');
      carta2.innerText = '';
      cartasViradas = [];
      erros++;
      document.getElementById('erros').innerText = `Erros: ${erros}`;
    }, 1000);
  }
}

function iniciarTemporizador() {
  segundos = 0;
  temporizador = setInterval(() => {
    segundos++;
    const minutos = Math.floor(segundos / 60);
    const seg = segundos % 60;
    document.getElementById('temporizador').innerText = `Tempo: ${minutos.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
  }, 1000);
}

function finalizarJogo() {
  clearInterval(temporizador);
  document.getElementById('jogo').classList.add('escondido');
  document.getElementById('vitoria').classList.remove('escondido');
  document.getElementById('mensagemVitoria').innerText = `Parabéns! Você venceu em ${document.getElementById('temporizador').innerText} com ${erros} erros.`;
}

function reiniciarJogo() {
  cartasViradas = [];
  paresEncontrados = 0;
  erros = 0;
  document.getElementById('erros').innerText = `Erros: 0`;
  document.getElementById('temporizador').innerText = `Tempo: 00:00`;
  iniciarJogo(modoDeJogo);
}

function voltarMenu() {
  document.getElementById('vitoria').classList.add('escondido');
  document.getElementById('menu').classList.remove('escondido');
}
