import React, { Component } from 'react';
import qs from 'query-string';

class Course extends Component {
    render () {
        const parsedHash = decodeURIComponent(this.props.location.hash);
        return (
            <div>
                <h1>{parsedHash.replace('#', '')}</h1>
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Course;