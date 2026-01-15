// src/components/Profile/CompleteProfile.jsx - COMMON APP STYLE PROFILE
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { User, GraduationCap, Trophy, Briefcase, Heart, Users as UsersIcon, Save, Plus, Trash2, Edit2 } from 'lucide-react';

const ACTIVITY_TYPES = [
  { id: 'academic', label: 'Academic', icon: GraduationCap, examples: ['Science Olympiad', 'Math Club', 'Research'] },
  { id: 'sports', label: 'Sports/Athletics', icon: Trophy, examples: ['Varsity Team', 'Regional Competition'] },
  { id: 'arts', label: 'Arts & Music', icon: '🎭', examples: ['Theater', 'Orchestra', 'Art Exhibition'] },
  { id: 'community', label: 'Community Service', icon: Heart, examples: ['Volunteering', 'NGO Work', 'Fundraising'] },
  { id: 'work', label: 'Work Experience', icon: Briefcase, examples: ['Internship', 'Part-time Job', 'Family Business'] },
  { id: 'leadership', label: 'Leadership', icon: UsersIcon, examples: ['Student Council', 'Club President', 'Team Captain'] }
];

const ACTIVITY_LEVELS = [
  { value: 'local', label: 'Local/School', color: 'bg-blue-100 text-blue-700' },
  { value: 'state', label: 'State/Regional', color: 'bg-purple-100 text-purple-700' },
  { value: 'national', label: 'National', color: 'bg-orange-100 text-orange-700' },
  { value: 'international', label: 'International', color: 'bg-red-100 text-red-700' }
];

const ActivityCard = ({ activity, onEdit, onDelete }) => {
  const getLevelStyle = (level) => {
    return ACTIVITY_LEVELS.find(l => l.value === level)?.color || 'bg-gray-100 text-gray-700';
  };

  const getTypeIcon = (type) => {
    return ACTIVITY_TYPES.find(t => t.id === type)?.icon || Trophy;
  };

  const Icon = getTypeIcon(activity.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
            {typeof Icon === 'string' ? <span className="text-xl">{Icon}</span> : <Icon size={20} />}
          </div>
          <div className="flex-1">
            <h4 className="font-bold dark:text-white mb-1">{activity.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{activity.organization}</p>
            <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-bold ${getLevelStyle(activity.level)}`}>
              {ACTIVITY_LEVELS.find(l => l.value === activity.level)?.label}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(activity)}
            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(activity.id)}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
        {activity.description}
      </p>

      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 dark:bg-slate-700/50 p-2 rounded">
          <p className="text-gray-500 dark:text-gray-400">Hours/Week</p>
          <p className="font-bold dark:text-white">{activity.hoursPerWeek}</p>
        </div>
        <div className="bg-gray-50 dark:bg-slate-700/50 p-2 rounded">
          <p className="text-gray-500 dark:text-gray-400">Weeks/Year</p>
          <p className="font-bold dark:text-white">{activity.weeksPerYear}</p>
        </div>
        <div className="bg-gray-50 dark:bg-slate-700/50 p-2 rounded">
          <p className="text-gray-500 dark:text-gray-400">Years</p>
          <p className="font-bold dark:text-white">{activity.yearsParticipated}</p>
        </div>
      </div>

      {activity.achievements && activity.achievements.length > 0 && (
        <div className="mt-3 pt-3 border-t dark:border-slate-700">
          <p className="text-xs font-bold text-gray-500 uppercase mb-2">Achievements:</p>
          <div className="flex flex-wrap gap-1">
            {activity.achievements.map((ach, idx) => (
              <span key={idx} className="text-xs bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded">
                🏆 {ach}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const ActivityForm = ({ activity, onSave, onCancel }) => {
  const [formData, setFormData] = useState(activity || {
    type: 'academic',
    title: '',
    organization: '',
    position: '',
    level: 'local',
    description: '',
    hoursPerWeek: '',
    weeksPerYear: '',
    yearsParticipated: '1',
    achievements: []
  });

  const [achievementInput, setAchievementInput] = useState('');

  const handleAddAchievement = () => {
    if (achievementInput.trim()) {
      setFormData({
        ...formData,
        achievements: [...(formData.achievements || []), achievementInput.trim()]
      });
      setAchievementInput('');
    }
  };

  const handleRemoveAchievement = (index) => {
    setFormData({
      ...formData,
      achievements: formData.achievements.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: activity?.id || Date.now().toString()
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 mb-6"
    >
      <h3 className="font-bold dark:text-white mb-4 text-lg">
        {activity ? 'Edit Activity' : 'Add New Activity'}
      </h3>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Activity Type *
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none dark:text-white"
            required
          >
            {ACTIVITY_TYPES.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Recognition Level *
          </label>
          <select
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none dark:text-white"
            required
          >
            {ACTIVITY_LEVELS.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Activity Name/Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Science Olympiad"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Organization/School
          </label>
          <input
            type="text"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            placeholder="e.g., National Science Foundation"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none dark:text-white"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
          Position/Role
        </label>
        <input
          type="text"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          placeholder="e.g., Team Captain, President, Member"
          className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none dark:text-white"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
          Description (150 words max) *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your role, responsibilities, and impact..."
          rows="4"
          maxLength="750"
          className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none dark:text-white resize-none"
          required
        />
        <p className="text-xs text-gray-500 mt-1">{formData.description.length}/750 characters</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Hours/Week *
          </label>
          <input
            type="number"
            value={formData.hoursPerWeek}
            onChange={(e) => setFormData({ ...formData, hoursPerWeek: e.target.value })}
            min="1"
            max="168"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Weeks/Year *
          </label>
          <input
            type="number"
            value={formData.weeksPerYear}
            onChange={(e) => setFormData({ ...formData, weeksPerYear: e.target.value })}
            min="1"
            max="52"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Years *
          </label>
          <input
            type="number"
            value={formData.yearsParticipated}
            onChange={(e) => setFormData({ ...formData, yearsParticipated: e.target.value })}
            min="1"
            max="12"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none dark:text-white"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
          Achievements/Awards (Optional)
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={achievementInput}
            onChange={(e) => setAchievementInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAchievement())}
            placeholder="e.g., Gold Medal, 1st Place Regional"
            className="flex-1 px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none dark:text-white"
          />
          <button
            type="button"
            onClick={handleAddAchievement}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.achievements?.map((ach, idx) => (
            <span key={idx} className="inline-flex items-center gap-2 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-lg text-sm">
              {ach}
              <button
                type="button"
                onClick={() => handleRemoveAchievement(idx)}
                className="hover:text-red-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <Save size={20} /> {activity ? 'Update Activity' : 'Add Activity'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-gray-200 dark:bg-slate-700 font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition dark:text-white"
        >
          Cancel
        </button>
      </div>
    </motion.form>
  );
};

const CompleteProfile = () => {
  const { userProfile, updateUserProfile } = useAuth();
  const { t } = useTranslation();
  const [activities, setActivities] = useState(userProfile?.activities || []);
  const [showForm, setShowForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  const handleSaveActivity = async (activity) => {
    const updatedActivities = editingActivity
      ? activities.map(a => a.id === activity.id ? activity : a)
      : [...activities, activity];

    setActivities(updatedActivities);
    await updateUserProfile({ activities: updatedActivities });
    setShowForm(false);
    setEditingActivity(null);
  };

  const handleDeleteActivity = async (id) => {
    if (confirm('Are you sure you want to delete this activity?')) {
      const updatedActivities = activities.filter(a => a.id !== id);
      setActivities(updatedActivities);
      await updateUserProfile({ activities: updatedActivities });
    }
  };

  const handleEditActivity = (activity) => {
    setEditingActivity(activity);
    setShowForm(true);
  };

  const groupedActivities = activities.reduce((acc, activity) => {
    const type = activity.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(activity);
    return acc;
  }, {});

  const getTotalHours = () => {
    return activities.reduce((sum, act) => {
      return sum + (parseInt(act.hoursPerWeek) * parseInt(act.weeksPerYear) * parseInt(act.yearsParticipated));
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">Activities & Achievements</h2>
        <p className="text-purple-100">
          Build your profile like Common App. Add up to 10 activities that showcase your passion and commitment.
        </p>
        <div className="mt-4 flex gap-4 text-sm">
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <p className="opacity-80">Total Activities</p>
            <p className="font-bold text-2xl">{activities.length}/10</p>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <p className="opacity-80">Total Hours</p>
            <p className="font-bold text-2xl">{getTotalHours().toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Add Activity Button */}
      {!showForm && activities.length < 10 && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg"
        >
          <Plus size={20} /> Add New Activity
        </button>
      )}

      {/* Activity Form */}
      {showForm && (
        <ActivityForm
          activity={editingActivity}
          onSave={handleSaveActivity}
          onCancel={() => {
            setShowForm(false);
            setEditingActivity(null);
          }}
        />
      )}

      {/* Activities List */}
      {activities.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Trophy size={48} className="mx-auto mb-4 opacity-50" />
          <p className="font-medium">No activities yet</p>
          <p className="text-sm">Start building your profile by adding your first activity</p>
        </div>
      ) : (
        <div className="space-y-6">
          {ACTIVITY_TYPES.map(type => {
            const typeActivities = groupedActivities[type.id] || [];
            if (typeActivities.length === 0) return null;

            return (
              <div key={type.id}>
                <h3 className="font-bold text-lg dark:text-white mb-3 flex items-center gap-2">
                  {typeof type.icon === 'string' ? (
                    <span className="text-2xl">{type.icon}</span>
                  ) : (
                    <type.icon size={24} className="text-blue-600" />
                  )}
                  {type.label} ({typeActivities.length})
                </h3>
                <div className="space-y-3">
                  {typeActivities.map(activity => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      onEdit={handleEditActivity}
                      onDelete={handleDeleteActivity}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tips */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
        <h3 className="font-bold text-yellow-800 dark:text-yellow-300 mb-3 flex items-center gap-2">
          💡 Tips for Strong Activities
        </h3>
        <ul className="space-y-2 text-sm text-yellow-700 dark:text-yellow-400">
          <li>• Focus on depth over breadth - show long-term commitment</li>
          <li>• Quantify your impact with specific numbers and results</li>
          <li>• Highlight leadership roles and responsibilities</li>
          <li>• Include awards and recognition at the highest level achieved</li>
          <li>• Use action verbs: led, organized, founded, raised, taught</li>
        </ul>
      </div>
    </div>
  );
};

export default CompleteProfile;