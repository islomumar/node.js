const { EventEmitter } = require('events')

const emitter = new EventEmitter()

emitter.on('messageLogged', props => {
    console.log('Listener chaqarildi', props)
})

emitter.emit('messageLogged', { id: 1, url: 'http://168...' })









