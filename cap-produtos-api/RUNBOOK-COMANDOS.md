# Runbook de Comandos - CAP API no SAP BTP

## 1) Entrar no projeto

```powershell
cd "C:\Users\aurelio.maica\Documents\sap\cap-produtos-api"
```

## 2) Rodar local

### Instalar dependencias (se necessario)
```powershell
npm install
```

### Subir API local
```powershell
npm run watch
```

### Testes locais (novo terminal)
```powershell
curl.exe -i "http://localhost:4004/env"
curl.exe -i "http://localhost:4004/odata/v4/catalog/Produtos"
```

### Se a porta estiver ocupada
```powershell
$env:PORT=4005; npm run watch
curl.exe -i "http://localhost:4005/env"
curl.exe -i "http://localhost:4005/odata/v4/catalog/Produtos"
```

## 3) Login e target no Cloud Foundry

```powershell
cf login -a "https://api.cf.us10-001.hana.ondemand.com"
cf target -o "2aeea754trial" -s "dev"
cf target
```

## 4) Deploy para Cloud Foundry (DEV)

```powershell
cf push -f manifest-dev.yml
```

### Verificar status/rota
```powershell
cf apps
cf app cap-produtos-api-dev
```

## 5) Logs da API

### Logs recentes
```powershell
cf logs cap-produtos-api-dev --recent
```

### Logs em tempo real
```powershell
cf logs cap-produtos-api-dev
```

## 6) Testes de endpoint em producao (curl)

### URL base atual
```text
https://cap-produtos-api-dev-agile-squirrel-zh.cfapps.us10-001.hana.ondemand.com
```

### Health/env
```powershell
curl.exe -i "https://cap-produtos-api-dev-agile-squirrel-zh.cfapps.us10-001.hana.ondemand.com/env"
```

### Dados OData
```powershell
curl.exe -i "https://cap-produtos-api-dev-agile-squirrel-zh.cfapps.us10-001.hana.ondemand.com/odata/v4/catalog/Produtos"
```

### Preflight CORS (Build Apps)
```powershell
curl.exe -i -X OPTIONS "https://cap-produtos-api-dev-agile-squirrel-zh.cfapps.us10-001.hana.ondemand.com/odata/v4/catalog/Produtos" -H "Origin: https://appgyver.com" -H "Access-Control-Request-Method: GET" -H "Access-Control-Request-Headers: authorization,content-type,apikey"
```

### GET com Origin (teste CORS real)
```powershell
curl.exe -i "https://cap-produtos-api-dev-agile-squirrel-zh.cfapps.us10-001.hana.ondemand.com/odata/v4/catalog/Produtos" -H "Origin: https://appgyver.com"
```

## 7) Git: commit e push para acionar webhook/pipeline

```powershell
git status
git add .
git commit -m "chore: update CAP API and deploy config"
git push origin develop
```

### Opcional: enviar para main
```powershell
git push origin main
```

## 8) Verificar webhook/pipeline acionado

### GitHub CLI (opcional)
```powershell
gh run list --limit 10
gh run view --log
```

### SAP CI/CD
- Validar no job `sap_pipeline_dev` se abriu novo build apos o push.

## 9) Troubleshooting rapido

### Ver apps e servicos
```powershell
cf apps
cf services
```

### Reiniciar app
```powershell
cf restart cap-produtos-api-dev
```

### Se HANA estiver parado (erro comum)
- Iniciar a instancia HANA Cloud no BTP Cockpit.
- Repetir o teste curl de `/odata/v4/catalog/Produtos`.


cf logs cap-produtos-api-dev

cf logs cap-produtos-api-dev --recent | findstr /I "/odata /env GET POST OPTIONS [API_PRODUTOS]"
