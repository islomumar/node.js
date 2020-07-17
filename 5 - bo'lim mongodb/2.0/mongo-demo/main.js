const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`serverga ulandi...`)
    })
    .catch((err) => {
        console.log(`hatolik yuz berdi...`, err)
    })
const SizeSchema = new mongoose.Schema({
    h: Number,
    w: Number,
    uom: String
})

const InventorySchema = new mongoose.Schema({
    item: String,
    qty: Number,
    size: SizeSchema,
    status: String
}, { collection: 'inventory' })

const Inventory = mongoose.model('inventory', InventorySchema)

async function getInventory() {
    return await Inventory
        .find({ status: "A" })
        .sort({ item: 1 })
        .select({ item: 1, qty: 1, _id: 0 })
}

async function run() {
    const item = await getInventory()

    console.log(item)
}
run()