// src/components/UniversityDetail.jsx
import React, { useState } from 'react';
import { APP_DB } from '../data';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Globe, PlayCircle, GraduationCap, ChevronDown, ChevronUp, MessageCircle, DollarSign, Users } from 'lucide-react';

const ProgramAccordion = ({ program, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden mb-3">
      <button 
        onClick={onToggle}
        className={`w-full flex justify-between items-center p-4 text-left transition ${isOpen ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-slate-800 hover:bg-gray-50'}`}
      >
        <div>
          <h4 className="font-bold dark:text-white text-lg">{program.title}</h4>
          <span className="text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded">{program.rank}</span>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0 }} 
            animate={{ height: "auto" }} 
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-gray-50 dark:bg-slate-800/50 text-sm space-y-3 border-t dark:border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                   <p className="text-gray-500 font-medium uppercase text-xs">Local Requirements</p>
                   <p className="dark:text-gray-300 font-semibold">{program.req_local}</p>
                </div>
                <div>
                   <p className="text-gray-500 font-medium uppercase text-xs">Intl. Requirements</p>
                   <p className="dark:text-gray-300 font-semibold">{program.req_intl}</p>
                </div>
              </div>
              <div className="pt-2 border-t dark:border-slate-700">
                 <p className="text-gray-500 font-medium uppercase text-xs">Career Path</p>
                 <p className="text-green-600 dark:text-green-400 font-bold flex items-center gap-1">
                   <DollarSign size={14} /> {program.career}
                 </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const UniversityDetail = ({ uniId, onBack }) => {
  const uni = APP_DB.Universities.find(u => u.id === uniId);
  const { t } = useTranslation();
  const [openProgramIdx, setOpenProgramIdx] = useState(0);

  // Найдем амбассадора (простая логика: ищем ментора, у которого в специальности есть название вуза или просто первого попавшегося для демо)
  const ambassador = APP_DB.Mentors.find(m => m.specialty.includes(uni.name) || m.role === 'Ambassador') || APP_DB.Mentors[0];

  if (!uni) return null;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="pb-10">
      {/* Navigation */}
      <button onClick={onBack} className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold mb-6 hover:underline group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" /> Back to List
      </button>
      
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8 group">
        <div className="h-80 w-full relative">
           <img src={uni.image} alt={uni.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-black/40 to-transparent"></div>
           <div className="absolute bottom-0 left-0 p-8 w-full">
             <div className="flex flex-wrap items-end justify-between gap-4">
               <div>
                  <div className="flex gap-2 mb-2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{uni.type}</span>
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">{uni.qs_rank}</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{uni.name}</h1>
                  <div className="flex items-center gap-4 text-gray-300 text-sm font-medium">
                    <span className="flex items-center gap-1"><MapPin size={16}/> {uni.country}</span>
                    <span className="flex items-center gap-1"><Users size={16}/> {uni.intl_students} Intl.</span>
                  </div>
               </div>
               <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center min-w-[120px]">
                  <p className="text-gray-300 text-xs uppercase">Tuition</p>
                  <p className="text-white font-bold text-xl">{uni.cost === 0 ? "FREE" : `$${uni.cost}`}</p>
               </div>
             </div>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Info & Video */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Description */}
          <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
              <Globe className="text-blue-500" /> About University
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              {t(uni.descriptionKey)}
            </p>
          </section>

          {/* Programs Accordion */}
          <section>
            <h3 className="text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
              <GraduationCap className="text-purple-500" /> Top Programs
            </h3>
            <div className="space-y-2">
              {uni.programs && uni.programs.map((prog, idx) => (
                <ProgramAccordion 
                  key={idx} 
                  program={prog} 
                  isOpen={openProgramIdx === idx} 
                  onToggle={() => setOpenProgramIdx(openProgramIdx === idx ? null : idx)} 
                />
              ))}
            </div>
          </section>

          {/* Video Review */}
          {uni.videoUrl && (
            <section className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-700">
              <div className="bg-gray-900 p-4 flex items-center gap-2 text-white">
                <PlayCircle className="text-red-500" /> <span className="font-bold">Virtual Campus Tour</span>
              </div>
              <div className="aspect-video">
                <iframe 
                  className="w-full h-full" 
                  src={uni.videoUrl} 
                  title={uni.name} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Grants & Ambassador */}
        <div className="space-y-6">
          
          {/* Ambassador Card */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
             <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto rounded-full border-4 border-white/30 overflow-hidden mb-3">
                  <img src={ambassador.photo} alt="Ambassador" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-lg">{ambassador.name}</h3>
                <p className="text-blue-200 text-sm mb-4">{ambassador.role}</p>
                <a 
                  href={ambassador.contact} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition shadow-md"
                >
                  <MessageCircle size={18} /> Chat Now
                </a>
             </div>
             {/* Decorative circles */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
             <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-10 -mb-10"></div>
          </div>

          {/* Admission Requirements Summary */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700">
            <h3 className="font-bold dark:text-white mb-4">General Requirements</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b dark:border-slate-700 pb-2">
                <span className="text-gray-500">IELTS</span>
                <span className="font-semibold dark:text-white">{uni.requirements.ielts}</span>
              </div>
              {uni.requirements.sat && (
                <div className="flex justify-between border-b dark:border-slate-700 pb-2">
                  <span className="text-gray-500">SAT</span>
                  <span className="font-semibold dark:text-white">{uni.requirements.sat}</span>
                </div>
              )}
               {uni.requirements.ent && (
                <div className="flex justify-between border-b dark:border-slate-700 pb-2">
                  <span className="text-gray-500">ENT (KZ)</span>
                  <span className="font-semibold dark:text-white">{uni.requirements.ent}</span>
                </div>
              )}
            </div>
          </div>

          {/* Grants Tags */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700">
            <h3 className="font-bold dark:text-white mb-4">Available Grants</h3>
            <div className="flex flex-wrap gap-2">
              {uni.grants.map(g => (
                <span key={g} className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-xs font-bold">
                  {g}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default UniversityDetail;