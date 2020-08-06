//Procurar o botão pegando do documento e usando o querySelector para tal
//e em seguida informando qual botão é (no caso o referido pela id addtime)
document.querySelector("#add-time")
    //Quando clicar no botão, executar uma ação que foi definida por um evento de click
    //e em seguida chamar uma função após clicar, primeiro informo o tipo do evento (click)
    //e a segunda é oq irei fazer após o click, no caso irei executar uma função (que é a ação)
    .addEventListener("click", cloneField)

//Executar uma ação criando-a
function cloneField() {

  //Duplicar os campos e colocar na página (no caso o schedule-item)
  //Armazenado em uma const. cloneNode retorna a cópia de um nó do elemento HTML e todo seu conteúdo (true)
  const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)

  //Limpar campos, que campos? (limpar os campos após duplicar)
  //Pegar os campos, que campos?
  const fields = newFieldContainer.querySelectorAll('input')

  //limpando maneira 1:
  // fields[0].value = "";
  // fields[1].value = "";

  //Maneira 2 e efetiva
  //Para cada campo, limpar:
  fields.forEach(function (field) {
    //Pegar o field do momento e limpa ele
    field.value = ""
  });

  //Colocar na pagina, onde?
  document.querySelector('#schedule-items').appendChild(newFieldContainer)

}