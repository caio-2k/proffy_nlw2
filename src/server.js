//Criando e chamando o servidor
//Express é uma função, nesse caso armazenamos em constante
//e executamos ouvindo a porta 5500
const express = require('express');
const server = express();
const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require('./pages')


//importando o nunjucks
const nunjucks = require('nunjucks');
//configurar nunjucks (passando onde está os arquivos e enviar um objeto (server))
nunjucks.configure('src/views', {
  express: server,
  noCache: true, //guardar em memória para ser devolvido (desativado)
})


//Realizando uma configuração no servidor (tudo que for .use é para essa finalidade)
//nesse caso configuramos para carregar arquivos estaticos (arquivos de estilo) na pasta public
server.use(express.urlencoded({ extended: true }))
.use(express.static("public"))
  //Devido ao "cannot get /" adicionamos a linha abaixo informando que estamos pedindo
  //a rota raíz (/) do projeto e em seguida uma função que indica oque queremos retornar
  //Rota raíz
  .get("/", pageLanding)
  //Rota study (lembrando de tirar o .html do index)
  .get("/study", pageStudy)
  //Rota give-classes (lembrando de tirar o .html do index)
  .get("/give-classes", pageGiveClasses)
  //start do servidor
  .post("/save-classes", saveClasses)
  .listen(5500);