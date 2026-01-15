// src/components/VisaGuide.jsx - NEW COMPONENT
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, FileText, DollarSign, Clock, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const VISA_GUIDES = [
  {
    country: "USA",
    flag: "🇺🇸",
    visaType: "F-1 Student Visa",
    processingTime: "3-5 weeks",
    cost: "$510 (SEVIS $350 + Visa $160)",
    requirements: [
      "Valid passport (6 months validity)",
      "I-20 form from university",
      "SEVIS fee payment receipt",
      "Visa application form (DS-160)",
      "Proof of financial support ($30,000-$70,000)",
      "Academic transcripts",
      "English proficiency test scores"
    ],
    process: [
      "Receive I-20 from university",
      "Pay SEVIS fee online",
      "Complete DS-160 form",
      "Schedule visa interview",
      "Attend embassy interview",
      "Wait for visa approval (3-5 days)"
    ],
    tips: [
      "Book interview appointment early (2-3 months ahead)",
      "Be prepared to explain why you'll return to Kazakhstan",
      "Bring all financial documents in original",
      "Dress professionally for interview"
    ],
    difficulty: "Medium"
  },
  {
    country: "UK",
    flag: "🇬🇧",
    visaType: "Tier 4 Student Visa",
    processingTime: "3 weeks",
    cost: "£490 + £470/year (health surcharge)",
    requirements: [
      "CAS (Confirmation of Acceptance) from university",
      "Passport",
      "TB test certificate",
      "Financial proof (£1,334/month for 9 months)",
      "English proficiency (IELTS UKVI)",
      "Academic documents"
    ],
    process: [
      "Receive CAS number",
      "Complete online application",
      "Pay visa fee and health surcharge",
      "Book biometric appointment",
      "Attend visa center",
      "Wait for decision"
    ],
    tips: [
      "Use official IELTS UKVI test (regular IELTS not accepted)",
      "Bank statements must show funds for 28 consecutive days",
      "TB test valid for 6 months",
      "Apply 3 months before course start"
    ],
    difficulty: "Medium"
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    visaType: "Student Visa",
    processingTime: "6-12 weeks",
    cost: "€75",
    requirements: [
      "University admission letter",
      "Blocked account (€11,208/year)",
      "Health insurance",
      "Proof of accommodation",
      "German or English proficiency",
      "Valid passport"
    ],
    process: [
      "Get university admission",
      "Open blocked account",
      "Get health insurance",
      "Schedule embassy appointment",
      "Submit documents",
      "Wait for visa (can take 8-12 weeks)"
    ],
    tips: [
      "Book appointment 3 months in advance",
      "Blocked account is mandatory (Fintiba, Deutsche Bank)",
      "Public health insurance required",
      "Prepare for long processing time"
    ],
    difficulty: "Hard"
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    visaType: "Study Permit",
    processingTime: "4-6 weeks (online)",
    cost: "CAD $150 + biometrics $85",
    requirements: [
      "Letter of acceptance from DLI",
      "Proof of funds (CAD $20,635 + tuition)",
      "Passport",
      "Biometrics",
      "Medical exam (if required)",
      "Police certificate"
    ],
    process: [
      "Apply online through IRCC",
      "Upload documents",
      "Pay fees",
      "Give biometrics",
      "Medical exam (if requested)",
      "Wait for decision"
    ],
    tips: [
      "Apply online for faster processing",
      "Include detailed study plan (SOP)",
      "Show strong ties to home country",
      "GIC (Guaranteed Investment Certificate) helpful"
    ],
    difficulty: "Medium"
  },
  {
    country: "South Korea",
    flag: "🇰🇷",
    visaType: "D-2 Student Visa",
    processingTime: "5-10 days",
    cost: "$80",
    requirements: [
      "Admission letter",
      "Financial proof ($10,000/year)",
      "Passport",
      "Application form",
      "Education documents",
      "Health certificate"
    ],
    process: [
      "Receive university COE",
      "Submit application to embassy",
      "Interview (if required)",
      "Collect visa"
    ],
    tips: [
      "Very fast processing compared to Western countries",
      "Embassy may call you for phone interview",
      "TB test required for stays over 90 days",
      "Relatively easy to obtain"
    ],
    difficulty: "Easy"
  }
];

const VisaCard = ({ guide, isOpen, onToggle }) => {
  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100 dark:border-slate-700">
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-slate-700/50 transition"
      >
        <div className="flex items-center gap-4">
          <span className="text-4xl">{guide.flag}</span>
          <div>
            <h3 className="text-xl font-bold dark:text-white">{guide.country}</h3>
            <p className="text-sm text-gray-500">{guide.visaType}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(guide.difficulty)}`}>
            {guide.difficulty}
          </span>
          {isOpen ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 space-y-6">
              {/* QUICK INFO */}
              <div className="grid md:grid-cols-2 gap-4 bg-gray-50 dark:bg-slate-700/30 p-4 rounded-xl">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Processing Time</p>
                    <p className="font-bold dark:text-white">{guide.processingTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign size={18} className="text-green-600" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Cost</p>
                    <p className="font-bold dark:text-white">{guide.cost}</p>
                  </div>
                </div>
              </div>

              {/* REQUIREMENTS */}
              <div>
                <h4 className="font-bold dark:text-white mb-3 flex items-center gap-2">
                  <FileText size={18} className="text-purple-600" /> Required Documents
                </h4>
                <ul className="space-y-2">
                  {guide.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm dark:text-gray-300">
                      <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* PROCESS */}
              <div>
                <h4 className="font-bold dark:text-white mb-3 flex items-center gap-2">
                  <Plane size={18} className="text-blue-600" /> Application Process
                </h4>
                <div className="space-y-2">
                  {guide.process.map((step, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-sm dark:text-gray-300 pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* TIPS */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                <h4 className="font-bold dark:text-white mb-3 flex items-center gap-2">
                  <AlertCircle size={18} className="text-yellow-600" /> Pro Tips
                </h4>
                <ul className="space-y-2">
                  {guide.tips.map((tip, idx) => (
                    <li key={idx} className="text-sm dark:text-gray-300 flex items-start gap-2">
                      <span className="text-yellow-600">💡</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const VisaGuide = () => {
  const [openCountry, setOpenCountry] = useState(null);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold dark:text-white flex items-center gap-2">
          <Plane className="text-blue-500" /> Student Visa Guide
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Complete visa application guides for popular study destinations
        </p>
      </div>

      {/* GENERAL TIPS */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">🎯 General Visa Tips (All Countries)</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-bold mb-2">Before Applying:</p>
            <ul className="space-y-1 opacity-90">
              <li>• Start 3-4 months before intended travel</li>
              <li>• Check embassy website for latest requirements</li>
              <li>• Get documents translated if needed</li>
              <li>• Prepare financial proofs carefully</li>
            </ul>
          </div>
          <div>
            <p className="font-bold mb-2">During Interview:</p>
            <ul className="space-y-1 opacity-90">
              <li>• Be honest and confident</li>
              <li>• Bring all original documents</li>
              <li>• Dress professionally</li>
              <li>• Show strong ties to home country</li>
            </ul>
          </div>
        </div>
      </div>

      {/* VISA CARDS */}
      <div className="space-y-4">
        {VISA_GUIDES.map((guide) => (
          <VisaCard
            key={guide.country}
            guide={guide}
            isOpen={openCountry === guide.country}
            onToggle={() => setOpenCountry(openCountry === guide.country ? null : guide.country)}
          />
        ))}
      </div>

      {/* FOOTER WARNING */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
        <p className="text-sm text-red-800 dark:text-red-300 flex items-start gap-2">
          <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
          <span>
            <strong>Important:</strong> Visa requirements and processes change frequently. 
            Always verify information on official embassy websites before applying.
          </span>
        </p>
      </div>
    </div>
  );
};

export default VisaGuide;