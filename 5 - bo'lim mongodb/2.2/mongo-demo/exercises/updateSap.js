const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/practice', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`mongodb ga ulandi`))
    .catch((err) => console.log(`mongodb ga ulanishda hatolik yuz berdi`, err))

const authorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
})

const bookSchema = new mongoose.Schema({
    title: String,
    author: {
        type: authorSchema,
        required: true
    }
})

const Author = mongoose.model('author', authorSchema)
const Book = mongoose.model('book', bookSchema)

async function createBook(title, author) {
    const book = new Book({
        title,
        author
    })
    const result = await book.save()
    console.log(result)
}

// createBook('JavaScript', new Author({
//     firstName: 'Islom',
//     lastName: 'Umar',
//     email: 'islomumar225@gmail.com'
// }))

// yangilashlik uchun ishlatiladi bu function boshqa bir keyga
// bosh narsani qo'yish uchun ishlatiladi

// async function updateAuthor(bookId) {
//     await Book.updateOne({ _id: bookId }, {
//         $set: {
//             "author.firstName": "IslomUmar"
//         }
//     })
// }

// bu keydan qiymat olib tashlashlik uchun ishlatiladi

// async function updateAuthor(bookId) {
//     await Book.updateOne({ _id: bookId }, {
//         $unset: {
//             "author.firstName": ""
//         }
//     })
// }

// ichki hujjatni to'liq o'chirib tashlamoqchi bo'lsak

async function updateAuthor(bookId) {
    await Book.updateOne({ _id: bookId }, {
        $unset: {
            "author": ""
        }
    })
}

updateAuthor('5f2272090d5521371cff1ba9')

