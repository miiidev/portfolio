export interface Project {
  id: string | number;
  title: string;
  description: string;
  tags: string[];
  link: string;
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
  };
  skills: string[];
}

export const personalInfo: PersonalInfo = {
  name: "Ahmad Syahmi",
  role: "Frontend Developer",
  bio: "I love building highly interactive, accessible, and performant digital experiences. Turning complex problems into elegant, user-friendly applications is my jam.",
  location: "Malaysia",
  socials: {
    github: "https://github.com/miiidev",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "mailto:ahmad.syahmi3211@gmail.com",
  },
  skills: [
    "React", 
    "TypeScript", 
    "Tailwind CSS", 
    "Next.js", 
    "Node.js", 
    "Framer Motion", 
    "Git", 
    "Vite"
  ],
};

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Experience",
    description: "A lightning-fast storefront featuring server-side rendering, global state management, and seamless micro-interactions.",
    tags: ["React", "Next.js", "Tailwind v4"],
    link: "https://github.com/yourusername/project-one"
  },
  {
    id: 2,
    title: "E-Commerce Experience",
    description: "A lightning-fast storefront featuring server-side rendering, global state management, and seamless micro-interactions.",
    tags: ["React", "Next.js", "Tailwind v4"],
    link: "https://github.com/yourusername/project-one"
  },
  {
    id: 3,
    title: "E-Commerce Experience",
    description: "A lightning-fast storefront featuring server-side rendering, global state management, and seamless micro-interactions.",
    tags: ["React", "Next.js", "Tailwind v4"],
    link: "https://github.com/yourusername/project-one"
  },
  {
    id: 4,
    title: "AI Dashboard UI",
    description: "An analytics dashboard featuring real-time data streaming, dynamic grid systems, and custom Framer Motion components.",
    tags: ["TypeScript", "React", "Framer Motion"],
    link: "https://github.com/yourusername/project-two"
  }
];