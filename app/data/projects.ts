import type { ProjectData } from "../types/project";

export const projects: ProjectData[] = [
  {
    title: "SNK",
    category: "DESIGN & MANUFACTURING PLATFORM",
    description:
      "A creative printing, branding, and signage studio based in Windhoek, Namibia.",
    tags: ["GSAP", "React", "Tailwind CSS"],
    features: [
      "Digital Transformation: End-to-end modernization of corporate identity.",
      "High-Fidelity Interaction: Seamless experiences built with GSAP.",
      "Print Optimization: Integrated digital tools for modern printing systems.",
      "Responsive Layouts: Optimized for every device standard.",
    ],
    liveUrl: "https://snk-theta.vercel.app",
    githubUrl: "https://github.com/Wesley7-debug/snk",
    image: "/images/snk.png",
  },
  {
    title: "TrueId",
    category: "MOTION & IDENTITY VERIFICATION",
    description:
      "An intuitive identity verification platform simplifying government processes.",
    tags: ["React", "Tailwind CSS"],
    features: [
      "Streamlined Registration: Simplified workflow for complex government processes.",
      "Secure Verification: Identity infrastructure designed for scale.",
      "Fluid Motion: Immersive visual cues for intuitive user journeys.",
      "Modern UI/UX: Tailored interface removing administrative friction.",
    ],
    liveUrl: "https://trueid-beta.vercel.app",
    githubUrl: "https://github.com/Wesley7-debug/trueid",
    image: "/images/true-id.png",
  },
  {
    title: "Yarny",
    category: "STRATEGY & CONNECTION CHAT APP",
    description:
      "A connection-focused chat application built to foster meaningful interactions.",
    tags: [
      "Design",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Next.js",
      "MongoDB",
      "WebSocket",
      "WebRTC",
    ],
    features: [
      "Real-time Chat: Instant communication engine powered by WebSockets.",
      "P2P Video Streaming: WebRTC-enabled high-quality video calling.",
      "Dynamic Matching: Discovery algorithm matching users based on interests.",
      "Full-Stack Scale: Built on top of a highly optimized Next.js and MongoDB foundation.",
    ],
    liveUrl: "",
    githubUrl: "https://github.com/Wesley7-debug/yarny",
    image: "/images/yarny.png",
  },
  {
    title: "Star Seed",
    category: "BRANDING & SCHOOL MANAGEMENT",
    description: "Unified administration platform for K-12 institutions.",
    tags: ["Design", "React", "Tailwind CSS", "Node.js", "Next.js", "MongoDB"],
    features: [
      "Unified Administration: Single dashboard to handle all campus operations.",
      "Robust Database: Fast and scalable data modeling for student profiles.",
      "Complete Rebranding: Elevated identity for modern K-12 academic spaces.",
      "Seamless Navigation: Accessible layout optimized for educators and parents.",
    ],
    liveUrl: "https://starseed.vercel.app/",
    githubUrl: "https://github.com/Wesley7-debug/starseed",
    image: "/images/star-seed.png",
  },
  {
    title: "Zentry",
    category: "GSAP & INTERACTIVE GAMING PLATFORM",
    description:
      "Immersive gaming platform featuring cinematic scroll experiences.",
    tags: ["GSAP", "React", "Tailwind CSS"],
    features: [
      "Cinematic Storytelling: Immersive scroll-driven visual narratives.",
      "Cutting-Edge Animations: High-performance micro-interactions built with GSAP.",
      "Gaming Architecture: Next-gen landing pages for competitive gaming communities.",
      "Fluid Interactivity: Highly dynamic front-end state management.",
    ],
    liveUrl: "https://zentry-website-dusky.vercel.app/",
    githubUrl: "https://github.com/Wesley7-debug/zentry-Website-",
    image: "/images/zentry.png",
  },
  {
    title: "Lofti",
    category: "DESIGN & ANIMATION LIBRARY",
    description:
      "A lightweight animation library built exclusively for  GSAP animations.",
    tags: [
      "Design",
      "GSAP",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Next.js",
      "MongoDB",
      "Supabase",
    ],
    features: [
      "Lightweight Footprint: Zero-bloat engine built strictly on top of GSAP.",
      "Developer First: Highly configurable code syntax ready for React/Next.js.",
      "Backend Sync: Persistent preset sharing infrastructure powered by Supabase.",
      "Performant Physics: Hardcoded matrix calculations for buttery-smooth rendering.",
    ],
    liveUrl: "https://loftiui.com",
    githubUrl: "",
    image: "/images/lofti.png",
  },
  {
    title: "Axela",
    category: "DESIGN & CONVERSATIONAL AI CHATBOT",
    description:
      "Conversational AI interface designed for seamless user interaction.",
    tags: ["React", "Tailwind CSS", "Node.js", "Next.js", "Supabase"],
    features: [
      "Conversational AI: Intelligent prompt interpretation and execution.",
      "Sleek UI Architecture: Minimalist chatbot design tailored for clarity.",
      "Real-time Infrastructure: Session storage and profile sync using Supabase.",
      "Zero Latency: Blazing fast response streaming.",
    ],
    liveUrl: "https://axela-ai.vercel.app",
    githubUrl: "",
    image: "/images/axela.png",
  },
  {
    title: "Spylt",
    category: "DESIGN & BEVERAGE BRAND IDENTITY",
    description:
      "An attitude-driven brand identity for a modern beverage line.",
    tags: ["React", "GSAP", "Tailwind CSS"],
    features: [
      "Attitude Branding:  layout designed to contrast traditional beverage platforms.",
      "Interactive Product Showcase: Immersive 2D physics layers powered by GSAP.",
      "Fluid Core Transitions: Flawless page switches that align with the brand story.",
    ],
    liveUrl: "https://zyphr.vercel.app",
    githubUrl: "https://github.com/Wesley7-debug/Zyphr",
    image: "/images/spylt.png",
  },
];

export function getProjectByImage(src: string): ProjectData | undefined {
  return projects.find((project) => project.image === src);
}
