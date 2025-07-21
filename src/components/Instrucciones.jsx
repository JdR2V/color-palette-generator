import React from 'react';
import './Instrucciones.css';

function Instrucciones() {

  return (
    <div className="instructions-container">
      <h2>Instrucciones de uso:</h2>
      <ol>
        <dl>1. Dale click al botón "Generar Color Aleatorio"</dl>
        <dl>2. Si te gusta el color puedes darle click al botón "Guardar Color"</dl>
        <dl>3. Puedes remover un color presionando la "X" roja sobre cada color</dl>
        <dl>4. Si deseas guardar la paleta, simplemente toca el botón "Descargar Paleta (PNG"</dl>
        <dl>5. ¡Listo, exitos en tu proxima aventura creativa!</dl>
        <dl>Tip: ¡Puedes copiar el codigo del color tocando el codigo HEX!</dl>
      </ol>
    </div>
  );
}


export default Instrucciones;



