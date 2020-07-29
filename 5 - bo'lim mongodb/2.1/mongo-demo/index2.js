const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/practice2', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`mongodb ga ulandi`))
  .catch((err) => console.log(`mongodb ulanishda hatolib ro'y berdi`, err))

const authorSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String
})

// const bookSchema = mongoose.Schema({
//   title: String,
//   // bu authorSchema turi authorSchema bo'ladi shunday
//   author: {
//     type: authorSchema,
//     required: true
//   }
// })

const bookSchema = mongoose.Schema({
  title: String,
  authors: {
    type: [authorSchema],
    required: true
  }
})

const Author = new mongoose.model('author', authorSchema)
const Book = new mongoose.model('book', bookSchema)

// async function createBook(title, author) {
//   const book = new Book({
//     title,
//     author
//   })
//   const result = await book.save()
//   console.log(result)
// }

async function createBook(title, authors) {
  const book = new Book({
    title,
    authors: authors
  })
  const result = await book.save()
  console.log(result)
}

// boshqa bir hujjatni shunday kirgizillar ekan yartish function

// createBook(`NodeJS - To'liq qo'llama`, [
//   new Author({
//     firstName: "Islom",
//     lastName: "Tilovov",
//     email: "islomumar225@gmail.com"
//   }),
//   new Author({
//     firstName: "Umar",
//     lastName: "Islomov",
//     email: "islomumar225@gmail.com"
//   }),
// ])


createBook('js', new Author({
  firstName: 'umar',
  lastName: 'Dilshod',
  email: 'islomumar225@gmail.com'
}))

// update function yaratish ichki hujjatni o'zgartirish uchun
// async function updateAuthor(bookId) {
//   // yangilash uchun
//   // shunday $set key orqali o'zgartirillar ekan
//   await Book.updateOne({ _id: bookId }, {
//     $set: {
//       'author.lastName': 'J'
//     }
//   })
// }

// // updateAuthor('5f1d03031d3727214c5caed9')

// async function updateAuthor(bookId) {

//   await Book.updateOne({ _id: bookId }, {
//     // bu o'chirib tashlashlik kerak bo'lgan narsaga unset deb yoziladi
//     // $unset: {
//     //   'author.lastName': ''
//     // }
//     // buttun boshli hosani o'chirib tashlashlik uchun ishlatiladigan 
//     // bo'lsa shunday o'chirib tashlanadi
//     $unset: {
//       'author': ''
//     }

//   })
// }

// updateAuthor('5f1d03031d3727214c5caed9')