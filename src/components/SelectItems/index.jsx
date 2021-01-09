import React from 'react';
import { ListaEquiposContext } from '../../Context/listaEquiposContext';


const listaEquipos = useContext(ListaEquiposContext);
const tipoEquiposKeys = Object.keys(listaEquipos);

export { listaEquipos, tipoEquiposKeys } 