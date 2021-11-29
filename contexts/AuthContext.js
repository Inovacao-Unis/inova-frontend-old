import React, { useState, useEffect, useContext, createContext } from 'react';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import firebase from '../lib/firebase';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const Router = useRouter();
  const [user, setUser] = useState(null);
  const [leader, setLeader] = useState(null);
  const [loading, setLoading] = useState(null);
  const [checked, setChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const check = async () => {
    await api
      .get('check')
      .then((res) => {
        setLeader(res.data.leader);
        setChecked(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log('error', err);
        setLoading(false);
        Router.push('/');
      });
  };

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

  useEffect(() => {
    if (!!user && checked) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user, checked]);

  useEffect(() => {
    setLoading(true);

    const { itkan: token } = parseCookies();

    if (token) {
      return check();
    }

    setLoading(false);
    Router.push('/');
    return null;
  }, []);

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
      value={{
        isAuthenticated,
        user,
        loading,
        setLoading,
        leader,
        setLeader,
        signinGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
