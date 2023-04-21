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

const url="http://localhost:8000/AXE/Recuperar_Contrasenia/";


class contrasnia extends React.Component {
  state={
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    form:{
      cod_pregunta_respuesta: '',
      cod_usuario: '',
      nomb_pregunta: '',
      des_respuesta: ''
       
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
    axios.put(url+this.state.form.cod_pregunta_respuesta, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    })
  }
  
  peticionDelete=()=>{
    axios.delete(url+this.state.form.cod_pregunta_respuesta).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }
  
  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }
  
  seleccionarContraseña=(contrasenia)=>{
    this.setState({
      tipoModal: 'actualizar',
      form: {
        cod_pregunta_respuesta: contrasenia.cod_pregunta_respuesta,
        cod_usuario: contrasenia.cod_usuario,
        nomb_pregunta: contrasenia.nomb_pregunta,
        des_respuesta: contrasenia.des_respuesta,
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
    <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Registro</button>
    <br /><br />
      <table className="table ">
        <thead>
          <tr>
            <th>Codigo Pregunta</th>
            <th>Codigo Usuario</th>
            <th>Nombre Pregunta</th>
            <th>Respuesta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(contrsenia=>{
            return(
              <tr>
            <td>{contrsenia.cod_pregunta_respuesta}</td>
            <td>{contrsenia.cod_usuario}</td>
            <td>{contrsenia.nomb_pregunta}</td>
            <td>{contrsenia.des_respuesta}</td>
            <td>
                  <button className="btn btn-primary" onClick={()=>{this.seleccionarContraseña(contrsenia); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                  {"   "}
                  <button className="btn btn-danger" onClick={()=>{this.seleccionarContraseña(contrsenia); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
                      <label htmlFor="id">Codigo Pregunta</label>
                      <input className="form-control" type="text" name="cod_pregunta_respuesta" id="cod_pregunta_respuesta" readOnly onChange={this.handleChange} value={form?form.cod_pregunta_respuesta: this.state.data.length+1}/>
                      <br />
                      <label htmlFor="nombre">Codigo Usuario</label>
                      <input className="form-control" type="text" name="cod_usuario" id="cod_usuario" onChange={this.handleChange} value={form?form.cod_usuario: ''}/>
                      <br />
                      <label htmlFor="nombre">Pregunta</label>
                      <input className="form-control" type="text" name="nomb_pregunta" id="nomb_pregunta" onChange={this.handleChange} value={form?form.nomb_pregunta: ''}/>
                      <br />
                      <label htmlFor="nombre">Respuesta</label>
                      <input className="form-control" type="text" name="des_respuesta" id="des_respuesta" onChange={this.handleChange} value={form?form.des_respuesta: ''}/>
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
 export default contrasnia;
  