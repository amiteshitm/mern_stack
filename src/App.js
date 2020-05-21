import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
 constructor(props) {
  super(props)

  this.state = {
     users:[],
     id:0,
     name:'',
     email:'',
     password:''
  }
}

componentDidMount(){
  axios.get('http://localhost/api')
  .then((res)=>{
    this.setState({
      users:res.data,
      id:0,
      password:'',
      email:'',
      name:''    
      })
     
  })
  
}
nameChange=(e)=>{
  this.setState({name:e.target.value})
}
emailChange=(e)=>{
  this.setState({email:e.target.value})
}

passwordChange=(e)=>{
  this.setState({password:e.target.value})
}
handleSubmit(e,id){
 
  e.preventDefault()
  if(id===0){
    axios.post(`http://localhost/api`,{ name:this.state.name,email:this.state.email,password:this.state.password})
    .then(()=>{
      this.componentDidMount()
    })
    
  }else{
    axios.put(`http://localhost/api/${id}`,{ name:this.state.name,email:this.state.email,password:this.state.password})
    .then(()=>{
      this.componentDidMount()
    })
  }
    
}
delete(id){
  axios.delete(`http://localhost/api/${id}`)
  .then(()=>{
    this.componentDidMount()
  })
}
edit(id){
  axios.get(`http://localhost/api/${id}`)
  .then((res)=>{
    this.setState({
      id:res.data._id,
      name:res.data.name,
      email:res.data.email,
      password:res.data.password
    })
  })
}
  render() {

    return (
      <div>
         <div className='row'>
      <div className='col s6'>
        <form onSubmit={(e)=>this.handleSubmit(e,this.state.id)}>
          <div className="input-field col s12">
            <i className="material-icons prefix">person</i>
            <input type="text" value={this.state.name} id="autocomplete-input" className="autocomplete" onChange={(e)=>this.nameChange(e)}/>
            <label htmlFor="autocomplete-input">Name</label>
          </div>
          <div className="input-field col s12">
            <i className="material-icons prefix">email</i>
            <input type="email" id="autocomplete-input" value={this.state.email}  className="autocomplete" onChange={(e)=>this.emailChange(e)}/>
            <label htmlFor="autocomplete-input">Email</label>
          </div>
          <div className="input-field col s12">
            <i className="material-icons prefix">vpn_key</i>
            <input type="password" id="autocomplete-input"  value={this.state.password} className="autocomplete" onChange={(e)=>this.passwordChange(e)}/>
            <label htmlFor="autocomplete-input">Password</label>
          </div>
          <button className="btn waves-effect waves-light right" type="submit" name="action">Submit
    <i className="material-icons right">send</i>
  </button>
        </form>
      </div>
      <div className='col s6'>
      <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Edit</th>
              <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {this.state.users.map(user=>
          <tr key={user._id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.password}</td>
          <td>
          <button onClick={()=>this.edit(user._id)} className="btn waves-effect waves-light right" type="submit" name="action">
  <i className="material-icons">edit</i>
  </button>

          </td>
          <td>
           <button onClick={()=>this.delete(user._id)} className="btn waves-effect waves-light right" type="submit" name="action">
  <i className="material-icons">delete</i>
  </button>

          </td>
        </tr>
            )}
          
          
        </tbody>
      </table>
      </div>

    </div>

      </div>
    )
  }
}

export default App
