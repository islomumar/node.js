const Joi = require('joi')
require('dotenv').config()
const { log, auth } = require('./logger')
const express = require('express')
const app = express()
const helmet = require('helmet')
const morgan = require('morgan')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    console.log('logger ishlaypti...')
}

app.use(auth)
app.use(helmet())

console.log(process.env.NODE_ENV)
console.log(app.get('env'))

const books = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
]
app.get('/', (req, res) => {
    res.send('salom')
})

app.get('/api/books', (req, res) => {
    res.send(books)
})

app.get('/api/books/:id', (req, res) => {
    const book = requiredBook(req.params.id)
    if (!book)
        return res.status(404).send('bunday kitob mavjud emas.')
    res.send(book)
})

app.post('/api/books', (req, res) => {
    const { error } = validateBook(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const book = {
        id: books.length + 1,
        name: req.body.name
    }
    books.push(book)
    res.status(201).send(book)
})

app.put('/api/books/:id', (req, res) => {
    const book = requiredBook(req.params.id)
    if (!book)
        return res.status(404).send(`kitob topilmadi?`)

    const { error } = validateBook(req.body)
    if (error)
        return res.status(401).send(error.details[0].message)

    book.name = req.body.name

    res.status(201).send(book)

})

app.delete('/api/books/:id', (req, res) => {
    const book = requiredBook(req.params.id)
    if (!book)
        return res.status(404).send(`kitob topilmadi?`)

    const bookIndex = books.indexOf(book)
    books.splice(bookIndex, 1)

    res.send(book)
})

function validateBook(book) {
    const bookSchema = {
        name: Joi.string().required().min(3)
    }
    return Joi.validate(book, bookSchema)
}

function requiredBook(book) {
    return books.find(b => b.id === parseInt(book))
}

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`${port}portni eshitishni boshladim...`)
})