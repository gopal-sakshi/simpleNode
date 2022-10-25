const http = require("http");
const PORT = process.env.PORT || 3058;

const server = http.createServer(async (req, res) => {
    const bodyToSend = "gopal23"
    if(req.url === '/route1', req.method === "GET") {
        res.writeHead(200, {"Content-Type": "application/json"});
        // res.writeHead(200, {'Content-Length': Buffer.byteLength(bodyToSend), 'Content-Type': 'text/plain'});
        res.write(`Hi, you've hit route1 with ${req.method} method`);
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`server23 started on port ${PORT}`);
})

// https://www.section.io/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-express/
