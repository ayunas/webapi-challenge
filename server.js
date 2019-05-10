const express = require('express');

const server = express();
const bodyParser = express.json();

server.use(bodyParser);

server.get('/', (req,res) => {
    res.send(`<h2>Projects Require Action</h2>`);
})


module.exports = server;

