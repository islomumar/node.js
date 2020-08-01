const Joi = require('joi')
const mongoose = require('mongoose')


const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
    },
    isVep: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
    },
})

const Users = mongoose.model('customers', usersSchema)

function validateSchema(users) {
    const schema = {
        name: Joi.string().required().min(3),
        isVep: Joi.boolean().required(),
        phone: Joi.string().required().min(3)
    }
    return Joi.validate(users, schema)
}
exports.Users = Users
exports.validateSchema = validateSchema