const fs = require('fs')
const path = require('path')
const hana = require('@sap/hana-client')

function getCredentials() {
  if (process.env.VCAP_SERVICES) {
    const vcap = JSON.parse(process.env.VCAP_SERVICES)
    const svc = (vcap.hana || [])[0]
    if (svc && svc.credentials) return svc.credentials
  }

  const envPath = path.join(process.cwd(), 'default-env.json')
  const cfg = JSON.parse(fs.readFileSync(envPath, 'utf8'))
  return cfg.VCAP_SERVICES.hana[0].credentials
}

module.exports = (srv) => {
  srv.on('READ', 'Produtos', async () => {
    console.log('[API_PRODUTOS] READ /Produtos - inicio')
    const c = getCredentials()
    const conn = hana.createConnection()
    const connStr = `ServerNode=${c.host}:${c.port};UID=${c.user};PWD=${c.password};encrypt=true;sslValidateCertificate=false`

    return await new Promise((resolve, reject) => {
      conn.connect(connStr, (err) => {
        if (err) {
          console.error('[API_PRODUTOS] erro ao conectar no HANA:', err.message)
          return reject(err)
        }

        conn.exec('SELECT ID, NOME FROM PRODUTOS ORDER BY ID', (e, rows) => {
          conn.disconnect()
          if (e) {
            console.error('[API_PRODUTOS] erro na query PRODUTOS:', e.message)
            return reject(e)
          }
          console.log(`[API_PRODUTOS] sucesso - registros retornados: ${rows.length}`)
          resolve(rows)
        })
      })
    })
  })
}