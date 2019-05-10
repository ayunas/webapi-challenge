const express = require('express');

const projectRouter = express.Router();

const projectDB = require('./data/helpers/projectModel');


projectRouter.get('/', (req,res) => {
    projectDB.get()
    .then( projects => {
        res.status(200).json(projects);
    })
    .catch( err => {
        res.status(500).json(err);
    })
})

module.exports = projectRouter;