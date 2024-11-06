import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, router, Redirect } from 'expo-router';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  checkAuthStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Créer le contexte avec un type optionnel pour éviter les erreurs d'initialisation
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fonction pour vérifier l'état de connexion
  const checkAuthStatus = async () => {
    const token = await AsyncStorage.getItem('userToken'); // Récupérer le token depuis AsyncStorage
    setIsAuthenticated(!!token);
  };

  // Fonction pour la déconnexion
  const logout = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.post('http://localhost:8000/api/logout', {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
        });

        // Si la déconnexion est réussie (status 200)
        if (response.status === 200) {
            await AsyncStorage.removeItem('userToken');
            setIsAuthenticated(false);
            router.push('/(tabs)');
        }
    } catch (error) {
        console.error("Erreur lors de la déconnexion:", error);
    }
  };


  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuthStatus, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
