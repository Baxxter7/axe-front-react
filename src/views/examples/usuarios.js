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

const url="http://localhost:8000/AXE/Usuarios/";


class usuarios extends React.Component {
  state={
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    form:{
      cod_usuario: '',
      nom_usuario: '',
      contrasenia: '',
      estado_usuario: '',
      fec_creacion: '',
      cod_rol: '',
      telefono: '',
      email: ''
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
    axios.put(url+this.state.form.cod_usuario, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    })
  }
  
  peticionDelete=()=>{
    axios.delete(url+this.state.form.cod_usuario).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }
  
  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }
  
  seleccionarUser=(user)=>{
    this.setState({
      tipoModal: 'actualizar',
      form: {
        cod_usuario: user.cod_usuario,
        nom_usuario: user.nom_usuario,
        contrasenia: user.contrasenia,
        estado_usuario: user.estado_usuario,
        cod_rol: user.cod_rol,
        telefono: user.telefono,
        email: user.email,
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
      <div className="usuario">
      <br /><br /><br />
    <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Usuario</button>
    <br /><br />
      <table className="table ">
        <thead>
          <tr>
            <th>Codigo Usuario</th>
            <th>Nombre</th>
            <th>Contraseña</th>
            <th>Estado Usuario</th>
            <th>Fecha Creacion</th>
            <th>Codigo Rol</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(user=>{
            return(
              <tr>
            <td>{user.cod_usuario}</td>
            <td>{user.nom_usuario}</td>
            <td>{user.contrasenia}</td>
            <td>{user.estado_usuario}</td>
            <td>{user.fec_creacion}</td>
            <td>{user.cod_rol}</td>
            <td>{user.telefono}</td>
            <td>{user.email}</td>
            <td>
                  <button className="btn btn-primary" onClick={()=>{this.seleccionarUser(user); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                  {"   "}
                  <button className="btn btn-danger" onClick={()=>{this.seleccionarUser(user); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
                      <label htmlFor="id">Codigo Usuario</label>
                      <input className="form-control" type="text" name="cod_usuario" id="cod_usuario" readOnly onChange={this.handleChange} value={form?form.cod_usuario: this.state.data.length+1}/>
                      <br />
                      <label htmlFor="nombre">Nombre</label>
                      <input className="form-control" type="text" name="nom_usuario" id="nom_usuario" onChange={this.handleChange} value={form?form.nom_usuario: ''}/>
                      <br />
                      <label htmlFor="nombre">Contraseña</label>
                      <input className="form-control" type="text" name="contrasenia" id="contrasenia" onChange={this.handleChange} value={form?form.contrasenia: ''}/>
                      <br />
                      <label htmlFor="nombre">Estado</label>
                      <input className="form-control" type="text" name="estado_usuario" id="estado_usuario" onChange={this.handleChange} value={form?form.estado_usuario: ''}/>
                      <br />
                      <label htmlFor="nombre">Codigo Rol</label>
                      <input className="form-control" type="text" name="cod_rol" id="cod_rol" onChange={this.handleChange} value={form?form.cod_rol: ''}/>
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
 export default usuarios;
  