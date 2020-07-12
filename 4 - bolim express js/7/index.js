const Joi = require('joi')
require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())

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
    const book = books.find(b => b.id === parseInt(req.params.id))
    if (!book)
        res.status(404).send(`kitob mavjud emas`)
    res.send(book)

})
app.post('/api/books', (req, res) => {
    const bookSchema = {
        name: Joi.string().required().min(3)
    }
    
    const { error } = Joi.validate(req.body, bookSchema)

    if (error) {
        res.status(400).send(error.details[0].message)
    } 

    const book = {
        id: books.length + 1,
        name: req.body.name
    }
    books.push(book)
    res.status(201).send(book)
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`${port}portni eshitishni boshladim`)
}) 
