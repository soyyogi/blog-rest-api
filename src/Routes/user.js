const express = require('express');
const route = new express.Router();
const User = require('../Model/User');


route.post('/user', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save()
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

route.get('/user', async (req, res) => {
    try {
        const user = await User.find();
        res.send(user);
    } catch(error) {
        res.status(400).send({Error: error});
    }
})

route.patch('/user/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));

    if (!isValidUpdate) return res.status(400).send({error: 'Invalid Updates'});

    try {
        const user = await User.findById(_id);
        updates.forEach(update => user[update] = req.body[update]);
        await user.save();

        if (!user) return res.status(404).send()
        res.send(user)
    } catch (error) {
        res.status(400).send({Error: error})
    }
})






module.exports = route;