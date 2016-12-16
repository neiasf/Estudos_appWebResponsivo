document.querySelector("#mudaLayout").addEventListener("click", function(){
  var mural = document.querySelector(".mural")
  mural.classList.toggle("mural--linhas")

  if(mural.classList.contains("mural--linhas")){
    this.textContent = "Blocos"
  }
  else {
    this.textContent = "Linhas"
  }
})

function removeCartao(){
  //var cartao= document.querySelector("#cartao_"+this.getAtributte("data-ref")
  var cartao = document.querySelector("#cartao_"+ this.dataset.ref)
  console.log(cartao);
  cartao.classList.add("cartao--some")
  setTimeout(function(){
    cartao.remove();
  },400)
}

var botoes = document.querySelectorAll(".opcoesDoCartao-remove")

for(var i=0; i < botoes.length;i++){
  botoes[i].addEventListener("click",removeCartao)
}

$(".novoCartao").submit(function(event){
  var campoConteudo = $(".novoCartao-conteudo")
  var conteudo = campoConteudo.val().trim().replace(/\n/g,"<br>")
  if (campoConteudo.val().trim().length == 0) {
    let $msgError = document.createElement('span');
    $msgError.classList.add('error');
    $msgError.textContent = 'Preencha o campo acima';

    this.insertBefore($msgError, document.querySelector('.novoCartao-salvar'))
  } else if (campoConteudo.val().trim().length > 0) {
    adicionaCartao(conteudo)
  }
  campoConteudo.val("")
  event.preventDefault()
})

function adicionaCartao(conteudo,cor){

  var contador = $(".cartao").length;

  if(conteudo){
    contador++;
    var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove")
                                   .addClass("opcoesDoCartao-opcao")
                                   .text("Remover")
                                   .click(removeCartao)
                                   .attr("data-ref",contador)

    var opcoes = $("<div>").addClass("opcoesDoCartao")
                           .append(botaoRemove)

    var tipoCartao =decideTipoCartao(conteudo)

    var conteudoTag = $("<p>").addClass("cartao-conteudo")
                              .append(conteudo)

    $("<div>").attr("id","cartao_"+contador)
              .addClass("cartao")
              .addClass(tipoCartao)
              .append(opcoes)
              .append(conteudoTag)
              .css("background-color",cor)
              .prependTo(".mural")
  }
}

$("#novoCartao-Conteudo").change(function(){
  var campoConteudo = $(".novoCartao-conteudo")
  if(campoConteudo.val().trim().length > 0)
    $(".error").remove()
})

function decideTipoCartao(conteudo){
  var quebras =conteudo.split("<br>").length
  var totalDeLetras = conteudo.replace(/<br>/g," ").length
  var ultimoMaior = "";

  conteudo.replace(/<br>/g," ")
          .split(" ")
          .forEach(function(palavra){
            if(palavra.length > ultimoMaior.length){
              ultimoMaior = palavra
            }
          })
  var tamMaior = ultimoMaior.length
  var tipoCartao = "cartao--textoPequeno"

  if(tamMaior < 9 && quebras < 5 && totalDeLetras < 55){
    tipoCartao = "cartao--textoGrande"
  }
  else if (tamMaior < 12 && quebras < 6 && totalDeLetras < 75) {
    tipoCartao = "cartao--textoMedio"
  }
  return tipoCartao
}

// $('#busca').on("input",function(){
//   var busca = $(this).val().trim();
//   if(busca.length){
//     $(".cartao").hide().filter(function(){
//       return $(this).find(".cartao-conteudo")
//                     .text()
//                     .match(new RegExp(busca,"i"))
//     })
//   }
//   else{
//     $(".cartao").show()
//   }
// })

let $busca = document.querySelector("#busca")

$busca.addEventListener('input',function(event){
  let busca = this.value;
  let cartoes = document.querySelectorAll('.cartao')

  for(let index = 0; index < cartoes.length;index++){
    cartoes[index].classList.add('.cartao--esconde')
  }

  for(let index = 0; index < cartoes.length;index++){
    if(cartoes[index].querySelector('.cartao-conteudo').textContent.match(new RegExp(busca,'i'))){
      cartoes[index].classList.remove('.cartao--esconde')
    }
  }
})

$("#ajuda").click(function(){
  $.getJSON("https://ceep.herokuapp.com/cartoes/instrucoes",
          function(res){
            console.log(res);

            res.instrucoes.forEach(function(instrucao){
              adicionaCartao(instrucao.conteudo,instrucao.cor)
            })
      })
})

$("#sync").click(function(){
  var cartoes = []
  $(".cartao").each(function(){
    var cartao = {}
    cartao.conteudo = $(this).find(".cartao-conteudo").html()
    cartoes.push(cartao)
  })
  var mural = {
    usuario: "fr.email@gmail.com",
    cartoes: cartoes
  }
  $.ajax({
    url: "https://ceep.herokuapp.com/cartoes/salvar",
    method: "POST",
    data: mural,
    success: function(res){
      $("#sync").addClass("botaoSync--sincronizado")
      console.log(res.quantidade + " cartões salvos em "+ res.usuario)
    },
    error: function(){
      $("#sync").addClass("botaoSync--deuRuim")
      console.log("Não foi possível salvar o mural");
    },
    complete: function(){
      $("#sync").removeClass("botaoSync--esperando")
    }
  })
})

var usuario = "fr.email@gmail.com"
$.getJSON(
  "https://ceep.herokuapp.com/cartoes/carregar?callback=?",
  {usuario : usuario},
  function(res){
    var cartoes = res.cartoes;
    console.log(cartoes.length + " carregados em " + res.usuario);
    cartoes.forEach(function(cartao){
      adicionaCartao(cartao.conteudo)
    })
  }
)
