import React, { Component } from 'react';

class Posts extends Component {
  constructor(props) {
    super(props)
    this.state = { posts: [] }
  }

  componentDidMount() {
    fetch('/posts.json')
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        this.setState({ posts: results });
      });
    this.setupSubscription();
  }

  loadPosts(results) {
    this.setState({ posts: results });
  }

  render() {
    if (this.state.posts.length) {
      return (
        this.state.posts.map((post) => {
          return (
            <div className="blog-post">
              <h2 className="blog-post-title">{ post.title }</h2>
              <p className="blog-post-meta">December 23, 2013 by <a href="#">Jacob</a></p>
              <p>{ post.body }</p>
            </div>
          )
        })
      )
    } else {
      return <p>Loading Posts...</p>
    }
  }

  setupSubscription() {
    let self = this;
    App.posts = App.cable.subscriptions.create('PostsChannel', {
      connected: function () {
        setTimeout(() => this.perform('follow'), 1000);
      },
      received: function(data) {
        self.loadPosts(data.posts);
      }
    });
  }
}

export default Posts;