const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/practice', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`mongodb ga ulandi`))
    .catch(err => console.log(`mongodb ga ulanishda hatolik yuz berdi`, err))

const Users = mongoose.model('user', new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
}))

const Book = mongoose.model('book', new mongoose.Schema({
    title: String,
}))

async function createUser(firstName, lastName, email) {
    const user = new Users({
        firstName,
        lastName,
        email
    })

    const result = await user.save()
    console.log(result)
}

createUser('Islom', 'Umar', 'islomumar225@gmail.com')