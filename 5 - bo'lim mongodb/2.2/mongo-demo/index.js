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

createBook('JavaScript', new Author({
  firstName: 'Islom',
  lastName: 'Umar',
  email: 'islomumar225@gmail.com'
}))
