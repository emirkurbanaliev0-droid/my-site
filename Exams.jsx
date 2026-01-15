// src/components/Exams.jsx
import React, { useState, useEffect } from 'react';
import { EXAM_DATA } from '../data';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle, ExternalLink, Clock, Target, Calendar, ArrowRight } from 'lucide-react';

const Exams = ({ initialExamId }) => {
  const [selectedExam, setSelectedExam] = useState(null);

  // Auto-open exam if passed via props (linking from University Detail)
  useEffect(() => {
    if (initialExamId) {
      const found = EXAM_DATA.find(e => e.id === initialExamId.toLowerCase());
      if (found) setSelectedExam(found);
    }
  }, [initialExamId]);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-3xl font-bold dark:text-white flex items-center gap-2">
             <Target className="text-red-500" /> Exam Hub
           </h2>
           <p className="text-gray-500 dark:text-gray-400 mt-1">Official resources & preparation strategies</p>
        </div>
      </div>
      
      {/* Grid of Exams */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {EXAM_DATA.map((exam) => (
          <motion.div 
            key={exam.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedExam(exam)}
            className={`p-4 rounded-2xl cursor-pointer border-2 flex flex-col items-center justify-center text-center h-32 transition ${
              selectedExam?.id === exam.id 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 hover:shadow-lg'
            }`}
          >
            <h3 className="text-lg font-black dark:text-white mb-1">{exam.title}</h3>
            <span className="text-xs text-gray-400 uppercase font-bold">Guide</span>
          </motion.div>
        ))}
      </div>

      {/* Detailed View */}
      <AnimatePresence mode="wait">
        {selectedExam && (
          <motion.div 
            key={selectedExam.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="overflow-hidden"
          >
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100 dark:border-slate-700">
              
              <div className="flex items-center gap-4 mb-8 border-b dark:border-slate-700 pb-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <BookOpen size={32} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold dark:text-white">{selectedExam.title} Masterclass</h3>
                  <p className="text-gray-500 dark:text-gray-400">{selectedExam.desc}</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Column 1: Strategy Plan */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
                     <h4 className="font-bold flex items-center gap-2 mb-4 dark:text-white text-lg">
                       <Calendar className="text-blue-500"/> 3-Month Preparation Plan
                     </h4>
                     <div className="space-y-4">
                       {selectedExam.plan.split('\n').map((month, idx) => (
                         <div key={idx} className="flex gap-4">
                           <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center font-bold text-blue-800 dark:text-blue-200 text-sm">
                             {idx + 1}
                           </div>
                           <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{month}</p>
                         </div>
                       ))}
                     </div>
                  </div>
                </div>

                {/* Column 2: Resources & Links */}
                <div className="space-y-6">
                   <div className="bg-gray-50 dark:bg-slate-700/30 p-6 rounded-2xl">
                      <h4 className="font-bold mb-4 dark:text-white flex items-center gap-2">
                        <ExternalLink size={18}/> Official Resources
                      </h4>
                      <div className="flex flex-col gap-2">
                        {selectedExam.links.map(link => (
                          <a 
                            key={link.url} href={link.url} target="_blank" rel="noreferrer"
                            className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-600 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-500 transition dark:text-white text-sm font-medium shadow-sm"
                          >
                            {link.name} <ArrowRight size={14} className="opacity-50"/>
                          </a>
                        ))}
                      </div>
                   </div>

                   <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-2xl border border-green-100 dark:border-green-900">
                      <h4 className="font-bold mb-4 dark:text-white flex items-center gap-2">
                        <CheckCircle size={18} className="text-green-600"/> Free Practice
                      </h4>
                      <div className="flex flex-col gap-2">
                         {selectedExam.freeTests.map(test => (
                           <a 
                             key={test.url} href={test.url} target="_blank" rel="noreferrer"
                             className="text-green-700 dark:text-green-400 underline hover:no-underline text-sm font-medium"
                           >
                             {test.name}
                           </a>
                         ))}
                      </div>
                   </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Exams;