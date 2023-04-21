import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import Header from "components/Headers/Header";
//import Header from "components/Headers/Header";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const url="http://localhost:8000/AXE/Donantes/";


class donantes extends React.Component {
  state={
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    form:{
      cod_donantes: '',
      cod_usuario: '',
      nombre: '',
      identidad: '',
      direccion: '',
      telefono: '',
      email: '',
      fec_creacion: ''

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
    axios.put(url+this.state.form.cod_donantes, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    })
  }
  
  peticionDelete=()=>{
    axios.delete(url+this.state.form.cod_donantes).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }
  
  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }
  
  seleccionarDonantes=(donantes)=>{
    this.setState({
      tipoModal: 'actualizar',
      form: {
        cod_donantes: donantes.cod_donantes,
        cod_usuario: donantes.cod_usuario,
        nombre: donantes.nombre,
        identidad: donantes.identidad,
        direccion: donantes.direccion,
        telefono: donantes.telefono,
        email: donantes.email,

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
      <div className="donante">
      <br /><br /><br />
    <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Donante</button>
    <br /><br />
      <table className="table ">
        <thead>
          <tr>
            <th>Codigo Donantes</th>
            <th>Codigo Usuario</th>
            <th>Nombre</th>
            <th>identidad</th>
            <th>Direccion</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Fecha Creacion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(donantes=>{
            return(
              <tr>
            <td>{donantes.cod_donantes}</td>
            <td>{donantes.cod_usuario}</td>
            <td>{donantes.nombre}</td>
            <td>{donantes.identidad}</td>
            <td>{donantes.direccion}</td>
            <td>{donantes.telefono}</td>
            <td>{donantes.email}</td>
            <td>{donantes.fec_creacion}</td>
            <td>
                  <button className="btn btn-primary" onClick={()=>{this.seleccionarDonantes(donantes); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                  {"   "}
                  <button className="btn btn-danger" onClick={()=>{this.seleccionarDonantes(donantes); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
                      <label htmlFor="id">Codigo Donante</label>
                      <input className="form-control" type="text" name="cod_donante" id="cod_donante" readOnly onChange={this.handleChange} value={form?form.cod_donante: this.state.data.length+1}/>
                      <br />
                      <label htmlFor="nombre">Codigo Usuario</label>
                      <input className="form-control" type="text" name="cod_usuario" id="cod_usuario" onChange={this.handleChange} value={form?form.cod_usuario: ''}/>
                      <br />
                      <label htmlFor="nombre">Nombres</label>
                      <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form?form.nombre: ''}/>
                      <br />
                      <label htmlFor="nombre">Identidad</label>
                      <input className="form-control" type="text" name="identidad" id="identidad" onChange={this.handleChange} value={form?form.identidad: ''}/>
                      <br />
                      <label htmlFor="nombre">Direccion</label>
                      <input className="form-control" type="text" name="direccion" id="direccion" onChange={this.handleChange} value={form?form.direccion: ''}/>
                      <br />
                      <label htmlFor="nombre">Telefono</label>
                      <input className="form-control" type="text" name="telefono" id="telefono" onChange={this.handleChange} value={form?form.telefono: ''}/>
                      <br />
                      <label htmlFor="nombre">Email</label>
                      <input className="form-control" type="text" name="email" id="email" onChange={this.handleChange} value={form?form.email: ''}/>
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
 export default donantes;
  