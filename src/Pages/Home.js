import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Bienvenido a la Plataforma de Entrenamiento</h1>
      <p>Planifica tus entrenamientos, sigue tu progreso y alcanza tus metas.</p>
      <div>
        {/* Asegúrate de que las rutas coincidan con las definidas en App.js */}
        <Link to="/login" style={{ margin: '1rem', textDecoration: 'none', fontSize: '1.2rem' }}>
          Iniciar Sesión
        </Link>
        <Link to="/register" style={{ margin: '1rem', textDecoration: 'none', fontSize: '1.2rem' }}>
          Registrarse
        </Link>
      </div>
    </div>
  );
}

export default Home;