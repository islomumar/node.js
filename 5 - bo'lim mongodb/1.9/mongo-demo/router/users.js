const express = require('express')
const router = express.Router()
const { validate, User } = require('../module/user')

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


module.exports = router