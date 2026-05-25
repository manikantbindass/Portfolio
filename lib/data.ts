// ─── Static content for the portfolio ───────────────────────────────────────
export const personal = {
  name:       "Manikant Kumar",
  handle:     "Manikant Kumar",
  role:       "AI Engineer",
  roles:      ["AI Engineer", "Full Stack Developer", "Blockchain Builder", "Problem Solver", "Web3 Innovator"],
  tagline:    "I build scalable AI-powered products, high-performance systems, and modern web experiences.",
  email:      "manikant.dev.ai@gmail.com",
  location:   "India",
  university: "Parul University",
  degree:     "B.Tech CSE (Blockchain Technology)",
  available:  true,
  links: {
    github:    "https://github.com/manikantbindass",
    linkedin:  "https://www.linkedin.com/in/manikantbindass/",
    twitter:   "https://x.com/ManikantBindass",
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
    repos:       18,
    stars:       12,
    commits:     400,
    prs:         24,
  },
  hackathons: 5,
  projects:   10,
};

export const projects = [
  {
    id: "metarole",
    title:       "MetaRole.AI",
    emoji:       "🤖",
    description: "AI-powered career co-pilot that analyzes your skills, predicts future opportunities, and guides you with a clear roadmap — automatically building your portfolio and optimizing your resume.",
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
    id: "solguard",
    title:       "SolGuard AI",
    emoji:       "🛡️",
    description: "AI-powered smart contract auditing platform using LLMs and deep learning to detect vulnerabilities, classify risks, suggest secure patches, and optimize gas usage.",
    tags:        ["Python", "LangChain", "Solidity", "FastAPI", "OpenAI"],
    github:      "https://github.com/manikantbindass/SolGuardAI-An-AI-Powered-Blockchain-Smart-Contract-",
    live:        null,
    gradient:    "from-rose-600/20 via-orange-600/10 to-gold/10",
    featured:    true,
  },
  {
    id: "autoledger",
    title:       "AutoLedger AI",
    emoji:       "🔗",
    description: "Self-healing blockchain network powered by reinforcement learning agents that detect malicious nodes and dynamically adjust consensus parameters using adaptive trust scoring.",
    tags:        ["Python", "Reinforcement Learning", "Blockchain", "TensorFlow"],
    github:      "https://github.com/manikantbindass/AutoLedgerAI-Self-healing-blockchain-network-using-reinforcement-learning",
    live:        null,
    gradient:    "from-accent/20 via-violet/10 to-teal/10",
    featured:    false,
  },
  {
    id: "dsa",
    title:       "DSA Mastersheet",
    emoji:       "📚",
    description: "A comprehensive DSA roadmap from Beginner to Advanced — covering all major data structures and algorithms for FAANG-level interview preparation.",
    tags:        ["Java", "Algorithms", "Data Structures"],
    github:      "https://github.com/manikantbindass/DSA-Preparation-FAANG-",
    live:        null,
    gradient:    "from-gold/20 via-amber-600/10 to-rose/10",
    featured:    false,
  },
];

export const skills = {
  frontend: [
    { name: "Next.js",       icon: "SiNextdotjs",     level: 92 },
    { name: "React",         icon: "SiReact",         level: 90 },
    { name: "TypeScript",    icon: "SiTypescript",    level: 88 },
    { name: "TailwindCSS",   icon: "SiTailwindcss",   level: 90 },
    { name: "Framer Motion", icon: "SiFramer",        level: 80 },
  ],
  backend: [
    { name: "Node.js",    icon: "SiNodedotjs",    level: 85 },
    { name: "Python",     icon: "SiPython",       level: 83 },
    { name: "PostgreSQL", icon: "SiPostgresql",   level: 78 },
    { name: "MongoDB",    icon: "SiMongodb",      level: 76 },
    { name: "Supabase",   icon: "SiSupabase",     level: 80 },
  ],
  aiml: [
    { name: "LangChain", icon: "SiLangchain",  level: 85 },
    { name: "OpenAI",    icon: "SiOpenai",     level: 88 },
    { name: "Gemini",    icon: "SiGoogle",     level: 80 },
    { name: "Pinecone",  icon: "SiPinecone",   level: 75 },
    { name: "PyTorch",   icon: "SiPytorch",    level: 70 },
  ],
  blockchain: [
    { name: "Solidity",  icon: "SiSolidity",  level: 82 },
    { name: "Ethereum",  icon: "SiEthereum",  level: 80 },
    { name: "Web3.js",   icon: "SiWeb3Dotjs", level: 78 },
    { name: "IPFS",      icon: "SiIpfs",      level: 72 },
    { name: "Hardhat",   icon: "SiEthereum",  level: 75 },
  ],
  devops: [
    { name: "Docker",  icon: "SiDocker",  level: 78 },
    { name: "AWS",     icon: "SiAmazonaws", level: 70 },
    { name: "Vercel",  icon: "SiVercel",  level: 90 },
    { name: "Git",     icon: "SiGit",     level: 92 },
    { name: "CI/CD",   icon: "SiGithubactions", level: 75 },
  ],
};

export const marqueeItems = [
  "Next.js", "TypeScript", "React", "Python", "LangChain", "Solidity", "Node.js",
  "OpenAI", "TailwindCSS", "Framer Motion", "Ethereum", "Supabase", "Docker",
  "PostgreSQL", "AWS", "Pinecone", "IPFS", "Gemini", "PyTorch", "Hardhat",
  "MongoDB", "Vercel", "GraphQL", "GSAP", "Web3.js",
];

export const experience = [
  {
    role:     "AI & Blockchain Developer",
    company:  "Freelance / Projects",
    period:   "2023 – Present",
    desc:     "Building AI-powered and blockchain applications. Focus on LLM integration, smart contract development, and full-stack web3 systems.",
  },
  {
    role:     "B.Tech CSE — Blockchain Technology",
    company:  "Parul University",
    period:   "2022 – 2026",
    desc:     "Specialization in blockchain technology, distributed systems, AI/ML, and software engineering fundamentals.",
  },
];

export const certifications = [
  { title: "Ethereum Developer Bootcamp",       issuer: "Alchemy",      year: 2024, emoji: "🏆" },
  { title: "Solidity Smart Contract Security",  issuer: "OpenZeppelin",  year: 2024, emoji: "🛡️" },
  { title: "LangChain & LLM Development",       issuer: "DeepLearning.AI", year: 2024, emoji: "🤖" },
  { title: "AWS Cloud Practitioner",            issuer: "Amazon AWS",    year: 2023, emoji: "☁️" },
  { title: "Full Stack Web Development",        issuer: "Meta",          year: 2023, emoji: "💻" },
];
