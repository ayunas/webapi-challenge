import React from 'react';
import './App.css';
import Projects from './Projects';
import Actions from './Actions';
import axios from 'axios';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      projects : [],
      url : 'http://localhost:5353/projects'
    }
  }

  componentDidMount() {
    axios.get(this.state.url)
      .then( res => {
        console.log(res);
        this.setState({
          projects : res.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="App">
        <Projects projects={this.state.projects} />
        <Actions projects={this.state.projects}/>
      </div>
    );
  }
}

export default App;
