import React from 'react';
import { Component } from 'react';
import { Toast } from './alerts'
class DatosForm extends Component{

    onInputChange = (e) =>{

        const target = e.target;

        this.props.handleInputDatosForm( target.name, target.value );

    }

    componentDidMount(){
        this.props.getWindowLocation();
    }
    
    handleButtonAgregarCondicion = () => {
        this.props.agregaCondiciones({condicionText : this.props.condicion})
          
          Toast.fire({
            icon: 'success',
            title: 'Condicion agregada !'
          })
    }

    render(){
        return(   
            <>        
                <div className="field">
                    <label className="label">Título Cotización</label>
                    <div className="control">
                    <input 
                            onChange={this.onInputChange}
                            value={this.props.titulo}
                            name="titulo"
                            className="input" 
                            type="text"
                        />
                    </div>                
                </div>
                
                <div className="field">
                    <label className="label">Nombre Evento:</label>
                    <div className="control">
                        <input 
                                onChange={this.onInputChange}
                                value={this.props.evento}
                                name="evento"
                                className="input" 
                                type="text"
                            />
                    </div>                
                </div>

                <div className="field">
                    <label className="label">Lugar:</label>
                    <div className="control">
                        <input 
                            onChange={this.onInputChange}
                            value={this.props.lugar}
                            name="lugar"
                            className="input" 
                            type="text"
                        />
                    </div>                
                </div>

                <div className="field">
                    <label className="label">Horario:</label>
                    <div className="control">
                        <input 
                            onChange={this.onInputChange}
                            value={this.props.horario}
                            name="horario"
                            className="input" 
                            type="text"
                        />
                    </div>                
                </div>

                <div className="field">
                    <label className="label">Fecha:</label>
                    <div className="control">
                        <input 
                            onChange={this.onInputChange}
                            value={this.props.fecha}
                            name="fecha"
                            className="input" 
                            type="text"
                        />
                    </div>                
                </div>

                <div className="field">
                    <label className="label">Condiciones</label>
                    <div className="control">
                        <textarea 
                            onChange={this.onInputChange}
                            value={this.props.condicion}
                            name="condicion"
                            className="textarea" 
                            placeholder="Textarea"
                        >
                        </textarea>
                    </div>
                </div>
                <div>
                    <div className="level">
                        <button 
                        className="button is-link is-small"
                        onClick={this.handleButtonAgregarCondicion}
                        >
                            Agregar Condición
                        </button>
                    </div>
                </div>

            </>           
        )
    }
}

export default DatosForm;

