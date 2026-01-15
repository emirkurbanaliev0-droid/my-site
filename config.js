// src/firebase/config.js - SUPABASE CONFIGURATION
import { createClient } from '@supabase/supabase-js';

// Supabase configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for common operations
export const supabaseHelpers = {
  // Auth helpers
  auth: {
    signInWithGoogle: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      return { data, error };
    },
    
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      return { error };
    },
    
    getUser: async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      return { user, error };
    },

    onAuthStateChange: (callback) => {
      return supabase.auth.onAuthStateChanged(callback);
    }
  },

  // Database helpers
  db: {
    // Get all items from a table
    getAll: async (table) => {
      const { data, error } = await supabase
        .from(table)
        .select('*');
      return { data, error };
    },

    // Get item by ID
    getById: async (table, id) => {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('id', id)
        .single();
      return { data, error };
    },

    // Insert new item
    insert: async (table, item) => {
      const { data, error } = await supabase
        .from(table)
        .insert([item])
        .select();
      return { data, error };
    },

    // Update item
    update: async (table, id, updates) => {
      const { data, error } = await supabase
        .from(table)
        .update(updates)
        .eq('id', id)
        .select();
      return { data, error };
    },

    // Delete item
    delete: async (table, id) => {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);
      return { error };
    }
  },

  // Storage helpers
  storage: {
    // Upload file
    upload: async (bucket, path, file) => {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file);
      return { data, error };
    },

    // Get public URL
    getPublicUrl: (bucket, path) => {
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);
      return data.publicUrl;
    },

    // Download file
    download: async (bucket, path) => {
      const { data, error } = await supabase.storage
        .from(bucket)
        .download(path);
      return { data, error };
    },

    // Delete file
    deleteFile: async (bucket, path) => {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);
      return { error };
    }
  }
};

export default supabase;