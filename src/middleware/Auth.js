const User = require('../Model/User');

const loginAuth = async function (req, res, next) {
    const user = await User.findOne({email : req.body.email})
    if(!user) {
        return res.status(401).send({Error: "Invalid username and password!"})
    }

    const isAuthorized = user.password === req.body.password
    if(!isAuthorized) {
        return res.status(401).send({Error: "Invalid username and password!"})
    }

    req.user = user
    next()

}

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

module.exports = { loginAuth, auth };