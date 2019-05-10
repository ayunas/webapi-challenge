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

projectRouter.post('/', (req,res) => {
    const newProject = req.body;
    projectDB.insert(newProject)
    .then( newlyCreatedProject => {
        res.status(201).json(newlyCreatedProject);
    })
    .catch( err => {
        res.status(500).json(err.message);
    })
})

projectRouter.put('/', (req,res) => {
    const id = req.body.id;
    const updateToProject = req.body;

    projectDB.update(id, updateToProject)
    .then( updatedProject => {
        if (updatedProject) {
            res.status(202).json(updatedProject);
        } else {
            res.status(404).json({error : `Cannot update. Project with id # ${id} not found`})
        }
        
    })
    .catch( err => {
        res.status(500).json(err.message);
    })
})

projectRouter.delete('/', (req,res) => {
    const id = req.body.id;
    projectDB.remove(id)
    .then( delCount => {
        if (delCount > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({error : `project with id # ${id} not found`});
        }
    })
    .catch( err => {
        res.status(500).json(err);
    })
})

projectRouter.get('/:id/actions' , (req,res) => {
    const id = req.params.id;
    // res.send(req.params.id);
    projectDB.getProjectActions(id)
    .then( actions => {
        res.status(200).json(actions);
    })
    .catch( err => {
        res.status(500).json(err);
    })
})

module.exports = projectRouter;
