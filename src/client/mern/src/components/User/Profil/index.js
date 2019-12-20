import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import auth from '../../../auth'
// const Profil = props => {
//     console.log(props);
//     console.log(props);
// }
export default class Profil extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: [],
            subscribedItems: 0,
            username: '',
            gender: ''
        };
        this.render = this.render.bind(this);

    };

    componentDidMount() {
        axios.get('http://localhost:5000/users/get-user/' + auth.getUserInfo().id)
            .then(response => {
                this.setState({ userData: [response.data], subscribedItems: response.data.items.length, username: response.data.username, gender: response.data.gender });
                console.log(response.data.gender);
                console.log(this.state.userData[0].items.length);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // profil() {
    //     return <Profil />

    // }

    render() {
        return (
            <Fragment>
                <h1 className="title"> {(this.state.username).toUpperCase()} Profile </h1>
                <div className="user-profile">
                    {this.state.gender === 'Male' &&
                        <img className="avatar" width='200' height='200' src="https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg" alt="pic" />
                    }
                    {this.state.gender === 'Female' &&
                        <img className="avatar" width='200' height='200' src="https://cdn2.vectorstock.com/i/1000x1000/41/11/flat-business-woman-user-profile-avatar-icon-vector-4334111.jpg" alt="pic" />
                    }
                    <br />
                    <br />
                    <h3>  Events: </h3>

                    {this.state.subscribedItems > 0 ?
                        <h4 className="haveSubscribtion">You have subscribed for {this.state.subscribedItems} events!</h4>
                        :
                        <span className="haveNoSubscribtion"> You have no subscription yet. You may like some of our events <Link to='/'>HERE</Link></span>
                    }
                </div>
            </Fragment>
        )
    }
}