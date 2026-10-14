import {
  Braces,
  Code2,
  Database,
  Globe2,
  Layers3,
  Network,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import portrait from "@/assets/lis-port.png";
import travelImage from "@/assets/tos-travel.jpg";
import skincareImage from "@/assets/skincare-system.jpg";
import networkImage from "@/assets/network-project.jpg";

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
  roles: ["Computer Science Student", "Frontend Developer", "UI/UX Designer", "Software Developer"],
  hero: {
    description:
      "Computer Science and Engineering student in Phnom Penh, Cambodia, building thoughtful software, web experiences, and mobile applications.",
    greeting: "HELLO WORLD, I’M",
    tagline: "I turn ideas into digital experiences.",
  },
  about: {
    introduction:
      "I’m Norn Sreylis — a Computer Science and Engineering student passionate about software development, UI/UX design, web technologies, and mobile applications.",
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
    { label: "Skill areas", value: 6 },
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
      demoUrl: "https://your-live-demo.com",
    },
    {
      title: "Mini Banking system",
      category: "Desktop",
      number: "03",
      image: networkImage,
      description:
        "Network implementations involving VLANs, DHCP, static routing, and network design.",
      tags: ["VLAN", "DHCP", "Static routing"],
      icon: Network,
      repoUrl: "https://github.com/srey-lis/Mini-Banking-C-.git",
      demoUrl: "https://your-live-demo.com",
    },
  ] satisfies Project[],
  skills: [
    {
      title: "Programming Languages",
      icon: Braces,
      summary: "Building across languages and platforms.",
      items: ["C++", "C#", "PHP", "JavaScript", "Dart", "SQL"],
    },
    {
      title: "Frontend Development",
      icon: Code2,
      summary: "Interfaces built for people.",
      items: ["HTML", "CSS", "JavaScript", "Bootstrap", "Tailwind CSS"],
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
      items: ["MySQL", "SQL Server", "SQLite", "Oracle"],
    },
    {
      title: "Mobile Development",
      icon: Smartphone,
      summary: "Experiences on the move.",
      items: ["Flutter", "iOS Foundation Framework"],
    },
    {
      title: "Design",
      icon: Sparkles,
      summary: "Making ideas useful and intuitive.",
      items: ["UI/UX Design", "Wireframing", "Prototyping"],
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
  },
  technologies: ["HTML", "CSS", "JavaScript", "Laravel", "Flutter", "C++", "MySQL", "SQL Server"],
};
