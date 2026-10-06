import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Failed to get session:", error);
      }

      if (mounted) {
        setSession(data?.session ?? null);
        setUser(data?.session?.user ?? null);
        setLoading(false);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession ?? null);
        setUser(newSession?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  /*
   * ================================
   * SIGN UP
   * ================================
   */

  const signUp = async ({
    name,
    secondName,
    phone,
    email,
    password,
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,

      options: {
        emailRedirectTo: window.location.origin,

        data: {
          name,
          second_name: secondName,
          phone,
        },
      },
    });

    if (error) {
      throw error;
    }

    return data;
  };


  /*
   * ================================
   * SIGN IN
   * ================================
   */

  const signIn = async ({
    email,
    password,
  }) => {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      throw error;
    }

    return data;
  };


  /*
   * ================================
   * GOOGLE SIGN IN / SIGN UP
   * ================================
   */

  const signInWithGoogle = async () => {
    const { data, error } =
      await supabase.auth.signInWithOAuth({
        provider: "google",

        options: {
          redirectTo: window.location.origin,
        },
      });

    if (error) {
      throw error;
    }

    return data;
  };


  /*
   * ================================
   * SIGN OUT
   * ================================
   */

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    setSession(null);
    setUser(null);
  };


  /*
   * ================================
   * FORGOT PASSWORD
   * ================================
   */

  const sendPasswordRecovery = async (email) => {
    const { data, error } =
      await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

    if (error) {
      throw error;
    }

    return data;
  };


  /*
   * ================================
   * UPDATE PASSWORD
   * ================================
   */

  const updatePassword = async (newPassword) => {
    const { data, error } =
      await supabase.auth.updateUser({
        password: newPassword,
      });

    if (error) {
      throw error;
    }

    return data;
  };


  /*
   * ================================
   * AUTH STATE
   * ================================
   */

  const isAuthenticated = Boolean(user);

  const value = useMemo(
    () => ({
      session,
      user,
      loading,
      isAuthenticated,

      signUp,
      signIn,
      signInWithGoogle,
      signOut,

      sendPasswordRecovery,
      updatePassword,
    }),
    [
      session,
      user,
      loading,
      isAuthenticated,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


/*
 * ================================
 * CUSTOM HOOK
 * ================================
 */

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}