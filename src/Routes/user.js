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