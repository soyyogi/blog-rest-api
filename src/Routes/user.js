const express = require('express');
const route = new express.Router();
const User = require('../Model/User');


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

// route.get('/user/me', async (req, res) => {
//     try {
//         res.render('profile');
//     } catch(error) {
//         res.status(400).send({Error: error});
//     }
// })

// route.get('/signin', (req, res) => {
//     res.render('signin')
// })

// route.get('/user/signin', async (req, res) => {
//     try {
//         console.log(req.params);
//         const user = await User.findUserByIdPassword(req.params.email, req.params.password);
//         const token = await user.generateToken();
//         console.log(user);
//         res.send({user, token});
//     } catch(error) {
//         res.status(401).send({error: 'Invalid username and password'});
//     }
// })

// route.get('/user/signout', async (req, res) => {
//     try {
//         req.user.tokens = req.user.tokens.filter(token => token.token != req.token)
//         req.user.save()
//         res.status(200).send({status: "Successfully signed out"})
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// route.get('/user/me', async (req, res) => {
//     try {
//         res.send(req.user);
//     } catch(error) {
//         res.status(400).send({Error: error});
//     }
// })

// route.patch('/user/me', async (req, res) => {
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ['name', 'email', 'password'];
//     const isValidUpdate = updates.every(update => allowedUpdates.includes(update));

//     if (!isValidUpdate) return res.status(400).send({error: 'Invalid Updates'});

//     try {
//         const user = req.user;
//         updates.forEach(update => user[update] = req.body[update]);
//         await user.save();

//         if (!user) return res.status(404).send()
//         res.send(user)
//     } catch (error) {
//         res.status(400).send({Error: error})
//     }
// })


// route.delete('/user/me', async (req, res) => {
//     try {
//         const user = req.user
//         await user.remove()
//         res.send(user)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })


module.exports = route;