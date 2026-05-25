// ─── Portfolio data — synced from GitHub (manikantbindass) & LinkedIn ────────

export const personal = {
  name:       "Manikant Kumar",
  handle:     "manikantbindass",
  role:       "AI-Augmented Full Stack Developer",
  roles:      [
    "AI-Augmented Full Stack Developer",
    "Blockchain Smart Contract Developer",
    "System Design Engineer",
    "Agentic AI Builder",
    "Backend Engineer",
    "Web3 Innovator",
  ],
  tagline:    "Building scalable AI-powered products, blockchain systems, and high-performance backends — combining mathematics, coding discipline, and system design thinking.",
  bio:        "A tech enthusiast from India exploring AI, Blockchain, Deep Learning, Neural Networks, LLMs, RAG systems, and Agentic AI. I solve complex problems by combining mathematics, coding discipline, and system design thinking to build scalable solutions.",
  email:      "manikant.dev.ai@gmail.com",
  location:   "Ahmedabad, India",
  university: "Parul University",
  degree:     "B.Tech CSE (Blockchain Technology)",
  period:     "2022 – 2026",
  available:  true,
  links: {
    github:    "https://github.com/manikantbindass",
    linkedin:  "https://www.linkedin.com/in/manikantbindass/",
    twitter:   "https://x.com/manikantbindass",
    leetcode:  "https://leetcode.com/u/manikantbindass/",
    medium:    "https://medium.com/@manikant.ai",
    instagram: "https://www.instagram.com/manikantbindass/",
    youtube:   "https://www.youtube.com/@RootEDSigma",
    linktree:  "https://linktr.ee/manikantbindass",
  },
};

export const stats = {
  leetcode: {
    total:   135,
    easy:    52,
    medium:  68,
    hard:    15,
    rating:  1620,
    ranking: "Top 20%",
  },
  github: {
    repos:       239,   // public_repos from GitHub API
    stars:       12,
    commits:     900,
    prs:         40,
    followers:   44,
  },
  hackathons: 5,
  projects:   20,
};

export const projects = [
  {
    id: "metarole",
    title:       "MetaRole.AI",
    emoji:       "🤖",
    description: "AI-powered career co-pilot that analyzes skills, predicts future opportunities, and guides with a clear roadmap — automatically building portfolio and optimizing resume to land the right job without guesswork.",
    tags:        ["Next.js", "LangChain", "OpenAI", "TypeScript", "Supabase"],
    github:      "https://github.com/manikantbindass/MetaRole.ai",
    live:        "https://meta-role-ai.vercel.app",
    gradient:    "from-violet-600/20 via-accent/10 to-teal-500/10",
    featured:    true,
  },
  {
    id: "securerx",
    title:       "SecureRxChain",
    emoji:       "💊",
    description: "Blockchain-powered drug supply chain platform preventing counterfeit medicines with end-to-end batch traceability, QR verification, and AI-based anomaly detection.",
    tags:        ["Ethereum", "Solidity", "Web3.js", "React", "IPFS"],
    github:      "https://github.com/manikantbindass/SecureRxChain-Blockchain-Based-Drug-Supply-Chain-Counterfeit-Medicine-Prevention-System",
    live:        "https://securerxchain.vercel.app",
    gradient:    "from-teal-600/20 via-green-600/10 to-accent/10",
    featured:    true,
  },
  {
    id: "intramind",
    title:       "Intramind.AI",
    emoji:       "🧠",
    description: "AI-powered enterprise knowledge base with RAG, LangChain, secure team workspaces, semantic search, and cloud-native deployment.",
    tags:        ["LangChain", "RAG", "TypeScript", "Pinecone", "FastAPI"],
    github:      "https://github.com/manikantbindass/Intramind.ai",
    live:        null,
    gradient:    "from-blue-600/20 via-indigo-600/10 to-accent/10",
    featured:    true,
  },
  {
    id: "rdpbrowser",
    title:       "RemoteShield X",
    emoji:       "🛡️",
    description: "Enterprise secure remote work browser for Win/Linux/macOS/Android with WireGuard VPN, static IP, Tauri + Flutter, admin dashboard, and tamper-resistant design.",
    tags:        ["Tauri", "Flutter", "Node.js", "WireGuard", "Docker"],
    github:      "https://github.com/manikantbindass/RdPBrowser",
    live:        null,
    gradient:    "from-rose-600/20 via-orange-600/10 to-gold/10",
    featured:    true,
  },
  {
    id: "tracehunt",
    title:       "TraceHunt AI",
    emoji:       "🔍",
    description: "AI-powered observability platform for API monitoring, log intelligence, anomaly detection, and automated root cause analysis.",
    tags:        ["Python", "FastAPI", "LLMs", "OpenAI", "TypeScript"],
    github:      "https://github.com/manikantbindass/Tracehunt",
    live:        null,
    gradient:    "from-accent/20 via-violet/10 to-teal/10",
    featured:    false,
  },
  {
    id: "solguard",
    title:       "SolGuard AI",
    emoji:       "🔒",
    description: "AI-powered smart contract auditing platform using LLMs and deep learning to detect vulnerabilities, classify risks, suggest secure patches, and optimize gas usage.",
    tags:        ["Python", "LangChain", "Solidity", "FastAPI", "OpenAI"],
    github:      "https://github.com/manikantbindass/SolGuardAI-An-AI-Powered-Blockchain-Smart-Contract-",
    live:        null,
    gradient:    "from-yellow-600/20 via-amber-600/10 to-orange-600/10",
    featured:    false,
  },
  {
    id: "autoledger",
    title:       "AutoLedger AI",
    emoji:       "🔗",
    description: "Self-healing blockchain network powered by reinforcement learning agents that detect malicious nodes and dynamically adjust consensus parameters using adaptive trust scoring.",
    tags:        ["Python", "Reinforcement Learning", "Blockchain", "TensorFlow"],
    github:      "https://github.com/manikantbindass/AutoLedgerAI-Self-healing-blockchain-network-using-reinforcement-learning",
    live:        null,
    gradient:    "from-teal/20 via-green-600/10 to-accent/10",
    featured:    false,
  },
  {
    id: "dsa",
    title:       "DSA Mastersheet",
    emoji:       "📚",
    description: "A complete DSA roadmap from Beginner to Advanced — covering all major data structures and algorithms for FAANG-level interview preparation in Java, C++, and Python.",
    tags:        ["Java", "C++", "Python", "Algorithms", "Data Structures"],
    github:      "https://github.com/manikantbindass/DSA-Preparation-FAANG-",
    live:        null,
    gradient:    "from-gold/20 via-amber-600/10 to-rose/10",
    featured:    false,
  },
];

export const skills = {
  frontend: [
    { name: "Next.js",       icon: "SiNextdotjs",   level: 92 },
    { name: "React",         icon: "SiReact",        level: 90 },
    { name: "TypeScript",    icon: "SiTypescript",   level: 88 },
    { name: "TailwindCSS",   icon: "SiTailwindcss",  level: 90 },
    { name: "Three.js",      icon: "SiThreedotjs",   level: 72 },
  ],
  backend: [
    { name: "Node.js",       icon: "SiNodedotjs",    level: 88 },
    { name: "Python",        icon: "SiPython",       level: 88 },
    { name: "Java",          icon: "SiJava",         level: 85 },
    { name: "Spring Boot",   icon: "SiSpringboot",   level: 80 },
    { name: "FastAPI",       icon: "SiFastapi",      level: 82 },
  ],
  aiml: [
    { name: "LangChain",     icon: "SiLangchain",    level: 88 },
    { name: "OpenAI",        icon: "SiOpenai",       level: 90 },
    { name: "PyTorch",       icon: "SiPytorch",      level: 78 },
    { name: "LangGraph",     icon: "SiLangchain",    level: 80 },
    { name: "CrewAI",        icon: "SiPython",       level: 75 },
  ],
  blockchain: [
    { name: "Solidity",      icon: "SiSolidity",     level: 85 },
    { name: "Ethereum",      icon: "SiEthereum",     level: 83 },
    { name: "Web3.js",       icon: "SiWeb3Dotjs",    level: 80 },
    { name: "IPFS",          icon: "SiIpfs",         level: 72 },
    { name: "Hardhat",       icon: "SiEthereum",     level: 78 },
  ],
  devops: [
    { name: "Docker",        icon: "SiDocker",       level: 82 },
    { name: "Kubernetes",    icon: "SiKubernetes",   level: 72 },
    { name: "AWS",           icon: "SiAmazonaws",    level: 75 },
    { name: "Git",           icon: "SiGit",          level: 94 },
    { name: "CI/CD",         icon: "SiGithubactions",level: 78 },
  ],
};

export const marqueeItems = [
  "Next.js", "TypeScript", "React", "Python", "LangChain", "Solidity", "Node.js",
  "OpenAI", "TailwindCSS", "Three.js", "Ethereum", "FastAPI", "Docker", "Kubernetes",
  "PostgreSQL", "MongoDB", "AWS", "Pinecone", "IPFS", "PyTorch", "Hardhat",
  "Spring Boot", "Java", "LangGraph", "CrewAI", "AutoGen", "Vercel", "Web3.js",
  "MLflow", "FAISS", "LlamaIndex", "TensorFlow", "scikit-learn", "Vue.js",
];

export const experience = [
  {
    role:     "AI-Augmented Full Stack Developer",
    company:  "Freelance / Open Source",
    period:   "2023 – Present",
    desc:     "Building AI-powered RAG systems, agentic AI pipelines, blockchain smart contracts, and full-stack web applications. Focus on LLM integration (OpenAI, Anthropic, Gemini), LangChain, LangGraph, system design, and scalable backend engineering.",
  },
  {
    role:     "B.Tech CSE — Blockchain Technology",
    company:  "Parul University, Ahmedabad",
    period:   "2022 – 2026",
    desc:     "Specialization in blockchain technology, distributed systems, AI/ML, deep learning, neural networks, and software engineering fundamentals. Active in competitive programming (Codeforces, LeetCode) and hackathons.",
  },
];

export const certifications = [
  { title: "Ethereum Developer Bootcamp",       issuer: "Alchemy",         year: 2024, emoji: "🏆" },
  { title: "Solidity Smart Contract Security",  issuer: "OpenZeppelin",    year: 2024, emoji: "🛡️" },
  { title: "LangChain & LLM Development",       issuer: "DeepLearning.AI", year: 2024, emoji: "🤖" },
  { title: "AWS Cloud Practitioner",            issuer: "Amazon AWS",      year: 2023, emoji: "☁️" },
  { title: "Full Stack Web Development",        issuer: "Meta",            year: 2023, emoji: "💻" },
];
