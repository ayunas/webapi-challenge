import React, { Component } from "react";
import axios from "axios";

export default class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskFlag: false,
      modFlag: false,
      tasks: [],
      hide: false
    };
  }

  task = id => {
    this.setState({
      taskFlag: !this.state.taskFlag,
      hide: !this.state.hide
    });
    // axios.get(`http://ec2-3-215-148-99.compute-1.amazonaws.com:5000/projects/${id}/actions`)
    axios
      .get(`http://localhost:5555/projects/${id}`)
      .then(res => {
        console.log("res.data from task display", res.data);
        this.setState({
          tasks: res.data.task
        });
      })
      .catch(err => console.log(err));
  };

  delete = id => {
    console.log(`deleting project with id: ${id}`);
    axios
      .delete(`http://localhost:5555/projects/${id}`)
      .then(res => {
        console.log(`the response from the delete request: ${res.data}`);
      })
      .catch(err => {
        console.log("error", err);
      });
  };

  modify = id => {
    console.log(`modifying project with id: ${id}`);
    this.setState({
      modFlag: !this.state.modFlag
    });
  };

  render() {
    return (
      <div className="projects">
        {this.props.projects.map((project, i) => (
          <div key={i}>
            <h2>
              {" "}
              <small> {i + 1}. </small>
              {project.project}
            </h2>
            <h4>{project.description}</h4>
            <button onClick={() => this.task(project.id)}>view tasks</button>
            <button onClick={() => this.modify(project.id)}>
              Modify Project
            </button>
            {this.state.modFlag && (
              <form>
                <input name="project" placeholder="Project Name" />
                <input name="description" placeholder="Project Description" />
                <button>Submit</button>
              </form>
            )}
            <button onClick={() => this.delete(project.id)}>
              Delete Project
            </button>
            {this.state.taskFlag &&
              this.state.tasks.map((task, j) => (
                <div className="actions" key={`action-${j}`}>
                  {" "}
                  {task.project_id === project.id && task.description}{" "}
                </div>
              ))}
          </div>
        ))}
      </div>
    );
  }
}
