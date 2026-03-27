const fs = require('fs');
const hana = require('@sap/hana-client');

const cfg = JSON.parse(fs.readFileSync('default-env.json', 'utf8'));
const c = cfg.VCAP_SERVICES.hana[0].credentials;

const conn = hana.createConnection();
const connStr = `ServerNode=${c.host}:${c.port};UID=${c.user};PWD=${c.password};encrypt=true;sslValidateCertificate=false`;

conn.connect(connStr, (err) => {
  if (err) {
    console.error('CONNECT_ERROR:', err.message);
    process.exit(1);
  }

  conn.exec('SELECT TOP 20 ID, NOME FROM PRODUTOS', (e, rows) => {
    if (e) {
      console.error('QUERY_ERROR:', e.message);
      process.exit(2);
    }
    console.log(JSON.stringify(rows));
    conn.disconnect();
  });
});