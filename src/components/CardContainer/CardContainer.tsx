import React from 'react';
import './CardContainer.css';

//Props que recibe desde donde se le invoque como App.tsx
//Estos props pueden ser cualquier cosa mientras esten dentro del componente
//CardContainer ej:<h1> HOLA {string dentro del tsx} </h1>
//ClassName para poder hacer cambios dentro del componente desde otro tsx
//ColorClass para decidir color componente
interface CardContainerProps {
  children?: React.ReactNode;
  className?: string;
  colorClass?: string;
}

//Children representa cualquier contenido entre las etiquetas del componente.
//En typescript estoy usando CardContainerProps como tipo
export const CardContainer = ({
  children,
  className,
  colorClass,
}: CardContainerProps) => {
  return (
    //CONTENEDOR CARTA
    <div className={`card ${className} ${colorClass}`}>
      {/* imagen y color contenedor */}
      <div className='bg-image'></div>
      <div className='bg-overlay'></div>
      {/*<!-- SVGs en cada esquina -->*/}
      <div className='svg-wrapper top-left'>
        <img
          src={
            colorClass === 'blue-theme'
              ? 'src/assets/Fill-10-blue.svg'
              : 'src/assets/Fill-10.svg'
          }
          className='svg-icon'
        />
      </div>
      <div className='svg-wrapper top-right'>
        <img
          src={
            colorClass === 'blue-theme'
              ? 'assets/Fill-10-blue.svg'
              : 'src/assets/Fill-10.svg'
          }
          className='svg-icon'
        />
      </div>
      <div className='svg-wrapper bottom-left'>
        <img
          src={
            colorClass === 'blue-theme'
              ? 'src/assets/Fill-10-blue.svg'
              : 'src/assets/Fill-10.svg'
          }
          className='svg-icon'
        />
      </div>
      <div className='svg-wrapper bottom-right'>
        <img
          src={
            colorClass === 'blue-theme'
              ? 'src/assets/Fill-10-blue.svg'
              : 'src/assets/Fill-10.svg'
          }
          className='svg-icon'
        />
      </div>

      {/* vertices linea */}
      <span className='corner-bottom-left'></span>
      <span className='corner-bottom-right'></span>
      {/* lados */}
      <div className='left-top-line'></div>
      <div className='left-bottom-line'></div>
      <div className='right-top-line'></div>
      <div className='right-bottom-line'></div>
      <div className='top-left-line'></div>
      <div className='top-right-line'></div>
      <div className='bottom-left-line'></div>
      <div className='bottom-right-line'></div>
      {/* lo que se le meta dentro de app */}
      <div className='card-content'>{children}</div>
    </div>
  );
};
