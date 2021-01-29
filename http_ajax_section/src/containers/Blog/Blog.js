import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';

import axios from 'axios'
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostID: null,
        error: null,
    }

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
            const posts = response.data.slice(0,4);
            const updatedPosts = posts.map( post => {
                return {
                    ...post,
                    author: "Maciej"
                }
            })
            this.setState({ posts: updatedPosts});
            console.log(response);
        }).catch(error => {
            this.setState({ error: error });
        })};

    postSelectedHandler = (id) => {
        this.setState({selectedPostID: id});
    }

    render () {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>;
        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return <Post 
                key={post.id} 
                title={post.title} 
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)}
                />
            })
        }    
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost selectedPostID={this.state.selectedPostID}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;