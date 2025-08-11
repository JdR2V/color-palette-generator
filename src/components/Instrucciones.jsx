import React from 'react';
import './Instrucciones.css';

function Instrucciones() {

  return (
    <div className="instructions-container">
      <h2>Instructions:</h2>
      <ol>
        <dl>1. Click the "Generate Random Color" button</dl>
        <dl>2. If you like the color, you can click the "Save Color" button.</dl>
        <dl>3. You can remove a color by pressing the red "X" on each color.</dl>
        <dl>4. If you want to save the palette, simply tap the "Download Palette (PNG)" button.</dl>
        <dl>5. That's it! Good luck on your next creative adventure!</dl>
        <dl>Tip: You can copy the color code by tapping the HEX code!</dl>
      </ol>
      
    </div>
    
  );
}


export default Instrucciones;



