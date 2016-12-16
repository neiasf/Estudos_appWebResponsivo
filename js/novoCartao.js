(function () {

"use strict";

  $(".novoCartao").submit(function(event){
  var campoConteudo = $(".novoCartao-conteudo")
  var conteudo = campoConteudo.val().trim().replace(/\n/g,"<br>")
  if (campoConteudo.val().trim().length == 0 && !document.querySelector(".error")) {
    let $msgError = document.createElement('span');
    $msgError.classList.add('error');
    $msgError.textContent = 'Preencha o campo acima';

    this.insertBefore($msgError, document.querySelector('.novoCartao-salvar'))
  } else if (campoConteudo.val().trim().length > 0) {
    controladorDeCartoes.adicionaCartao(conteudo);
    $(document).trigger("precisaSincronizar");
  }
  campoConteudo.val("")
  event.preventDefault()
})

// mensagem

$("#novoCartao-Conteudo").change(function(){
  var campoConteudo = $(".novoCartao-conteudo")
  if(campoConteudo.val().trim().length > 0)
    $(".error").remove()
})

} ());
