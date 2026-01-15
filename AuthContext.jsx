import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../firebase/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Проверяем активную сессию при загрузке
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    // Слушаем изменения авторизации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        throw error;
      }
      console.log('Profile fetched:', data);
      setProfile(data);
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  const signInWithGoogle = async () => {
    console.log('Attempting Google sign in...');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
    if (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    console.log('Signing out...');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign out error:', error);
      throw error;
    }
    setProfile(null);
  };

  const updateProfile = async (updates) => {
    if (!user) {
      console.error('No user logged in');
      return;
    }
    
    console.log('Updating profile:', updates);
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', user.id)
      .select()
      .single();
    
    if (error) {
      console.error('Update profile error:', error);
      throw error;
    }
    console.log('Profile updated:', data);
    setProfile(data);
    return data;
  };

  const getTestScores = async () => {
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('test_scores')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  };

  const addTestScore = async (testType, score, testDate) => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('test_scores')
      .insert([{
        user_id: user.id,
        test_type: testType,
        score: score,
        test_date: testDate
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const value = { 
    user, 
    profile,
    loading, 
    signInWithGoogle, 
    signOut,
    updateProfile,
    refreshProfile: () => user && fetchProfile(user.id),
    getTestScores,
    addTestScore
  };

  console.log('AuthContext value:', { user: user?.email, profile: profile?.full_name, loading });

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};