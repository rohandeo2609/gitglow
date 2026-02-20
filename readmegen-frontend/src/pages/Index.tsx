import { useState, useCallback } from "react";
import GenerateInput from "@/components/GenerateInput";
import MarkdownEditor from "@/components/MarkdownEditor";
import FeatureCards from "@/components/FeatureCards";
import ParticleBackground from "@/components/ParticleBackground";
import VibeSelector, { type Vibe } from "@/components/VibeSelector";
import BadgeGenerator, { type BadgeId } from "@/components/BadgeGenerator";
import TerminalLoader from "@/components/TerminalLoader";
import { FileText } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [vibe, setVibe] = useState<Vibe>("Professional");
  const [badges, setBadges] = useState<BadgeId[]>([]);
  const [showTerminal, setShowTerminal] = useState(false);

  const handleGenerate = async (url: string) => {
    // Start loading
    setIsLoading(true);
    setShowTerminal(true);
    setMarkdown("");

    try {
      const response = await fetch("http://localhost:8000/generate-readme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          vibe: vibe,
          badges: badges,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate README");
      }

      const data = await response.json();
      setMarkdown(data.readme);

    } catch (error) {
      console.error(error);
      setMarkdown("# Error\nSomething went wrong! Please check if your backend is running and the URL is correct.");
    } finally {
      // Stop loading ONLY when the backend is totally done
      setIsLoading(false);
    }
  };

  const handleTerminalComplete = useCallback(() => {
    // When animation finishes, we stop showing the terminal
    // BUT we don't stop 'isLoading' yet (handled in finally block above)
    setShowTerminal(false);
    setShowEditor(true);
  }, []);

  const toggleBadge = (id: BadgeId) => {
    setBadges((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative min-h-screen bg-void">
      <ParticleBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-spotlight" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid opacity-30" />

      <TerminalLoader open={showTerminal} onComplete={handleTerminalComplete} />

      <div className="relative z-10 flex flex-col items-center px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-16 flex w-full max-w-5xl items-center justify-between sm:mb-24">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary drop-shadow-[0_0_6px_hsl(217_91%_60%/0.6)]" />
            <span className="text-sm font-bold text-foreground">ReadmeGen</span>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub ↗
          </a>
        </nav>

        <section className="mb-10 flex flex-col items-center text-center sm:mb-14">
          <div className="mb-4 inline-flex items-center rounded-full glass px-3 py-1">
            <span className="text-xs font-medium text-muted-foreground">AI-Powered Documentation</span>
          </div>
          <h1 className="mb-4 max-w-2xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Turn Code into{" "}
            <span className="text-gradient">Documentation.</span>
          </h1>
          <p className="max-w-lg text-base text-muted-foreground sm:text-lg">
            Paste your GitHub repository link and let AI craft the perfect README.md in seconds.
          </p>
        </section>

        <section className="mb-6 flex w-full justify-center">
          <VibeSelector selected={vibe} onSelect={setVibe} />
        </section>

        <section className="mb-6 flex w-full justify-center">
          <GenerateInput onGenerate={handleGenerate} isLoading={isLoading} />
        </section>

        <section className="mb-12 flex w-full justify-center sm:mb-16">
          <BadgeGenerator selected={badges} onToggle={toggleBadge} />
        </section>

        {/* --- NEW LOADING INDICATOR --- */}
        {isLoading && (
          <div className="mb-16 flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in duration-300">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-primary/30"></div>
              <div className="absolute top-0 left-0 h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-[0_0_15px_hsl(217_91%_60%/0.5)]"></div>
            </div>
            <p className="text-lg font-medium text-primary animate-pulse">
              Generating your readme...
            </p>
          </div>
        )}

        {!isLoading && showEditor && (
          <section className="mb-16 flex w-full justify-center animate-in fade-in slide-in-from-bottom-4 duration-500 sm:mb-20">
            <MarkdownEditor markdown={markdown} onMarkdownChange={setMarkdown} />
          </section>
        )}

        {!isLoading && !showEditor && (
          <section className="mb-16 flex w-full justify-center sm:mb-20">
            <FeatureCards />
          </section>
        )}

        <footer className="w-full max-w-5xl border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Built with AI. Open source on GitHub.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;