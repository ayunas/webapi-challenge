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

actionRouter.get('/:id', (req,res) => {
    const id = req.params.id;
    actionDB.get(id)
    .then( action => {
        // if (action) {
            res.status(200).json(action);
        // } else {
        //     res.status(404).json({error : `no user with id #: ${id}`});
        // }    
    })
    .catch( err => {
        res.status(500).json({error : 'server unable to retrive action'});
    })
})

actionRouter.post('/', (req,res) => {
    const newAction = req.body;
    actionDB.insert(newAction)
    .then( newAction => {
        res.status(201).json(newAction);
    })
    .catch( err => {
        res.status(500).json(err.message);
    })
})

actionRouter.put('/', (req,res) => {
    const id = req.body.id
    const updateAction = req.body;
    actionDB.update(id , updateAction)
    .then(updatedAction => {
        if (updatedAction) {
            res.status(200).json(updatedAction);
        } else {
            res.status(404).json({error : `id # ${id} was not found in the database`});
        }
    })
    .catch( err => {
        res.status(500).json({error : err.message})
    })
})





module.exports = actionRouter;