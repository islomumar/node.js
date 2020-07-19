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
const Book = mongoose.model("book", bookSchema)

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
    // 1chi usuli
    book.isPublished = false
    book.author = 'farxod'
    // 2chi usuli
    // book.setOptions({
    //     isPublished = false,
    //     author = 'farxod'
    // })
    const updateBooks1 = await book.save()

    console.log(updateBooks1)
}

// 2chi usuli hujjatni to'g'ridan to'g'ri  izlab o'tirmasdan shunday yangilash
async function updateBook2(id) {
    // id bu filter vazifasini o'tayapti
    // keyingi argument bu yangilanishi kerak bo'lgan document
    const result = await Book.update({ _id: id }, {
        $set: { author: 'Islom', isPublished: true } // shu joyda yangilanishi kerak bo'lgan keylar
    })
    console.log(result)
}

updateBook2('5f0eee2cb3ce9d29e44eb132')

