var criaOpcoesDoCartao =( function () {
  "use strict"

  function removeCartao(){
    //var cartao= document.querySelector("#cartao_"+this.getAtributte("data-ref")
    var cartao = document.querySelector("#cartao_"+ this.dataset.ref)
    console.log(cartao);
    cartao.classList.add("cartao--some")
    setTimeout(function(){
      cartao.remove();
      $(document).trigger("precisaSincronizar");
    },400)
  }

  var ehPraEditar = false;
  function toggleEdicao() {
    var cartao = $("#cartao_" + this.dataset.ref);
    var conteudo = cartao.find(".cartao-conteudo");

    if (ehPraEditar)


  }

return function(idNovoCartao) {
  var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove")
                                            .addClass("opcoesDoCartao-opcao")
                                            .attr("data-ref", idNovoCartao)
                                            .text ("Remover")
                                            .click(removeCartao);

  var opcoes = $("<div>").addClass("opcoesDoCartao")
                                  .append(botaoRemove);
  return opcoes;
}
})();
