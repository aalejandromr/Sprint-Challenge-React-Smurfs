import React from 'react';

const Smurf = props => {
  return (
    <div className="Smurf">
      <h3>{props.name}</h3>
      <strong>{props.height} tall</strong>
      <p>{props.age} smurf years old</p>
      <button onClick={() => props.handleDelete(props.id)}> Delete </button>
      <button onClick={() => {
        props.handleToEdit(props.id);
        props.history.push("/smurf-form");
        }}> Update </button>
    </div>
  );
};

Smurf.defaultProps = {
  name: '',
  height: '',
  age: ''
};

export default Smurf;

