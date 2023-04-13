import React from 'react'
import TodoList from "./TodoList"
import axios from "axios"


const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
    state = {
      todos: [],
    }

  fetchalltodos = () =>{
    axios.get(URL)
    .then(res=>{
      this.setState({...this.state, todos: res.data.data})
    })
    .catch(err =>{debugger})
  };

  componentDidMount(){
    this.fetchalltodos()
  }
  
  render() {
    return (
      <>
        <h1>TO DO </h1>
        <ul>
          {this.state.todos.map(td=> {return (<li key={td.id}>{td.name}</li>)})}
        </ul>
        <form >
          <input  type="text" />
          <button >ADD TODO</button>
          <button> CLEAR COMPLETED</button>
        </form>
      </>
    )
  }

}
