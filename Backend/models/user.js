const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; 

    return resetToken;
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
