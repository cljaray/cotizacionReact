import React from 'react';

class Contenedor extends React.Component{

    renderContent(){
        if(this.props.isPrinting){
            return null
        }
        return (
            <div  className="container p-6 mx-auto ">
                <div className="level">
                    <div className="level-item">
                        <h1 className="title is-4 font-bold text-xl text-white mb-10">{this.props.title}</h1>
                    </div>
                </div>
                <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-gray-100 sm:p-6">
                        {this.props.children}
                    </div>
                </div>
            </div>  
        )
    }

    render(){
        return this.renderContent();                         
    }
}

export default Contenedor;