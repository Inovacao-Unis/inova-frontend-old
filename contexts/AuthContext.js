import React, { useState, useEffect, useContext, createContext } from 'react';
import Cookies from 'js-cookie';
import firebase from '../lib/firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(
    () =>
      firebase.auth().onIdTokenChanged(async (currentUser) => {
        if (!currentUser) {
          setUser(null);
          Cookies.set('itka', '');
          return;
        }

        const token = await currentUser.getIdToken(true);
        setUser(currentUser);
        Cookies.set('itka', token, { expires: 60 });
      }),
    [],
  );

  return (
    <AuthContext.Provider value={{ user, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
