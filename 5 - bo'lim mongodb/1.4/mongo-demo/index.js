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
    author: String,
    tags: [String],
    isPublished: Boolean,
    name: { type: String, required: true },
    date: { type: Date, default: Date.naw },
    price: {
        type: Number,
        required: function () {
            return this.isPublished
        }
    }
})
const Book = mongoose.model("book", bookSchema)

async function createBook() {
    const book = new Book({
        name: `hello`,
        author: `IslomUmar`,
        tags: ["js", "dasturlash", "node"],
        isPublished: true,
    })

    try {
        // await book.validate()
        const savedBook = await book.save()
        console.log(savedBook)
    }
    catch (ex) {
        console.log(ex)
    }
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
createBook()
// deleteBook('5f0eeec4b2e3b52b6cf8a68c')

