const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]

url = `mongodb+srv://lasselautanala:${password}@fullstackdatabase.j1z9b3g.mongodb.net/phonebookapp?retryWrites=true&w=majority`
// url = `mongodb+srv://lasselautanala:${password}@fullstackdatabase.j1z9b3g.mongodb.net/personApp?retryWrites=true&w=majority&appName=fullstackdatabase`
//  `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

//let persons = [
//    { 
//      name: "Arto Hellas", 
//      number: "040-123456",
//      id: 1
//    },
//    { 
//      name: "Ada Lovelace", 
//      number: "39-44-5323523",
//      id: 2
//    },
//    { 
//      name: "Dan Abramov", 
//      number: "12-43-234345",
//      id: 3
//    },
//    { 
//      name: "Mary Poppendieck", 
//      number: "39-23-6423122",
//      id: 4
//    }
//  ]


if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const person = new Person({name: process.argv[3], number: process.argv[4]})
  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}
