import React, { useState, useEffect, useContext, createContext } from 'react';
import Cookies from 'js-cookie';
import firebase from '../lib/firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [leader, setLeader] = useState(null);
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

  const signinGoogle = async () => {
    await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async (res) => {
        const token = await res.user.getIdToken(true);
        setUser(res.user);
        Cookies.set('itka', token, { expires: 60 });
        window.location.href = '/minha-conta';
      });
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, setLoading, leader, setLeader, signinGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
