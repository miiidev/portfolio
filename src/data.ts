export interface Project {
  id: string | number;
  title: string;
  description: string;
  tags: string[];
  repo?: string;
  demo?: string;
  image?: string;
}

export interface Skill {
  name: string;
  icon: string;
  color: string;
}

export interface SkillGroup {
  domain: string;
  items: Skill[];
}

export interface ExperienceItem {
  period: string;
  title: string;
  org?: string;
  description: string;
  tags: string[];
}

export interface EducationItem {
  period: string;
  title: string;
  org: string;
  description: string;
}

export interface AchievementItem {
  year: string;
  title: string;
  description: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  bio: string;
  location: string;
  socials: {
    github: string;
    email: string;
    whatsapp?: string;
  };
  skills: SkillGroup[];
  formspreeId: string;
}

export const personalInfo: PersonalInfo = {
  name: "Ahmad Syahmi",
  role: "Software & AI Developer",
  bio: "I build AI-powered and security-focused applications, focusing on machine learning, computer vision, and real-time systems that solve practical problems.",
  location: "Malaysia",
  socials: {
    github: "https://github.com/miiidev",
    email: "ahmad.syahmi3211@gmail.com",
    whatsapp: "https://wa.me/60104246750",
  },
  skills: [
    {
      domain: "AI/ML & Data",
      items: [
        { name: "Python", icon: "python", color: "#3776AB" },
        { name: "PyTorch", icon: "pytorch", color: "#EE4C2C" },
      ],
    },
    {
      domain: "Frontend",
      items: [
        { name: "React", icon: "react", color: "#61DAFB" },
        { name: "TypeScript", icon: "typescript", color: "#3178C6" },
        { name: "Tailwind CSS", icon: "tailwindcss", color: "#10B981" },
        { name: "Next.js", icon: "nextdotjs", color: "#FFFFFF" },
        { name: "Framer Motion", icon: "framer", color: "#EF0076" },
      ],
    },
    {
      domain: "Tools & Backend",
      items: [
        { name: "Node.js", icon: "nodedotjs", color: "#5FA04E" },
        { name: "Git", icon: "git", color: "#F05032" },
        { name: "Vite", icon: "vite", color: "#646CFF" },
      ],
    },
  ],
  formspreeId: "mnjkyepw",
};

export const experience: ExperienceItem[] = [
  {
    period: "Now",
    title: "Programming Tutor",
    description: "Teaching Java to beginners, which keeps my fundamentals sharp and my communication clear.",
    tags: ["Java"],
  },
];

export const education: EducationItem[] = [
  {
    period: "Jul 2025 - Jun 2026",
    title: "Foundation in Computer Science",
    org: "Centre for Foundation Studies, IIUM",
    description: "• 4.00 CGPA",
  },
  {
    period: "2020 - 2024",
    title: "Secondary School",
    org: "SMK Bandar Tasik Puteri",
    description: "• 9A SPM",
  },
];

export const achievements: AchievementItem[] = [
  {
    year: "2023",
    title: "3rd Place, Pertandingan Pembangunan Aplikasi Android",
    description: "My team built an Android app, CourseFit, from scratch and placed 3rd in a state-level competition.",
  },
];

export const githubFallback = {
  publicRepos: 24,
  topLanguages: ["Python", "TypeScript", "JavaScript"],
  lastPush: null,
};

export const projects: Project[] = [
  {
    id: 1,
    title: "autoteambuild",
    description: "Pokémon VGC team builder with RL-powered optimization.",
    tags: ["React", "Tailwind", "Python", "TypeScript"],
    repo: "https://github.com/miiidev/autoteambuild",
    demo: "https://autoteambuild.my",
    image: "/portfolio/assets/projects/autoteambuild.png"
  },
  {
    id: 2,
    title: "rikugan",
    description: "Local, offline deepfake video detection tool.",
    tags: ["React", "Tailwind", "Python", "TypeScript", "PyTorch"],
    repo: "https://github.com/miiidev/rikugan",
    image: "/portfolio/assets/projects/rikugan.png"
  },
  {
    id: 3,
    title: "LAWCATOR",
    description: "A lightweight static web application for discovering lawyers and law firms in Malaysia.",
    tags: ["JavaScript", "HTML", "CSS"],
    repo: "https://github.com/miiidev/LAWCATOR",
    demo: "https://lawcator.vercel.app",
    image: "/portfolio/assets/projects/lawcator.png"
  },
];