import React from 'react'

export default class TodoList extends React.Component {

  render() {
    return (
      <div>
        <h1>TO DO</h1>
        {
          
          this.props.todos.map(td=> {return (<div  onClick={this.props.togglecompleted(td.id)} key={td.id}>{td.name}{td.completed? "- completed":""}</div>)})
        }
      </div>
      )
  }
}
