import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import {Route, Link, Switch, withRouter} from 'react-router-dom'

class AppWithRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      editMode: false,
      smurfToEdit: []
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  updateSmurfs = (smurfs) => {
    this.setState( prevState => {
      return {
        smurfs: [...prevState, ...smurfs]
      }
    });
    this.props.history.push("/")
  }

  componentDidMount()
  {
    axios
    .get("http://localhost:3333/smurfs")
    .then(response => {
      this.updateSmurfs(response.data);
    })
    .catch(response => {
      console.log(response);
    })
  }

  addSmurf = (smurf) => {
    axios
    .post("http://localhost:3333/smurfs", smurf)
    .then(response => {
      // this.updateSmurfs(response)
      this.updateSmurfs(response.data);
    })
    .catch(response  => {
      console.log(response);
    })
  }

  deleteSmurf = (id) => {
    axios
    .delete(`http://localhost:3333/smurfs/${id}`)
    .then(response => {
      this.updateSmurfs(response.data)
    })
    .catch(response => {
      console.log(response);
    })
  }

  toAdd = () => {
    this.setState({editMode: false})
  }

  toEdit = (id) => {
    this.setState( prevState => {
      return {
        editMode: true,
        smurfToEdit: prevState.smurfs.find(smurf => smurf.id === id)
      }
    })
  }

  updateSmurf = (id, smurf) => {
    axios
    .put(`http://localhost:3333/smurfs/${id}`, smurf)
    .then(response => {
      this.updateSmurfs(response.data);
    })
    .catch( response => {
      console.log(response)
    })
  }

  render() {
    return (
      <div className="App">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/smurf-form" onClick={() => this.toAdd() }> Form </Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/" render={(props) => <Smurfs {...props} 
          smurfs={this.state.smurfs} handleDelete={this.deleteSmurf}
          handleToEdit={this.toEdit}
          />}/>
          <Route path="/smurf-form" render={(props) => <SmurfForm {...props} handleAddSmurf={this.addSmurf} 
          handleUpdateSmurf={this.updateSmurf} editMode={this.state.editMode} handleEditSmurf={this.state.smurfToEdit} />}/>
        </Switch>
        
        
      </div>
    );
  }
}

const App = withRouter(AppWithRouter);

export default App;
