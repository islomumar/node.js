const mongoose = require('mongoose')
const Joi = require('joi')

const BookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10,
    }
})

const Book = mongoose.model('Book', BookSchema)

function validate(category) {
    const schema = {
        name: Joi.string().required().min(3)
    }
    return Joi.validate(category, schema)
}

exports.Book = Book
exports.validate = validate