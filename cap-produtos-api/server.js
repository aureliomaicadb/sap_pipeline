const cds = require('@sap/cds')

cds.on('bootstrap', app => {
  app.use((req, res, next) => {
    const appEnv = process.env.APP_ENV || 'unknown'
    const origin = req.headers.origin || '*'
    const reqHeaders = req.headers['access-control-request-headers']

    res.header('X-Environment', appEnv)
    res.header('Vary', 'Origin')
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH')
    res.header(
      'Access-Control-Allow-Headers',
      reqHeaders || 'Authorization,Content-Type,Accept,Origin,X-Requested-With,apikey'
    )
    res.header('Access-Control-Expose-Headers', 'X-Environment,Content-Type,OData-Version')
    res.header('Access-Control-Max-Age', '600')

    if (req.method === 'OPTIONS') return res.sendStatus(204)
    next()
  })

  app.get('/env', (_req, res) => {
    res.json({ environment: process.env.APP_ENV || 'unknown' })
  })
})

module.exports = cds.server