import userService from '../UserService';

const validationService = {
    formValidation: function (errors) {
        let valid = true;
        return valid;
    },
    usernameValidation: function (value) {
        const regex = RegExp(/[A-Za-z0-9]{3,}/i);
        return regex.test(value);
    },
    passwordValidation: function (value) {
        const regex = RegExp(/[A-Za-z0-9]{3,}/i);
        return regex.test(value);
    },
    passwordMatchValidation: function (value, password) {
        return value === password;
    },
    registerEmailValidation: function (value) {
        const regex = RegExp(/[\w]+@[a-z]+\.com/i);
        return regex.test(value);
    },
    userNamesValidation: function (value) {
        const regex = RegExp(/[A-Za-z]{2,}/i);
        return regex.test(value);
    },
    compareStringValidation: function (value, result) {
        return value === result;
    },
    registerAgeValidation: function (value) {
        return value > 15 && value < 100;
    },

    isUsernameExist: function (username) {
        userService.getUsernames()
            .then(usernames => {
                return usernames.includes(username);
            });
    },
};

export default validationService;