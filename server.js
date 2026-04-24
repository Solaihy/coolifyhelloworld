const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
    // Generate a random string (alphanumeric)
    const randomString = Math.random().toString(36).substring(2, 15);
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Your random string: ${randomString}\n`);
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
