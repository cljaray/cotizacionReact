import React, { useEffect, useState } from 'react';
import { Warning, Toast } from './alerts';

const ItemPersonalizado = (props) => {

    const { selectedValueTipoEquipo,
        selectedValueEquipo,
        selectedValueCantidad,
        selectedEquipoPrecio } = props.inputValues

    const [isValidInput, setIsValidInput] = useState({
        selectedValueTipoEquipo: true,
        selectedValueEquipo: true,
        selectedValueCantidad: true,
        selectedEquipoPrecio: true 
    })

    useEffect(()=> {
        props.getWindowLocation();
    },[])
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        props.handleInput(name,value);

        setIsValidInput(isValidInput => {
            return {...isValidInput, [name]:true}
        })


    }

    const isValidated = () => {
        let validationObj = {}
        let dummyItem;

        for(let value in props.inputValues){
            console.log(props.inputValues[value])
            dummyItem = props.inputValues[value].toString().trim()
            dummyItem === '' || dummyItem === '0' ? validationObj[value] = false : validationObj[value] = true;
        }
        console.log(validationObj)

        setIsValidInput(validationObj);

        return !Object.values(validationObj).includes(false);

        

    }

    const handleSubmit = () => {

        if(isValidated()){
            Toast.fire({
                title:'Item añadido !',
                icon:'success'
            })
            return props.añadirItemCotizacion("itemPersonalizado")
        }

        Warning.fire({
            title:'Oops..',
            text:'Debes rellenar los campos requeridos'
        })

        
    }

    
        
        return(
            <>        
                <div className="field">
                    <label className="label">Tipo:</label>
                    <div className="control">
                        <input 
                            placeholder="Parlante, microfono, etc..."
                            onChange={handleInputChange} 
                            value={selectedValueTipoEquipo} 
                            className={`input ${isValidInput.selectedValueTipoEquipo ? '' : 'is-danger'}`} 
                            type="text"
                            name="selectedValueTipoEquipo"
                        />
                    </div>                
                </div>

                <div className="field">
                    <label className="label">Equipo:</label>
                    <div className="control">
                        <input 
                            placeholder="Shure beta57, SC-48, etc..."
                            onChange={handleInputChange} 
                            value={selectedValueEquipo} 
                            className={`input ${isValidInput.selectedValueEquipo ? '' : 'is-danger'}`} 
                            type="text"
                            name="selectedValueEquipo"
                        />
                    </div>                
                </div>

                <div className="field">
                    <label className="label">Cantidad:</label>
                    <div className="control">
                        <input 
                            onChange={handleInputChange} 
                            value={selectedValueCantidad}
                            className={`input ${isValidInput.selectedValueCantidad ? '' : 'is-danger'}`} 
                            type="number"
                            name="selectedValueCantidad"
                        />
                    </div>                
                </div>

                <div className="field">
                    <label className="label">Precio real:</label>
                    <div className="control">
                        <input 
                            onChange={handleInputChange} 
                            value={selectedEquipoPrecio}
                            className={`input ${isValidInput.selectedEquipoPrecio ? '' : 'is-danger'}`} 
                            type="number"
                            name="selectedEquipoPrecio"
                        />
                        <small>Ingresar valor estimado de item, su valor unitario para la cotizacion será calculado dependiendo del porcentaje de cobro global.</small>
                    </div>                
                </div>
                <div className="level">
                    <div className="level-item">
                        <button className="button is-success" onClick={handleSubmit}>Agregar item</button>
                    </div>
                </div>
            </> 
        )
    
}

export default ItemPersonalizado;