const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

const bookRoute = require('./router/categories')

mongoose.connect('mongodb://localhost/shop', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`mongodb ga ulandi`))
    .catch((err) => console.log(`mongodb ga ulanishda hatolik ro'y berdi`, err))


app.use(express.json())
app.use('/api/books', bookRoute)
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`${port} portni eshitishni boshladi`))