const mongoose = require('mongoose')
const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()

const categoriesRoute = require('./router/categories')
const customersRun = require('./router/customers')
const coursesRun = require('./router/courses')

mongoose.connect('mongodb://localhost/practice', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`mongodb ga ulandi`))
    .catch(err => console.log(`mongodb ga ulanishda hatolik uz berdi`, err))

app.use('/api/categories', categoriesRoute)
app.use('/api/customers', customersRun)
app.use('/api/courses', coursesRun)

mongoose.set('useFindAndModify', false);
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`${port} portni eshitishni boshladi`))