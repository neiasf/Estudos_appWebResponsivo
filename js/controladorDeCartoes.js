var controladorDeCartoes = (function () {

"use strict";

// add

var contador = 0;

function adicionaCartao(conteudo,cor){

  // var contador = $(".cartao").length;

  if(conteudo){
    contador++;
    // var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove")
    //                                .addClass("opcoesDoCartao-opcao")
    //                                .text("Remover")
    //                                .click(removeCartao)
    //                                .attr("data-ref",contador)

    var opcoes = criaOpcoesDoCartao(contador)

    var tipoCartao = decideTipoCartao(conteudo)

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

// decide tamanho
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

// //remove
// function removeCartao(){
//   //var cartao= document.querySelector("#cartao_"+this.getAtributte("data-ref")
//   var cartao = document.querySelector("#cartao_"+ this.dataset.ref)
//   console.log(cartao);
//   cartao.classList.add("cartao--some")
//   setTimeout(function(){
//     cartao.remove();
//     $(document).trigger("precisaSincronizar");
//   },400)
// }
//
// var botoes = document.querySelectorAll(".opcoesDoCartao-remove")
//
// for(var i=0; i < botoes.length;i++){
//   botoes[i].addEventListener("click",removeCartao)
// }
return {
  adicionaCartao: adicionaCartao
  ,idUltimoCartao: function (){
    return contador;
  }
}

}());
