// src/components/NotificationCenter.jsx - NEW COMPONENT
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Bell, AlertCircle, CheckCircle, Info, Calendar, Award, Trash2 } from 'lucide-react';

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'deadline',
    title: 'MIT Application Deadline',
    message: 'Only 3 days left to submit your MIT application!',
    timestamp: '2 hours ago',
    read: false,
    priority: 'high'
  },
  {
    id: 2,
    type: 'scholarship',
    title: 'New Scholarship Available',
    message: 'Bolashak Scholarship applications are now open for 2026.',
    timestamp: '1 day ago',
    read: false,
    priority: 'medium'
  },
  {
    id: 3,
    type: 'exam',
    title: 'SAT Registration Reminder',
    message: 'Don\'t forget to register for the March SAT exam.',
    timestamp: '2 days ago',
    read: true,
    priority: 'medium'
  },
  {
    id: 4,
    type: 'info',
    title: 'Profile Updated',
    message: 'Your profile evaluation score has been updated to "Senior" level.',
    timestamp: '3 days ago',
    read: true,
    priority: 'low'
  },
  {
    id: 5,
    type: 'deadline',
    title: 'IELTS Test Date',
    message: 'Your IELTS test is scheduled for March 20, 2026.',
    timestamp: '5 days ago',
    read: true,
    priority: 'high'
  }
];

const NotificationCenter = ({ onClose }) => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState('all'); // all, unread, read

  const getIcon = (type) => {
    switch(type) {
      case 'deadline': return <Calendar size={20} className="text-orange-500" />;
      case 'scholarship': return <Award size={20} className="text-yellow-500" />;
      case 'exam': return <AlertCircle size={20} className="text-blue-500" />;
      case 'info': return <Info size={20} className="text-green-500" />;
      default: return <Bell size={20} className="text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-0 top-0 h-full w-full md:w-96 bg-white dark:bg-slate-900 shadow-2xl z-50 overflow-hidden flex flex-col"
    >
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell size={24} />
          <div>
            <h3 className="font-bold text-lg">Notifications</h3>
            <p className="text-xs opacity-80">{unreadCount} unread</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/20 rounded-lg transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* FILTERS */}
      <div className="p-4 border-b dark:border-slate-800 flex gap-2">
        {['all', 'unread', 'read'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="ml-auto text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* NOTIFICATIONS LIST */}
      <div className="flex-1 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8 text-center">
            <CheckCircle size={48} className="mb-4 opacity-50" />
            <p className="font-medium">All caught up!</p>
            <p className="text-sm">No {filter} notifications</p>
          </div>
        ) : (
          <div className="divide-y dark:divide-slate-800">
            {filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-4 hover:bg-gray-50 dark:hover:bg-slate-800 transition cursor-pointer ${
                  !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                }`}
                onClick={() => !notification.read && handleMarkAsRead(notification.id)}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className={`font-bold text-sm dark:text-white ${!notification.read ? 'text-blue-900' : ''}`}>
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{notification.timestamp}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded border font-medium ${getPriorityBadge(notification.priority)}`}>
                          {notification.priority}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(notification.id);
                          }}
                          className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t dark:border-slate-800 bg-gray-50 dark:bg-slate-800">
        <p className="text-xs text-gray-500 text-center">
          Notifications are updated in real-time
        </p>
      </div>
    </motion.div>
  );
};

export default NotificationCenter;