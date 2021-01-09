import React from 'react';

const listaEquipos =  {

    "Parlante" : [
  {
    "Marca" : "JBL",
    "Modelo" : "Eon 615",
    "Potencia" : "500 watts",
    "Precio" : 350000,
    "Cantidad" : 2
  },
  {"Marca" : "Behringer",
    "Modelo" : "212 a",
    "Potencia":"500 watts",
    "Precio" : 250000,
    "Cantidad" : 2
  },
  {"Marca" : "Wharfedale",
    "Modelo" : "evp-x15",
    "Potencia" : "500 watts",
    "Precio" : 250000,
    "Cantidad" : 1
  }
  ],
  
  "Microfono": [
  {
  "Marca" : "Shure",
  "Modelo" : "SM 58",
  "Descripcion" : "Micrófono vocal",
  "Precio" : 100000,
  "Cantidad" : 3
  },
  {
  "Marca" : "Shure",
  "Modelo" : "SM 57",
  "Descripcion" : "Micrófono de instrumento",
  "Precio" : 100000,
  "Cantidad" : 4
  },
  {
  "Marca" : "Audix",
  "Modelo" : "Kit Bateria Fusion",
  "Descripcion" : "Kit microfonos para bateria",
  "Precio" : 300000,
  "Cantidad" : 1
  }
  ],
  
  "Consola":[
  {
    "Marca" : "QSC",
    "Modelo" : "Touchmix 16",
    "Descripcion" : "Consola digital 16 canales",
    "Precio" : 1000000,
    "Cantidad" : 1
  },
  {
    "Marca" : "Behringer",
    "Modelo" : "Xenyx 1202",
    "Descripcion" : "Consola analoga 12 canales",
    "Precio" : 100000,
    "Cantidad" : 1
  }
  ],
  
  "Caja Directa": [{
    "Marca" : "Behringer",
    "Modelo" : "DI-400p",
    "Descripcion" : "caja directa para instrumento",
    "Precio" : 25000,
    "Cantidad" : 4
  }],
  
  "Amplificador De Audifono":[
  {
    "Marca" : "Fiio",
    "Modelo" : "A3",
    "Descripcion" : "Mezcla personal para musico",
    "Precio" : 50000,
    "Cantidad" : 3
  },
  {
    "Marca" : "Behringer",
    "Modelo" : "P2",
    "Descripcion" : "Mezcla personal para musico",
    "Precio" : 50000,
    "Cantidad" : 1
  },
  {
    "Marca" : "Mackie",
    "Modelo" : "HM-4",
    "Descripcion" : "Mezcla personal multiple para musicos",
    "Precio" : 25000,
    "Cantidad" : 1
  }
  ],
  
  "Atril De Microfono": [{
  "Marca" : "Proel",
  "Modelo" : "rsm180",
  "Descripcion" : "Atril de microfono",
  "Precio" : 20000,
  "Cantidad" : 8
  }]
  };

export const ListaEquiposContext = React.createContext(
    listaEquipos
);