const http = require("http");
const PORT = process.env.PORT || 3058;

const server = http.createServer(async (req, res) => {
    const bodyToSend = "gopal23"
    if(req.url === '/route1' && req.method === "GET") {
        res.writeHead(200, {"Content-Type": "application/json"});
        // res.writeHead(200, {'Content-Length': Buffer.byteLength(bodyToSend), 'Content-Type': 'text/plain'});
        res.write(`Hi, you've hit route1 with ${req.method} method`);
        res.end();
    }
    if(req.url === '/route2') {
        const res23 = await getRequestBody(req);
        console.log(res23);
        res.write(JSON.stringify(res23));
        res.end();
    }
});

function getRequestBody(reqObj) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";            
            reqObj.on("data", (chunk) => { body += chunk.toString(); });            
            reqObj.on("end", () => { resolve(body); });
        } catch (error) {
            reject(error);
        }
    });
}


server.listen(PORT, () => {
    console.log(`server23 started on port ${PORT}`);
})

// https://www.section.io/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-express/
