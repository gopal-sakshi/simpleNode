suppose, incoming request has body/payload

route.put('/addUser', (req, res) => {
    console.log(req);
    res.send('user added');
});

// well this is not how it works...
    request object is emitted in streams...
    every time a stream is received 