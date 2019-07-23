const http = require('http');
const fs = require('fs');
const url = require('url');

const port = process.env.PORT || 3000;

const readFile = (url, response) => {
    fs.readFile(url, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            response.statusCode = 204;
            response.end(JSON.stringify(err));
        } else {
            console.log(url);
            response.writeHead(200);
            response.end(data);
        }
    });
};

const server = http.createServer(function (request, response) {
    const path = url.parse(request.url, true).pathname.replace(/^\/+|\/+$/g, '');
    readFile(path, response);
});

server.listen(port);
console.log(`server started on ${port} port`);