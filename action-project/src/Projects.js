import React, { Component } from 'react'
import axios from 'axios';

export default class Projects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            actionFlag : false,
            actions : []
        }
    }


  action = (id) => {
      console.log('action triggered with id: ', id)
      this.setState({
          actionFlag : !this.state.actionFlag
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
      <div>
        {this.props.projects.map( project => 
        <div>
            <p><small> {project.id } </small> {project.name}</p>
            <button onClick={ () => this.action(project.id)}>view project actions</button>
            {this.state.actionFlag && this.state.actions.map( action => <div>{action.description}</div>) }
        </div>)}
      </div>
    )
  }
}
