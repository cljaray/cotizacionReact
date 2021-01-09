import React,{ useState, useEffect } from 'react';

const SelectPorcentajeCobro = ({defineStatePorcentajeGlobal, value, getWindowLocation }) => {
    
    useEffect(() => {
        getWindowLocation()
    })


    const handlePorcentajeInputChange = (e) => {
        defineStatePorcentajeGlobal(e.target.value)
    }

    
    return(
        <div className="columns is-mobile is-centered">
          <div className="column is-half">
            <div className="level">
                <p className="is-spaced has-text-justified">
                    El valor de por unidad de cada item añadido a la cotización sera calculado utilizando el valor real del equipo y el porcentaje ingresado en esta pagina. 
                    El porcentaje sera aplicado de forma global a todos los items. (Porcentaje ingresado es automáticamente aplicado)
                </p>
            </div>
            <div className="level">
                 <label className="label level-item has-text-centered">Ingresar porcentaje</label>

            </div>
            <div className="level">
                <input 
                    name="porcentajeCobro"
                    className="input level-item" 
                    type="number"
                    onChange={handlePorcentajeInputChange}
                    value={value}
                />
            </div>
            <div className="level">
                <div className="level-item has-text-centered">
                    <small>(Porcentajes recomendados: 5%, 7%, 10%)</small>
                </div>
            </div>
            </div>
        </div>
    )
};

export default SelectPorcentajeCobro;