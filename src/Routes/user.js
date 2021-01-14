const express = require('express');
const route = new express.Router();
const User = require('../Model/User');
const auth = require('../middleware/Auth');


route.post('/user', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save()
        const token = await user.generateToken()
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

route.get('/user/signin', auth, async (req, res) => {
    try {
        const user = req.user
        const token = await user.generateToken()
        res.send(user);
    } catch(error) {
        res.status(400).send({Error: error});
    }
})

route.get('/user/me', auth, async (req, res) => {
    try {
        res.send(req.user);
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


route.delete('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) {
            res.status(404).send({Error: "User not found"})
        }
        await user.remove()
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = route;