import React from 'react';
import './ColorPalette.css';

function ColorPalette({ colors, onRemoveColor, onDownload, paletteRef }) {
  return (
    <div className="color-palette-wrapper">
      <h2>Tu Paleta Guardada</h2>
      <div className="color-palette-container" ref={paletteRef}>
        {colors.length === 0 ? (
          <p className="empty-palette-message">Guarda hasta 6 colores para crear tu paleta.</p>
        ) : (
          <div className="saved-colors-grid">
            {colors.map((color, index) => (
              <div
                key={index}
                className="palette-color-item"
                style={{ backgroundColor: color }}
              >
                {/* Este es el botón de quitar color // This is the remove color button. */}
                <button
                  className="remove-color-button"
                  onClick={() => onRemoveColor(color)} //
                  title="Eliminar este color de la paleta"
                >
                  &times; {}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/*Este es el botón de descarga // This is the download button*/}
      {colors.length > 0 && (
        <button onClick={onDownload} className="download-palette-button">
          Descargar Paleta (PNG)
        </button>
      )}
    </div>
  );
}

export default ColorPalette;