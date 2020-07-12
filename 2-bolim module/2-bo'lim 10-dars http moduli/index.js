const http = require('http')
const { Socket } = require('dgram')
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Asosiy qism')
        res.end()
    }
    if (req.url === '/api/books') {
        res.write(JSON.stringify(['islom', 'Elyor', 'ziyod']))
        res.end()
    }
})
server.listen(8000)
console.log(`${server.address().port} portni eshitishni boshladim...`) 