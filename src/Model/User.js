const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String
        }
    }]
});

userSchema.methods.generateToken = async function() {
    const token = jwt.sign({_id: this._id.toString()}, 'fabriyyogi')
    this.tokens = this.tokens.concat({token})
    await this.save()
    return token;
}

const User = mongoose.model('User', userSchema)

module.exports = User;