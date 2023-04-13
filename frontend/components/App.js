import React from 'react'
import TodoList from "./TodoList"
import axios from "axios"


const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
    state = {
      todos: [],
      error: "",
      todonameinput: "",

    }

  fetchalltodos = () =>{
    axios.get(URL)
    .then(res=>{
      this.setState({...this.state, todos: res.data.data})
    })
    .catch(err =>{this.setState({...this.state, error: err.response.data.message})})
  };

  componentDidMount(){
    this.fetchalltodos()
  }
  oninputchange = evt => {
    const {value} = evt.target
    this.setState({...this.state, todonameinput: value})
  }
  render() {
    return (
      <>
        <h1>TO DO </h1>
        <ul>
          {this.state.todos.map(td=> {return (<li key={td.id}>{td.name}</li>)})}
        </ul>
        <form >
          <input  value={this.state.todonameinput} onChange={this.oninputchange} type="text" />
          <button >ADD TODO</button>
          <button> CLEAR COMPLETED</button>
        </form>
      </>
    )
  }

}
