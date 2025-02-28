import React from 'react';
import AppRoutes from './routes/AppRoutes'; // Importamos las rutas


const App = () => {
  return (
    <div>
      <h1>Mi Aplicación de Pago</h1>
      <AppRoutes />  {/* Usamos las rutas aquí */}
    </div>
  );
};

export default App;

