import React from "react";
import "./App.css";
import Projects from "./Projects";
import Header from "./Header";
import Footer from "./Footer";
import AddProject from "./AddProject";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      projects: [],
      url: "http://ec2-3-215-148-99.compute-1.amazonaws.com:5000",
      project: "",
      description: "",
      addedTask: ""
    };
  }

  modify = id => {
    console.log(`modifying ${this.state.project} with id: ${id}`);
    axios
      .put(`${this.state.url}/projects/${id}`, {
        project: this.state.project,
        description: this.state.description
      })
      .then(res => {
        console.log("good axios put", res.data);
        this.setState({
          ...this.state
        });
      })
      .catch(err => {
        console.error("axios put error", err);
      });
  };

  input = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addTask = (task, description, id) => {
    console.log(
      "%cthis is the task to be added",
      "color:green;",
      task,
      description
    );
    axios
      .post(`${this.state.url}/tasks`, { task, description, project_id: id })
      .then(res => {
        console.log(res.data);
        this.setState({
          addedTask: res.data.task
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  componentDidMount = () => {
    axios
      .get(`${this.state.url}/projects`)
      .then(res => {
        console.log(res);
        this.setState({
          projects: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({
      ...this.state
    });
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState !== this.state) {
  //     this.setState({ ...this.state });
  //   }
  // }

  render() {
    return (
      <div className="App">
        <Header />
        <AddProject />
        <Projects
          projects={this.state.projects}
          modify={this.modify}
          input={this.input}
          project={this.state.project}
          description={this.state.description}
          addTask={this.addTask}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
