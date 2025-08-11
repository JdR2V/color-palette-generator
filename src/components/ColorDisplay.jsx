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
        console.error('Error copying to clipboard:', err);
        alert('Your browser may not be compatible with this feature.');
      });
  };

  return (
    <div
      className="color-display-container"
      style={{ backgroundColor: color }}
      onClick={copyToClipboard}
      title="Click to copy the color code" // Tooltip al pasar el ratón
    >
      <span className="color-code">{color}</span>
      {copied && <span className="copied-message">¡Copied!</span>}
    </div>
  );
}

export default ColorDisplay;