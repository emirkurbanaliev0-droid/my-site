// src/data.js - UPDATED WITH MORE DATA

export const MOTIVATION_QUOTES = [
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "Invest in your dreams. Grind now. Shine later.", author: "Unknown" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Failure is the tuition you pay for success.", author: "Walter Brunell" },
  { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" }
];

export const EXAM_DATA = [
  {
    id: "ent",
    title: "ENT (UBT)",
    desc: "Unified National Testing for KZ universities.",
    links: [{ name: "Test Center", url: "https://testcenter.kz" }, { name: "EduCon", url: "https://educon.kz" }],
    plan: "Month 1: Focus on Math Literacy & History. Learn dates and formulas.\nMonth 2: Deep dive into profiling subjects (Physics/Math). Solve 20 tests/week.\nMonth 3: Full timed simulation exams (4 hours) every other day.",
    freeTests: [{ name: "iTest KZ", url: "https://itest.kz" }]
  },
  {
    id: "ielts",
    title: "IELTS",
    desc: "English proficiency test for global study.",
    links: [{ name: "British Council", url: "https://takeielts.britishcouncil.org" }, { name: "Cambridge English", url: "https://www.cambridgeenglish.org" }],
    plan: "Month 1: Vocab expansion (Topics: Environment, Tech). Grammar polish.\nMonth 2: Writing Task 1 & 2 structures. Reading speed techniques (Skimming).\nMonth 3: Speaking practice daily. Full Listening mock tests.",
    freeTests: [{ name: "IELTS Liz", url: "https://ieltsliz.com" }, { name: "Mini-IELTS", url: "https://mini-ielts.com" }]
  },
  {
    id: "sat",
    title: "SAT",
    desc: "Standardized test for US admissions.",
    links: [{ name: "College Board", url: "https://collegeboard.org" }],
    plan: "Month 1: Khan Academy Math foundation. Master Algebra & Geometry.\nMonth 2: Reading & Writing: Grammar rules & Rhetorical analysis.\nMonth 3: Bluebook Digital SAT Practice Tests (Timed). Error analysis.",
    freeTests: [{ name: "Khan Academy SAT", url: "https://khanacademy.org/sat" }]
  },
  {
    id: "toefl",
    title: "TOEFL",
    desc: "Academic English test favored by US universities.",
    links: [{ name: "ETS TOEFL", url: "https://ets.org/toefl" }],
    plan: "Month 1: Academic vocabulary. Note-taking skills for Listening.\nMonth 2: Integrated Speaking tasks (listen-read-speak).\nMonth 3: Writing templates and full 3-hour mock exams.",
    freeTests: [{ name: "TST Prep", url: "https://tstprep.com" }]
  },
  {
    id: "hsk",
    title: "HSK",
    desc: "Chinese Proficiency Test.",
    links: [{ name: "Chinese Test", url: "http://www.chinesetest.cn" }],
    plan: "Month 1: Radicals and tones. First 150 characters (HSK 1-2).\nMonth 2: Grammar structures. Listening to slow podcasts.\nMonth 3: Writing characters from memory. Mock HSK tests.",
    freeTests: [{ name: "Mandarin Bean", url: "https://mandarinbean.com" }]
  },
  {
    id: "delf",
    title: "DELF/DALF",
    desc: "French language diploma.",
    links: [{ name: "France Education", url: "https://www.france-education-international.fr" }],
    plan: "Month 1: Conjugation (Présent, Passé Composé). Basic vocab.\nMonth 2: Listening to RFI Savoirs. Production Écrite (Essays).\nMonth 3: Speaking with a tutor. Sample papers.",
    freeTests: [{ name: "TV5Monde", url: "https://apprendre.tv5monde.com" }]
  }
];

export const APP_DB = {
  Universities: [
    {
      id: "nu_kz",
      name: "Nazarbayev University",
      country: "KZ",
      type: "Research",
      ranking: "#1 in Central Asia",
      qs_rank: "QS World 2026: #450-500",
      intl_students: "12%",
      acceptance_rate: "18%",
      videoUrl: "https://www.youtube.com/embed/P_6vDLqRYQw",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000",
      cost: 0,
      currency: "USD",
      requirements: { ielts: "6.5", sat: "1250+" },
      description: "The premier research university in Kazakhstan.",
      advice: "Focus on NUET Critical Thinking. Practice logic puzzles daily. Aim for IELTS 7.0+ to be safe.",
      grants: ["Abay Scholarship", "NU Merit"],
      programs: [
        {
          title: "Robotics & Mechatronics",
          rank: "Best in region",
          req_local: "NUET 150/200 + Math Subject",
          req_intl: "SAT 1400+, IELTS 7.0",
          career: "Tesla, Boston Dynamics ($80k/yr), Local Mining Tech ($3k/mo)"
        },
        {
          title: "Computer Science",
          rank: "Top 3 in KZ",
          req_local: "NUET 160/200",
          req_intl: "SAT 1450+, IELTS 7.0",
          career: "Google Zurich, Yandex, Kaspi.kz ($4k/mo start)"
        }
      ]
    },
    {
      id: "kbtu_kz",
      name: "KBTU",
      country: "KZ",
      type: "IT & Energy",
      ranking: "Top 5 KZ",
      qs_rank: "QS World 2026: #800+",
      intl_students: "5%",
      acceptance_rate: "35%",
      videoUrl: "https://www.youtube.com/embed/Z5yvVb9Zz_w",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000",
      cost: 4500,
      currency: "USD",
      requirements: { ielts: "5.5", ent: "120+" },
      description: "Leading technical university in Energy and IT.",
      advice: "Math is key. Review high school algebra and physics. Participation in Olympiads gives a huge advantage.",
      grants: ["Energy Scholarship", "IT Excellence"],
      programs: [
        {
          title: "Petroleum Engineering",
          rank: "#1 in KZ (Oil & Gas)",
          req_local: "ENT 125+ (Physics/Math)",
          req_intl: "Interview + Math Test",
          career: "TengizChevroil, Shell, NCOC ($5k/mo)"
        }
      ]
    },
    {
      id: "sorbonne_fr",
      name: "Sorbonne University",
      country: "FR",
      type: "Humanities",
      ranking: "Top 50 Global",
      qs_rank: "QS #59",
      intl_students: "22%",
      acceptance_rate: "16%",
      videoUrl: "https://www.youtube.com/embed/Hu7C_C-d6qU",
      image: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&q=80&w=1000",
      cost: 200,
      currency: "USD",
      requirements: { delf: "B2", gpa: "High" },
      description: "World-class university in Paris.",
      advice: "You need DELF B2 minimum. Focus on writing motivation letters in French.",
      grants: ["Eiffel", "CROUS"],
      programs: [
        {
          title: "History & Philosophy",
          rank: "#15 Global",
          req_local: "DALF C1, Excellent Essays",
          req_intl: "DALF C1",
          career: "UN, Diplomacy, Museums"
        }
      ]
    }
  ],

  Startups: [
    {
      id: "p1",
      title: "AgroTech Drone AI",
      problem: "Farmers in KZ lose 20% of crops due to inefficient irrigation.",
      solution: "AI-driven drone monitoring system that optimizes water usage.",
      budget: 15000,
      roles: ["CV Engineer", "Drone Pilot", "Agro-Expert"],
      contacts: { wa: "77011112233", tg: "agrotech_ceo", email: "ceo@agro.kz" },
      authorId: "u1"
    }
  ],

  SuccessStories: [
    {
      id: "s1",
      name: "Aliya K.",
      university: "MIT",
      major: "Physics",
      fullStory: `My journey to MIT began not in a high-tech lab, but in a small classroom in rural Kazakhstan. I was 14 when I first opened a physics textbook that changed my life. It wasn't just equations; it was a language that explained the universe. But loving physics and becoming a world-class physicist were two different things.

The first major hurdle was the lack of resources. My school didn't have advanced equipment. I remember simulating pendulum movements using potatoes and string in my backyard. When I decided to aim for the International Physics Olympiad (IPhO), people laughed. "That's for genius kids from big cities," they said. I took that as a challenge. I spent my summers solving problems from I.E. Irodov, staying up until 3 AM, fueled by tea and sheer stubbornness.

When I finally won Gold at the National Olympiad, I thought the hard part was over. I was wrong. Applying to US universities was a cultural shock. The SATs, the essays, the financial aid forms—it was a labyrinth. My SAT score stuck at 1350 for months. I felt defeated. I switched my strategy: instead of mindless drilling, I analyzed every single mistake. In two months, I jumped to 1520.

For my Common App essay, I didn't write about my medals. I wrote about teaching my younger brother physics using LEGOs. I wanted the admissions officers to see the person behind the scores—a girl who wanted to make science accessible.

Opening the acceptance letter from MIT was a blur. I remember screaming, my mom crying, and the realization that the potato pendulum in the backyard had swung all the way to Cambridge, Massachusetts. To anyone reading this: Your background doesn't define your limit. Your grit does.`,
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    },
    {
      id: "s2",
      name: "Sanzhar M.",
      university: "NU",
      major: "CS",
      fullStory: "I realized NUET is about logic, not memorization. I bought critical thinking books and practiced LSAT logic games daily. The interview was tough, but honesty about my projects saved me.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    }
  ],

  Mentors: [
    {
      id: "m1",
      name: "Dr. Sultan Bekbayev",
      role: "Professor",
      specialty: "Physics & Nazarbayev University",
      contact: "mailto:sultan@nu.edu.kz",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: "m2",
      name: "Aida Nurzhanova",
      role: "Admissions Counselor",
      specialty: "US Universities & Scholarships",
      contact: "mailto:aida@educon.kz",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: "m3",
      name: "Arman Suleimenov",
      role: "IELTS Coach",
      specialty: "English Preparation",
      contact: "mailto:arman@ieltsmaster.kz",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    }
  ],

  Users: [
     { 
       id: "u1", 
       name: "Arman Bolatov", 
       role: "Student", 
       bio: "CS student passionate about AI and education", 
       contacts: { whatsapp: "+770000000", email: "arman@example.com" },
       photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
     }
  ]
};