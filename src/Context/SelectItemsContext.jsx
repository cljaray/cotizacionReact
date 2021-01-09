import React, { useState, useContext } from 'react';
import { ListaEquiposContext } from './listaEquiposContext'
import { Toast,Warning } from '../components/alerts';


/* 
- Definir tipo de equipos y valor actual de selected tipo equipo  OK
-Funcion on change de tipo equipos que produce lista de equipos OK
-definir el valor actual de equipos OK
 funcion onchange que define cantidad de equipos OK
 -definir valor actual de cantidad OK
 -funcion que muestra y calcula precio dependiendo de porcentaje global
 -funcion que agrega equipo a la lista de cotizacion

*/


export const SelectItemsContext = React.createContext();

export const SelectItemsProvider = ({ children, porcentajeCobroGlobal, añadirItemCotizacion, getWindowLocation, calculaValorUnitario }) => {

    
  /* Contexto con objeto contenedor de informacion de equipos */
    const listaEquipos = useContext(ListaEquiposContext);
    const tipoEquiposKeys = Object.keys(listaEquipos);

      /* State para Select tipo equipo, options y current option*/
    const [tipoEquipoOptions, setTipoEquipoOptions] = useState(tipoEquiposKeys);
    const [selectedValueTipoEquipo, setSelectedValueTipoEquipo] = useState('disabled');
    
    /* State para definir opciones de equipo y current value equipo */
    const [equipoOptions,setEquipoOptions] = useState([]);
    const [selectedValueEquipo, setSelectedValueEquipo] = useState('disabled');

    /* State para definir opciones de cantidad y current value equipo */
    const [cantidadOptions, setCantidadOptions] = useState([]);
    const [selectedValueCantidad, setSelectedValueCantidad] = useState('disabled');

    /* State para definir precio de equipo seleccionado */
    const [selectedEquipoPrecio, setSelectedEquipoPrecio] = useState(0);

    const [valorUnitarioEquipoSeleccionado ,setValorUnitarioEquipoSeleccionado] = useState(0);

    const [isValidInput, setIsValidInput] = useState({
      selectedValueTipoEquipo:true,
      selectedValueEquipo:true,
      selectedValueCantidad:true
    })


    const handleOnChangeTipoEquipo = (value) => {
        setSelectedValueTipoEquipo(value);
        //Define opciones del select de equipos
        selectEquipoOptions(value);

        //reset select options
        setSelectedValueEquipo('disabled');
        setSelectedValueCantidad('disabled');
        setCantidadOptions([]);
        setSelectedEquipoPrecio(0);
        setIsValidInput(isValidInput => {
          return {...isValidInput, selectedValueTipoEquipo: true}
        })

    };

    const selectEquipoOptions = (tipo) => {
        if(tipo === 'disabled'){
          return []
        };
        
        const optionsValue = listaEquipos[tipo].map( option => {
          return `${option.Marca} ${option.Modelo}`
        });
    
        return setEquipoOptions(optionsValue);
                
      };
    
    const handleOnChangeEquipo = (value, selectedIndex) => {
        setSelectedValueEquipo(value)
        //Define opciones de select de cantidad
        selectCantidadOptions(selectedValueTipoEquipo, selectedIndex)
        //Inserta valor de equipo
        precioEquipoSeleccionado(selectedIndex)

        //reset valid input warning
        setIsValidInput(isValidInput => {
          return {...isValidInput, selectedValueEquipo: true}
        })
    };

    const precioEquipoSeleccionado = (selectedIndex) => {
        //Definiendo index para acceder a objeto de equipos en ListaEquiposContext
        let index = selectedIndex - 1;
        let precio = listaEquipos[selectedValueTipoEquipo][index].Precio;
        setSelectedEquipoPrecio(precio);
        calculaValorUnitarioEquipoSeleccionado(precio)
      }

    const calculaValorUnitarioEquipoSeleccionado = (precio) => {
        setValorUnitarioEquipoSeleccionado(calculaValorUnitario(precio))
    }
    
    const selectCantidadOptions = (tipo, selectedIndex) => {
        /* El primer item seleccionado en select va a ser siempre 1 debido a que siempre hay una opcion disabled por default,
        se le resta uno para acceder al item dentro del objeto listaEquipos del context*/
        let index = selectedIndex - 1;
      
        const { Cantidad } = listaEquipos[tipo][index]
      
        let cantidadArray = [];
      
        for (let i = 0; i < Cantidad; i++ ){ 
          cantidadArray.push(i + 1);
        }
      
        setCantidadOptions(cantidadArray)

        // reset select de cantidad
        setSelectedValueCantidad('disabled')

        
      
      };

      const handleOnChangeCantidad = (value) => {
        setSelectedValueCantidad(value)

        //reset select warning
        setIsValidInput(isValidInput => {
          return {...isValidInput, selectedValueCantidad: true}
        })
      };

      

      const isValidated = () => {
        let validationObj = {};

        const inputValues = { 
          selectedValueTipoEquipo,
          selectedValueEquipo,
          selectedValueCantidad,
        }

        for(let value in inputValues){
          inputValues[value] === 'disabled' ? validationObj[value] = false : validationObj[value] = true; 
        };

        setIsValidInput(validationObj);

        return !Object.values(inputValues).includes('disabled')

      }

      const handleButtonAñadir = () => {
        if(isValidated()){
          
          Toast.fire({
            icon: 'success',
            title: 'Item agregado !'
          })
          
          return añadirItemCotizacion({
              selectedValueTipoEquipo,
              selectedValueEquipo,
              selectedValueCantidad,
              selectedEquipoPrecio
            });
        }

        Warning.fire({
          title: 'Oopss',
          text: 'Parece que debes agregar informacion extra',
        })

        
      };

    
      //Valores para enviar a traves de contexto
      const contextObjectValues = {
          listaEquipos,
          selectedValueTipoEquipo,
          tipoEquipoOptions,
          selectedValueEquipo,
          equipoOptions,
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
            getWindowLocation,
          }
      }

    return (
        <SelectItemsContext.Provider value={contextObjectValues}>
            {children}
        </SelectItemsContext.Provider>
    )

};