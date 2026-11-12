/* ============================================================
   EDIT THIS FILE to change your content. No coding needed.
   (Content below comes from your CV.)
   ============================================================ */
window.SITE = {
  name: "Uzzal Biswas",
  email: "shujjol27@gmail.com",
  phone: "01827279076",
  phoneIntl: "+8801827279076",

  /* "View Resume" modal & CV file. Put your public CV in /assets and set its name here. */
  cvFile: "assets/Uzzal_Biswas_CV.pdf",

  /* ---------- CONTACT FORM ----------
     Option A (easiest, free, works on GitHub Pages):
       1. Go to https://web3forms.com , enter your email, get an Access Key.
       2. Paste the key below. Messages will arrive in your inbox.
     Option B: run the Node backend in /backend and put its URL in apiUrl,
       e.g. "https://your-backend.onrender.com/api/contact"
     If both are empty, the form opens the visitor's email app instead. */
  contact: {
    web3formsKey: "",
    apiUrl: ""
  },

  /* ---------- SOCIAL LINKS (empty = hidden) ---------- */
  socials: {
    github: "https://github.com/ubwasi",
    linkedin: "",          // paste your LinkedIn profile URL here
    facebook: "",
    whatsapp: "https://wa.me/8801827279076"
  },

  /* ---------- TECH CHIPS (also scroll in the marquee) ---------- */
  core: ["Flutter", "Dart", "MVVM", "Clean Architecture", "Provider", "Bloc", "REST API",
         "Firebase", "Firestore", "Hive", "SQLite / Sqflite", "Google ML Kit",
         "Retrofit", "Kotlin", "Java", "Git & GitHub"],

  soft: ["Collaboration", "Problem Solving", "Accountability"],
  extra: ["Intra-University Programming Contest", "100+ algorithm problems solved", "Cricket tournaments"],

  /* ---------- SKILL CARDS (levels as written in your CV) ---------- */
  skillCards: [
    { icon: "📱", title: "Flutter Development (Dart)", level: "Intermediate",
      text: "Cross-platform apps, Provider & Bloc, Firebase, REST APIs, Material UI design." },
    { icon: "🤖", title: "Android Native (Java, Kotlin)", level: "Intermediate",
      text: "Firebase, SQLite, Retrofit, MVVM." },
    { icon: "🧩", title: "Programming", level: "Intermediate",
      text: "Problem-solving, 100+ algorithm problems solved." },
    { icon: "🗄️", title: "Others", level: "Beginner",
      text: "RDBMS management." }
  ],

  /* dots = 0 to 5 (from your CV) */
  programming: [
    { name: "Dart",   dots: 4 },
    { name: "C",      dots: 3 },
    { name: "Java",   dots: 4 },
    { name: "Kotlin", dots: 4 },
    { name: "Python", dots: 2 }
  ],
  spoken: [
    { name: "English", dots: 3 },
    { name: "Bengali", dots: 5 }
  ],

  /* ---------- EXPERIENCE ---------- */
  experience: [
    { role: "Flutter Developer", org: "Sohojware IT, Barishal", date: "Jan 2025 – Present",
      points: [
        "Developed and maintained scalable Flutter applications using MVVM and clean architecture.",
        "Implemented Provider and Bloc state management and integrated REST APIs and Firebase services.",
        "Designed responsive, offline-first UIs using SQLite for efficient local data handling and smooth performance."
      ] },
    { role: "Application Development", org: "Core qualification", date: "2024 – Present",
      points: [
        "Flutter, Dart and Android development.",
        "MVVM, clean architecture, Firebase backend, REST APIs, state management and local storage."
      ] }
  ],

  /* ---------- EDUCATION ---------- */
  education: [
    { title: "Bachelor of Science in Computer Science", org: "University of Global Village (UGV), Barishal", date: "Summer 2023 – Present" },
    { title: "Android Development (Industrial Attachment)", org: "Creative IT Institute, Dhanmondi, Dhaka", date: "Oct 2022 – Jan 2024",
      note: "Successfully completed the Industrial Attachment in Android Development." },
    { title: "Diploma in Computer Science & Engineering", org: "Infra Polytechnic Institute, Barishal", date: "2018 – 2022",
      note: "GPA 3.72 out of 4.00." },
    { title: "SSC (Science)", org: "Allankerkathi M.R High School, Pirojpur", date: "2013 – 2018",
      note: "GPA 3.33 out of 5.00." }
  ],

  /* ---------- PROJECT FILTERS ---------- */
  filters: [
    { key: "all",      label: "All" },
    { key: "ecom",     label: "E-commerce" },
    { key: "api",      label: "REST API" },
    { key: "firebase", label: "Firebase" },
    { key: "local",    label: "Local DB" },
    { key: "more",     label: "ML & more" }
  ],

  /* ---------- PROJECTS ----------
     cat: one of the filter keys above. image: optional screenshot, e.g. "assets/afrikart.jpg"
     code: GitHub link (button hidden when empty). live: demo link (hidden when empty). */
  projects: [
    { title: "Afrikart", subtitle: "E-Commerce App", cat: "ecom", emoji: "🛍️", color: "violet", date: "Ongoing",
      short: "Full e-commerce app with login, products, cart and order placement.",
      description: "An e-commerce Flutter app powered by RESTful APIs, from sign-in to checkout.",
      highlights: ["User authentication", "Product browsing and product details", "Cart management and order placement", "Secure API integration with a responsive Material UI", "Real-time product and order data fetching"],
      tags: ["Flutter", "REST API", "Authentication", "Material UI"], role: "Flutter Developer", live: "", code: "", image: "" },

    { title: "Gift N Gadget BD", subtitle: "E-Commerce App", cat: "ecom", emoji: "🎁", color: "pink", date: "",
      short: "E-commerce app for gifts and gadgets in Bangladesh.",
      description: "A Flutter e-commerce app for browsing and buying gifts and gadgets. The full source code is on GitHub.",
      highlights: [],
      tags: ["Flutter", "E-commerce", "Dart"], role: "Flutter Developer", live: "", code: "https://github.com/ubwasi/gift_n_gadget_bd", image: "" },

    { title: "Real-time Chat App", subtitle: "Firebase Messaging", cat: "firebase", emoji: "💬", color: "blue", date: "Sep 2026",
      short: "Instant messaging with Firebase Auth, Firestore and live presence.",
      description: "A real-time Flutter chat application using Firebase Firestore and Firebase Authentication.",
      highlights: ["Secure user login with Firebase Authentication", "Instant message sync with real-time data streaming", "User presence status", "Clean, responsive Material UI"],
      tags: ["Flutter", "Firebase Auth", "Firestore", "Real-time"], role: "Flutter Developer", live: "", code: "", image: "" },

    { title: "Water Reminder", subtitle: "Offline-first Health App", cat: "local", emoji: "💧", color: "teal", date: "Aug 2026",
      short: "Track daily water intake with timely reminder notifications.",
      description: "A Flutter water reminder app that uses Hive for local storage.",
      highlights: ["Tracks daily water intake", "Timely notifications with customizable reminder schedules", "Offline-first architecture", "Clean, responsive Material UI"],
      tags: ["Flutter", "Hive", "Notifications", "Offline-first"], role: "Flutter Developer", live: "", code: "", image: "" },

    { title: "Doctor Apps", subtitle: "Appointment Booking", cat: "api", emoji: "🩺", color: "blue", date: "Jan 2026",
      short: "Patients log in, view doctor profiles and book appointments.",
      description: "A Flutter app for patients to find doctors and book appointments, powered by RESTful APIs.",
      highlights: ["Patient login and sign-up using RESTful APIs", "Doctor profiles and appointment booking", "Secure API integration", "Real-time data fetching for doctor information"],
      tags: ["Flutter", "REST API", "Authentication", "Booking"], role: "Flutter Developer", live: "", code: "", image: "" },

    { title: "Period Tracker", subtitle: "Cycle Logging & Prediction", cat: "local", emoji: "🌸", color: "pink", date: "Dec 2025",
      short: "Log and predict menstrual cycles with smart notifications.",
      description: "A Flutter period tracker that uses Hive for local data storage.",
      highlights: ["Logs and predicts menstrual cycles", "Notification alerts for upcoming cycles", "Offline-first architecture", "Clean, responsive Material UI"],
      tags: ["Flutter", "Hive", "Notifications", "Offline-first"], role: "Flutter Developer", live: "", code: "https://github.com/ubwasi/period_tracker", image: "" },

    { title: "Todo App", subtitle: "SQLite Task Manager", cat: "local", emoji: "✅", color: "amber", date: "",
      short: "Fast to-do app with tasks stored locally using Sqflite.",
      description: "A Flutter to-do application that stores tasks in a local SQLite database using Sqflite, so it works offline and loads instantly.",
      highlights: [],
      tags: ["Flutter", "Sqflite", "SQLite", "Offline"], role: "Flutter Developer", live: "", code: "", image: "" },

    { title: "Demo Authentication", subtitle: "REST API Login Flow", cat: "api", emoji: "🔐", color: "violet", date: "",
      short: "Authentication flow built on a REST API.",
      description: "A Flutter project demonstrating an authentication flow using a REST API. The source code is on GitHub.",
      highlights: [],
      tags: ["Flutter", "REST API", "Authentication"], role: "Flutter Developer", live: "", code: "https://github.com/ubwasi/demoAuthentication", image: "" },

    { title: "Language Translator", subtitle: "Google ML Kit", cat: "more", emoji: "🌐", color: "teal", date: "",
      short: "Translate text between languages using Google ML Kit.",
      description: "A Flutter translator app built with Google ML Kit for translating text between languages.",
      highlights: [],
      tags: ["Flutter", "Google ML Kit", "Translation"], role: "Flutter Developer", live: "", code: "", image: "" },

    { title: "Anglica Fitness", subtitle: "Workout & Progress Tracking", cat: "more", emoji: "🏋️", color: "amber", date: "Aug 2025",
      short: "Workout plans, progress tracking and an interactive UI.",
      description: "A fitness app for Android and iOS.",
      highlights: ["Workout plans", "Progress tracking", "Interactive UI for Android and iOS"],
      tags: ["Flutter", "Android", "iOS", "Fitness"], role: "Flutter Developer", live: "", code: "", image: "" },

    { title: "Tourist Bangladesh", subtitle: "Native Android", cat: "more", emoji: "🗺️", color: "blue", date: "Mar 2024",
      short: "Tourism app with location-based recommendations.",
      description: "A native Android tourism solution that simplifies travel with location-based recommendations.",
      highlights: [],
      tags: ["Android", "Java / Kotlin", "Location"], role: "Android Developer", live: "", code: "", image: "" }
  ]
};
