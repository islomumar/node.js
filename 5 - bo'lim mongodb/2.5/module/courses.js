const { schema } = require('./categories')
const mongoose = require('mongoose')
const Joi = require('joi')

const coursesSchema = new mongoose.Schema({
    tags: {
        type: [String],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: schema,
        required: true
    },
    trainer: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

const Courses = mongoose.model('courses', coursesSchema)

function validate(id) {
    const schema = {
        title: Joi.string().required().min(3),
        categoryId: Joi.required(),
        trainer: Joi.string().required().min(3),
        status: Joi.string().required().min(3),
        tags: Joi.array().items(Joi.string())
    }
    return Joi.validate(id, schema)
}

exports.validate = validate
exports.Courses = Courses