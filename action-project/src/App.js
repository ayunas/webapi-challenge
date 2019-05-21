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
      url: "http://localhost:5555/projects",
      project: "",
      description: ""
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

  modify = (id, project, description) => {
    console.log(`modifying ${project} with id: ${id}`);
    axios
      .put(`http://localhost:5555/projects/${id}`, {
        project: project,
        description: description
      })
      .then(res => {
        console.log("good axios put", res.data);
        this.setState({
          project: res.data.project,
          description: res.data.description
        });
      })
      .catch(err => {
        console.error("axios put error", err);
      });
    this.setState({ state: this.state });
    // window.location.reload();
  };

  render() {
    return (
      <div className="App">
        <Header />
        <AddProject />
        <Projects projects={this.state.projects} modify={this.modify} />
        <Footer />
      </div>
    );
  }
}

export default App;
