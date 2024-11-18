import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Dashboard from './Pages/Dashboard';
import { WorkoutProvider } from './context/WorkoutContext'; // Contexto para datos compartidos
import PlanWorkout from './components/Workouts/PlanWorkout'; // Componente PlanWorkout
import Home from './Pages/Home'; // Componente para la ruta principal

function App() {
  return (
    <WorkoutProvider>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Ruta principal */}
        <Route path="/login" element={<Login />} /> {/* Ruta hacia Login */}
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plan-workout" element={<PlanWorkout />} />
      </Routes>
    </WorkoutProvider>
  );
}

export default App;