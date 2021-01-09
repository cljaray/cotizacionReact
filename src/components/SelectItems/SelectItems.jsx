import React, { useContext, useEffect } from 'react';
import Select from '../Select';
import { SelectItemsContext } from '../../Context/SelectItemsContext';

const SelectItems = ({ onBotonAñadirItem, selectedItemState }) => { 
  const { 
    listaEquipos,
    tipoEquipoOptions,
    selectedValueTipoEquipo,
    equipoOptions,
    selectedValueEquipo,
    selectEquipoOptions,
    cantidadOptions,
    selectedValueCantidad,
    selectedEquipoPrecio,
    valorUnitarioEquipoSeleccionado,
    porcentajeCobroGlobal,
    isValidInput,
    handlers: {
      handleOnChangeTipoEquipo,
      handleOnChangeEquipo,
      handleOnChangeCantidad,
      handleButtonAñadir,
      getWindowLocation
    }
    
  } = useContext(SelectItemsContext);


  useEffect(() => {
    getWindowLocation();
  })

    const onChangeTipoEquipo = (e) => {
      handleOnChangeTipoEquipo(e.target.value)
    }
    
    const onChangeEquipo = (e) => {
      handleOnChangeEquipo(e.target.value, e.target.selectedIndex)
    }
    
    const onChangeCantidad = (e) => {
      handleOnChangeCantidad(e.target.value)
    }
  
    const onClickButtonAñadir = () => {
      handleButtonAñadir();
    }


    return(
      
      <React.Fragment>
        <div className="columns is-mobile is-centered">
          <div className="column is-half">
            {/* Select para seleccionar el tipo de equipo */}
            <Select 
              label='Selecciona tipo de equipo'
              dropdownItems={ tipoEquipoOptions }
              onChange={ onChangeTipoEquipo }
              value={ selectedValueTipoEquipo }
              isValid={isValidInput.selectedValueTipoEquipo ? '' : 'is-danger'}
            />
          </div>    
        </div>
        <div className="columns is-mobile is-centered">
          <div className="column is-half">
            {/* Select para elegir el equipo, su opciones dependen del select anterior */ }
            <Select 
              label='Selecciona Equipo'
              dropdownItems={ equipoOptions }
              value={selectedValueEquipo}
              onChange={onChangeEquipo}
              isValid={isValidInput.selectedValueEquipo ? '' : 'is-danger'}

            />
          </div>
        </div>
        <div className="columns is-mobile is-centered">
          <div className="column is-half">
            <div className="columns has-text-centered">
                <label className="label column is-full">Valor equipo</label>
            </div>
            <div className="columns m-4">
              <input 
                name="valorEquipo"
                className="input column is-full" 
                type="text"
                value={selectedEquipoPrecio}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="columns is-mobile is-centered">
          <div className="column is-half">
            <div className="columns has-text-centered">
                <label className="label column is-full">Valor item por unidad (porcentaje de cobro actual {porcentajeCobroGlobal})</label>
            </div>
            <div className="columns m-4">
              <input 
                name="valorEquipo"
                className="input column is-full" 
                type="text"
                value={ valorUnitarioEquipoSeleccionado }
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="columns is-mobile is-centered">
          <div className="column is-half">
            {/* Select para elegir cantidad de equipo a agregar, su valor depende del select anterior */}
            <Select 
              label='Selecciona cantidad'
              dropdownItems={ cantidadOptions }
              value={selectedValueCantidad}
              onChange={onChangeCantidad}
              isValid={isValidInput.selectedValueCantidad ? '' : 'is-danger'}
            />
          </div>
        </div>
          <div className="is-flex is-justify-content-center">
            <button onClick={() => onClickButtonAñadir()} className="button is-primary">Añadir a cotización</button>
          </div>
      </React.Fragment>
    )
}

export default SelectItems;