const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'Username should be at least 3 characters!'],
        validate: { validator: (value) => /^[a-zA-Z0-9]{3,}$/.test(value), message: 'Username should consist only English letters and digits!' }
    },
    password: {
        type: String,
        required: true,
        minlength: [3, 'Password should be at least 3 characters!'],
        validate: { validator: (value) => /^[a-zA-Z0-9]{3,}$/.test(value), message: 'Password should consist only English letters and digits!' },
    },
    firstName: {
        type: String,
        required: true,
        minlength: [3, 'First name should be at least 3 characters!'],
        validate: { validator: (value) => /^[a-zA-Z0-9]{3,}$/.test(value), message: 'First name consist only English letters and digits!' },
    },
    lastName: {
        type: String,
        required: true,
        minlength: [3, 'Last name should be at least 3 characters!'],
        validate: { validator: (value) => /^[a-zA-Z0-9]{3,}$/.test(value), message: 'Last name consist only English letters and digits!' },
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: [0, 'Age must be a positive number']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    // timeOfCreationInBG: { type: Date, default: Date.now() },

    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
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