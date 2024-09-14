const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Create a new todo
router.post('/', async (req, res) => {
    const { task } = req.body;
    try {
        const newTodo = new Todo({
            task
        });
        await newTodo.save();
        res.json(newTodo);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a todo
router.put('/:id', async (req, res) => {
    const { task, isCompleted } = req.body;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { task, isCompleted }, { new: true });
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
