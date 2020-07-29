const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/practice', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`ulanidi`))
    .catch(err => console.log(`halolik`, err))

const Author = mongoose.model('author', new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
}))

const Book = mongoose.model('book', new mongoose.Schema({
    title: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'author'
    }
}))

async function createAuthor(firstName, lastName, email) {
    const author = new Author({
        firstName,
        lastName,
        email
    })
    const result = await author.save()
    console.log(result)
}

async function createBook(title, authorId) {
    const book = new Book({
        title,
        author: authorId
    })
    const result = await book.save()
    console.log(result)
}

async function listBook() {
    const book = await Book
        .find()
        // bunda populate bu boshqa bir objectni narsalarni olish uchun kerak bo'layapti 
        // shunga shunni ishlatayapti
        .populate('author', 'firstName -_id')
        .select('author title')
    console.log(book)
}

// createAuthor('Islom', 'Umar', 'islomumar225@gmail.com')
// createBook('NodeJS', '5f21024b45ed6a2690c6b1f1')
listBook()



