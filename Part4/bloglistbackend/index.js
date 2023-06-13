const config = require('./utils/config')
const app = require('./app')
const logger = require('./utils/logger')
//const { unknownEndpoint, requestLogger } = require('./utils/middleware')


const port = config.PORT || 3003
app.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})