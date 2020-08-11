//Importando módulos
const Database = require('sqlite-async');

//function para garantir que o banco de dados seja executado corretamente
function execute(db){
  // Instruções sql a serem executadas abaixo
  //Criar as tabelas do banco de dados
  return db.exec(`
      CREATE TABLE IF NOT EXISTS proffys (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
          name TEXT,
          avatar TEXT,
          whatsapp TEXT,
          bio TEXT
      );

      CREATE TABLE IF NOT EXISTS classes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject INTEGER,
        cost TEXT,
        proffy_id INTEGER
      );

      CREATE TABLE IF NOT EXISTS class_schedule(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        class_id INTEGER,
        weekday INTEGER,
        time_from INTEGER,
        time_to INTEGER
      );
  `)
}

//abrir banco de dados (informando onde está o banco de dados)
module.exports = Database.open(__dirname + '/database.sqlite').then(execute)
