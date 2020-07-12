const fs = require('fs')
fs.writeFile('message.txt', 'Hello world', 'utf8', err => {
    if (err) throw err
    console.log('file yaratildi')
})

fs.rename('message.txt', 'text.txt', err => {
    if (err) throw err

    console.log(`file nomi o'zgardi`)
})
fs.unlink('./text.txt', err => {
    if (err) throw err
    console.log('file o\'chdi')
})
