import { Code2, Sparkles, Download } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Code Analysis",
    description: "AI scans your repository structure, dependencies, and code patterns to understand your project.",
  },
  {
    icon: Sparkles,
    title: "Smart Formatting",
    description: "Generates well-structured markdown with proper headings, badges, installation steps, and usage examples.",
  },
  {
    icon: Download,
    title: "One-Click Export",
    description: "Copy to clipboard or download your perfectly formatted README.md instantly—ready to commit.",
  },
];

const FeatureCards = () => {
  return (
    <div className="relative grid w-full max-w-5xl gap-6 sm:grid-cols-3">
      {/* Floating orbs behind cards for depth */}
      <div className="pointer-events-none absolute -left-20 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-primary/8 blur-[90px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/6 blur-[80px]" />

      {features.map((feature) => (
        <div
          key={feature.title}
          className="group relative z-10 rounded-xl glass p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(217_91%_60%/0.15)]"
        >
          <feature.icon className="mb-4 h-8 w-8 text-primary drop-shadow-[0_0_8px_hsl(217_91%_60%/0.5)]" />
          <h3 className="mb-2 text-sm font-semibold text-foreground">{feature.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
