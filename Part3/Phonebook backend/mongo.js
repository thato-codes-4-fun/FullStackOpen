const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]



const url = `mongodb+srv://thatofreelance:${password}@cluster0.agb8rux.mongodb.net/peoplePhoneBook?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
mongoose.connect(url)
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 3){
    console.log('Phonebook:')
    Person.find({}).then(result=> {
        result.forEach(person=> {
            console.log(`${person.name} ${person.number}`)
        })
    }).then(()=>mongoose.connection.close())
}


if (process.argv.length === 5){
    console.log(`adding ${process.argv[3]} ${process.argv[4]} `)

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    
    person.save().then((result)=> {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
    
}




