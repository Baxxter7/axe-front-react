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

const url="http://localhost:8000/AXE/Donacion/";


class donaciones extends React.Component {
  state={
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    form:{
      cod_donacion: '',
      nom_institucion: '',
      tip_donacion: '',
      des_donacion: '',
      fec_donacion: ''
      
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
    axios.put(url+this.state.form.cod_donacion, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    })
  }
  
  peticionDelete=()=>{
    axios.delete(url+this.state.form.cod_donacion).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }
  
  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }
  
  seleccionarDonacion=(donacion)=>{
    this.setState({
      tipoModal: 'actualizar',
      form: {
        cod_donacion: donacion.cod_donacion,
        nom_institucion: donacion.nom_institucion,
        tip_donacion: donacion.tip_donacion,
        des_donacion: donacion.des_donacion,
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
    <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Donacion</button>
    <br /><br />
      <table className="table ">
        <thead>
          <tr>
            <th>Codigo Donacion</th>
            <th>Centro Educativo</th>
            <th>Tipo Donacion</th>
            <th>Descripcion</th>
            <th>Fecha Donacion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(donacion=>{
            return(
              <tr>
            <td>{donacion.cod_donacion}</td>
            <td>{donacion.nom_institucion}</td>
            <td>{donacion.tip_donacion}</td>
            <td>{donacion.des_donacion}</td>
            <td>{donacion.fec_donacion}</td>
            <td>
                  <button className="btn btn-primary" onClick={()=>{this.seleccionarDonacion(donacion); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                  {"   "}
                  <button className="btn btn-danger" onClick={()=>{this.seleccionarDonacion(donacion); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
                      <label htmlFor="id">Codigo Donacion</label>
                      <input className="form-control" type="text" name="cod_donacion" id="cod_donacion" readOnly onChange={this.handleChange} value={form?form.cod_donacion: this.state.data.length+1}/>
                      <br />
                      <label htmlFor="nombre">Centro Educativo</label>
                      <input className="form-control" type="text" name="nom_institucion" id="nom_institucion" onChange={this.handleChange} value={form?form.nom_institucion: ''}/>
                      <br />
                      <label htmlFor="nombre">Tipo Donacion</label>
                      <input className="form-control" type="text" name="tip_donacion" id="tip_donacion" onChange={this.handleChange} value={form?form.tip_donacion: ''}/>
                      <br />
                      <label htmlFor="nombre">Descripcion</label>
                      <input className="form-control" type="text" name="des_donacion" id="des_donacion" onChange={this.handleChange} value={form?form.des_donacion: ''}/>
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
 export default donaciones;
  