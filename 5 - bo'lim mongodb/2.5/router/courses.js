const express = require('express')
const router = express.Router()
const { Courses, validate } = require('../module/courses')
const { Category } = require('../module/categories')

router.get('/', async (req, res) => {
    const courses = await Courses.find().sort('title')
    res.status(201).send(courses)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const category = await Category.findById(req.body.categoryId)

    if (!category)
        return res.status(400).send(`Berilgan Id bo'yicha topilmadi.`)

    let courses = new Courses({
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name
        },
        trainer: req.body.trainer,
        status: req.body.status,
        tags: req.body.tags
    })
    const result = await courses.save()
    res.status(201).send(result)
})
module.exports = router