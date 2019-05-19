import React, { Component } from "react";
import axios from "axios";

export default class AddProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: "",
      description: ""
    };
  }

  addProject = e => {
    console.log("adding project");
    e.preventDefault();

    axios
      .post("http://localhost:5555/projects", { ...this.state })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <form onSubmit={this.addProject}>
        <input
          name="project"
          type="text"
          value={this.state.project}
          onChange={this.handleChange}
          placeholder="Project Name"
        />
        <br />
        <input
          name="description"
          type="text"
          value={this.state.description}
          onChange={this.handleChange}
          placeholder="Project Description"
        />
        <br />
        <button>Add Project</button>
      </form>
    );
  }
}
