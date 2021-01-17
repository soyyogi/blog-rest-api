const User = require('../Model/User');
const jwt = require('jsonwebtoken');

const Auth = async function (req, res, next) {
    let token = req.body.authorization
    if(!token) {
        return res.status(401).send({Error: "Please sign in!"})
    }
    token = token.replace("Bearer ", "")
    const decoded = await jwt.verify(token, 'fabriyyogi')
    const user = await User.findOne({_id: decoded._id, "tokens.token": token })
    if(!user) {
        return res.status(401).send({Error: "Invalid username and password!"})
    }

    req.user = user
    req.token = token
    next()
}

module.exports = Auth;