//Pegando o banco de dados
const Database = require('./db.js');

//Exportando uma função
const createProffy = require('./createProffy');

//Continuação do código
//Detalhe: o db do then não tem nada a ver com o db da const
Database.then(async (db) => {
  //Inserir dados
  proffyValue = {
    name: "Diego Fernandes",
    avatar: "https://github.com/diego3g.png",
    whatsapp: "900000000",
    bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.00 pessoas já passaram por uma das minhas explosões."
  }

  classValue = {
    subject: 1,
    cost: "20",
    //O proffy id virá pelo banco de dados
  }

  //Cada posição do array é um obj
  classScheduleValues = [
    {
      //class_id virá pelo banco de dados após cadastramos a class/aula
      weekday: 1,
      time_from: 720,
      time_to: 1220
    },

    {
      weekday: 0,
      time_from: 520, 
      time_to: 1220
    }
  ]

  //Aguardar criar o proffy e enviar para o db proffyvalue, classvalue...
  // await createProffy(db, { proffyValue, classValue, classScheduleValues})

  //Consultar os dados inseridos

  //Todos os proffys
  const selectedProffys = await db.all("SELECT * FROM proffys")
  // console.log(selectedProffys);

  //consultar as classes de um determinado professor 
  //e trazer junto os dados do professor (unir tabelas)
  const selectClassesAndProffys = await db.all(`
    SELECT classes.*, proffys.*
    FROM proffys 
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE classes.proffy_id = 1;
  `)
  // console.log(selectClassesAndProffys);

  //o horário que a pessoa trabalha, por exemplo, é das 8 ate 18
  //o horario do time_from (8) precisa ser menor ou igual ao horario
  //solicitado. O time_to precisa ser acima
  //asterisco siginfica tudo (colunas)
  const selectClassesSchedules = await db.all(`
    SELECT class_schedule.*
    FROM class_schedule
    WHERE class_schedule.class_id = "1"
    AND class_schedule.weekday = "0"
    AND class_schedule.time_from <= "1300"
    AND class_schedule.time_to > "1300"
  `)
  // console.log(selectClassesSchedules);
})
