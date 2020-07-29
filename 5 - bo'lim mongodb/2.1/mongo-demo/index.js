const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/practice', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`mongodb ga ulandi`))
  .catch((err) => console.log(`mongodb ga ulanishda hatolik yuz berdi`, err))

const Author = mongoose.model('Author', new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String
}))
const Book = mongoose.model('Book', new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author"
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
    // boshqa joydan shunday olinadi o'qib populate bilan
    .populate('author', 'firstName -_id')
    .select('author title')

  console.log(book)
}
// createAuthor('Islom', 'Tilovov', 'islomumar225@gmail.com')
// createBook('js', '5f1cba5c088f6a1bf05a34a9')
listBook()

