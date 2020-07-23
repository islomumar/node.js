const Joi = require('joi')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10
    },
    isVep: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10
    }
})

const User = mongoose.model('user', UserSchema)

function validate(category) {
    const schema = {
        name: Joi.string().required().min(3),
        isVep: Joi.required(),
        phone: Joi.string().required().min(3)
    }
    return Joi.validate(category, schema)
}

exports.validate = validate
exports.User = User