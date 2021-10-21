import React, {Component } from "react";

class FormRdStation extends Component {

  componentDidMount() {
    if (window.RDStationForms) {
      new window.RDStationForms('formulario-produtos-becapital-3dd21692f9f67ed2ec77', 'UA-180628568-1').createForm();
    }
  }

  render() {
    return (
      <div role="main" id="formulario-produtos-becapital-3dd21692f9f67ed2ec77"></div>
    );
  }
}

export default FormRdStation;