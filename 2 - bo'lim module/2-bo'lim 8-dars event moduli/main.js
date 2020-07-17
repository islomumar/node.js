const Logger = require('./logger')
const logger = new Logger()

logger.on('messageLogged', props => {
    console.log('Listener bajarildi...', props)
})

logger.log('message')