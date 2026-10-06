
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
} from "../lib/authApi";

const MongoAuthContext = createContext(null);

const STORAGE_KEY = "narxitop_mongo_auth";

export function MongoAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(STORAGE_KEY);

      if (savedAuth) {
        const parsedAuth = JSON.parse(savedAuth);

        setUser(parsedAuth?.user ?? null);
        setToken(parsedAuth?.token ?? null);
      }
    } catch (error) {
      console.error(
        "Failed to restore MongoDB auth session:",
        error
      );

      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveAuth = (data) => {
    const authData = {
      user: data.user,
      token: data.token,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(authData)
    );

    setUser(data.user);
    setToken(data.token);
  };

  const signUp = async ({
    name,
    secondName,
    phone,
    email,
    password,
  }) => {
    const data = await registerUser({
      name,
      secondName,
      phone,
      email,
      password,
    });

    if (data?.token && data?.user) {
      saveAuth(data);
    }

    return data;
  };

  const signIn = async ({
    email,
    password,
  }) => {
    const data = await loginUser({
      email,
      password,
    });

    if (data?.token && data?.user) {
      saveAuth(data);
    }

    return data;
  };

  const signOut = () => {
    localStorage.removeItem(STORAGE_KEY);

    setUser(null);
    setToken(null);
  };

  const isAuthenticated = Boolean(user && token);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated,
      signUp,
      signIn,
      signOut,
    }),
    [
      user,
      token,
      loading,
      isAuthenticated,
    ]
  );

  return (
    <MongoAuthContext.Provider value={value}>
      {children}
    </MongoAuthContext.Provider>
  );
}

export function useMongoAuth() {
  const context = useContext(MongoAuthContext);

  if (!context) {
    throw new Error(
      "useMongoAuth must be used inside MongoAuthProvider"
    );
  }

  return context;
}
