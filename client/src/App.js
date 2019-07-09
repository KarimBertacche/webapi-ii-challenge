import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    posts: null,
    errorMessage: ''
  }

  componentDidMount() {
    this.getPostHandler();
  }

  getPostHandler = () => {
    axios
      .get('http://localhost:4000/api/posts')
        .then(response => {
          this.setState({ 
            posts: response.data 
          });
        })
        .catch(error => {
          this.setState({
            errorMessage: error.errorMessage
          })
        });
  }

  render() {
    return (
      <div className="App">
        {
          this.state.posts 
          ? this.state.posts.map(post => {
              return (
                <div>
                  <h2>{post.title}</h2>
                  <p>{post.contents}</p>
                </div>
              );
            })
          : null
        }
      </div>
    );
  }
}

export default App;
