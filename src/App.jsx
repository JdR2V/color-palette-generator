import {useState, useEffect, useRef} from 'react'
import './App.css'
import ColorDisplay from './components/ColorDisplay.jsx';
import Controls from './components/Controls.jsx';
import ColorPalette from './components/ColorPalette.jsx';
import html2canvas from 'html2canvas';
import Instrucciones from "./components/Instrucciones.jsx";

function App() {

  const [currentColor, setCurrentColor] = useState('#FFFFFF');
  const [savedColors, setSavedColors] = useState([]);
  const paletteRef = useRef(null);

  // Generar un color HEX Aleatorio / Generate Random HEX color
  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setCurrentColor(randomColor);
  }


  // Guardar color actual / Save current color
  const saveCurrentColor = () => {
    if (savedColors.length < 6 && !savedColors.includes(currentColor)) {
      setSavedColors(prevColors => [...prevColors, currentColor]);
    }
  }

  // Eliminar un color / Remove a color
  const removeColor = (colorToRemove) => {
    setSavedColors(prevColors => prevColors.filter(color => color !== colorToRemove));
  }

  // Función para descargar la paleta (implementación con html2canvas) / Function to download the palette (implemented with html2canvas)
  const downloadPalette = async () => {
    if (paletteRef.current) {
      try {
        const canvas = await html2canvas(paletteRef.current, {
          backgroundColor: null,
          scale: 2,
        });
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'mi-paleta-de-colores.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error al descargar la paleta:', error);
        alert('Hubo un error al intentar descargar la paleta. Intenta de nuevo.');
      }
    }
  };


  // Generar un color al cargar la App / Generate a color when the App starts
  useEffect(() => {
    generateRandomColor();
  }, []);

  return (
    <div className="app-container">
      <h1>Generate a new color palette</h1>
      <ColorDisplay color={currentColor}/>
      <Controls
        onGenerate={generateRandomColor}
        onSave={saveCurrentColor}
        canSave={savedColors.length < 6 && !savedColors.includes(currentColor)}
      />
      <ColorPalette
        colors={savedColors}
        onRemoveColor={removeColor}
        onDownload={downloadPalette}
        paletteRef={paletteRef}
      />
      <Instrucciones />
    </div>

  )
}

export default App
