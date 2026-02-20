import { Rocket } from "lucide-react";

const deployTargets = [
  {
    name: "Deploy to Vercel",
    url: "https://vercel.com/new",
    gradient: "from-white/10 to-white/5 hover:border-white/30",
    textClass: "text-foreground",
  },
  {
    name: "Deploy to Netlify",
    url: "https://app.netlify.com/start",
    gradient: "from-teal-500/10 to-teal-500/5 hover:border-teal-400/40",
    textClass: "text-teal-300",
  },
  {
    name: "Open in Replit",
    url: "https://replit.com",
    gradient: "from-orange-500/10 to-orange-500/5 hover:border-orange-400/40",
    textClass: "text-orange-300",
  },
];

const DeploymentDock = () => {
  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-xl glass p-6">
      <div className="flex items-center gap-2">
        <Rocket className="h-4 w-4 text-primary" />
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Deploy Your Project
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {deployTargets.map((target) => (
          <a
            key={target.name}
            href={target.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 rounded-lg bg-gradient-to-r ${target.gradient} border border-border px-5 py-3 text-sm font-semibold ${target.textClass} transition-all duration-300 hover:shadow-lg`}
          >
            {target.name} ↗
          </a>
        ))}
      </div>
    </div>
  );
};

export default DeploymentDock;
