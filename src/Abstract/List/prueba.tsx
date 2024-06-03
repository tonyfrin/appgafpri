import { useEffect, useState } from 'react';

function MiComponente() {
  const [anchoPantalla, setAnchoPantalla] = useState(0);

  useEffect(() => {
    const actualizarAnchoPantalla = () => {
      setAnchoPantalla(window.innerWidth);
    };

    // Verificamos que window esté definido para evitar errores en el servidor
    if (typeof window !== 'undefined') {
      setAnchoPantalla(window.innerWidth);
      window.addEventListener('resize', actualizarAnchoPantalla);

      return () => {
        window.removeEventListener('resize', actualizarAnchoPantalla);
      };
    }
  }, []);

  return (
    <div>
      <p>Ancho de la pantalla: {anchoPantalla} pixeles</p>
      {/* Aquí puedes condicionar el código dependiendo del ancho de la pantalla */}
      {anchoPantalla > 768 ? (
        <p>Esto se muestra en pantallas más grandes que 768px</p>
      ) : (
        <p>Esto se muestra en pantallas más pequeñas que 768px</p>
      )}
    </div>
  );
}

export default MiComponente;


