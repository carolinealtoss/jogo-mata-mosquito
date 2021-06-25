var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 10;
var nivel = window.location.search;
nivel = nivel.replace("?", "");

var criaMosquitoTempo = 1500

if (nivel === 'normal') {
  // 1500
  criaMosquitoTempo = 1500
} else if(nivel === 'dificil'){
 // 1000
  criaMosquitoTempo = 1000
} else {
  // 750
  criaMosquitoTempo = 750
}

function ajustaTamanhoPalcoJogo() {
  altura = window.innerHeight;
  largura = window.innerWidth;

  /*console.log(
    "ajustaTamanhoPalcoJogo() - largura: " + largura + " altura: " + altura
  );*/
}

ajustaTamanhoPalcoJogo();

var cronometro = setInterval(function () {
  tempo--;

  if (tempo < 0) {
    clearInterval(cronometro);
    clearInterval(criaMosquito);
    window.location.href = "vitoria.html";
  } else {
    // "innerHTML" insere texto dentro do span
    document.getElementById("cronometro").innerHTML = tempo;
  }
}, 1000);

/* 1 - gera números randômicos, que serão usados como as posições */
/* 2 - multiplica pela altura e largura, limitando o "tamanho" das posições */
/* 3 - arredonda os números gerados para baixo, para que fiquem como inteiros */

function posicaoRandomica() {
  // remover mosquito anterior, caso exista
  if (document.getElementById("mosquito")) {
    document.getElementById("mosquito").remove();

    if (vidas > 3) {
      window.location.href = "fim_de_jogo.html";
    } else {
      document.getElementById("v" + vidas).src = "imagens/coracao_vazio.png";
      vidas++;
    }
  }

  var posicaoX = Math.floor(Math.random() * largura) - 90;
  var posicaoY = Math.floor(Math.random() * altura) - 90;

  // se as posições forem menores que 0, recebem 40 (para não ficar exatamente no canto da tela), se não, recebem elas mesmas
  posicaoX = posicaoX < 0 ? 40 : posicaoX;
  posicaoY = posicaoY < 0 ? 40 : posicaoY;

  //console.log("posicaoRandomica() - X: " + posicaoX + " y: " + posicaoY);

  // criar o elemento html
  var mosquito = document.createElement("img");
  mosquito.src = "imagens/mosquito.png";
  //adiciona a classe criada em css
  mosquito.className = tamanhoAleatorio() + " " + ladoAleatorio();
  mosquito.style.left = posicaoX + "px";
  mosquito.style.top = posicaoY + "px";
  mosquito.style.position = "absolute";
  mosquito.id = "mosquito";
  mosquito.onclick = function () {
    this.remove();
  };

  document.body.appendChild(mosquito);
}

function tamanhoAleatorio() {
  var classe = Math.floor(Math.random() * 3);

  switch (classe) {
    case 0:
      return "mosquito1";
    case 1:
      return "mosquito2";
    case 2:
      return "mosquito3";
  }
}

function ladoAleatorio() {
  var classe = Math.floor(Math.random() * 2);

  switch (classe) {
    case 0:
      return "ladoA";
    case 1:
      return "ladoB";
  }
}
