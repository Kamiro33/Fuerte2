export const saveToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  export const getUserRole = () => {
    const token = getToken();
    if (!token) return null;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del token
      return payload.role; // Asume que el rol está en el campo 'role'
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  };
  
  export const isLoggedIn = () => {
    return !!getToken(); // Devuelve true si hay un token
  };