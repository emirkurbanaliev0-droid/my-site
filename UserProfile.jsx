import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Phone, School, BookOpen, Target, Award, Edit2, Save, X } from 'lucide-react';

const UserProfile = () => {
  const { user, profile, updateProfile, getTestScores } = useAuth();
  const [editing, setEditing] = useState(false);
  const [testScores, setTestScores] = useState([]);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    school: '',
    grade: '',
    gpa: '',
    target_major: '',
    bio: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        school: profile.school || '',
        grade: profile.grade || '',
        gpa: profile.gpa || '',
        target_major: profile.target_major || '',
        bio: profile.bio || ''
      });
    }
  }, [profile]);

  useEffect(() => {
    loadTestScores();
  }, []);

  const loadTestScores = async () => {
    try {
      const scores = await getTestScores();
      setTestScores(scores);
    } catch (error) {
      console.error('Error loading test scores:', error);
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={profile?.avatar_url || user?.user_metadata?.avatar_url} 
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white/30"
            />
            <div>
              <h1 className="text-3xl font-bold">{profile?.full_name || 'Your Name'}</h1>
              <p className="text-blue-100">{user?.email}</p>
              <p className="text-sm text-blue-200 mt-1">
                {profile?.grade ? `Grade ${profile.grade}` : 'Student'} • {profile?.country || 'Kazakhstan'}
              </p>
            </div>
          </div>
          <button
            onClick={() => editing ? setEditing(false) : setEditing(true)}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition"
          >
            {editing ? <X size={18} /> : <Edit2 size={18} />}
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: Personal Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
            <h2 className="text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
              <User size={20} className="text-blue-600" /> Personal Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:text-white disabled:opacity-60"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:text-white disabled:opacity-60"
                  placeholder="+7 (XXX) XXX-XX-XX"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">
                  School
                </label>
                <input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:text-white disabled:opacity-60"
                  placeholder="School Name"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">
                  Grade
                </label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:text-white disabled:opacity-60"
                >
                  <option value="">Select grade</option>
                  {[9, 10, 11, 12].map(g => (
                    <option key={g} value={g}>{g} класс</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">
                  GPA
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="gpa"
                  value={formData.gpa}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:text-white disabled:opacity-60"
                  placeholder="4.5"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">
                  Target Major
                </label>
                <input
                  type="text"
                  name="target_major"
                  value={formData.target_major}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:text-white disabled:opacity-60"
                  placeholder="Computer Science"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 block">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!editing}
                rows="3"
                className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:text-white disabled:opacity-60"
                placeholder="Tell us about yourself..."
              />
            </div>

            {editing && (
              <button
                onClick={handleSave}
                className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition flex items-center justify-center gap-2"
              >
                <Save size={18} /> Save Changes
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Test Scores */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
            <h2 className="text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
              <Award size={20} className="text-yellow-600" /> Test Scores
            </h2>
            
            {testScores.length > 0 ? (
              <div className="space-y-3">
                {testScores.map((score) => (
                  <div key={score.id} className="bg-gray-50 dark:bg-slate-700 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold dark:text-white">{score.test_type}</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">{score.score}</span>
                    </div>
                    {score.test_date && (
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(score.test_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">
                No test scores added yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;