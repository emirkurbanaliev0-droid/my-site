// src/App.jsx - COMPLETE VERSION WITH ALL FEATURES
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, LogOut, Moon, Sun, Bell, Menu, X, 
  Home, MessageSquare, Award, FileText, Calendar,
  BookOpen, Target, Users, Globe, Zap
} from 'lucide-react';

// Import Components
import Login from './components/Auth/Login';
import UserProfile from './components/Profile/UserProfile';
import PlotformaAI from './components/PlotformaAI';
import BattleMode from './components/BattleMode';
import Scholarships from './components/Scholarships';
import VisaGuide from './components/VisaGuide';
import DeadlineCalendar from './components/DeadlineCalendar';
import Exams from './components/Exams';
import EvaluationForm from './components/EvaluationForm';
import UniversityDetail from './components/UniversityDetail';
import NotificationCenter from './components/NotificationCenter';
import ProfileModal from './components/Profile';

// Import Data
import { APP_DB, MOTIVATION_QUOTES } from './data';

function App() {
  const { t, i18n } = useTranslation();
  const { user, profile, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  // State Management
  const [showLogin, setShowLogin] = useState(false);
  const [activeView, setActiveView] = useState('home');
  const [selectedUniId, setSelectedUniId] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCountry, setFilterCountry] = useState('all');

  // Random motivation quote
  const randomQuote = MOTIVATION_QUOTES[Math.floor(Math.random() * MOTIVATION_QUOTES.length)];

  // Language switcher
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Filtered universities
  const filteredUniversities = APP_DB.Universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         uni.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = filterCountry === 'all' || uni.country === filterCountry;
    return matchesSearch && matchesCountry;
  });

  // Navigation items
  const navItems = [
    { id: 'home', label: t('nav.home'), icon: Home },
    { id: 'chat', label: t('nav.chat'), icon: MessageSquare },
    { id: 'battle', label: t('nav.battle'), icon: Zap },
    { id: 'scholarships', label: t('nav.scholarships'), icon: Award },
    { id: 'visa', label: t('nav.visa'), icon: Globe },
    { id: 'deadlines', label: t('nav.deadlines'), icon: Calendar },
    { id: 'exams', label: t('nav.exams'), icon: BookOpen },
    { id: 'evaluation', label: t('nav.evaluation'), icon: Target },
    { id: 'network', label: t('nav.network'), icon: Users },
  ];

  // Render Home View
  const HomeView = () => (
    <div className="space-y-8">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
      >
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Welcome to Plotforma! 🚀
          </h1>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl">
            Your AI-powered platform for university admissions, scholarships, and career planning
          </p>
          {!user && (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Get Started Free
            </button>
          )}
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl"></div>
      </motion.div>

      {/* MOTIVATION QUOTE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-6 text-white"
      >
        <p className="text-xl italic mb-2">&quot;{randomQuote.text}&quot;</p>
        <p className="text-sm text-orange-100">— {randomQuote.author}</p>
      </motion.div>

      {/* SEARCH & FILTER */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search universities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-6 py-4 bg-white dark:bg-slate-800 rounded-xl border-2 border-gray-200 dark:border-slate-700 outline-none focus:border-blue-500 dark:text-white shadow-sm"
        />
        <select
          value={filterCountry}
          onChange={(e) => setFilterCountry(e.target.value)}
          className="px-6 py-4 bg-white dark:bg-slate-800 rounded-xl border-2 border-gray-200 dark:border-slate-700 outline-none dark:text-white shadow-sm"
        >
          <option value="all">All Countries</option>
          <option value="KZ">Kazakhstan</option>
          <option value="US">United States</option>
          <option value="UK">United Kingdom</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
          <option value="CN">China</option>
        </select>
      </div>

      {/* UNIVERSITIES GRID */}
      <div>
        <h2 className="text-2xl font-bold dark:text-white mb-4">
          Top Universities ({filteredUniversities.length})
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities.map((uni) => (
            <motion.div
              key={uni.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition border border-gray-100 dark:border-slate-700 cursor-pointer"
              onClick={() => {
                setSelectedUniId(uni.id);
                setActiveView('university-detail');
              }}
            >
              <div className="h-48 overflow-hidden relative">
                <img src={uni.image} alt={uni.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {uni.country}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg dark:text-white mb-2">{uni.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{uni.type}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded">
                    {uni.qs_rank}
                  </span>
                  <span className="text-lg font-black text-green-600">
                    {uni.cost === 0 ? 'FREE' : `$${uni.cost}`}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SUCCESS STORIES */}
      <div>
        <h2 className="text-2xl font-bold dark:text-white mb-4">Success Stories</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {APP_DB.SuccessStories.map((story) => (
            <motion.div
              key={story.id}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white cursor-pointer shadow-lg"
              onClick={() => setSelectedProfile(story.id)}
            >
              <div className="flex items-center gap-4 mb-4">
                <img src={story.photo} alt={story.name} className="w-16 h-16 rounded-full border-4 border-white/30" />
                <div>
                  <h3 className="font-bold text-xl">{story.name}</h3>
                  <p className="text-purple-200 text-sm">{story.university} • {story.major}</p>
                </div>
              </div>
              <p className="text-purple-100 text-sm line-clamp-3">{story.fullStory}</p>
              <button className="mt-3 text-white font-bold underline">Read Full Story →</button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MENTORS */}
      <div>
        <h2 className="text-2xl font-bold dark:text-white mb-4">Connect with Mentors</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {APP_DB.Mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 text-center"
            >
              <img src={mentor.photo} alt={mentor.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="font-bold dark:text-white mb-1">{mentor.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{mentor.role}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mb-4">{mentor.specialty}</p>
              <a
                href={mentor.contact}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
              >
                Contact
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Main Render
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1c] transition-colors duration-300">
      {/* NAVIGATION BAR */}
      <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* LOGO */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView('home')}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                P
              </div>
              <span className="text-xl font-bold dark:text-white hidden sm:block">PLOTFORMA</span>
            </div>

            {/* DESKTOP NAVIGATION */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.slice(0, 5).map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                      activeView === item.id
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-slate-800 dark:text-gray-300'
                    }`}
                  >
                    <IconComponent size={18} />
                    <span className="hidden xl:block">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* RIGHT SIDE ACTIONS */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="hidden sm:flex gap-1">
                {['en', 'ru', 'kz'].map((lng) => (
                  <button
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    className={`px-3 py-1 rounded-lg text-sm font-bold transition ${
                      i18n.language === lng
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {lng.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition"
              >
                {theme === 'dark' ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-600" />}
              </button>

              {/* Notifications */}
              {user ? (
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                >
                  <Bell size={20} className="dark:text-gray-300" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              ) : null}

              {/* AUTH BUTTONS */}
              {user ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveView('profile')}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
                  >
                    <img
                      src={profile?.avatar_url || user.user_metadata?.avatar_url || 'https://via.placeholder.com/40'}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-medium dark:text-white hidden sm:block">
                      {profile?.full_name || user.email?.split('@')[0]}
                    </span>
                  </button>
                  <button
                    onClick={signOut}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition"
                    title="Sign Out"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition shadow-md"
                >
                  <User size={18} />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                {showMobileMenu ? <X size={24} className="dark:text-white" /> : <Menu size={24} className="dark:text-white" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {showMobileMenu ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-gray-200 dark:border-slate-800 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveView(item.id);
                        setShowMobileMenu(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                        activeView === item.id
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-slate-800 dark:text-gray-300'
                      }`}
                    >
                      <IconComponent size={20} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeView === 'home' ? <HomeView /> : null}
            {activeView === 'profile' && user ? <UserProfile /> : null}
            {activeView === 'chat' ? <PlotformaAI /> : null}
            {activeView === 'battle' ? <BattleMode /> : null}
            {activeView === 'scholarships' ? <Scholarships /> : null}
            {activeView === 'visa' ? <VisaGuide /> : null}
            {activeView === 'deadlines' ? <DeadlineCalendar /> : null}
            {activeView === 'exams' ? <Exams /> : null}
            {activeView === 'evaluation' ? <EvaluationForm /> : null}
            {activeView === 'university-detail' ? (
              <UniversityDetail
                uniId={selectedUniId}
                onBack={() => setActiveView('home')}
              />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* MODALS */}
      {showLogin ? <Login onClose={() => setShowLogin(false)} /> : null}
      {showNotifications ? <NotificationCenter onClose={() => setShowNotifications(false)} /> : null}
      {selectedProfile ? (
        <ProfileModal userId={selectedProfile} onClose={() => setSelectedProfile(null)} />
      ) : null}
    </div>
  );
}

export default App;