(function () {

"use strict";  

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

} ());
