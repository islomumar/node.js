const mongoose = require("mongoose")
// .connect bu serverga bog'lanishni taminlaydi
// then bu olib keladi
// catch bu hatoni chiqaradi
// mongoose bu server bilan bo'g'lanish uchun kerak bu paket
// .connect("mongodb://localhost/test", { test bu document ochib beradi

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
// bu schema bu anadaza yaratib beriladi
const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    isPublished: Boolean,
    date: { type: Date, default: Date.naw },
})
// model bu object yaratish uchun kerak
// islom bu documentni bir polkasi
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
// createBook()
async function getBook() {
    const book = await Book.find({
        author: `IslomUmar`, isPublished: true
    })
        .limit(2)
        .sort({ name: 1 })
        .select({ tags: 1, name: 1 })
    // 1 bu true bo'ladi shunday
    // 0 bo'lsa shu keydan boshqasini chaqir bo'ldi agar 0 qo'yilsa
    console.log(book)
}
getBook()