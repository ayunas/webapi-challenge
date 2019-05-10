const express = require('express');
const actionRouter = require('./actionRouter');
const projectRouter = require('./projectRouter');
const server = express();
const bodyParser = express.json();

server.use(bodyParser);

server.use('/actions', actionRouter);

server.get('/', (req,res) => {
    res.send(`<h2>Projects Require Action</h2>`);
})

// server.use('/project', projectRouter);
module.exports = server;

