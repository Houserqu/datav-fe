import React, { Component } from 'react';

class ComErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ? <h1>Oops!!! Something went wrong</h1> : children;
  }
}

export default ComErrorBoundary;
