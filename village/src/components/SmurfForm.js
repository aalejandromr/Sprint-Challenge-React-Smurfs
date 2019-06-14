import React, { Component } from 'react';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: ''
    };
  }

  addSmurf = event => {
    event.preventDefault();
    // add code to create the smurf using the api
    // debugger;
    this.props.handleAddSmurf({
      name: this.state.name,
      age: this.state.age,
      height: this.state.height
    });

    this.setState({
      name: '',
      age: '',
      height: ''
    });
  }

  updateSmurf = event => {
    event.preventDefault();
    // add code to create the smurf using the api
    // debugger;
    this.props.handleUpdateSmurf(this.props.handleEditSmurf.id, {
      name: this.state.name,
      age: this.state.age,
      height: this.state.height
    });

    this.setState({
      name: '',
      age: '',
      height: ''
    });
  }

  componentWillMount()
  {
    if(this.props.editMode)
    {
      // this.setState(this.props.handleEditSmurf)
      this.setState(this.props.handleEditSmurf);
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={(e) => this.props.editMode ? this.updateSmurf(e) : this.addSmurf(e)}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          { !this.props.editMode ? <button type="submit">Add to the village</button> : <button type="submit">Edit Smurf</button>}
          
        </form>
      </div>
    );
  }
}

export default SmurfForm;
