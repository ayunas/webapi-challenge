const express = require('express');
const actionRouter = require('./actionRouter');
const projectRouter = require('./projectRouter');
const server = express();
const bodyParser = express.json();

server.use(bodyParser);

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

server.get('/', (req,res) => {
    res.send(`<h2>Projects Require Action</h2>`);
})

server.use('/actions', actionRouter);
server.use('/projects', projectRouter)

module.exports = server;

