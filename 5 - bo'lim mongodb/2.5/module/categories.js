const Joi = require('joi')
const mongoose = require('mongoose')

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
})
const Category = mongoose.model('categories', categoriesSchema)

function validateSchema(category) {
    const schema = {
        name: Joi.string().required().min(3)
    }
    return Joi.validate(category, schema)
}
exports.schema = categoriesSchema
exports.Category = Category
exports.validate = validateSchema