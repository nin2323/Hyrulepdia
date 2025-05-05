import React from 'react';
import './poputContainer.css';

//Props que recibe desde donde se le invoque como App.tsx
//Estos props pueden ser cualquier cosa mientras esten dentro del componente
//CardContainer ej:<h1> HOLA {string dentro del tsx} </h1>
interface CardContainerProps {
  children?: React.ReactNode;
}

//Children representa cualquier contenido entre las etiquetas del componente.
//En typescript estoy usando CardContainerProps como tipo
export const PoputContainer = ({ children }: CardContainerProps) => {
  return (
    //CONTENEDOR CARTA
    <div className='card'>
      {/*color contenedor */}
      <div className='bg-overlay'></div>
      {/*<!-- SVGs en cada esquina -->*/}
      <div className='svg-wrapper top-left'>
        <img src={'src/assets/Fill-10-blue.svg'} className='svg-icon' />
      </div>
      <div className='svg-wrapper top-right'>
        <img src={'src/assets/Fill-10-blue.svg'} className='svg-icon' />
      </div>
      <div className='svg-wrapper bottom-left'>
        <img src={'src/assets/Fill-10-blue.svg'} className='svg-icon' />
      </div>
      <div className='svg-wrapper bottom-right'>
        <img src={'src/assets/Fill-10-blue.svg'} className='svg-icon' />
      </div>
      {/* lo que se le meta dentro de app */}
      <div className='card-content'>{children}</div>
    </div>
  );
};
