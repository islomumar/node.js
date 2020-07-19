const mongoose = require("mongoose")
mongoose
    .connect("mongodb://localhost/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(`MongoDB ulanish hosil qilindi...`)
    })
    .catch((err) => {
        console.log(`MongoDBga ulanish vaqtida xato ro'y berdi...`, err)
    })
const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    isPublished: Boolean,
    date: { type: Date, default: Date.naw },
})
const Book = mongoose.model("islom", bookSchema)

async function createBook() {
    const book = new Book({
        name: `hello`,
        author: `IslomUmar`,
        tags: ["js", "dasturlash", "node"],
        isPublished: true,
    })
    const savedBook = await book.save()
    console.log(savedBook)
}

async function getBook() {
    const pageNumber = 3
    const pageSize = 10
    const book = await Book
        .find({ author: "IslomUmar" })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
    console.log(book)
}

async function updateBook(id) {
    const book = await Book.findById(id)
    if (!book)
        return

    book.isPublished = false
    book.author = 'farxod'

    const updateBooks1 = await book.save()

    console.log(updateBooks1)
}
// bu o'chirilgan hujjatni qaytarib beriladi
async function deleteBook(id) {
    const result = await Book.findByIdAndRemove({ _id: id })
    console.log(result)
}
// bu isPublished true bo'lgan barcha hujjatlarni o'chiradi
// async function deleteBook(id) {
//     const result = await Book.deleteMany({ isPublished: true })
//     console.log(result)
// }
// bu bitta hujjatni o'chiradi va birichi kegan hujjatni o'chiradi
// async function deleteBook(id) {
//     const result = await Book.deleteOne({ _id: id })
//     console.log(result)
// }

deleteBook('5f0eeec4b2e3b52b6cf8a68c')

