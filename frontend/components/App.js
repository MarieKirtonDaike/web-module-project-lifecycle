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

  postnewtodo = () =>{
    axios.post(URL, {name: this.state.todonameinput})
    .then(res=> {
      this.fetchalltodos();
      this.setState({...this.state, todonameinput: ""})
    })
    .catch(err =>{this.setState({...this.state, error: err.response.data.message})})
  }

  onsubmit = (e)=>{
    e.preventDefault();
    this.postnewtodo()
  }

  clearcompleted = (e) =>{
   
  }

togglecompleted = id => () =>{
    axios.patch(`${URL}/${id}`)
    .then(res=>{
      this.setState({...this.state, todos: [this.state.todos.map(td=>{
        if(td.id !== id)return td
        else{
          return res.data.data
        }
      })]})
      
    })
    .catch(err=>{this.setState({...this.state, error: err.response.data.message})})
  }
   
  
  render() {
    return (
      <>
        <h2> Error: {this.state.error}</h2>
      <TodoList todos={this.state.todos} togglecompleted={this.togglecompleted}/>
          
       
        <form onSubmit={this.onsubmit}>
          <input  value={this.state.todonameinput} onChange={this.oninputchange} type="text" />
          <button >ADD TODO</button>
          <button onClick={this.clearcompleted}> CLEAR COMPLETED</button>
        </form>
      </>
    )
  }

}
