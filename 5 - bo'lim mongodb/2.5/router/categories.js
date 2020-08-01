const express = require('express')
const router = express.Router()
const { Category, validate } = require('../module/categories')

router.get('/', async (req, res) => {
    const category = await Category.find().sort('name')
    res.send(category)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    let category = new Category({
        name: req.body.name
    })

    category = await category.save()
    res.status(201).send(category)
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    let category = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })

    if (!category)
        return res.status(404).send('berilgan Id bo\'yicha topilmadi')

    res.status(201).send(category)
})

router.delete('/:id', async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id)
    if (!category)
        return res.status(404).send(`berilgan Id bo'yicha topulmadi`)

    res.send(category)
})

module.exports = router