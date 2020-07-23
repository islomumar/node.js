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
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (val, callback) {
                setTimeout(() => {
                    const result = val && val.length > 0
                    callback(result)
                }, 10)
            },
            message: `Kitobni kamida bitta tegi bo'lishi kerak`
        }
    },
    isPublished: Boolean,
    name: { type: String, required: true },
    date: { type: Date, default: Date.naw },
    price: {
        type: Number,
        required: function () {
            return this.isPublished
        },
        min: 10,
        max: 300,
        // get bu qiymatni qabul qildi
        get: val => Math.round(val),
        // set bu kelayotgan qiymatni o'zgartiradi
        set: (val) => Math.round(val) + 2
    },
    category: {
        type: String,
        required: true,
        enum: ['CLASSIC', 'SHER', 'SHEEP'],
        // hamma harflar katta harfda databazga joylanadi
        // agarda enum ni arraydagi so'zlar hammasi katta harflarda bo'lsagina 
        // shu pasdagi uppercase ishlaydi bo'lmasa hattolik yuz beradi
        // kegin lowercase degan narsa bor arrayni ichadagilar ham kichkina bo'lishi kerak
        uppercase: true,
        // trim bu oldida va ohirda probel bo'lsa shuni qirqib tashlaydi
        // trim: true,
    }
})
const Book = mongoose.model("book", bookSchema)

async function createBook() {
    const book = new Book({
        name: `hello`,
        author: `IslomUmar`,
        tags: ['salom', 'good'],
        isPublished: true,
        price: 100,
        category: 'sheep'
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
async function deleteBook(id) {
    const result = await Book.findByIdAndRemove({ _id: id })
    console.log(result)
}
createBook()
// deleteBook('5f0eeec4b2e3b52b6cf8a68c')

