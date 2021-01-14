const User = require('../Model/User');

const auth = async function (req, res, next) {
    console.log(req.body.email)
    const user = await User.findOne({email : req.body.email})
    const isAuthorized = user.password === req.body.password
    if(!isAuthorized) {
        res.status(401).send({Error: "Invalid username and password!"})
    }

    req.user = user
    next()

}

module.exports = auth;