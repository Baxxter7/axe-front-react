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

const url="http://localhost:8000/AXE/Permisos/";


class Permisos extends React.Component {
  state={
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    form:{
      cod_permisos: '',
      per_insercion: '',
      per_eliminar: '',
      per_actualizar: '',
      per_consultar: '',
      fec_modificacion: '',
      cod_rol: ''
      
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
    axios.put(url+this.state.form.cod_permisos, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    })
  }
  
  peticionDelete=()=>{
    axios.delete(url+this.state.form.cod_permisos).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }
  
  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }
  
  seleccionarPermiso=(permisos)=>{
    this.setState({
      tipoModal: 'actualizar',
      form: {
        cod_permisos: permisos.cod_permisos,
        per_insercion: permisos.per_insercion,
        per_eliminar: permisos.tip_donacion,
        per_actualizar: permisos.per_actualizar,
        per_consultar: permisos.per_consultar, 
        cod_rol: permisos.cod_rol,
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
      <div className="donacion">
      <br /><br /><br />
    <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Permiso</button>
    <br /><br />
      <table className="table ">
        <thead>
          <tr>
            <th>Codigo Permisos</th>
            <th>Insertar</th>
            <th>Eliminar</th>
            <th>Actualizar</th>
            <th>Consultar</th>
            <th>Fecha Modificacion</th>
            <th>Codigo Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(permisos=>{
            return(
              <tr>
            <td>{permisos.cod_permisos}</td>
            <td>{permisos.per_insercion}</td>
            <td>{permisos.per_eliminar}</td>
            <td>{permisos.per_actualizar}</td>
            <td>{permisos.per_consultar}</td>
            <td>{permisos.fec_modificacion}</td>
            <td>{permisos.cod_rol}</td>
            <td>
                  <button className="btn btn-primary" onClick={()=>{this.seleccionarPermiso(permisos); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                  {"   "}
                  <button className="btn btn-danger" onClick={()=>{this.seleccionarPermiso(permisos); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
                      <label htmlFor="id">Codigo Permisos</label>
                      <input className="form-control" type="text" name="cod_permisos" id="cod_permisos" readOnly onChange={this.handleChange} value={form?form.cod_permisos: this.state.data.length+1}/>
                      <br />
                      <label htmlFor="nombre">Insertar</label>
                      <input className="form-control" type="text" name="per_insercion" id="per_insercion" onChange={this.handleChange} value={form?form.per_insercion: ''}/>
                      <br />
                      <label htmlFor="nombre">Eliminar</label>
                      <input className="form-control" type="text" name="per_eliminar" id="per_eliminar" onChange={this.handleChange} value={form?form.per_eliminar: ''}/>
                      <br />
                      <label htmlFor="nombre">Actualizar</label>
                      <input className="form-control" type="text" name="per_actualizar" id="per_actualizar" onChange={this.handleChange} value={form?form.per_actualizar: ''}/>
                      <br />
                      <label htmlFor="nombre">Consultar</label>
                      <input className="form-control" type="text" name="per_consultar" id="per_consultar" onChange={this.handleChange} value={form?form.per_consultar: ''}/>
                      <br />
                      <label htmlFor="nombre">Codigo Rol</label>
                      <input className="form-control" type="text" name="per_consultar" id="per_consultar" onChange={this.handleChange} value={form?form.des_donacion: ''}/>
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
 export default Permisos;
  