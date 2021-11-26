import React, { useState, useEffect, useContext, createContext } from 'react';
import { setCookie, destroyCookie } from 'nookies';
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
          destroyCookie(null, 'itkan');
          return;
        }

        const token = await currentUser.getIdToken(true);
        setUser(currentUser);
        setCookie(null, 'itkan', token, {
          maxAge: 86400 * 60,
          path: '/',
        });
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
        setCookie(null, 'itkan', token, {
          maxAge: 86400 * 60,
          path: '/',
        });
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
