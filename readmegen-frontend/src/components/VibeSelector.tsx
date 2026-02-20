import { cn } from "@/lib/utils";

const vibes = ["Professional", "Fun/Emoji", "Minimalist", "Academic"] as const;
export type Vibe = (typeof vibes)[number];

interface VibeSelectorProps {
  selected: Vibe;
  onSelect: (vibe: Vibe) => void;
}

const VibeSelector = ({ selected, onSelect }: VibeSelectorProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Choose a Vibe
      </span>
      <div className="flex flex-wrap justify-center gap-2">
        {vibes.map((vibe) => (
          <button
            key={vibe}
            onClick={() => onSelect(vibe)}
            className={cn(
              "rounded-full px-5 py-2 text-xs font-semibold transition-all duration-300 glass",
              selected === vibe
                ? "border-primary/60 text-primary shadow-[0_0_20px_hsl(217_91%_60%/0.3)] bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:border-primary/30"
            )}
          >
            {vibe}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VibeSelector;
