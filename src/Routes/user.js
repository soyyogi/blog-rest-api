const express = require('express');
const route = new express.Router();
const User = require('../Model/User');
const auth = require('../middleware/Auth');


route.post('/user/signup', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save()
        const token = await user.generateToken()
        res.send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

route.get('/user/signin', async (req, res) => {
    try {
        const user = await User.findUserByIdPassword(req.body.email, req.body.password)
        const token = await user.generateToken()
        res.send({user, token});
    } catch(error) {
        res.status(401).send({error: 'Invalid username and password'});
    }
})

route.get('/user/signout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token != req.token)
        req.user.save()
        res.status(200).send({status: "Successfully signed out"})
    } catch (error) {
        res.status(500).send(error)
    }
})

route.get('/user/me', auth, async (req, res) => {
    try {
        res.send(req.user);
    } catch(error) {
        res.status(400).send({Error: error});
    }
})

route.patch('/user/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));

    if (!isValidUpdate) return res.status(400).send({error: 'Invalid Updates'});

    try {
        const user = req.user;
        updates.forEach(update => user[update] = req.body[update]);
        await user.save();

        if (!user) return res.status(404).send()
        res.send(user)
    } catch (error) {
        res.status(400).send({Error: error})
    }
})


route.delete('/user/me', auth, async (req, res) => {
    try {
        const user = req.user
        await user.remove()
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = route;