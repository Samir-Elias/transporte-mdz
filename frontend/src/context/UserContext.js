import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Aquí se implementará la verificación de autenticación
    // Por ahora simulamos un usuario de ejemplo
    const initializeUser = async () => {
      try {
        // Simular verificación de token
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Usuario de ejemplo
        const mockUser = {
          id: 'user_001',
          email: 'usuario@ejemplo.com',
          name: 'Usuario Ejemplo',
          phone: '+54 9 261 123 4567',
          preferences: {
            language: 'es',
            notifications: true,
            theme: 'light'
          },
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error inicializando usuario:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      
      // Aquí se implementará la autenticación real
      // Simulación de login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser = {
        id: 'user_001',
        email,
        name: 'Usuario Ejemplo',
        phone: '+54 9 261 123 4567',
        preferences: {
          language: 'es',
          notifications: true,
          theme: 'light'
        },
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Error en login:', error);
      throw new Error('Credenciales inválidas');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Aquí se implementará el logout real
      // Simulación de logout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      setIsAuthenticated(false);
      
      return { success: true };
    } catch (error) {
      console.error('Error en logout:', error);
      throw new Error('Error al cerrar sesión');
    }
  };

  const updateUser = async (updates) => {
    try {
      // Aquí se implementará la actualización real
      // Simulación de actualización
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      throw new Error('No se pudo actualizar el usuario');
    }
  };

  const updatePreferences = async (preferences) => {
    try {
      // Aquí se implementará la actualización real
      // Simulación de actualización
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = {
        ...user,
        preferences: { ...user.preferences, ...preferences }
      };
      setUser(updatedUser);
      
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Error actualizando preferencias:', error);
      throw new Error('No se pudieron actualizar las preferencias');
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      
      // Aquí se implementará el registro real
      // Simulación de registro
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newUser = {
        id: `user_${Date.now()}`,
        ...userData,
        preferences: {
          language: 'es',
          notifications: true,
          theme: 'light'
        },
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Error en registro:', error);
      throw new Error('Error al registrar usuario');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email) => {
    try {
      // Aquí se implementará el reset de contraseña real
      // Simulación de reset
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return { success: true, message: 'Se envió un enlace de recuperación a tu email' };
    } catch (error) {
      console.error('Error en reset de contraseña:', error);
      throw new Error('Error al enviar email de recuperación');
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    updatePreferences,
    register,
    resetPassword
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
