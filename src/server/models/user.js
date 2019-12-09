const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'Username should be at least 3 characters!'],
        validate: { validator: (value) => /^[a-zA-Z0-9]+$/.test(value), message: 'Username should consist only with English letters and digits!' }
    },
    password: {
        type: String,
        required: true,
        minlength: [3, 'Password should be at least 3 characters!'],
        validate: { validator: (value) => /^[a-zA-Z0-9]+$/.test(value), message: 'Password should consist only with English letters and digits!' },
    },
    timeOfCreationInBG: { type: Date, default: Date.now() },

    // expenses:[{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Expense'
    // }],
    // enrolledCourses: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Course'
    // }]
}, { timestamps: true, });


userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password)
    }
};

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                next(err);
                return;
            }

            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    next(err);
                    return;
                }
                this.password = hash;
                next();
            })
        })
        return;
    }
    next();
});

module.exports = model('User', userSchema);