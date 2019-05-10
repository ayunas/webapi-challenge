import React, { Component } from 'react'
import axios from 'axios';

export default class Projects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            actionFlag : false,
            actions : [],
            active : false
        }
    }


  action = (id) => {
      console.log('action triggered with id: ', id)
      this.setState({
          actionFlag : !this.state.actionFlag,
          active : !this.state.active
      })
      axios.get(`http://localhost:5353/projects/${id}/actions`)
      .then( res => {
          console.log(res.data) 
          this.setState({
            actions : res.data
          })
        })
      .catch( err => console.log(err))
  }

  render() {
    return (
      <div className='projects'>
        {this.props.projects.map( (project,i) => 
        <div key={i}>
            <h3><small> {project.id } </small> {project.name}</h3>
            <button onClick={ () => this.action(project.id)}>view project actions</button>
            {this.state.actionFlag && this.state.actions.map( (action,j) => <div className={`${this.state.active} action`} key={`action-${j}`}>{ action.project_id === project.id && action.description}</div>) }
        </div>)}
      </div>
    )
  }
}
