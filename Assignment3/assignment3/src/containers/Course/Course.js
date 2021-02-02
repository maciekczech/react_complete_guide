import React, { Component } from 'react';
import qs from 'query-string';

class Course extends Component {
    render () {
        console.log(this.props.location.hash);
        const parsedHash = qs.parse(this.props.location.hash);
        console.log(parsedHash);
        return (
            <div>
                <h1></h1>
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Course;