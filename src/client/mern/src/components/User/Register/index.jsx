import React from 'react';
import { Link } from 'react-router-dom';
import validationService from '../UserValidation';
import userService from '../UserService';
import constants from '../constants/constants';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            email: '',
            age: '',
            gender: '',
            usernames: [],
            errors: {
                username: constants.USERNAME_REQUIRED,
                password: constants.PASSWORD_REQUIRED,
                confirmPassword: constants.CONFIRM_PASSWORD_REQUIRED,
                firstName: constants.FIRST_NAME_REQUIRED,
                lastName: constants.LAST_NAME_REQUIRED,
                email: constants.EMAIL_REQUIRED,
                age: constants.AGE_REQUIRED,
                gender: constants.GENDER_REQUIRED
            }
        };
    };

    changeHandler = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'username':
                if (this.state.usernames.includes(value)) {
                    errors.username = constants.USERNAME_EXIST;
                } else if (!validationService.usernameValidation(value)) {
                    errors.username = constants.INVALID_USERNAME;
                } else {
                    errors.username = '';
                }
                break;
            case 'password':
                errors.password = !validationService.passwordValidation(value) ? constants.INVALID_PASSWORD : '';
                break;
            case 'confirmPassword':
                errors.confirmPassword = !validationService.passwordMatchValidation(value, this.state.password) ? constants.PASSWORD_MATCH : '';
                break;
            case 'firstName':
                errors.firstName = !validationService.userNamesValidation(value) ? constants.INVALID_FIRST_NAME : '';
                break;
            case 'lastName':
                errors.lastName = !validationService.userNamesValidation(value) ? constants.INVALID_LAST_NAME : '';
                break;
            case 'email':
                errors.email = !validationService.registerEmailValidation(value) ? constants.INVALID_EMAIL : '';
                break;
            case 'age':
                errors.age = !validationService.registerAgeValidation(value) ? constants.INVALID_AGE : '';
                break;
            case 'gender':
                errors.gender = validationService.compareStringValidation(value, ' Select gender') ? constants.GENDER_REQUIRED : '';
                break;
            default:
                break;
        };

        this.setState({ errors, [name]: value });
    }

    submitHandler = (event) => {
        event.preventDefault();
        const data = this.state;
        userService.register(data).then((data) => {
            this.props.history.push('/login');
            //  <Redirect to='/'/>
        }).catch((err) => console.log(err))
    };

    componentDidMount = () => {
        userService.getUsernames()
            .then(usernames => {
                this.setState({ usernames: usernames });
            });
    }

    render() {
        return (
            <div className="container" style={{ marginTop: 30, marginBottom: 50 }}>
                <div className="card bg-light">
                    <article className="card-body mx-auto">
                        <h3 className="card-title mt-3 text-center">Create Account</h3>
                        <hr />
                        <h4 className="card-title mt-3 text-center">User Info</h4>
                        <form onSubmit={this.submitHandler}>
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="form-group input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-user"></i></span>
                                        </div>
                                        <input id="username" type="text" className="form-control" name="username" onChange={this.changeHandler} placeholder="Username" />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-10">
                                    <div className="form-group input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                        </div>
                                        <input id="password" autoComplete="on" type="password" className="form-control" name="password" onChange={this.changeHandler} placeholder="Password" />
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="form-group input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                        </div>
                                        <input id="confirmPassword" autoComplete="on" type="password" className="form-control" name="confirmPassword" onChange={this.changeHandler} noValidate placeholder="Confirm Password" />
                                    </div>
                                </div>
                            </div>

                            <h4 className="card-title mt-3 text-center">Personal Info</h4>
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="form-group input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                        </div>
                                        <input id="email" type="text" className="form-control" name="email" onChange={this.changeHandler} placeholder="E-mail" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="form-group input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-user"></i></span>
                                        </div>
                                        <input id="firstName" type="text" className="form-control" name="firstName" onChange={this.changeHandler} noValidate placeholder="First Name" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="form-group input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-user"></i></span>
                                        </div>
                                        <input id="lastName" type="text" className="form-control" name="lastName" onChange={this.changeHandler} placeholder="Last Name" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="form-group input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-table"></i></span>
                                        </div>
                                        <input id="age" type="number" className="form-control" name="age" onChange={this.changeHandler} placeholder="Age" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="form-group input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-male"></i></span>
                                        </div>
                                        <select className="form-control" name="gender" onChange={this.changeHandler}>
                                            <option defaultValue='1'> Select gender</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-danger btn-block">Create Account</button>
                            </div>
                            <p className="text-center">Have an account? <Link to="/login">Log In</Link></p>
                        </form>
                    </article>
                </div>
            </div>
        );
    };
};

export default Register;