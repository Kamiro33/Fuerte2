import React, { createContext, useState, useEffect } from 'react'; // Importa React y los hooks necesarios
import { getExercises, createWorkout } from '../Services/api'; // Importa las funciones del backend

export const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]); // Estado para los ejercicios
  const [schedule, setSchedule] = useState({
    lunes: [],
    martes: [],
    miercoles: [],
    jueves: [],
    viernes: [],
    sabado: [],
    domingo: [],
  });

  // Cargar ejercicios al montar el componente
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await getExercises(); // Llamada al backend para obtener ejercicios
        setWorkouts(response.data || []); // Asegurar que siempre sea un array
        console.log('Ejercicios cargados desde el backend:', response.data);
      } catch (error) {
        console.error('Error al cargar los ejercicios:', error);
      }
    };

    fetchWorkouts(); // Llama a la función para cargar los ejercicios
  }, []);

  // Función para agregar un nuevo ejercicio
  const addWorkout = async (newExercise) => {
    try {
      const response = await createWorkout(newExercise); // Llamada al backend para agregar un ejercicio
      setWorkouts((prevWorkouts) => [...prevWorkouts, response.data]); // Actualizar el estado con el nuevo ejercicio
      console.log('Nuevo ejercicio agregado:', response.data);
    } catch (error) {
      console.error('Error al agregar el nuevo ejercicio:', error);
    }
  };

  return (
    <WorkoutContext.Provider value={{ workouts, setWorkouts, schedule, setSchedule, addWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
};