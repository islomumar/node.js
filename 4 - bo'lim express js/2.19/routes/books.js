const Joi = require("joi");
const express = require("express");
const router = express.Router();

const books = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
];

router.get("/", (req, res) => {
    res.send(books);
});

router.get("/:id", (req, res) => {
    const book = requiredBook(req.params.id);
    if (!book) return res.status(404).send("bunday kitob mavjud emas.");
    res.send(book);
});

router.post("/", (req, res) => {
    const { error } = validateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const book = {
        id: books.length + 1,
        name: req.body.name,
    };
    books.push(book);
    res.status(201).send(book);
});

router.put("/:id", (req, res) => {
    const book = requiredBook(req.params.id);
    if (!book) return res.status(404).send(`kitob topilmadi?`);

    const { error } = validateBook(req.body);
    if (error) return res.status(401).send(error.details[0].message);

    book.name = req.body.name;

    res.status(201).send(book);
});

router.delete("/:id", (req, res) => {
    const book = requiredBook(req.params.id);
    if (!book) return res.status(404).send(`kitob topilmadi?`);

    const bookIndex = books.indexOf(book);
    books.splice(bookIndex, 1);

    res.send(book);
});

function validateBook(book) {
    const bookSchema = {
        name: Joi.string().required().min(3),
    };
    return Joi.validate(book, bookSchema);
}

function requiredBook(book) {
    return books.find((b) => b.id === parseInt(book));
}

module.exports = router;