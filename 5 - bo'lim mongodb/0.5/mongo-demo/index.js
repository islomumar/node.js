const mongoose = require("mongoose");
// .connect bu serverga bog'lanishni taminlaydi
// then bu olib keladi
// catch bu hatoni chiqaradi
// mongoose bu server bilan bo'g'lanish uchun kerak bu paket
mongoose
    .connect("mongodb://localhost/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(`MongoDB ulanish hosil qilindi...`);
    })
    .catch((err) => {
        console.log(`MongoDBga ulanish vaqtida xato ro'y berdi...`, err);
    });

const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    isPublished: Boolean,
    date: { type: Date, default: Date.naw },
});
const Book = mongoose.model("Book", bookSchema);

async function createBook() {
    const book = new Book({
        name: `nodeJs - To'liq qo'lanma`,
        author: `IslomUmar`,
        tags: ["js", "dasturlash", "node"],
        isPublished: true,
    })
    const savedBook = await book.save()
    console.log(savedBook)
}
createBook()