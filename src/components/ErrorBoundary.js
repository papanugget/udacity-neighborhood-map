import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    componentDidCatch(error, info) {
        // displays fallback
        this.setState({ hasError: true });
        alert('error ', error)
    }
    render() {
        if(this.state.hasError) {
            return <h1>Error Occurred Retrieving Data!  Please try again later.</h1>;
        }
        return this.props.children;
    }
}
export default ErrorBoundary;