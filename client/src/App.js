import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StylesApp = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  section {
    position: relative;
    width: 250px;
    height: 300px;
    margin: 10px 10px 20px;

    .post {
      width: 100%;
      height: 95%;
      border: 3px solid dodgerblue;
      border-radius: 5px;
      text-align: center;
      overflow: scroll;

      &:hover {
        transform: translateY(-5px) scale(1.02);
      }

    }
  
    p {
      position: absolute;
      bottom: -5%;
      left: 0;
      width: 100%;
      height: 5%;
      background-color: dodgerblue;
      border: 3px solid dodgerblue;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      color: #fff;
      text-align: center;
    }
  }

`;

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
      <StylesApp>
        {
          this.state.posts 
          ? this.state.posts.map(post => {
              return (
                <section>
                  <div className="post">
                    <h2>{post.title}</h2>
                  </div>
                    <p>{post.contents}</p>
                </section>
              );
            })
          : null
        }
      </StylesApp>
    );
  }
}

export default App;
