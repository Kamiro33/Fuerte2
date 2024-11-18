import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../Services/api'; // Ajusta la ruta según tu estructura de carpetas

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.username || !formData.email || !formData.password) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    try {
      // Usar solo el endpoint relativo
      await api.post('https://planiworkout-bwafb0h8gcezb2af.canadacentral-01.azurewebsites.net/api/auth/signup', formData);
      toast.success('Usuario registrado exitosamente');
      navigate('/'); // Redirige a la página principal o inicio de sesión
    } catch (error) {
      console.error(error);
      // Muestra mensajes específicos si el backend envía un error claro
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || 'Error al registrar usuario');
      } else {
        toast.error('Error al conectar con el servidor');
      }
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nombre de Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;