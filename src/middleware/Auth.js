const User = require('../Model/User');
const jwt = require('jsonwebtoken');

const auth = async function (req, res, next) {
    const token = req.headers.authorization.replace("Bearer ", "")
    const decoded = await jwt.verify(token, 'fabriyyogi')
    console.log(decoded)
    const user = await User.findOne({_id: decoded._id, "tokens.token": token })
    if(!user) {
        return res.status(401).send({Error: "Invalid username and password!"})
    }

    req.user = user
    next()
}

module.exports = auth;