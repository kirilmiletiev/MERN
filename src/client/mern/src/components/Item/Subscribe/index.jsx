import React from 'react';

class Subscribe extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);
        console.log(this.state)
    };
    // };

    // componentDidMount() {
    //     userService.subscribe(() => {
    //         this.setState({ userId: {}, itemId: {} });
    //     });
    // };

    render() {
        return (
            // this.state.isRedirect && <Redirect to="/" />
            window.location = '/'
        );
    };
};

export default Subscribe;