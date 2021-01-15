const User = require('../Model/User');

const auth = async function (req, res, next) {
    const token = req.headers.authorization.replace("Bearer ", "")
    const user = await User.findOne({_id : req.params.id})
    const isAuthorized = user.tokens.some(el => el.token === token)
    if(!isAuthorized) {
        return res.status(401).send({Error: "Invalid username and password!"})
    }

    req.user = user
    next()
}

module.exports = auth;