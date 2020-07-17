require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())

const books = [
    { id: 1, name: 'onatili' },
    { id: 2, name: 'matematika' },
    { id: 3, name: 'fizika' }
]

app.get('/', (req, res) => {
    res.send('salom')
})

app.get('/api/books', (req, res) => {
    res.send(books)
})
app.post('/api/books', (req, res) => {
    const book = {
        id: books.length + 1,
        name: req.body.name
    }
    books.push(book)
    res.status(201).send(books)
})
app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id))
    if (!book) {
        return res.status(404).send(`kitob topilmadi...`)
    }
    res.send(book)
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`${port}portni eshitishni boshladim...`)
})