const express = require('express');

const actionRouter = express.Router();

const actionDB = require('./data/helpers/actionModel');

actionRouter.get('/', (req,res) => {
    actionDB.get()
    .then( actions => {
        res.status(200).json(actions);
    })
    .catch( err => {
        status(500).json({error : 'server unale to retrieve actions'});
    })    
})

module.exports = actionRouter;