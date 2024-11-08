import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, router, Redirect } from 'expo-router';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  checkAuthStatus: () => Promise<void>;
  logout: () => Promise<void>;
  userData: UserData | null;
}

// Interface pour les données utilisateur
interface UserData {
  avatar: string | null;
  first_name: string;
  last_name: string;
  phone: number;
  email: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Créer le contexte avec un type optionnel pour éviter les erreurs d'initialisation
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);


  // Fonction recuperation data user & statuts auth au chargement
  const checkAuthStatus = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      await getUserData(); // Appeler GetUserData pour remplir userData après vérification
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };


  // Fonction pour la déconnexion
  const logout = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.post('http://10.0.2.2:8000/api/logout', {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
        });

        if (response.status === 200) {
            await AsyncStorage.removeItem('userToken');
            setIsAuthenticated(false);
            router.push('/(tabs)');
        }
      } 

    catch (error) {
        console.error("Erreur lors de la déconnexion:", error);
    }
  };


  // Fonction pour récupérer les informations utilisateur
  const getUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const response = await axios.get('http://10.0.2.2:8000/api/user_info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data); 
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données utilisateur:", error);
    }
  };


  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuthStatus, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
};
