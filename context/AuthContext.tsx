import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Stack, router } from 'expo-router';

interface AuthContextType {
  isLogged: boolean;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken'); // Récupérer le token depuis AsyncStorage
          
        if (token) {
            setIsLogged(true);
          } 
        
          else {
            setIsLogged(false);
          }
      } 
      catch (error) {
        console.error("Erreur lors de la vérification de l'utilisateur:", error);
      } 
      finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);



  const logout = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken'); // Récupérer le token depuis AsyncStorage

      // Appel à l'API pour la déconnexion
      const response = await axios.post('http://localhost:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 200) {
        // Suppression du token localement après déconnexion réussie
        await AsyncStorage.removeItem('token');
        setIsLogged(false);
        router.push('/(tabs)/');
      } 
      
      else {
        console.error("Erreur lors de la déconnexion: statut de réponse inattendu", response.status);
      }
    } 
    
    catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };




  return (
    <AuthContext.Provider
      value={{
        isLogged,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
