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
function convertHoursToMinutes(time) {
  const [ hour, minutes ] = time.split(":")
  return Number((hour * 60) + minutes)
}

//Função para pegar a materia
function getSubjects(subjectNumber){
  const arrayPosition = +subjectNumber - 1 //o + é para garantir que seja um number
  return subjects[arrayPosition] 
}

module.exports = {
  subjects,
  weekdays,
  getSubjects,
  convertHoursToMinutes
}