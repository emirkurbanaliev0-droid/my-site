// src/components/DeadlineCalendar.jsx - NEW COMPONENT
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, AlertCircle, Plus, Trash2, CheckCircle, Bell } from 'lucide-react';

const DEFAULT_DEADLINES = [
  {
    id: 1,
    title: "SAT Registration",
    date: "2026-02-15",
    category: "Exam",
    university: "General",
    priority: "High",
    status: "upcoming"
  },
  {
    id: 2,
    title: "IELTS Test",
    date: "2026-03-20",
    category: "Exam",
    university: "General",
    priority: "High",
    status: "upcoming"
  },
  {
    id: 3,
    title: "MIT Application Deadline",
    date: "2026-01-15",
    category: "Application",
    university: "MIT",
    priority: "Critical",
    status: "overdue"
  },
  {
    id: 4,
    title: "Nazarbayev University Application",
    date: "2026-06-01",
    category: "Application",
    university: "NU",
    priority: "High",
    status: "upcoming"
  },
  {
    id: 5,
    title: "Bolashak Scholarship Deadline",
    date: "2026-03-15",
    category: "Scholarship",
    university: "Bolashak",
    priority: "Critical",
    status: "upcoming"
  },
  {
    id: 6,
    title: "Recommendation Letter Request",
    date: "2026-02-01",
    category: "Document",
    university: "General",
    priority: "Medium",
    status: "upcoming"
  },
  {
    id: 7,
    title: "Personal Statement Draft",
    date: "2026-02-28",
    category: "Document",
    university: "General",
    priority: "Medium",
    status: "upcoming"
  },
  {
    id: 8,
    title: "Financial Documents Preparation",
    date: "2026-04-01",
    category: "Document",
    university: "General",
    priority: "Medium",
    status: "upcoming"
  }
];

const DeadlineCalendar = () => {
  const [deadlines, setDeadlines] = useState(DEFAULT_DEADLINES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [newDeadline, setNewDeadline] = useState({
    title: '',
    date: '',
    category: 'Application',
    university: '',
    priority: 'Medium'
  });

  const categories = ['all', 'Application', 'Exam', 'Scholarship', 'Document'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const deadline = new Date(dateString);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatus = (dateString) => {
    const days = getDaysUntil(dateString);
    if (days < 0) return 'overdue';
    if (days <= 7) return 'urgent';
    if (days <= 30) return 'soon';
    return 'upcoming';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'overdue': return 'bg-red-100 text-red-700 border-red-300';
      case 'urgent': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'soon': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'upcoming': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Application': return '📝';
      case 'Exam': return '📚';
      case 'Scholarship': return '💰';
      case 'Document': return '📄';
      default: return '📌';
    }
  };

  const handleAddDeadline = () => {
    if (!newDeadline.title || !newDeadline.date) return;
    
    const deadline = {
      id: Date.now(),
      ...newDeadline,
      status: getStatus(newDeadline.date)
    };
    
    setDeadlines([deadline, ...deadlines]);
    setNewDeadline({ title: '', date: '', category: 'Application', university: '', priority: 'Medium' });
    setShowAddForm(false);
  };

  const handleDeleteDeadline = (id) => {
    setDeadlines(deadlines.filter(d => d.id !== id));
  };

  const handleMarkComplete = (id) => {
    setDeadlines(deadlines.map(d => 
      d.id === id ? { ...d, status: 'completed' } : d
    ));
  };

  const filteredDeadlines = deadlines
    .filter(d => filterCategory === 'all' || d.category === filterCategory)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const upcomingCount = deadlines.filter(d => getStatus(d.date) === 'urgent' || getStatus(d.date) === 'soon').length;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold dark:text-white flex items-center gap-2">
            <Calendar className="text-blue-500" /> Deadline Calendar
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track all your application deadlines in one place
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          <Plus size={20} /> Add Deadline
        </button>
      </div>

      {/* ALERT BANNER */}
      {upcomingCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 flex items-center gap-3"
        >
          <Bell className="text-orange-600" size={24} />
          <div>
            <p className="font-bold text-orange-800 dark:text-orange-300">
              {upcomingCount} deadline{upcomingCount > 1 ? 's' : ''} approaching!
            </p>
            <p className="text-sm text-orange-700 dark:text-orange-400">
              You have urgent tasks that need attention
            </p>
          </div>
        </motion.div>
      )}

      {/* ADD DEADLINE FORM */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"
        >
          <h3 className="font-bold dark:text-white mb-4">Add New Deadline</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Deadline Title"
              value={newDeadline.title}
              onChange={(e) => setNewDeadline({ ...newDeadline, title: e.target.value })}
              className="px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none dark:text-white"
            />
            <input
              type="date"
              value={newDeadline.date}
              onChange={(e) => setNewDeadline({ ...newDeadline, date: e.target.value })}
              className="px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none dark:text-white"
            />
            <select
              value={newDeadline.category}
              onChange={(e) => setNewDeadline({ ...newDeadline, category: e.target.value })}
              className="px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none dark:text-white"
            >
              {categories.filter(c => c !== 'all').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="University (optional)"
              value={newDeadline.university}
              onChange={(e) => setNewDeadline({ ...newDeadline, university: e.target.value })}
              className="px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none dark:text-white"
            />
            <select
              value={newDeadline.priority}
              onChange={(e) => setNewDeadline({ ...newDeadline, priority: e.target.value })}
              className="px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none dark:text-white"
            >
              {priorities.map(p => (
                <option key={p} value={p}>{p} Priority</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAddDeadline}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Add Deadline
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-200 dark:bg-slate-700 rounded-lg font-bold hover:bg-gray-300 dark:hover:bg-slate-600 transition dark:text-white"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* FILTER */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filterCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat === 'all' ? 'All' : `${getCategoryIcon(cat)} ${cat}`}
          </button>
        ))}
      </div>

      {/* DEADLINE LIST */}
      <div className="space-y-4">
        {filteredDeadlines.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Calendar size={48} className="mx-auto mb-4 opacity-50" />
            <p>No deadlines found. Add your first deadline!</p>
          </div>
        ) : (
          filteredDeadlines.map((deadline) => {
            const daysUntil = getDaysUntil(deadline.date);
            const status = deadline.status === 'completed' ? 'completed' : getStatus(deadline.date);
            
            return (
              <motion.div
                key={deadline.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border-2 ${
                  status === 'completed' 
                    ? 'border-green-300 opacity-60' 
                    : getStatusColor(status).replace('bg-', 'border-').replace('100', '300')
                } hover:shadow-md transition`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(deadline.priority)}`}></div>
                      <h3 className={`font-bold text-lg dark:text-white ${status === 'completed' ? 'line-through' : ''}`}>
                        {getCategoryIcon(deadline.category)} {deadline.title}
                      </h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{new Date(deadline.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      {deadline.university && (
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-slate-700 rounded text-xs font-medium">
                          {deadline.university}
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${getStatusColor(status)}`}>
                        {status === 'completed' ? '✓ Completed' : 
                         status === 'overdue' ? `${Math.abs(daysUntil)} days overdue` :
                         status === 'urgent' ? `${daysUntil} days left!` :
                         status === 'soon' ? `${daysUntil} days left` :
                         `${daysUntil} days`}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {status !== 'completed' && (
                      <button
                        onClick={() => handleMarkComplete(deadline.id)}
                        className="p-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition"
                        title="Mark as complete"
                      >
                        <CheckCircle size={20} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteDeadline(deadline.id)}
                      className="p-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* TIPS */}
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-6 text-white">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <AlertCircle /> Deadline Management Tips
        </h3>
        <ul className="space-y-2 text-sm opacity-90">
          <li>• Set reminders 2 weeks before each deadline</li>
          <li>• Start preparing documents at least 1 month early</li>
          <li>• Keep track of time zones for international applications</li>
          <li>• Some deadlines are at 11:59 PM, others at 5:00 PM - check carefully!</li>
        </ul>
      </div>
    </div>
  );
};

export default DeadlineCalendar;