import React from 'react';
import './CardContainer.css';

//Props que recibe desde donde se le invoque como App.tsx
//Estos props pueden ser cualquier cosa mientras esten dentro del componente
//CardContainer ej:<h1> HOLA {string dentro del tsx} </h1>
interface CardContainerProps {
  children: React.ReactNode;
}

//Children representa cualquier contenido entre las etiquetas del componente.
//En typescript estoy usando CardContainerProps como tipo
export const CardContent = ({ children }: CardContainerProps) => {
  return (
    <div className='card'>
      <div className='bg-image'></div>
      <div className='bg-overlay'></div>

      <img src='assets/Fill-10.svg' className='svg-corner top-left' />
      <img src='assets/Fill-10.svg' className='svg-corner top-right' />
      <img src='assets/Fill-10.svg' className='svg-corner bottom-left' />
      <img src='assets/Fill-10.svg' className='svg-corner bottom-right' />

      <span className='corner-bottom-left'></span>
      <span className='corner-bottom-right'></span>

      <div className='left-top-line'></div>
      <div className='left-bottom-line'></div>
      <div className='right-top-line'></div>
      <div className='right-bottom-line'></div>

      <div className='top-left-line'></div>
      <div className='top-right-line'></div>
      <div className='bottom-left-line'></div>
      <div className='bottom-right-line'></div>
    </div>
  );
};
