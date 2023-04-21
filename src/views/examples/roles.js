import React, { Component, useState, useEffect } from 'react';
//import logo from './logo.svg';
//import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Header from 'components/Headers/Header';

const url="http://localhost:8000/AXE/Roles/";

class roles extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    cod_rol: '',
    tip_roles: ''
    
  }
}

peticionGet=()=>{
axios.get(url).then(response=>{
  console.log(response.data)
  this.setState({data: response.data});
}).catch(error=>{
  console.log(error.message);
})
}

peticionPost=async()=>{
  delete this.state.form.id;
 await axios.post(url,this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionPut=()=>{
  axios.put(url+this.state.form.cod_rol, this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  })
}

peticionDelete=()=>{
  axios.delete(url+this.state.form.cod_rol).then(response=>{
    this.setState({modalEliminar: false});
    this.peticionGet();
  })
}

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

seleccionarRol=(rol)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
      cod_rol: rol.cod_rol,
      tip_roles: rol.tip_roles,
    }
  })
}

handleChange=async e=>{
e.persist();
await this.setState({
  form:{
    ...this.state.form,
    [e.target.name]: e.target.value
  }
});
console.log(this.state.form);
}

  componentDidMount() {
    this.peticionGet();
  }
  

  render(){
    const {form}=this.state;
 
    return (
      <>
      <Header />
      {/* Page content */}
    <div className="roles">
    <br /><br /><br />
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Rol</button>
  <br /><br />
    <table className="table ">
      <thead>
        <tr>
          <th>Coddigo Rol</th>
          <th>Tipo Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(rol=>{
          return(
            <tr>
          <td>{rol.cod_rol}</td>
          <td>{rol.tip_roles}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarRol(rol); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarRol(rol); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>



    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="id">Codigo Rol</label>
                    <input className="form-control" type="text" name="cod_rol" id="cod_rol" readOnly onChange={this.handleChange} value={form?form.cod_rol: this.state.data.length+1}/>
                    <br />
                    <label htmlFor="nombre">Tipo Rol</label>
                    <input className="form-control" type="text" name="tip_roles" id="tip_roles" onChange={this.handleChange} value={form?form.tip_roles: ''}/>
                    <br />
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar el Rol {form && form.tip_roles}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
  </div>
  
 </>


  );
}
}
export default roles;
