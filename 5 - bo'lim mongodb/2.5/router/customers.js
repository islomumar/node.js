const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const { Users, usersSchema } = require('../module/cutomers')

router.get('/', async (req, res) => {
    const users = await Users.find().sort('name')
    res.send(users)
})

router.post('/', async (req, res) => {
    const { error } = validateSchema(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    let users = new Users({
        name: req.body.name,
        isVep: req.body.isVep,
        phone: req.body.phone,
    })

    const result = await users.save()

    res.status(201).send(result)
})

router.put('/:id', async (req, res) => {
    const { error } = validateSchema(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    let users = await Users.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isVep: req.body.isVep,
        phone: req.body.phone,
    }, { new: true })
    if (!users)
        return res.status(404).send(`Berilgan Id bo'yicha topilmadi`)
    res.status(201).send(users)
})

router.delete('/:id', async (req, res) => {
    const users = await Users.findByIdAndDelete(req.params.id)
    if (!users)
        res.status(404).send(`Berilgan Id bo'yicha topilmadi`)

    res.status(201).send(users)
})

function validateSchema(users) {
    const schema = {
        name: Joi.string().required().min(3),
        isVep: Joi.boolean().required(),
        phone: Joi.string().required().min(3)
    }
    return Joi.validate(users, schema)
}

module.exports = router