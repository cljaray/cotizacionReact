import '../assets/index.css'
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import DatosForm from './DatosForm';
import Contenedor from './Contenedor';
import SelectItems from './SelectItems/SelectItems';
import ItemPersonalizado from './ItemPersonalizado';
import NavBar from './NavBar';
import HojaCotizacion from './HojaCotizacion';
import VistaPrevia from  './VistaPrevia'
import SelectPorcentajeCobro from './SelectPorcentajeCobro'
import { SelectItemsProvider } from '../Context/SelectItemsContext'


const App = () =>{
    const [infoCotizacion, setInfoCotizacion] = useState({
        titulo: 'Por definir',
        evento: 'Por definir',
        lugar: 'Por definir',
        horario: 'Por definir',
        fecha: 'Por definir',
        condicion: 'Agregar condicion aquí'
    });
    const [itemsCotizacion, setItemsCotizacion] = useState([]);
    
    const [porcentajeCobroGlobal, setPorcentajeCobroGlobal] = useState(7);

    const [itemListId, setItemListId] = useState(0);

    const [vistaPrevia, setVistaPrevia] = useState(false);

    const [condiciones,setCondiciones] = useState([]);

    const [condicionListId, setCondicionListId] = useState(0);

    const inputItemPersonalizadoInitialState = {
        selectedValueTipoEquipo: '',
        selectedValueEquipo: '',
        selectedValueCantidad: 0,
        selectedEquipoPrecio: 0
    };

    const [infoInputItemPersonalizado, setInfoInputItemPersonalizado] = useState(inputItemPersonalizadoInitialState);

    const configObjTitleContainer = {
        '': 'Ingresar datos cotización',
        'items': 'Agregar equipos',
        'itempersonalizado': 'Agregar equipo personalizado',
        'porcentajecobro': 'Define porcentaje de cobro global',
        'previewcotizacion': 'Vista previa de Cotización'
    };

    const [containerTitle,setContainerTitle] = useState('Ingresar datos cotización');

    const [isPrinting, setIsPrinting] = useState(false);

    useEffect(() => {
        console.log(isPrinting)
        if(isPrinting){
            window.print();

        }
    },[isPrinting])

    const getWindowLocation = () => {

        const location = window.location.valueOf().pathname;

        setContainerTitle(configObjTitleContainer[location.replace('/','')])

        return setVistaPrevia(location === '/previewcotizacion')
    }

    const defineStatePorcentajeGlobal = (porcentaje) => {
        setPorcentajeCobroGlobal(porcentaje);
    };   

    const handleInputDatosForm = ( infoCotizacionObjectKey, stateValue ) => {
        setInfoCotizacion( infoCotizacion => {
            
            return {...infoCotizacion, [infoCotizacionObjectKey] : stateValue}
        })
    };

    const handleInputItemPersonalizado = (inputKey,value) => {
        setInfoInputItemPersonalizado(infoInputItemPersonalizado => {
            return {...infoInputItemPersonalizado, [inputKey]: value}
        })


    }

    const calculaValorUnitario = (precioEquipo) => {
        return (parseInt(porcentajeCobroGlobal) * precioEquipo ) / 100
    }

    const añadirItemCotizacion = (info) => {
        /* Formato de objeto
            {selectedValueTipoEquipo,selectedValueEquipo,selectedValueCantidad,valorTotal}
        */
        const value = info === "itemPersonalizado" ? infoInputItemPersonalizado : info
        //agregando propiedad itemId to value object
        value.itemId = itemListId
        
        setItemsCotizacion(itemsCotizacion => {
            return [...itemsCotizacion, value]
        })
        
        setItemListId(itemListId => itemListId + 1)

        //reset input item personalizado
        if(info === "itemPersonalizado"){
            setInfoInputItemPersonalizado(inputItemPersonalizadoInitialState);
        }
        
    };

    const deleteItem = (id) => {
        setItemsCotizacion(itemsCotizacion => {
            const newItemsList = itemsCotizacion.filter(item => {
                return item.itemId !== parseInt(id) 
            })
            return newItemsList;
        })
    };

    const agregaCondiciones = (condicion) => {
        condicion.condicionId = condicionListId
        setCondiciones(condiciones => [...condiciones,condicion])
        setInfoCotizacion(info => {
            return {...info, condicion : ""}
        })

        setCondicionListId(condicionListId => condicionListId + 1)
    }

    const deleteCondicion = (id) => {
        setCondiciones(condiciones => {
            const newCondicionesList = condiciones.filter(condicion => {
                return condicion.condicionId !== parseInt(id) 
            })
            return newCondicionesList;
        })
    }
    
    const handleIsPrinting = () => {
        setIsPrinting(true)
    }

    const handleIsNotPrinting = (value) => {
        setIsPrinting(value);
    }


    const { titulo, evento, lugar, horario, fecha, condicion } = infoCotizacion;


    return(
        <div>
            <BrowserRouter>
            <NavBar hidden={vistaPrevia}/>
                <Contenedor title={containerTitle} isPrinting={isPrinting}>
                        <Route path="/" exact >
                            <DatosForm
                            getWindowLocation={getWindowLocation}
                            handleInputDatosForm={handleInputDatosForm}
                            agregaCondiciones={agregaCondiciones}
                            titulo={titulo}
                            evento={evento}
                            lugar={lugar}
                            horario={horario}
                            fecha={fecha}
                            condicion={condicion}
                            />
                        </Route>
                        <SelectItemsProvider
                        getWindowLocation={getWindowLocation} 
                        añadirItemCotizacion={añadirItemCotizacion} 
                        calculaValorUnitario={calculaValorUnitario}
                        >
                            <Route path="/items">
                                    <SelectItems getWindowLocation={getWindowLocation}/>
                            </Route>
                        </SelectItemsProvider>
                        <Route path="/itempersonalizado">
                            <ItemPersonalizado 
                                getWindowLocation={getWindowLocation} 
                                inputValues={infoInputItemPersonalizado}
                                handleInput={handleInputItemPersonalizado}
                                añadirItemCotizacion={añadirItemCotizacion}
                            />
                        </Route>
                        <Route path="/porcentajecobro">
                            <SelectPorcentajeCobro 
                            getWindowLocation={getWindowLocation}
                            defineStatePorcentajeGlobal={defineStatePorcentajeGlobal}
                            value={porcentajeCobroGlobal}
                            />
                        </Route>
                        <Route path="/previewcotizacion">
                            <VistaPrevia 
                                getWindowLocation={getWindowLocation} 
                                isPrinting={isPrinting}
                                handleIsPrinting={handleIsPrinting} 
                            />
                        </Route>
                </Contenedor>
            </BrowserRouter>
                <HojaCotizacion 
                infoCotizacion={infoCotizacion} 
                itemsCotizacion={itemsCotizacion} 
                deleteItem={deleteItem}
                calculaValorUnitario={calculaValorUnitario}
                condiciones={condiciones}
                deleteCondicion={deleteCondicion}
                vistaPrevia={vistaPrevia}
                isPrinting={isPrinting}
                handleIsNotPrinting={handleIsNotPrinting}
                />
        </div>
    );
};

export default App;