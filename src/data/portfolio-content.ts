import {
  Braces,
  Code2,
  Database,
  Globe2,
  Layers3,
  Lightbulb,
  Network,
  Server,
  Smartphone,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import portrait from "@/assets/lis-port.png";
import travelImage from "@/assets/tos.png";
import skincareImage from "@/assets/skincare-system.jpg";
import networkImage from "@/assets/network-project.jpg";
import minibanking from "@/assets/minibank.png";
import astra from "@/assets/astra.png";
import exitstep from "@/assets/exit.png";
type Project = {
  title: string;
  category: string;
  number: string;
  image: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  repoUrl?: string;
  demoUrl?: string;
};

export const portfolioContent = {
  identity: {
    name: "Norn Sreylis",
    displayName: "Sreylis Norn",
    initials: "S",
    title: "Computer Science Student & Developer",
    socialDescription:
      "Projects, skills, education, and experience of Norn Sreylis, a developer and Computer Science and Engineering student.",
    description:
      "Explore Norn Sreylis's work in frontend development, UI/UX design, software engineering, and computer networking in Phnom Penh, Cambodia.",
    portrait,
    cvPath: "/Norn-Sreylis-CV1.pdf",
    cvFilename: "Norn-Sreylis-CV1.pdf",
  },
  navigation: ["About", "Skills", "Projects", "Journey", "GitHub", "Contact"],
  roles: [
    "Computer Science Student",
    "Frontend Developer",
    "UI/UX Designer",
    "Full Stack Developer",
  ],
  hero: {
    description:
      "Computer Science and Engineering student in Phnom Penh, Cambodia, building thoughtful software, web experiences, and mobile applications.",
    greeting: "HELLO, I’M",
    tagline: "I turn ideas into digital experiences.",
  },
  about: {
    introduction:
      "I’m Sreylis Norn a Computer Science and Engineering student passionate about Full Stack Developer, UI/UX design, web technologies, and mobile applications.",
    paragraphs: [
      "I enjoy solving real-world problems through technology, designing useful experiences, and continuously learning new skills.",
      "Based in Phnom Penh, Cambodia, I bring teamwork, communication, adaptability, and problem-solving to every project.",
    ],
    highlight: "Always learning. Always building.",
    facts: [
      ["LOCATION", "Phnom Penh, Cambodia"],
      ["NATIONALITY", "Cambodian"],
      ["BORN", "September 1, 2006"],
      ["LANGUAGES", "Khmer (Native), English (B2 Upper Intermediate)"],
    ],
  },
  stats: [
    { label: "Featured projects", value: 6 },
    { label: "Skill areas", value: 9 },
    { label: "GitHub repositories", value: 6 },
    { label: "Certificates", value: 3 },
  ],
  projects: [
    {
      title: "TOS Team Travel Website",
      category: "Web",
      number: "01",
      image: travelImage,
      description:
        "A Cambodia travel platform featuring AI assistance, hotel booking, bus booking, and tour guide services.",
      tags: ["HTML", "CSS", "JavaScript", "Laravel", "MySQL"],
      icon: Globe2,
      repoUrl: "https://github.com/srey-lis/Tos-Team-Update.git",
      demoUrl: "https://srey-lis.github.io/Tos-Team-Update/",
    },
    {
      title: "Skincare Management System",
      category: "Desktop",
      number: "02",
      image: skincareImage,
      description: "A desktop application built with C++, Qt Widgets, SQLite, and CMake.",
      tags: ["C++", "Qt", "SQLite"],
      icon: Database,
      repoUrl: "https://github.com/srey-lis/skincare-management-system.git",
      demoUrl: "https://skincare-management-system.vercel.app/",
    },
    {
      title: "Mini Banking system",
      category: "Desktop",
      number: "03",
      image: minibanking,
      description:
        "A desktop banking system built with C# that allows users to manage accounts, deposit and withdraw funds, transfer money, and view transaction history through a simple interface.",
      tags: ["C#", ".NET", "Banking System"],
      icon: Globe2,
      repoUrl: "https://github.com/srey-lis/Mini-Banking-C-.git",
      demoUrl: "https://your-live-demo.com",
    },
    {
      title: "Astra-Learn",
      category: "IOS application",
      number: "04",
      image: astra,
      description:
        "Astra-Learn is a mobile learning app that helps students access courses, track progress, and enhance their learning experience through a simple and intuitive interface.",
      tags: ["iOS", "Education", "Mobile App"],
      icon: Globe2,
      repoUrl: "https://github.com/srey-lis/Astra-Learn.git",
      demoUrl: "https://your-live-demo.com",
    },
    {
      title: "ExitStep",
      category: "Web",
      number: "05",
      image: exitstep,
      description:
        "A full-stack travel planning platform built with ASP.NET, allowing users to explore destinations, book hotels, join tour packages, and create personalized travel itineraries.",
      tags: ["ASP.NET", "C#", "SQL Server", "Full Stack"],
      icon: Network,
      repoUrl: "https://github.com/srey-lis",
      demoUrl: "https://your-live-demo.com",
    },
  ] satisfies Project[],
  skills: [
    {
      title: "Programming Languages",
      icon: Braces,
      summary: "Building across languages and platforms.",
      items: ["C++", "C#", "Java", "Python", "PHP", "JavaScript", "Dart", "SQL", "Kotlin"],
    },
    {
      title: "Core Concepts",
      icon: Lightbulb,
      summary: "The fundamentals behind clean, maintainable code.",
      items: [
        "Object-Oriented Programming (OOP)",
        "Data Structures & Algorithms",
        "MVC Architecture",
        "REST APIs",
      ],
    },
    {
      title: "Frontend Development",
      icon: Code2,
      summary: "Interfaces built for people.",
      items: ["HTML", "CSS", "JavaScript", "React", "Bootstrap", "Tailwind CSS"],
    },
    {
      title: "Frameworks",
      icon: Layers3,
      summary: "Tools for web and app development.",
      items: ["Laravel", "ASP.NET", "Flutter"],
    },
    {
      title: "Databases",
      icon: Database,
      summary: "Organizing and working with data.",
      items: ["MySQL", "SQL Server", "SQLite", "Oracle", "Supabase"],
    },
    {
      title: "Mobile Development",
      icon: Smartphone,
      summary: "Experiences on the move.",
      items: ["Flutter", "Android Development", "Kotlin", "iOS Development"],
    },
    {
      title: "Design",
      icon: Sparkles,
      summary: "Making ideas useful and intuitive.",
      items: ["UI/UX Design", "Wireframing", "Prototyping"],
    },
    {
      title: "IT & System Administration",
      icon: Server,
      summary: "Keeping computers and systems running smoothly.",
      items: [
        "Windows Installation & Setup",
        "Windows Server",
        "Hardware Troubleshooting",
        "Software Installation & Configuration",
        "Networking Basics",
      ],
    },
    {
      title: "Tools & Technologies",
      icon: Wrench,
      summary: "Tools used throughout the development lifecycle.",
      items: [
        "Git",
        "GitHub",
        "VS Code",
        "Visual Studio",
        "Postman",
        "Android Studio",
        "Supabase",
        "Firebase",
      ],
    },
  ],
  strengths:
    "Teamwork & communication · Fast learner · Adaptable · Problem solving · Responsible & self-motivated",
  certificates:
    "High School Certificate Grade A · Certificate in UI/UX Design · English Proficiency Program (EPP)",
  interests:
    "Web design · Mobile app development · UI/UX design · Technology innovation · Building websites that solve real problems · Learning new technologies",
  timeline: [
    {
      phase: "2026 — PRESENT / EXPERIENCE",
      title: "Software Developer Intern",
      text: "ACLEDA University of Business",
      icon: Code2,
    },
    {
      phase: "2025 / EXPERIENCE",
      title: "Student Support Unit",
      text: "ACLEDA University of Business",
      icon: Sparkles,
    },
    {
      phase: "2025 / EXPERIENCE",
      title: "English Teacher",
      text: "HM International School",
      icon: Sparkles,
    },
    {
      phase: "2024 — PRESENT / EDUCATION",
      title: "Computer Science and Engineering",
      text: "Bachelor’s Degree · ACLEDA University of Business",
      icon: Braces,
    },
    {
      phase: "2024 — PRESENT / EDUCATION",
      title: "Computer Science and Engineering",
      text: "Bachelor’s Degree · Paragon International University",
      icon: Braces,
    },
    {
      phase: "2023 — 2024 / EDUCATION",
      title: "High School Diploma",
      text: "All Nation International School",
      icon: Layers3,
    },
  ],
  reference:
    "Mr. Chhay Phinavuth · Dean, Faculty of Technology and Science · ACLEDA University of Business",
  contact: {
    availability: "Thoughtful teams, interesting problems, and the next big learning opportunity.",
    phone: "089 559 553",
    phoneHref: "tel:089559553",
    email: "norn.sreylis6@gmail.com",
    github: "https://github.com/srey-lis",
    telegram: "@sreylisnorn",
  },
  technologies: ["HTML", "CSS", "JavaScript", "Laravel", "Flutter", "C++", "MySQL", "SQL Server"],
};
