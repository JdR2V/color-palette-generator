import React from 'react';
import './Controls.css'; // Asegúrate de crear este archivo CSS

function Controls({ onGenerate, onSave, canSave }) {
  return (
    <div className="controls-container">
      <button onClick={onGenerate} className="control-button generate-button">
        Generar Color Aleatorio
      </button>
      <button
        onClick={onSave}
        className="control-button save-button"
        disabled={!canSave} // El botón se deshabilita si no se puede guardar
        title={canSave ? "Guardar el color actual en la paleta" : "Paleta llena o color ya guardado"}
      >
        Guardar Color
      </button>
    </div>
  );
}

export default Controls;