const Joi = require('joi')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10,
    }
})

const Book = mongoose.model('Book', BookSchema)

router.get('/', async (req, res) => {
    const book = await Book.find().sort('name')
    res.send(book)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    let book = new Book({
        name: req.body.name
    })

    book = await book.save()

    res.status(201).send(book)
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    book = await Book.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!book)
        res.status(404).send(`Berilgan Id topilmadi`)

    res.status(201).send(book)
})

router.delete('/:id', async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id)
    if (!book)
        res.status(404).send(`Berilgan Id topilmadi`)

    res.send(book)
})

function validate(category) {
    const schema = {
        name: Joi.string().required().min(3)
    }
    return Joi.validate(category, schema)
}
module.exports = router