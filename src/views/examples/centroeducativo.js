import React, {Component} from "react";

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
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
//import { Component } from "react/cjs/react.production.min";
//import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


const url="http://localhost:8000/AXE/Centro%20Educativo/";

class centroeducativo extends React.Component {
 
  state = {
    data: [],
    modalActualizar: false,
    modalInsertar: false,
    form: {
      
      cod_identificador: '',
      cod_sace: '',
      nom_institucion: '',
      tip_categoria_institucion:''
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
      axios.put(url+this.state.form.cod_identificador, this.state.form).then(response=>{
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
    
    seleccionarCentroEducativo=(centroeducativo)=>{
      this.setState({
        tipoModal: 'actualizar',
        form: {
          cod_identificador: centroeducativo.cod_identificador,
          cod_sace: centroeducativo.cod_sace,
          nom_institucion: centroeducativo.nom_institucion,
          tip_categoria_institucion: centroeducativo.tip_categoria_institucion,
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
        <Container>
        <div className="centroeducativo">
    <br /><br /><br />
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Registro</button>
  <br /><br />
    <table className="table ">
      <thead>
        <tr>
          <th>Codigo Identificador</th>
          <th>Codigo Sace</th>
          <th>Centro Educativo</th>
          <th>Categoria</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(centroeducativo=>{
          return(
            <tr>
          <td>{centroeducativo.cod_identificador}</td>
          <td>{centroeducativo.cod_sace}</td>
          <td>{centroeducativo.nom_institucion}</td>
          <td>{centroeducativo.tip_categoria_institucion}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarCentroEducativo(centroeducativo); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarCentroEducativo(centroeducativo); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
                    <label htmlFor="id">Codigo Identificador</label>
                    <input className="form-control" type="text" name="cod_identificador" id="cod_identificador" readOnly onChange={this.handleChange} value={form?form.cod_identificador: this.state.data.length+1}/>
                    <br />
                    <label htmlFor="nombre">Codigo Sace</label>
                    <input className="form-control" type="text" name="cod_sace" id="cod_sace" onChange={this.handleChange} value={form?form.cod_sace: ''}/>
                    <label htmlFor="nombre">Centro Educativo</label>
                    <input className="form-control" type="text" name="nom_institucion" id="nom_institucion" onChange={this.handleChange} value={form?form.nom_institucion: ''}/>
                    <label htmlFor="nombre">Categoria</label>
                    <input className="form-control" type="text" name="tip_categoria_institucion" id="tip_categoria_institucion" onChange={this.handleChange} value={form?form.tip_categoria_institucion: ''}/>
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
  
     </Container>
     </>     
    );
  }
}
export default centroeducativo;