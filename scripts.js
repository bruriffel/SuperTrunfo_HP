var carta01 = {
    nome: "Harry Potter",
    imagem: "https://gossipandgab.com/wp-content/uploads/2014/01/Harry-Potter.jpg",
    atributos: {
        inteligencia: 90,
        coragem: 100,
        magia: 85
    }
}

var carta02 = {
    nome: "Hermione Granger",
    imagem: "https://i.pinimg.com/originals/6a/24/f2/6a24f23792f1c9bbb08fa7293f564985.jpg",
    atributos: {
        inteligencia: 100,
        coragem: 70,
        magia: 90
    }
}

var carta03 = {
    nome: "Ron Weasley",
    imagem: "https://bandlabimages.azureedge.net/v1.0/users/eaf7c0c3-c8ae-e711-80c2-0003ff4668ed/640x640",
    atributos: {
        inteligencia: 75,
        coragem: 50,
        magia: 40
    }
}

var carta04 = {
    nome: "Draco Malfoy",
    imagem: "https://www.seekpng.com/png/detail/842-8423077_draco-malfoy-part-one-draco-malfoy.png",
    atributos: {
        inteligencia: 60,
        coragem: 40,
        magia: 80
    }
}

var carta05 = {
    nome: "Dumbledore",
    imagem: "https://cdn.shopify.com/s/files/1/2381/0737/files/5a73291f46a2884b0d8b45b4-750-563_large.jpg?v=1535381414",
    atributos: {
        inteligencia: 100,
        coragem: 70,
        magia: 100
    }
}

var carta06 = {
    nome: "Sirius Black",
    imagem: "https://pbs.twimg.com/profile_images/2383912295/n5qau9n3xvfagy1470zf_400x400.jpeg",
    atributos: {
        inteligencia: 75,
        coragem: 90,
        magia: 80
    }
}

var carta07 = {
    nome: "Hagrid",
    imagem: "https://i.quotev.com/img/q/u/19/1/28/bj6ovzbstd.jpg",
    atributos: {
        inteligencia: 70,
        coragem: 50,
        magia: 40
    }
}

var carta08 = {
    nome: "Lord Voldemort",
    imagem: "https://d.newsweek.com/en/full/301392/voldemort.jpg?w=1600&h=1600&q=88&f=448a2f79833ef3d618b7a440c4ea5671",
    atributos: {
        inteligencia: 80,
        coragem: 85,
        magia: 100
    }
}

var cartaMaquina
var cartaJogador
var cartas = [carta01, carta02, carta03, carta04, carta05, carta06, carta07, carta08]

var pontosJogador = 0
var pontosMaquina = 0

atualizaPlacar()
atualizaQuantidadeDeCartas()

function atualizaQuantidadeDeCartas(){
  var divQuantidadeCartas = document.getElementById('quantidade-cartas')
  var html = "Quantidade de cartas no jogo: " + cartas.length
  
  divQuantidadeCartas.innerHTML = html
}

function atualizaPlacar() {
  var divPlacar = document.getElementById('placar')
  var html = "Jogador " + pontosJogador + "/" + pontosMaquina + " Maquina"
  
  divPlacar.innerHTML = html
}

function sortearCarta() {
    var numeroCartaMaquina = parseInt(Math.random() * cartas.length)
    cartaMaquina = cartas[numeroCartaMaquina]
    cartas.splice(numeroCartaMaquina, 1)

    var numeroCartaJogador = parseInt(Math.random() * cartas.length)
    cartaJogador = cartas[numeroCartaJogador]
    cartas.splice(numeroCartaJogador,1)

    document.getElementById('btnSortear').disabled = true
    document.getElementById('btnJogar').disabled = false

    exibeCartaJogador()
}


function exibeCartaJogador() {
    var divCartaJogador = document.getElementById("carta-jogador")
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`
    var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`
    var opcoesTexto = ""

    for (var atributo in cartaJogador.atributos) {
        opcoesTexto += "<input type='radio' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaJogador.atributos[atributo] + "<br>"
    }

    var html = "<div id='opcoes' class='carta-status'>"

    divCartaJogador.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function obtemAtributoSelecionado() {
    var radioAtributo = document.getElementsByName('atributo')
    for (var i = 0; i < radioAtributo.length; i++) {
        if (radioAtributo[i].checked) {
            return radioAtributo[i].value
        }
    }
}

function jogar() {
    var divResultado = document.getElementById("resultado")
    var atributoSelecionado = obtemAtributoSelecionado()

    if (cartaJogador.atributos[atributoSelecionado] > cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Venceu</p>'
        pontosJogador++
    } else if (cartaJogador.atributos[atributoSelecionado] < cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Perdeu</p>'
        pontosMaquina++
    } else {
        htmlResultado = '<p class="resultado-final">Empatou</p>'
    }

 
    if (cartas.length == 0){
      alert("Fim de Jogo!")
      if (pontosJogador > pontosMaquina){
        htmlResultado = '<p class="resultado-final">Venceu o Jogo</p>'
      } else if (pontosMaquina > pontosJogador) {
        htmlResultadoo = '<p class="resultado-final">Perdeu o Jogo</p>'
      } else {
        htmlResultadoo = '<p class="resultado-final">Perdeu o Jogo</p>'
      }
    } else {
      document.getElementById('btnProximaRodada').disabled = false
    }
  
    atualizaPlacar()
    exibeCartaMaquina()
    atualizaQuantidadeDeCartas()
  
    divResultado.innerHTML = htmlResultado
    document.getElementById('btnJogar').disabled = true
  
}

function exibeCartaMaquina() {
    var divCartaMaquina = document.getElementById("carta-maquina")
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`
    var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`
    var opcoesTexto = ""

    for (var atributo in cartaMaquina.atributos) {
        console.log(atributo)
        opcoesTexto += "<p type='text' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaMaquina.atributos[atributo] + "<br>"
    }

    var html = "<div id='opcoes' class='carta-status --spacing'>"

    divCartaMaquina.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function proximaRodada(){
  var divCartas = document.getElementById('cartas')
  
  divCartas.innerHTML = `<div id="carta-jogador" class="carta"></div> <div id="carta-maquina" class="carta"></div>`
  document.getElementById('btnSortear').disabled = false
  document.getElementById('btnJogar').disabled = true
  document.getElementById('btnProximaRodada').disabled = true
  
  var divResultado = document.getElementById('resultado')
  divResultado.innerHTML = ""  
}
