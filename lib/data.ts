// ─── Portfolio data — synced from GitHub (manikantbindass) & LinkedIn ────────

export const personal = {
  name: "Manikant Kumar",
  handle: "manikantbindass",
  role: "AI-Augmented Full Stack Developer",
  roles: [
    "AI-Augmented Full Stack Developer",
    "Blockchain Smart Contract Developer",
    "System Design Engineer",
    "Agentic AI Builder",
    "Backend Engineer",
    "Web3 Innovator",
  ],
  tagline:
    "Forward Deployed Engineer candidate building AI-powered full-stack applications, scalable microservices, and enterprise-grade backend systems — combining system design, algorithms, and engineering discipline.",
  bio: "Pursuing B.Tech in Computer Science (Blockchain Technology) with hands-on experience developing AI-powered and full-stack applications using Python, Java, React.js, Node.js, FastAPI, and PostgreSQL. Strong foundation in Data Structures, Algorithms, Distributed Systems, REST API development, Microservices, and System Design. Passionate about solving customer-facing engineering challenges, integrating enterprise APIs, debugging production systems, and delivering scalable software solutions.",
  email: "manikant.dev.ai@gmail.com",
  location: "Vadodara, Gujarat, India",
  university: "Parul Institute of Engineering and Technology",
  degree: "B.Tech CSE (Blockchain Technology)",
  period: "2023 – 2027",
  available: true,
  links: {
    github: "https://github.com/manikantbindass",
    linkedin: "https://www.linkedin.com/in/manikantbindass/",
    twitter: "https://x.com/manikantbindass",
    leetcode: "https://leetcode.com/u/manikantbindass/",
    medium: "https://medium.com/@manikant.ai",
    instagram: "https://www.instagram.com/manikantbindass/",
    youtube: "https://www.youtube.com/@RootEDSigma",
    linktree: "https://linktr.ee/manikantbindass",
  },
};

import snapshot from "./stats-snapshot.json";
export const stats = {
  leetcode: { ...snapshot.leetcode, ranking: "See verified profile" },
  github: { ...snapshot.github },
  hackathons: 1,
  projects: 16,
};

export { projects } from "./projects";

export const skills = {
  frontend: [
    { name: "Next.js", icon: "SiNextdotjs" },
    { name: "React", icon: "SiReact" },
    { name: "TypeScript", icon: "SiTypescript" },
    { name: "TailwindCSS", icon: "SiTailwindcss" },
    { name: "Three.js", icon: "SiThreedotjs" },
  ],
  backend: [
    { name: "Node.js", icon: "SiNodedotjs" },
    { name: "Python", icon: "SiPython" },
    { name: "Java", icon: "SiJava" },
    { name: "Spring Boot", icon: "SiSpringboot" },
    { name: "FastAPI", icon: "SiFastapi" },
  ],
  aiml: [
    { name: "LangChain", icon: "SiLangchain" },
    { name: "OpenAI", icon: "SiOpenai" },
    { name: "PyTorch", icon: "SiPytorch" },
    { name: "LangGraph", icon: "SiLangchain" },
    { name: "CrewAI", icon: "SiPython" },
  ],
  blockchain: [
    { name: "Solidity", icon: "SiSolidity" },
    { name: "Ethereum", icon: "SiEthereum" },
    { name: "Web3.js", icon: "SiWeb3Dotjs" },
    { name: "IPFS", icon: "SiIpfs" },
    { name: "Hardhat", icon: "SiEthereum" },
  ],
  devops: [
    { name: "Docker", icon: "SiDocker" },
    { name: "Kubernetes", icon: "SiKubernetes" },
    { name: "AWS", icon: "SiAmazonaws" },
    { name: "Git", icon: "SiGit" },
    { name: "CI/CD", icon: "SiGithubactions" },
  ],
};

export const marqueeItems = [
  "Next.js",
  "TypeScript",
  "React",
  "Python",
  "LangChain",
  "Solidity",
  "Node.js",
  "OpenAI",
  "TailwindCSS",
  "Three.js",
  "Ethereum",
  "FastAPI",
  "Docker",
  "Kubernetes",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Pinecone",
  "IPFS",
  "PyTorch",
  "Hardhat",
  "Spring Boot",
  "Java",
  "LangGraph",
  "CrewAI",
  "AutoGen",
  "Vercel",
  "Web3.js",
  "MLflow",
  "FAISS",
  "LlamaIndex",
  "TensorFlow",
  "scikit-learn",
  "Vue.js",
];

export const experience = [
  {
    role: "Lab Tech Support",
    company: "CV Raman Center, Parul University",
    period: "Feb 2026 – Mar 2026",
    desc: "Managed infrastructure supporting 3000+ systems during GATE and JAM examinations. Configured domains, networks and systems ensuring reliable and uninterrupted operations at scale.",
  },
  {
    role: "IT Intern — System Support Cell",
    company: "Parul University",
    period: "Sept 2025 – Feb 2026",
    desc: "Maintained university IT infrastructure and enterprise devices. Supported networking, troubleshooting and deployment activities across campus systems.",
  },
  {
    role: "Full Stack Developer (Projects)",
    company: "Freelance / Open Source",
    period: "2023 – Present",
    desc: "Building AI-powered applications and full-stack systems using FastAPI, Node.js, PostgreSQL, React.js, and LangChain. Designed microservices architectures with event-driven workflows (Kafka, Redis) and RAG-based document intelligence platforms.",
  },
  {
    role: "B.Tech CSE — Blockchain Technology",
    company: "Parul Institute of Engineering and Technology",
    period: "2023 – 2027",
    desc: "Specialization in blockchain technology, distributed systems, AI/ML, and software engineering fundamentals. CGPA: 7.49. Active in competitive programming (LeetCode, Codeforces, CodeChef, HackerRank).",
  },
];

export const certifications = [
  {
    title: "Introduction to IoT",
    issuer: "Cisco",
    date: "Feb 2025",
    emoji: "🌐",
  },
  {
    title: "Computer Network and Internet Protocols",
    issuer: "NPTEL",
    date: "June 2025",
    emoji: "🔗",
  },
  {
    title: "Artificial Intelligence: Concepts and Techniques",
    issuer: "NPTEL",
    date: "Nov 2025",
    emoji: "🤖",
  },
  {
    title: "Blockchain and its Applications",
    issuer: "NPTEL",
    date: "May 2026",
    emoji: "⛓️",
  },
];
