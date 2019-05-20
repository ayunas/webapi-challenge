import React from "react";
import "./App.css";
import Projects from "./Projects";
import Header from "./Header";
import Footer from "./Footer";
import AddProject from "./AddProject";
// import Actions from './Actions';
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      projects: [],
      url2: "http://ec2-3-215-148-99.compute-1.amazonaws.com:5000/projects",
      url: "http://localhost:5555/projects"
    };
  }

  componentDidMount() {
    axios
      .get(this.state.url)
      .then(res => {
        console.log(res);
        this.setState({
          projects: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <AddProject />
        <Projects projects={this.state.projects} />
        <Footer />
      </div>
    );
  }
}

export default App;
