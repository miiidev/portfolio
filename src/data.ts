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

export interface PersonalInfo {
  name: string;
  role: string;
  bio: string;
  location: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
    whatsapp?: string;
    x?: string;
  };
  skills: Skill[];
  formspreeId: string;
}

export const personalInfo: PersonalInfo = {
  name: "Ahmad Syahmi",
  role: "Software & AI Developer",
  bio: "I build AI-powered and security-focused applications, focusing on machine learning, computer vision, and real-time systems that solve practical problems.",
  location: "Malaysia",
  socials: {
    github: "https://github.com/miiidev",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "mailto:ahmad.syahmi3211@gmail.com",
    whatsapp: "https://wa.me/60104246750",
    x: "https://x.com/yourusername",
  },
  skills: [
    { name: "React",        icon: "react",      color: "#61DAFB" },
    { name: "TypeScript",   icon: "typescript",  color: "#3178C6" },
    { name: "Tailwind CSS", icon: "tailwindcss", color: "#10B981" },
    { name: "Next.js",      icon: "nextdotjs",   color: "#FFFFFF" },
    { name: "Node.js",      icon: "nodedotjs",   color: "#5FA04E" },
    { name: "Framer Motion",icon: "framer",      color: "#EF0076" },
    { name: "Git",          icon: "git",         color: "#F05032" },
    { name: "Vite",         icon: "vite",        color: "#646CFF" },
  ],
  formspreeId: "mnjkyepw",
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
    title: "E-Commerce Experience",
    description: "A lightning-fast storefront featuring server-side rendering, global state management, and seamless micro-interactions.",
    tags: ["React", "Next.js", "Tailwind v4"],
    repo: "https://github.com/yourusername/project-one"
  },
  {
    id: 3,
    title: "E-Commerce Experience",
    description: "A lightning-fast storefront featuring server-side rendering, global state management, and seamless micro-interactions.",
    tags: ["React", "Next.js", "Tailwind v4"],
    repo: "https://github.com/yourusername/project-one"
  },
  {
    id: 4,
    title: "AI Dashboard UI",
    description: "An analytics dashboard featuring real-time data streaming, dynamic grid systems, and custom Framer Motion components.",
    tags: ["TypeScript", "React", "Framer Motion"],
    repo: "https://github.com/yourusername/project-two"
  }
];