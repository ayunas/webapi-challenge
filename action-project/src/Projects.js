import React, { Component } from 'react'
import axios from 'axios';

export default class Projects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            actionFlag : false,
            actions : [],
            hide : false
        }
    }

  action = (id) => {
      console.log('action triggered with id: ', id)
      this.setState({
          actionFlag : !this.state.actionFlag,
          hide : !this.state.hide
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
            <h2> <small> {i+1}. </small>{project.name}</h2>
            <h4>{project.description}</h4>
            <button onClick={ () => this.action(project.id)}>view project actions</button>
            {this.state.actionFlag && this.state.actions.map( (action,j) => 
            <div className='actions' key={`action-${j}`} > {action.project_id === project.id && action.description} </div> 
              )
            }      
        </div>
            )}
      </div>
    )
  }
}



//className={`${this.state.active} action`} in state:  active : false.  not needed for the empty divs anymore

// ({action.project_id === project.id) ? 
//   (<div className='actions' 
//        key={`action-${j}`}>
//       { action.project_id === project.id && action.description}
//   </div>) : (

  // return (
  //   <div className='actions' 
  //        key={`action-${j}`}>
  //        { action.project_id === project.id && action.description}
  //   </div>
  // )
  // <div className='actions' key={`action-${j}`}>{action.description}</div>