import express from 'express';
import Task from '../models/taskModel.js';

const taskRouter = express.Router();

taskRouter.post('/', async (req, res) => {
    try {
        if(!req.body.title || !req.body.description) {
            return res.status(422).send({message: "All fields are required!"})
        }
        const newTask = {
            title: req.body.title,
            description: req.body.description,
        };
        const task = await Task.create(newTask);
        return res.status(200).send({task});
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
});

taskRouter.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).send({tasks});
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
});

taskRouter.put('/:id', async (req, res) => {
    try {
        if(!req.body.title || !req.body.description) {
            return res.status(422).send({message: "All fields are required!"});
        }
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(500).send({message: "The provided id is not valid!"});
        }
        const result = await Task.findByIdAndUpdate(id, req.body);
        if(!result) {
            return res.status(404).send({message: "Task not found!"});
        }
        return res.status(200).send({message: "Task updated successfully!"});
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
});

taskRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(500).send({message: "The provided id is not valid!"});
        }
        const result = await Task.findByIdAndDelete(id, req.body);
        if(!result) {
            return res.status(404).send({message: "Task not found!"});
        }
        return res.status(200).send({message: "Task deleted successfully!"});
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
});

taskRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(500).send({message: "The provided id is not valid!"});
        }
        const task = await Task.findById(id);
        return res.status(200).send({task});
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
});

export default taskRouter;