import React from 'react';
import userService from '../UserService';

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRedirect: false
        };
    };

    componentDidMount() {
        userService.logout().then(() => {
            this.setState({ isRedirect: true });
        });
    };

    render() {
        return (
            // this.state.isRedirect && <Redirect to="/" />
            window.location = '/'
        );
    };
};

export default Logout;