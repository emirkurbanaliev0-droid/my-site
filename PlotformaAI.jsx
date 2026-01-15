// src/components/PlotformaAI.jsx - FIXED AI CHAT
import React, { useState, useRef, useEffect } from 'react';
import { APP_DB } from '../data';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Send, Bot, Sparkles, Loader } from 'lucide-react';

const PlotformaAI = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    { role: 'ai', content: t('ai_intro') }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  // IMPROVED AI RESPONSE GENERATOR
  const generateSmartResponse = (query) => {
    const q = query.toLowerCase();
    
    // 1. GREETINGS
    if (q.match(/^(hi|hello|hey|привет|салам)/)) {
      return "👋 Hello! I'm PlotformaAI, your personal education advisor. I can help you with:\n\n• Finding the best university for your major\n• SAT/IELTS/ENT preparation strategies\n• Scholarship opportunities\n• Application requirements\n\nWhat would you like to know?";
    }

    // 2. UNIVERSITY SEARCH BY MAJOR
    const majors = ['engineering', 'cs', 'computer science', 'it', 'physics', 'robotics', 'business', 'medicine', 'инженерия', 'программирование'];
    const foundMajor = majors.find(m => q.includes(m));
    
    if (foundMajor || q.includes('university') || q.includes('вуз') || q.includes('college')) {
      const matches = [];
      APP_DB.Universities.forEach(uni => {
        if (uni.programs) {
          const prog = uni.programs.find(p => 
            p.title.toLowerCase().includes(foundMajor || 'computer')
          );
          if (prog) {
            matches.push({ 
              uniName: uni.name, 
              country: uni.country,
              cost: uni.cost,
              ...prog 
            });
          }
        }
      });

      if (matches.length > 0) {
        const top = matches[0];
        return `🎓 **Top Match for "${foundMajor || 'your field'}": ${top.uniName}**\n\n` +
               `📍 Location: ${top.country}\n` +
               `📊 Program Ranking: ${top.rank}\n` +
               `💰 Tuition: ${top.cost === 0 ? 'FREE' : '$' + top.cost}\n` +
               `📝 Requirements: ${top.req_intl}\n` +
               `💼 Career Prospects: ${top.career}\n\n` +
               `Would you like more details about this program or compare it with others?`;
      }
    }

    // 3. SAT/IELTS/ENT ADVICE
    if (q.includes('sat')) {
      return "📚 **SAT Strategy:**\n\n" +
             "✅ Use Khan Academy (official & free)\n" +
             "✅ Take practice tests every week\n" +
             "✅ Focus on Math first (easier to improve quickly)\n" +
             "✅ Grammar rules for Writing section = easy points!\n\n" +
             "**Score Goals:**\n" +
             "• 1200+ → Good state universities\n" +
             "• 1400+ → Top 100 universities\n" +
             "• 1500+ → Ivy League competitive\n\n" +
             "Need a specific prep plan? Ask me!";
    }

    if (q.includes('ielts')) {
      return "🗣️ **IELTS Preparation:**\n\n" +
             "**Month 1:** Build vocabulary (academic word lists)\n" +
             "**Month 2:** Practice Speaking with partners daily\n" +
             "**Month 3:** Full mock tests under exam conditions\n\n" +
             "**Target Scores:**\n" +
             "• 6.0 → Minimum for most universities\n" +
             "• 6.5 → Competitive for European/Asian unis\n" +
             "• 7.0+ → Top universities & scholarships\n\n" +
             "Free resources: IELTS Liz, British Council practice tests";
    }

    if (q.includes('ent') || q.includes('ubт') || q.includes('уент')) {
      return "🇰🇿 **ENT (UBT) Strategy:**\n\n" +
             "✅ Focus on Math Literacy (most weight)\n" +
             "✅ Kazakhstan History: memorize key dates\n" +
             "✅ Reading: practice speed reading techniques\n" +
             "✅ Profile subjects (Physics/Bio): solve 20 tests/week\n\n" +
             "**Score Goals:**\n" +
             "• 100+ → Most KZ universities\n" +
             "• 120+ → Top programs (KBTU, AlmaU)\n" +
             "• 140+ → Nazarbayev University competitive\n\n" +
             "Check out iTest.kz for practice!";
    }

    // 4. SCHOLARSHIP QUESTIONS
    if (q.includes('scholarship') || q.includes('grant') || q.includes('грант') || q.includes('стипендия')) {
      return "💰 **Scholarship Opportunities:**\n\n" +
             "**Kazakhstan:**\n" +
             "• Bolashak Scholarship (full funding abroad)\n" +
             "• Government Grant (based on ENT score)\n\n" +
             "**International:**\n" +
             "• Chevening (UK)\n" +
             "• Fulbright (USA)\n" +
             "• DAAD (Germany)\n" +
             "• Erasmus+ (Europe)\n\n" +
             "💡 Tip: Start applications 1 year before intended start date!\n\n" +
             "Want details about a specific scholarship?";
    }

    // 5. REQUIREMENTS & APPLICATION
    if (q.includes('requirement') || q.includes('apply') || q.includes('application') || q.includes('требования')) {
      return "📋 **Application Requirements (General):**\n\n" +
             "**For Local Universities (KZ):**\n" +
             "• ENT certificate\n" +
             "• School diploma\n" +
             "• ID document\n\n" +
             "**For International Universities:**\n" +
             "• English test (IELTS/TOEFL)\n" +
             "• Transcripts (translated)\n" +
             "• Recommendation letters (2-3)\n" +
             "• Personal statement/Essay\n" +
             "• Portfolio (for creative fields)\n\n" +
             "Which university are you interested in? I can give specific requirements!";
    }

    // 6. COUNTRY-SPECIFIC QUESTIONS
    if (q.includes('usa') || q.includes('america') || q.includes('сша')) {
      return "🇺🇸 **Studying in USA:**\n\n" +
             "**Requirements:**\n" +
             "• SAT: 1200+ minimum\n" +
             "• TOEFL: 80+ or IELTS: 6.5+\n" +
             "• Strong extracurriculars\n" +
             "• Excellent essays\n\n" +
             "**Costs:** $30,000-$70,000/year (including living)\n" +
             "**Scholarships:** Many universities offer merit-based aid\n\n" +
             "Top accessible universities: Arizona State, University of Illinois";
    }

    // 7. STARTUP ADVICE
    if (q.includes('startup') || q.includes('стартап') || q.includes('business idea')) {
      return "🚀 **Student Startup Guide:**\n\n" +
             "**Step 1:** Identify a real problem you face daily\n" +
             "**Step 2:** Build MVP (Minimum Viable Product)\n" +
             "**Step 3:** Find co-founders with complementary skills\n" +
             "**Step 4:** Apply to incubators (Y Combinator, Astana Hub)\n\n" +
             "💡 Tip: Universities LOVE entrepreneurial students - add this to your application!\n\n" +
             "Check our Network tab to connect with other student founders!";
    }

    // 8. FALLBACK WITH HELPFUL SUGGESTIONS
    return "🤔 I'm not sure about that specific topic, but I can help you with:\n\n" +
           "• **University Selection** - Ask me about specific majors or countries\n" +
           "• **Exam Prep** - SAT, IELTS, ENT, TOEFL strategies\n" +
           "• **Scholarships** - Finding and applying for funding\n" +
           "• **Application Process** - Requirements and deadlines\n\n" +
           "Try asking something like:\n" +
           "- 'Best universities for Computer Science'\n" +
           "- 'How to prepare for SAT?'\n" +
           "- 'Scholarships for international students'";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateSmartResponse(currentInput);
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // QUICK ACTION BUTTONS
  const quickActions = [
    { label: "🎓 Find Universities", query: "Show me top universities for computer science" },
    { label: "📚 SAT Tips", query: "How to prepare for SAT?" },
    { label: "💰 Scholarships", query: "Tell me about scholarships" },
    { label: "🇰🇿 ENT Guide", query: "How to prepare for ENT?" },
  ];

  return (
    <div className="flex flex-col h-[700px] bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white flex items-center gap-2">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <Bot size={24} />
        </div>
        <div>
          <h3 className="font-bold text-lg">PlotformaAI v3.5</h3>
          <p className="text-xs opacity-80 text-blue-100">🔥 Now with smarter responses!</p>
        </div>
      </div>
      
      {/* MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#0b1121]">
        {messages.map((m, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            key={idx} 
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm whitespace-pre-line leading-relaxed shadow-sm ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white dark:bg-slate-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-slate-700'
            }`}>
              {m.role === 'ai' && <Sparkles size={14} className="inline mb-1 text-yellow-500" />}
              {m.content}
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <div className="flex items-center gap-2 text-gray-400 text-xs ml-4">
            <Loader size={14} className="animate-spin" />
            AI is analyzing your question...
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* QUICK ACTIONS */}
      {messages.length === 1 && (
        <div className="px-4 py-2 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
          <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInput(action.query);
                  setTimeout(handleSend, 100);
                }}
                className="text-xs bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-slate-700 transition font-medium"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* INPUT AREA */}
      <div className="p-3 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about universities, exams, scholarships..."
          className="flex-1 bg-gray-100 dark:bg-slate-800 dark:text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
          rows="2"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim()}
          className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed self-end"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default PlotformaAI;