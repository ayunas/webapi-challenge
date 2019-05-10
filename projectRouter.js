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

projectRouter.get('/:id', (req,res) => {
    const id = req.params.id;
    projectDB.get(id)
    .then( project => {
        if (project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({error : `project with id # ${id} was not found`})
        }
    })
    .catch( err => {
        res.status(500).json(err.message);
    })
})


module.exports = projectRouter;