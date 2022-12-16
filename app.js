const http = require("http");
const PORT = process.env.PORT || 3058;

/*************************** Route Callbacks ******************************/
const route1Cb = (req, res) => { 
    res.writeHead(200, {"Content-Type": "application/json"});
    // res.writeHead(200, {'Content-Length': Buffer.byteLength(bodyToSend), 'Content-Type': 'text/plain'});
    res.write(`Hi, you've hit route1 with ${req.method} method`);
    res.end();
}

const route2Cb = async (req, res) => {
    const res23 = await getRequestBody(req);
    console.log(res23);
    res.write(JSON.stringify(res23));
    res.end();
}

const route3Cb = (req, res) => {
    var res23 = '';
    // req.on('data', (requestChunk) => { console.log(requestChunk); res23 = res23 + requestChunk});
    req.on('data', requestChunk => res23 = res23 + requestChunk);
    req.on('end', () => {
        res.write(JSON.stringify(res23));
        res.end();
    })    
}
/*************************************************************************** */







/******************************* UTILITY Functions ***************************** */
const reqCbFn = async (req, res) => {
    var cbFn = findCbFromReqUrl(req.url);
    return await cbFn(req, res);
}
const findCbFromReqUrl = (url) => (routes.find(route => route.path == url)).cbFn

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

const routes = [
    { path: "path23", method: "method23", cbFn: {} },
    { path: "/route1", method: "GET", cbFn: route1Cb },
    { path: "/route2", method: "PUT", cbFn: route2Cb },
    { path: "/route3", method: "PUT", cbFn: route3Cb },
];
/*************************************************************************** */




    
    
/******************************* SERVER SETUP *******************************/
const server = http.createServer();
server.on('request', reqCbFn);
server.listen(PORT, () => {
    console.log(`server23 started on port ${PORT}`);
})
/*************************************************************************** */

// https://www.section.io/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-express/
