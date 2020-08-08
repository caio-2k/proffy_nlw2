//Proffys
const proffys = [
  {
    name: "Diego Fernandes",
    avatar: "https://github.com/diego3g.png",
    whatsapp: "900000000",
    bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.00 pessoas já passaram por uma das minhas explosões.",
    subject: "Química",
    cost: "20",
    weekday: [0], //Vai agrupar vários dados
    time_from: [720], //convertido em segundos 720s
    time_to: [1200] //Até 1220 segundos
  },
  {
    name: "Mayk Brito",
    avatar: "https://github.com/maykbrito.png",
    whatsapp: "900000000",
    bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.00 pessoas já passaram por uma das minhas explosões.",
    subject: "Química",
    cost: "20",
    weekday: [0], //Domingo
    time_from: [720], //convertido em segundos 720s
    time_to: [1200] //Até 1220 segundos
  },
  {
    name: "Mayk Brito",
    avatar: "https://github.com/maykbrito.png",
    whatsapp: "900000000",
    bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.00 pessoas já passaram por uma das minhas explosões.",
    subject: "Química",
    cost: "20",
    weekday: [0], //Domingo
    time_from: [720], //convertido em segundos 720s
    time_to: [1200] //Até 1220 segundos
  }
]

//Matérias:
const subjects = [
  "Artes",
  "Biologia",
  "Ciências",
  "Educação Física",
  "Fisíca",
  "Geografia",
  "História",
  "Matemática",
  "Português",
  "Qumimíca"
]

//Dias da semana
const weekdays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado"
]

//Funções

//Função para pegar a materia
function getSubject(subjectNumber){
  const arrayPosition = +subjectNumber - 1 //o + é para garantir que seja um number
  return subjects[arrayPosition] 
}

function pageLanding(req, res) {
  return res.render("index.html")
}

function pageStudy(req, res) {

  //Manter os dados dos forms intactos após alteração
  const filters = req.query
 
  //Rendenrizando a página e recebendo um objeto
  return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
  // Exibindo dados no console (teste only)
  const data = req.query

  //Exibindo em tela
  // console.log(data);

  //se tiver data:
  //Pegando as chaves (nome, bio, avatar) do objeto e transformando em um array
  //Se o array não for vazio, ou seja, se não for igual a 0 e se tiver dados
  const isNotEmpty = Object.keys(data).length > 0
  if (isNotEmpty) {
    //pegar a posição do subject e retornar o texto
    data.subject = getSubject(data.subject);
    // Pegar dados e adicionar ao array/lista de proffys (usando push no array)
    proffys.push(data)

    //Redireciona
    return res.redirect("/study")
  }
  
  // se não, mostrar a página:
  return res.render("give-classes.html", { subjects, weekdays })

}

//Criando e chamando o servidor
//Express é uma função, nesse caso armazenamos em constante
//e executamos ouvindo a porta 5500
const express = require('express');
const server = express();

//importando o nunjucks
const nunjucks = require('nunjucks');
//configurar nunjucks (passando onde está os arquivos e enviar um objeto (server))
nunjucks.configure('src/views', {
  express: server,
  noCache: true, //guardar em memória para ser devolvido (desativado)
})


//Realizando uma configuração no servidor (tudo que for .use é para essa finalidade)
//nesse caso configuramos para carregar arquivos estaticos (arquivos de estilo) na pasta public
server.use(express.static("public"))

  //Devido ao "cannot get /" adicionamos a linha abaixo informando que estamos pedindo
  //a rota raíz (/) do projeto e em seguida uma função que indica oque queremos retornar
  //Rota raíz
  .get("/", pageLanding)
  //Rota study (lembrando de tirar o .html do index)
  .get("/study", pageStudy)
  //Rota give-classes (lembrando de tirar o .html do index)
  .get("/give-classes", pageGiveClasses)
  //start do servidor
  .listen(5500);