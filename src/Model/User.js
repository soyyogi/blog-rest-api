const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'author'
})

userSchema.methods.toJSON = function () {
    const user = this.toObject()
    delete user.password
    delete user.tokens
    return user
}

userSchema.methods.generateToken = async function() {
    const token = jwt.sign({_id: this._id.toString()}, 'fabriyyogi')
    this.tokens = this.tokens.concat({token})
    await this.save()
    return token;
}

userSchema.statics.findUserByIdPassword = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user) {
        throw new Error("Invalid username and password!")
    }
    const isAuthorized = await bcrypt.compare(password, user.password)
    if(!isAuthorized) {
        throw new Error("Invalid username and password")
    }

    return user
}

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User;