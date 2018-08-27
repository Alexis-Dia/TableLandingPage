const logger = require('../lib/logger')

logger.info('Starting server...')
require('../../server/main').listen(9996, () => {
  logger.success('Server is running at http://localhost:9996')
})
