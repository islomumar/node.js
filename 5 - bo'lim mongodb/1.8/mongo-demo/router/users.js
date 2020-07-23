const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Joi = require('joi')

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

router.get('/', async (req, res) => {
    const user = await User.find().sort('name')
    res.send(user)
})
router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    let user = new User({
        name: req.body.name,
        isVep: req.body.isVep,
        phone: req.body.phone
    })

    user = await user.save()

    res.status(201).send(user)
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    let user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isVep: req.body.isVep,
        phone: req.body.phone
    }, { new: true })
    if (!user)
        res.status(404).send(`Berilgan Id bo'yicha topilmadi`)

    res.status(201).send(user)
})

router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user)
        res.status(404).send(`Berilgan Id bo'yicha topilmadi`)

    res.status(201).send(user)
})

function validate(category) {
    const schema = {
        name: Joi.string().required().min(3),
        isVep: Joi.required(),
        phone: Joi.string().required().min(3)
    }
    return Joi.validate(category, schema)
}
module.exports = router