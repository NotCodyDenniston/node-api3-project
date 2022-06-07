// require your server and launch it
const server = require('./api/server')
const port = 7000

server.listen(port, () => console.log(`server is running on ${port}` ))