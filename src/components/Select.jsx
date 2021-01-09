import React from 'react';

const defautltItems = ['place your item here', 'place your other item here']

const Select = (props) => { 
    
    const {
        dropdownItems = defautltItems, 
        label = 'Ingresa titulo', 
        onChange, 
        value, 
        dataKeyPrecio,
        isValid
    } = props
    
    const dataPrecio = (data) => {

        return !data ? `data-precio="${data}"` : ''

    }
    
    return (
        <div className='field has-text-centered'>
            <label className='label'>{ label }</label>
            <div className={`select columns m-4 ${isValid}`}>
                <select 
                    onChange={ onChange } 
                    value={ value }
                    className='column is-full'
                >
                    <option value="disabled" disabled={true}>Selecciona</option>
                    { dropdownItems.map( (item, index) => {
                        return <option {...dataPrecio} key={ index } value={ item } >{ item }</option>
                    })}
                </select>
            </div>

        </div>
    )
}

export default Select;