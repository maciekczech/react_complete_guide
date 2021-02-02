import React, { Component } from 'react';
import axios from 'axios'

import './FullPost.css';

class FullPost extends Component {

    state = {
        post: null,
        selectedPostID: null,
    }

    componentDidMount(){
        this.loadData();
    }

    componentDidUpdate(prevProps, prevState){
        this.loadData();
    }

    loadData = () => {
        if (this.props.match.params.id){
            if (!this.state.post || (this.state.post && this.state.post.id !== +this.props.match.params.id)){
                axios.get('/posts/' + this.props.match.params.id).then(response => {
                    const fetchedPost = {
                        ...response.data
                    };
                    this.setState({post: fetchedPost});
                }).catch( error => {
                    console.log(error)
                });
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.state.selectedPostID).then(response => {
            console.log(response);
        });
    }

    render () {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if(this.props.match.params.id) { post = <p style={{ textAlign: 'center' }}>Loading...</p>; }
        if(this.state.post){
            post = (
                <div className="FullPost">
                    <h1>{this.state.post.title}</h1>
                    <p>{this.state.post.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;