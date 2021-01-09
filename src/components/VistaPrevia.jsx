import React, { useEffect } from 'react'; 
import { Link } from 'react-router-dom';

const VistaPrevia = ({getWindowLocation, isPrinting, handleIsPrinting}) => {
    useEffect(() => {
        getWindowLocation()
    })

    const handlePDF = () => {
        handleIsPrinting();
    };


    return (
        <>
        {
            isPrinting 
            ? null 
            : <div className="level">
                <div className="level-item has-text-centered">
                    <Link to="/" className="button is-warning mr-2">Volver</Link>
                    <button onClick={handlePDF} className="button is-success">Obtener PDF</button>
                </div>
              </div>
         }
        </>
    )
}

export default VistaPrevia;