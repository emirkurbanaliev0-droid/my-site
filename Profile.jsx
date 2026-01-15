import React from 'react';
import { APP_DB } from '../data';
import { X, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileModal = ({ userId, onClose }) => {
  const user = APP_DB.Users.find(u => u.id === userId) || 
               APP_DB.Mentors.find(m => m.id === userId);

  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full dark:bg-slate-800 dark:text-white hover:bg-red-500 hover:text-white transition">
          <X size={20} />
        </button>

        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <div className="px-6 pb-6 relative">
          <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-full p-1 -mt-12 mb-4">
             <img src={user.photo || "https://via.placeholder.com/150"} alt={user.name} className="w-full h-full rounded-full object-cover" />
          </div>
          
          <h2 className="text-2xl font-bold dark:text-white">{user.name}</h2>
          <p className="text-blue-600 font-medium mb-4">{user.role} {user.specialty && `• ${user.specialty}`}</p>
          
          <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl mb-4">
            <p className="text-gray-600 dark:text-gray-300 text-sm">{user.bio || "No bio available."}</p>
          </div>

          <div className="space-y-3">
             {user.contacts?.email && (
               <a href={`mailto:${user.contacts.email}`} className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-slate-800/50 rounded-lg text-blue-700 dark:text-blue-400 hover:bg-blue-100 transition">
                 <Mail size={18} /> <span>{user.contacts.email}</span>
               </a>
             )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileModal;