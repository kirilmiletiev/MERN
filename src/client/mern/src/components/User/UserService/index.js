import axios from 'axios';

const userService = {
    register: function (data) {
        const { username, password, firstName, lastName, email, age, gender } = data;
        return axios({
            method: 'POST',
            url: 'http://localhost:5000/users/register',
            data: {
                username,
                password,
                firstName,
                lastName,
                email,
                age,
                gender
            }
        }).then(res => res.data);
    },

    login: function (data) {
        const { username, password } = data;
        return axios({
            method: 'POST',
            url: 'http://localhost:5000/users/login',
            data: {
                username,
                password
            },
            withCredentials: true
        }).then(res => res.data);
    },

    logout: function () {
        return axios({
            method: 'POST',
            url: 'http://localhost:5000/users/logout',
            withCredentials: true
        }).then(res => res.data);
    },

    getUsernames: function () {
        return axios({
            method: 'GET',
            url: 'http://localhost:5000/users/usernames'
        }).then(res => res.data);
    },

    getAllUsers: function () {
        return axios({
            method: 'GET',
            url: 'http://localhost:5000/users/'
        }).then(res => res.data);
    },

    deleteUser: function (username) {
        return axios({
            method: 'DELETE',
            url: 'http://localhost:5000/users/delete-user',
            data: {
                username
            }
        }).then(res => res.data);
    },

    getUser: function (userId) {
        return axios({
            method: 'GET',
            url: `http://localhost:5000/users/get-user/${userId}`,
        }).then(res => res.data);
    },
};

export default userService;