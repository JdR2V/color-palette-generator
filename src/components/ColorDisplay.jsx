import React, { useState } from 'react';
import './ColorDisplay.css';

function ColorDisplay({ color }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500); // Resetea el estado después de 1.5 segundos It resets the state after 1.5 seconds
      })
      .catch(err => {
        console.error('Error al copiar al portapapeles:', err);
        alert('No se pudo copiar el color. Tu navegador podría no soportar esta función.');
      });
  };

  return (
    <div
      className="color-display-container"
      style={{ backgroundColor: color }}
      onClick={copyToClipboard}
      title="Haz clic para copiar el código de color" // Tooltip al pasar el ratón
    >
      <span className="color-code">{color}</span>
      {copied && <span className="copied-message">¡Copiado!</span>}
    </div>
  );
}

export default ColorDisplay;