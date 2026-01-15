// src/components/EvaluationForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, BookOpen, Star } from 'lucide-react';

const EvaluationForm = () => {
  const [formData, setFormData] = useState({
    gpa: '',
    ielts: '',
    sat: '',
    volunteer: ''
  });
  const [result, setResult] = useState(null);

  const calculateProfileLevel = () => {
    const gpa = parseFloat(formData.gpa);
    const ielts = parseFloat(formData.ielts);
    const sat = parseInt(formData.sat) || 0;
    const volunteer = parseInt(formData.volunteer) || 0;

    let level = "Junior";
    let advice = [];
    let color = "bg-blue-100 text-blue-800";

    // Logic
    if (gpa >= 3.8 && ielts >= 7.5 && sat >= 1400) {
      level = "Senior";
      color = "bg-purple-100 text-purple-800 border-purple-300";
      advice.push("Твой профиль подходит для Top-50 вузов мира (Ivy League, Oxbridge).");
      advice.push("Фокусируйся на написании уникальных эссе и получении рекомендаций.");
    } else if (gpa >= 3.3 && ielts >= 6.5) {
      level = "Middle";
      color = "bg-green-100 text-green-800 border-green-300";
      advice.push("Отличный уровень для вузов Европы и Азии (Top-200).");
      if (sat < 1200) advice.push("⚡️ Чтобы стать Senior: Подними SAT до 1350+.");
      if (volunteer < 50) advice.push("⚡️ Добавь социальную активность: нужно мин. 50 часов волонтерства.");
    } else {
      level = "Junior";
      color = "bg-orange-100 text-orange-800 border-orange-300";
      advice.push("Хороший старт. Тебе нужно подтянуть академические показатели.");
      if (ielts < 6.0) advice.push("⚡️ Цель №1: IELTS 6.5. Запишись на курсы.");
      if (gpa < 3.2) advice.push("⚡️ Работай над школьными оценками в следующем семестре.");
    }

    setResult({ level, advice, color });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold dark:text-white mb-2">Profile Evaluation AI</h2>
        <p className="text-gray-500">Оцени свои шансы на поступление прямо сейчас</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300">GPA (max 5.0)</label>
          <input 
            type="number" name="gpa" placeholder="4.5"
            className="w-full p-3 bg-gray-50 dark:bg-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300">IELTS Score</label>
          <input 
            type="number" name="ielts" placeholder="6.5"
            className="w-full p-3 bg-gray-50 dark:bg-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300">SAT Score (Optional)</label>
          <input 
            type="number" name="sat" placeholder="1250"
            className="w-full p-3 bg-gray-50 dark:bg-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Volunteer Hours</label>
          <input 
            type="number" name="volunteer" placeholder="50"
            className="w-full p-3 bg-gray-50 dark:bg-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            onChange={handleChange}
          />
        </div>
      </div>

      <button 
        onClick={calculateProfileLevel}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg transition transform hover:scale-[1.02]"
      >
        Рассчитать уровень
      </button>

      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-8 p-6 rounded-2xl border-2 ${result.color} text-center`}
        >
          <div className="flex justify-center mb-2">
            <Target size={40} />
          </div>
          <h3 className="text-4xl font-black mb-2">{result.level} Applicant</h3>
          <div className="w-full h-px bg-current opacity-20 my-4"></div>
          <ul className="text-left space-y-3">
            {result.advice.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 font-medium">
                <TrendingUp size={20} className="mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default EvaluationForm;