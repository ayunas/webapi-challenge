import React, { Component } from "react";
import axios from "axios";

export default class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskFlag: false,
      modFlag: false,
      tasks: [],
      hide: false,
      project: "",
      description: "",
      projectID: null,
      url: "http://ec2-3-215-148-99.compute-1.amazonaws.com:5000/projects",
      addTaskToggle: false,
      addedTask: "",
      addedTaskDesc: "",
      taskID: null
    };
  }

  task = id => {
    this.setState({
      taskFlag: !this.state.taskFlag,
      hide: !this.state.hide
    });

    axios
      .get(`${this.state.url}/${id}`)
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
      .delete(`${this.state.url}${id}`)
      .then(res => {
        console.log(`the response from the delete request: ${res.data}`);
      })
      .catch(err => {
        console.log("error", err);
      });
  };

  modToggle = id => {
    this.setState({
      modFlag: !this.state.modFlag,
      projectID: id
    });
  };

  addTaskToggle = id => {
    console.log("%c addTaskToggle triggered!", "font-size: 20px; color: red");
    this.setState({
      addTaskToggle: !this.state.addTaskToggle,
      taskID: id
    });
  };

  // modify = id => {
  //   console.log(`modifying project with id: ${id}`);
  //   axios
  //     .put(`http://localhost:5555/projects/${id}`, {
  //       project: this.state.project,
  //       description: this.state.description
  //     })
  //     .then(res => {
  //       console.log("good axios put", res.data);
  //     })
  //     .catch(err => {
  //       console.error("axios put error", err);
  //     });
  // };

  input = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
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
            <button onClick={() => this.modToggle(project.id)}>
              Modify Project
            </button>
            {this.state.modFlag && project.id === this.state.projectID && (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  this.props.modify(project.id);
                }}
              >
                <input
                  name="project"
                  placeholder="Project Name"
                  value={this.props.project}
                  onChange={this.props.input}
                />
                <input
                  name="description"
                  placeholder="Project Description"
                  value={this.props.description}
                  onChange={this.props.input}
                />
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
                  {task.project_id === project.id && (
                    <div>
                      {j + 1} . {task.task} : {task.description}
                    </div>
                  )}{" "}
                </div>
              ))}
            {this.state.taskFlag && (
              <button
                onClick={e => {
                  e.preventDefault();
                  this.addTaskToggle(project.id);
                }}
              >
                Add Task
              </button>
            )}
            {this.state.addTaskToggle && project.id === this.state.taskID && (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  this.props.addTask(
                    this.state.addedTask,
                    this.state.addedTaskDesc,
                    project.id
                  );
                }}
              >
                <input
                  name="addedTask"
                  placeholder="Task Name"
                  value={this.state.addedTask}
                  onChange={this.input}
                />
                <input
                  name="addedTaskDesc"
                  placeholder="Describe Task"
                  value={this.state.addedTaskDesc}
                  onChange={this.input}
                />

                <button>Submit</button>
              </form>
            )}
          </div>
        ))}
      </div>
    );
  }
}
