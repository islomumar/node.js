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
async function getBook() {
    const book = await Book
        .find({ author: /^I/ })   // Muallifning ismi F harfidan boshlanga hujjatlarni olib beradi
        .find({ author: /od$/i }) // Muallifning ismi od harflari bilan tamomlangan hujjatlarni olib beradi 
        .find({ author: /.*ham.*/i }) // Muallifning ismida ham so'zi uchragan hujjatni olinadi
        // .find({ author: "IslomUmar" })
        .limit(2)
        .sort({ name: 1 })
        .countDocuments()
    console.log(book)
}
getBook()