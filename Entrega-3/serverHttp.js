const http = require('http');

const server = http.createServer( (request, response) => {
    response.end('Hi!')
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`>>>> Server listening at port http://localhost:${PORT}`)
});