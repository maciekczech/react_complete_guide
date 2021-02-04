import React, { Component } from 'react';

import Course from './../Course/Course';

import {Route, Link} from 'react-router-dom';

import './Courses.css';

class Courses extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ]
    }


    render () {
        return (
            <div>
                <h1>Amazing Udemy Courses:</h1>

                <Route path='/courses/course/:id/' component={Course} />

                <section className="Courses">
                    {
                        this.state.courses.map( course => {
                            return(
                                <Link  key={course.id} to={{
                                    pathname: this.props.match.url + '/course/' + course.id,
                                    hash: course.title,
                                }}
                                    >
                                <article 
                                    className="Course"
                                    >
                                        {course.title}
                                    </article>;
                            </Link>
                            ); 
                        } )
                    }
                </section>
            </div>
        );
    }
}

export default Courses;