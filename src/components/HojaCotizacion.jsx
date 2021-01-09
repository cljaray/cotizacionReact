import React from 'react';

const HojaCotizacion = (props) => {

    const {infoCotizacion, 
        itemsCotizacion, 
        deleteItem, 
        calculaValorUnitario, 
        condiciones, 
        deleteCondicion,
        vistaPrevia,
        isPrinting,
        handleIsNotPrinting} = props

    //array de valores para calculo total de cotizacion
    const subtotalArray = [];

    const handleDeleteItem = (e) => {
        deleteItem(e.target.dataset.itemid)
    } 

    const renderValorUnitario = (precioEquipo) =>{

        return calculaValorUnitario(parseInt(precioEquipo))
    }

    const renderedItems = itemsCotizacion.map((item, index) => {

        const showBotonQuitar = vistaPrevia ? "" : <td><button data-itemid={item.itemId} className="button is-small is-warning" onClick={handleDeleteItem}>Quitar</button></td> 

        const subtotal = parseInt(item.selectedValueCantidad) * renderValorUnitario(item.selectedEquipoPrecio)

        //definiendo array para calculo total cotizacion
        subtotalArray.push(subtotal)

        return(
            /* selectedValueTipoEquipo,
                selectedValueEquipo,
                selectedValueCantidad,
                valorUnitarioEquipoSeleccionado */
            <tr key={index} >
                <td>{`${item.selectedValueTipoEquipo} ${item.selectedValueEquipo}`}</td>
                <td>{item.selectedValueCantidad}</td>
                <td>{renderValorUnitario(item.selectedEquipoPrecio)}</td>
                <td>{subtotal}</td>
                {showBotonQuitar}
            </tr>
        )
    });
    
    const renderedCondiciones = () => {

        return condiciones.map((condicion, index) => {
            const showBotonQuitar = vistaPrevia ? 
            null : 
            <button 
            data-id={condicion.condicionId} 
            className="button is-small is-warning" 
            onClick={handleDeleteCondicion}
            >Quitar
            </button>

            return (
                <li key={index} className="py-3">
                    {showBotonQuitar}
                     - {condicion.condicionText}
                </li>
            )
        })
    }
    
    const handleDeleteCondicion = (e) => {
        deleteCondicion(e.target.dataset.id)
    } 

    const showBotonQuitar = vistaPrevia ? null : <th>Quitar</th>
    
    const calculaValorTotalCotizacion = subtotalArray.reduce(( acumulador, item) => acumulador + item, 0)
    
    const calculaValorTotalCotizacionIVA = (calculaValorTotalCotizacion * 119) / 100
    
    const handleBackFromPrinting = () =>{
        if(!isPrinting){
            return {};
        } 
        return {
            onMouseMove:(() => handleIsNotPrinting(false))
        }
    }

    return(
        <div {...handleBackFromPrinting()} className="container p-6 m-3 flex has-background-light">
            <div className="div">
                <h3 className="title is-4 has-text-centered">Cotización Clarity Audio</h3>
            </div>
            <div className="p-3 pb-5">
                <p>Titulo Cotización: {infoCotizacion.titulo}</p>
                <p>Nombre de Evento: {infoCotizacion.evento}</p>
                <p>Lugar o dirección: {infoCotizacion.lugar}</p>
                <p>Horario: {infoCotizacion.horario}</p>
                <p>Fecha: {infoCotizacion.fecha}</p>
            </div>
            <div>
                <table className="table is-fullwidth is-striped is-bordered is-hoverable">
                    <thead className="has-text-centered">
                        <tr>
                            <th>Item</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Subtotal</th>
                            {showBotonQuitar}
                        </tr>
                    </thead>
                    <tbody className="has-text-centered">
                        {renderedItems}
                    </tbody>
                </table>
            </div>
            <div className="level pt-4">
                <div className="level-left">
                    <div className="box">
                        <p className="p-3"><strong>SubTotal:</strong> {calculaValorTotalCotizacion}</p>
                        <p className="p-3"><strong>Total IVA incluido:</strong> {calculaValorTotalCotizacionIVA}</p>
                    </div>
                </div>
            </div>
            <div className="level pt-6">
                <div className="level-item">
                    <h3 className='title is-5'>Condiciones</h3>
                </div>
            </div>
            <div className='level'>    
                <div className='px-6'>
                    <ul>{renderedCondiciones()}</ul>
                </div>
            </div>
            <div className="level px-6">
                <div className="level-left pt-6">
                    <ul>
                    <li>Claudio Jara</li>
                    <li>Ingeniero en sonido</li>
                    <li>+569 94979684</li>
                    </ul>
                </div>
                <div className="level-right pb-6" style={{"width": "200px"}}>
                    <img className="image is-5by4"  src={window.location.origin + "/assets/LogoClarity.png"} alt=""/>
                </div>
            </div>
        </div>
    )
};

export default HojaCotizacion;