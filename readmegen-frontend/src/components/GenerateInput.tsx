import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface GenerateInputProps {
  onGenerate: (url: string) => void;
  isLoading: boolean;
}

const GenerateInput = ({ onGenerate, isLoading }: GenerateInputProps) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) onGenerate(url.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row glass rounded-xl p-2">
      <Input
        type="url"
        placeholder="https://github.com/username/repository"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="h-12 flex-1 border-0 bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:ring-1"
      />
      <Button
        type="submit"
        disabled={isLoading || !url.trim()}
        className="h-12 px-6 text-sm font-semibold glow-button transition-all duration-300 hover:glow-primary-strong"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating…
          </>
        ) : (
          "Generate README"
        )}
      </Button>
    </form>
  );
};

export default GenerateInput;
