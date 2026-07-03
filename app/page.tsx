import Hero from "./components/Hero";

export const metadata = {
  title: "Fidelis Portfolio — Full-stack Developer & Motion UI",
  description:
    "Fidelis is a full-stack developer crafting AI-driven motion-rich web experiences with clean design and polished interactions.",
  keywords: [
    "Fidelis portfolio",
    "full-stack developer",
    "Next.js",
    "React",
    "GSAP",
    "Tailwind CSS",
    "motion design",
    "web performance",
  ],
  icons: [
    { rel: "icon", url: "/images/fidelis.png" },
    { rel: "apple-touch-icon", url: "/images/fidelis.png" },
  ],
  openGraph: {
    title: "Fidelis Portfolio — Full-stack Developer & Motion UI",
    description:
      "A portfolio showcasing AI product design, motion-rich interfaces, and modern web craftsmanship.",
    type: "website",
    url: "https://your-domain.com",
    images: [
      {
        url: "/images/fidelis.png",
        alt: "Fidelis Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fidelis Portfolio — Full-stack Developer & Motion UI",
    description:
      "A portfolio showcasing AI product design, motion-rich interfaces, and modern web craftsmanship.",
  },
};

export default function Page() {
  return <Hero />;
}
