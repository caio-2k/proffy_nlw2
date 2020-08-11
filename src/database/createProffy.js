//Recebendo os valores do test.js
module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) {
  //inserir dados na tabela de teachers/proffys
  //obs: só consigo inserir classes se eu tiver o id do teachers e isso demora
  //por isso para esperar uso o await
  // db.('').then() -> db rode a inserção dos caras. db reposnde vou tentar, se sim
  //então (then) vou fazer oq vc colocou aqui (). é uma promessa, portanto devemos esperar;
  //Quando utilizo await ele espera na linha determinada, quando terminar ele continua. 
  //Não consigo usar o await sem o async não func
  const insertedProffy = await db.run(`
      INSERT INTO proffys (
        name,
        avatar,
        whatsapp,
        bio
      ) VALUES (
        "${proffyValue.name}",
        "${proffyValue.avatar}",
        "${proffyValue.whatsapp}",
        "${proffyValue.bio}"
      );
  `)

  //cadastrando e retornando o ID
  const proffy_id = insertedProffy.lastID

  //inserir dados na tabela classes

  const insertedClass = await db.run(`
      INSERT INTO classes (
        subject,
        cost,
        proffy_id
      ) VALUES (
        "${classValue.subject}",
        "${classValue.cost}",
        "${proffy_id}"
      );
  `)

  const class_id = insertedClass.lastID

  //Inserir dados na tabela class_schedule
  //Não sei quantos dias e horas terá salvas no banco por proffy
  //no entanto usamos estrutura de rep, mapeando o array.
  //cada vez que essa func for rodada ela está se referindo ao obj que está
  //no array classScheduleValues e ele vai retornar um dbrun
  const insertedAllClassesScheduleValues = classScheduleValues.map((classScheduleValue) => {
    return db.run(`
      INSERT INTO class_schedule (
        class_id,
        weekday,
        time_from,
        time_to
      ) VALUES (
        "${class_id}",
        "${classScheduleValue.weekday}",
        "${classScheduleValue.time_from}",
        "${classScheduleValue.time_to}"
      );
    `)
  })

  //executando todos os db.run aqui das classe schedules
  //aguardar cada promessa executar
  //o all pega um array de muitas promessas
  await Promise.all(insertedAllClassesScheduleValues)
}