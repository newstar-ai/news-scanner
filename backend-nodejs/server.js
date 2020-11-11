const fs = require("fs")
const https = require("https")
const http = require("http")
const app = require('./app')

const options = {
    key: fs.readFileSync(process.env.CERT_PRIVATEKEY_PATH),
    cert: fs.readFileSync(process.env.CERT_PATH),
    passphrase: process.env.CERT_PHRASE
}

// const server =  https.createServer(options, app)
const host_name = process.env.SERVER_HOST_NAME
const port = process.env.SERVER_PORT

const server = https.createServer(options, app)

server.listen(port, host_name, () => {
    console.log(`Server start at ${host_name} and port ${port}`)
})