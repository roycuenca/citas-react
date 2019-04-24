import React, { Component } from "react";
import Header from './components/Header';
import AgregarCita from "./components/AgregarCita";
import ListaCitas from "./components/ListaCitas";

class Citas extends Component {

  constructor(props) {
      super(props);
      this.state = {
        citas: []
      };

      this.crearCita = this.crearCita.bind(this);
  }

  componentDidMount(){
    const citasLS = localStorage.getItem('citas');
    if(citasLS) {
      this.setState({
        citas: JSON.parse(citasLS)
      })
    }
  }

  componentDidUpdate(){
    localStorage.setItem(
      'citas',
      JSON.stringify(this.state.citas)
    )
  }

  crearCita(nuevaCita) {
    const citas = [...this.state.citas, nuevaCita];

    this.setState({
      citas
    });
  }

  borrarCita = id => {
    const citasActuales =[...this.state.citas];
    const citas = citasActuales.filter(cita => cita.id !== id);
    this.setState({
      citas
    })
  }

  render() {
    return (
      <div className="container">
        <Header
          titulo={'Administrador de pacientes de veterinaria'}  
        />

        <div className="row">
          <div className="col-md-6">
            <AgregarCita
               crearCita={this.crearCita} 
            />
          </div>
          <div className="col-md-6">
            <ListaCitas 
              citas={this.state.citas}
              borrarCita={this.borrarCita}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Citas;
