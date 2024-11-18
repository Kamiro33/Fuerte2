import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../Services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error('Por favor, introduce un email válido.');
      return;
    }

    try {
      const response = await api.post('https://planiworkout-bwafb0h8gcezb2af.canadacentral-01.azurewebsites.net/api/auth/signin', { email, password });
      const { token, roles } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('roles', JSON.stringify(roles));
      toast.success('Inicio de sesión exitoso');
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Credenciales incorrectas.');
      } else {
        toast.error('Error en el servidor. Intenta más tarde.');
      }
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;