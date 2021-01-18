const express = require('express');
const route = new express.Router();
const User = require('../Model/User');
const Auth = require('../middleware/Auth');


route.get('/', (req, res) => {
    res.render('signup');
})

route.post('/user/signup', async (req, res) => {
    if(req.body.password != req.body['confirm-password']){
        res.render('signup-error', {
            data: req.body,
            error: 'Password doesn\'t match!'
        })
    }
    delete req.body['confirm-password']
    delete req.body.checkbox
    const user = new User(req.body);
    try {
        await user.save()
        const token = await user.generateToken()
        res.render('profile', {user, token})
    } catch (error) {
        res.status(400).render('signup-error', {
            data: req.body,
            error : error.message
        })
    }
})

route.post('/user/me', Auth, async (req, res) => {
    try {
        res.render('profile', {
            user: req.user,
            token: req.token
        });
    } catch(error) {
        res.status(400).send({Error: error});
    }
})

route.post('/user/signout', Auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token != req.token)
        req.user.save()
        res.render('signin', {status: "Successfully signed out"})
    } catch (error) {
        res.status(500).send(error)
    }
})

route.post('/user/signin', async (req, res) => {
    try {
        const user = await User.findUserByIdPassword(req.body.email, req.body.password);
        const token = await user.generateToken();
        res.render('profile', {user, token})
    } catch(error) {
        res.status(401).render('signin', {status: 'Invalid username and password'});
    }
})

route.get('/signin', (req, res) => {
    res.render('signin', {status: 'Please provide email and password'})
})

route.post('/user/me/delete', Auth, async (req, res) => {
    try {
        const user = req.user
        await user.remove()
        res.render('signin', {status: "Successfully deleted your account"})
    } catch (error) {
        res.status(500).send(error)
    }
})

route.post('/user/me/editor', Auth, async(req, res) => {
    try {
        res.render('edit-profile', {
            user: req.user
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

route.post('/user/me/edit', Auth, async (req, res) => {
    const updates = Object.keys(req.body);
    // const allowedUpdates = ['name', 'email', 'password'];
    // const isValidUpdate = updates.every(update => allowedUpdates.includes(update));

    // if (!isValidUpdate) return res.status(400).send({error: 'Invalid Updates'});

    try {
        const user = req.user;
        updates.forEach(update => user[update] = req.body[update]);
        await user.save();
        res.render('profile', {
            user,
            token: req.token
        });
    } catch (error) {
        res.status(400).send({Error: error})
    }
})

module.exports = route;