import { cn } from "@/lib/utils";
import { Shield, Activity, Linkedin, Twitter, Layers } from "lucide-react";

const badges = [
  { id: "license", label: "License", icon: Shield },
  { id: "build", label: "Build Status", icon: Activity },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin },
  { id: "twitter", label: "Twitter/X", icon: Twitter },
  { id: "techstack", label: "Tech Stack", icon: Layers },
] as const;

export type BadgeId = (typeof badges)[number]["id"];

interface BadgeGeneratorProps {
  selected: BadgeId[];
  onToggle: (id: BadgeId) => void;
}

const BadgeGenerator = ({ selected, onToggle }: BadgeGeneratorProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Include Badges
      </span>
      <div className="flex flex-wrap justify-center gap-3">
        {badges.map((badge) => {
          const isChecked = selected.includes(badge.id);
          return (
            <button
              key={badge.id}
              onClick={() => onToggle(badge.id)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-medium transition-all duration-300 glass",
                isChecked
                  ? "border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_hsl(152_69%_50%/0.15)] bg-emerald-500/10"
                  : "text-muted-foreground hover:text-foreground hover:border-primary/30"
              )}
            >
              <badge.icon className="h-4 w-4" />
              {badge.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BadgeGenerator;
