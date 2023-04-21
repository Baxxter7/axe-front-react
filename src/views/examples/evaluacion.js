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

const url="http://localhost:8000/AXE/Evaluacion/";


class evaluacion extends React.Component {
  state={
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    form:{
      cod_evaluacion: '',
      nom_institucion: '',
      des_evaluacion: ''
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
    axios.put(url+this.state.form.cod_evaluacion, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    })
  }
  
  peticionDelete=()=>{
    axios.delete(url+this.state.form.cod_evaluacion).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }
  
  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }
  
  seleccionarEvaluacion=(evaluacion)=>{
    this.setState({
      tipoModal: 'actualizar',
      form: {
        cod_evaluacion: evaluacion.cod_evaluacion,
        nom_institucion: evaluacion.nom_institucion,
        des_evaluacion: evaluacion.des_evaluacion,
        
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
    <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Evaluacion</button>
    <br /><br />
      <table className="table ">
        <thead>
          <tr>
            <th>Codigo Evaluacion</th>
            <th>Centro Educativo</th>
            <th>Descripcion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(evaluacion=>{
            return(
              <tr>
            <td>{evaluacion.cod_evaluacion}</td>
            <td>{evaluacion.nom_institucion}</td>
            <td>{evaluacion.des_evaluacion}</td>
            <td>
                  <button className="btn btn-primary" onClick={()=>{this.seleccionarEvaluacion(evaluacion); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                  {"   "}
                  <button className="btn btn-danger" onClick={()=>{this.seleccionarEvaluacion(evaluacion); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
                      <label htmlFor="id">Codigo Evaluacion</label>
                      <input className="form-control" type="text" name="cod_evaluacion" id="cod_evaluacion" readOnly onChange={this.handleChange} value={form?form.cod_evaluacion: this.state.data.length+1}/>
                      <br />
                      <label htmlFor="nombre">Centro Educativo</label>
                      <input className="form-control" type="text" name="nom_institucion" id="nom_institucion" onChange={this.handleChange} value={form?form.nom_institucion: ''}/>
                      <br />
                      <label htmlFor="nombre">Descripcion</label>
                      <input className="form-control" type="text" name="des_evaluacion" id="des_evaluacion" onChange={this.handleChange} value={form?form.des_evaluacion: ''}/>
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
 export default evaluacion;
  