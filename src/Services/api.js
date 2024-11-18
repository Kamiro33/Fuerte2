import axios from 'axios';

// URL base del backend
const api = axios.create({
  baseURL: 'https://planiworkout-bwafb0h8gcezb2af.canadacentral-01.azurewebsites.net/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token JWT a las solicitudes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Función para obtener los ejercicios desde el backend
export const getExercises = async () => {
  return api.get('/Exercises'); // Ruta ajustada al estándar
};

// Función para registrar un entrenamiento en el backend
export const createWorkout = async (workoutData) => {
  return api.post('/Workouts', workoutData);
};

// Función para obtener los entrenamientos registrados
export const getWorkouts = async () => {
  return api.get('/Workouts');
};

// Función para eliminar un entrenamiento
export const deleteWorkout = async (id) => {
  return api.delete(`/Workouts/${id}`);
};

// Función para actualizar un entrenamiento
export const updateWorkout = async (id, workoutData) => {
  return api.put(`/Workouts/${id}`, workoutData);
};

// Función para obtener el progreso del usuario
export const getUserProgress = async () => {
  return api.get('/Workouts/Progress');
};

export default api;