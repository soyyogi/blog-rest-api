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



module.exports = route;