// src/components/Scholarships.jsx - NEW COMPONENT
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, DollarSign, Calendar, Users, ExternalLink, Filter, Star } from 'lucide-react';

const SCHOLARSHIPS = [
  {
    id: 1,
    name: "Bolashak International Scholarship",
    country: "KZ",
    amount: "Full funding",
    deadline: "March 15, 2026",
    eligibility: "GPA 4.0+, IELTS 6.5+",
    coverage: ["Tuition", "Living expenses", "Travel", "Health insurance"],
    url: "https://www.bolashak.gov.kz",
    difficulty: "High",
    rating: 5
  },
  {
    id: 2,
    name: "Chevening Scholarship (UK)",
    country: "UK",
    amount: "£18,000-£30,000",
    deadline: "November 2, 2025",
    eligibility: "2+ years work experience, Leadership potential",
    coverage: ["Tuition", "Stipend", "Travel"],
    url: "https://www.chevening.org",
    difficulty: "Very High",
    rating: 5
  },
  {
    id: 3,
    name: "Fulbright Program (USA)",
    country: "USA",
    amount: "Full funding",
    deadline: "May 31, 2026",
    eligibility: "Bachelor's degree, TOEFL 80+",
    coverage: ["Tuition", "Living", "Health insurance", "Books"],
    url: "https://fulbright.org",
    difficulty: "Very High",
    rating: 5
  },
  {
    id: 4,
    name: "DAAD Scholarship (Germany)",
    country: "DE",
    amount: "€850/month + tuition",
    deadline: "November 30, 2025",
    eligibility: "Bachelor's degree, German A2+ or English",
    coverage: ["Tuition waiver", "Monthly stipend", "Health insurance"],
    url: "https://www.daad.de",
    difficulty: "Medium",
    rating: 4
  },
  {
    id: 5,
    name: "Erasmus Mundus (Europe)",
    country: "EU",
    amount: "€1,400/month + €4,000/year",
    deadline: "Varies by program",
    eligibility: "Bachelor's degree, English proficiency",
    coverage: ["Tuition", "Living stipend", "Travel"],
    url: "https://erasmus-plus.ec.europa.eu",
    difficulty: "Medium",
    rating: 4
  },
  {
    id: 6,
    name: "CSC Scholarship (China)",
    country: "CN",
    amount: "Full funding + stipend",
    deadline: "April 30, 2026",
    eligibility: "GPA 3.0+, HSK 4+ (for Chinese programs)",
    coverage: ["Tuition", "Accommodation", "Living stipend"],
    url: "http://www.campuschina.org",
    difficulty: "Low",
    rating: 3
  },
  {
    id: 7,
    name: "Nazarbayev University Merit Scholarship",
    country: "KZ",
    amount: "Full tuition waiver",
    deadline: "June 1, 2026",
    eligibility: "NUET 150+, IELTS 6.5+",
    coverage: ["Tuition only"],
    url: "https://nu.edu.kz",
    difficulty: "Medium",
    rating: 4
  },
  {
    id: 8,
    name: "Turkish Government Scholarship",
    country: "TR",
    amount: "Full funding + $200/month",
    deadline: "February 20, 2026",
    eligibility: "Under 21 for Bachelor's, GPA 70%+",
    coverage: ["Tuition", "Accommodation", "Stipend", "Turkish course"],
    url: "https://turkiyeburslari.gov.tr",
    difficulty: "Low",
    rating: 3
  }
];

const Scholarships = () => {
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const countries = ['all', ...new Set(SCHOLARSHIPS.map(s => s.country))];
  const difficulties = ['all', 'Low', 'Medium', 'High', 'Very High'];

  const filteredScholarships = SCHOLARSHIPS.filter(s => {
    const matchesCountry = selectedCountry === 'all' || s.country === selectedCountry;
    const matchesDifficulty = selectedDifficulty === 'all' || s.difficulty === selectedDifficulty;
    return matchesCountry && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Very High': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold dark:text-white flex items-center gap-2">
            <Award className="text-yellow-500" /> Scholarship Database
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {filteredScholarships.length} opportunities found
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-4 flex-wrap">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none dark:text-white"
        >
          <option value="all">All Countries</option>
          {countries.filter(c => c !== 'all').map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none dark:text-white"
        >
          <option value="all">All Difficulties</option>
          {difficulties.filter(d => d !== 'all').map(diff => (
            <option key={diff} value={diff}>{diff}</option>
          ))}
        </select>
      </div>

      {/* SCHOLARSHIP CARDS */}
      <div className="grid gap-6">
        {filteredScholarships.map((scholarship) => (
          <motion.div
            key={scholarship.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition border border-gray-100 dark:border-slate-700"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold dark:text-white">{scholarship.name}</h3>
                  <div className="flex">
                    {[...Array(scholarship.rating)].map((_, i) => (
                      <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                    {scholarship.country}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(scholarship.difficulty)}`}>
                    {scholarship.difficulty}
                  </span>
                </div>
              </div>
              <a
                href={scholarship.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 transition"
              >
                <ExternalLink size={20} />
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign size={16} className="text-green-600" />
                  <span className="font-semibold dark:text-gray-300">Funding: {scholarship.amount}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={16} className="text-orange-600" />
                  <span className="font-semibold dark:text-gray-300">Deadline: {scholarship.deadline}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users size={16} className="text-purple-600" />
                  <span className="font-semibold dark:text-gray-300">{scholarship.eligibility}</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Coverage Includes:</p>
                <div className="flex flex-wrap gap-2">
                  {scholarship.coverage.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200"
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <a
              href={scholarship.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline text-sm"
            >
              View Application Details <ExternalLink size={14} />
            </a>
          </motion.div>
        ))}
      </div>

      {/* TIPS SECTION */}
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Star className="text-yellow-400" /> Application Tips
        </h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-yellow-400">•</span>
            <span>Start preparing 12-18 months before deadline</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-400">•</span>
            <span>Get recommendation letters early from professors who know you well</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-400">•</span>
            <span>Tailor your personal statement to each scholarship's mission</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-400">•</span>
            <span>Document all your extracurricular activities and achievements</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Scholarships;