import { useState, useMemo } from "react";
import { Copy, Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DeploymentDock from "@/components/DeploymentDock";

interface MarkdownEditorProps {
  markdown: string;
  onMarkdownChange: (value: string) => void;
}

const MarkdownEditor = ({ markdown, onMarkdownChange }: MarkdownEditorProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const lineCount = useMemo(() => markdown.split("\n").length, [markdown]);

  const renderMarkdown = (md: string) => {
    const lines = md.split("\n");
    let html = "";
    let inCodeBlock = false;

    for (const line of lines) {
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          html += "</code></pre>";
          inCodeBlock = false;
        } else {
          html += '<pre class="bg-background rounded-md p-4 my-3 overflow-x-auto border border-border"><code class="text-sm font-mono text-foreground">';
          inCodeBlock = true;
        }
        continue;
      }
      if (inCodeBlock) {
        html += line.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "\n";
        continue;
      }
      if (line.startsWith("### "))
        html += `<h3 class="text-lg font-semibold mt-4 mb-2 text-foreground">${line.slice(4)}</h3>`;
      else if (line.startsWith("## "))
        html += `<h2 class="text-xl font-bold mt-6 mb-2 text-foreground border-b border-border pb-2">${line.slice(3)}</h2>`;
      else if (line.startsWith("# "))
        html += `<h1 class="text-2xl font-bold mt-6 mb-3 text-foreground border-b border-border pb-2">${line.slice(2)}</h1>`;
      else if (line.startsWith("- "))
        html += `<li class="ml-4 text-muted-foreground list-disc">${line.slice(2)}</li>`;
      else if (line.trim() === "") html += "<br/>";
      else {
        const formatted = line
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
          .replace(/`(.*?)`/g, '<code class="bg-background px-1.5 py-0.5 rounded text-sm font-mono text-primary">$1</code>');
        html += `<p class="text-muted-foreground leading-relaxed mb-1">${formatted}</p>`;
      }
    }
    if (inCodeBlock) html += "</code></pre>";
    return html;
  };

  const lineNumbers = (
    <div className="select-none pr-3 text-right font-mono text-xs leading-[1.625rem] text-muted-foreground/40">
      {Array.from({ length: lineCount }, (_, i) => (
        <div key={i}>{i + 1}</div>
      ))}
    </div>
  );

  return (
    <div className="flex w-full max-w-6xl flex-col gap-4">
      <div className="rounded-xl glass overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">README.md</span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleCopy} className="text-xs text-muted-foreground hover:text-foreground">
              {copied ? <Check className="mr-1.5 h-3.5 w-3.5" /> : <Copy className="mr-1.5 h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy Raw Markdown"}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDownload} className="text-xs text-muted-foreground hover:text-foreground">
              <Download className="mr-1.5 h-3.5 w-3.5" />
              Download .md
            </Button>
          </div>
        </div>

        {/* Desktop split */}
        <div className="hidden md:grid md:grid-cols-2 md:divide-x md:divide-border" style={{ minHeight: 480 }}>
          <div className="flex flex-col">
            <div className="border-b border-border px-4 py-2">
              <span className="text-xs font-medium text-muted-foreground">Raw Markdown</span>
            </div>
            <div className="flex flex-1 overflow-auto bg-card/30 p-4">
              {lineNumbers}
              <textarea
                value={markdown}
                onChange={(e) => onMarkdownChange(e.target.value)}
                className="flex-1 resize-none bg-transparent font-mono text-sm leading-[1.625rem] text-foreground outline-none placeholder:text-muted-foreground"
                spellCheck={false}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="border-b border-border px-4 py-2">
              <span className="text-xs font-medium text-muted-foreground">Live Preview</span>
            </div>
            <div
              className="flex-1 overflow-auto p-6 prose-invert"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
            />
          </div>
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden">
          <Tabs defaultValue="raw" className="w-full">
            <TabsList className="w-full rounded-none border-b border-border bg-transparent">
              <TabsTrigger value="raw" className="flex-1 text-xs">Raw Markdown</TabsTrigger>
              <TabsTrigger value="preview" className="flex-1 text-xs">Live Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="raw" className="m-0">
              <div className="flex bg-card/30 p-4">
                {lineNumbers}
                <textarea
                  value={markdown}
                  onChange={(e) => onMarkdownChange(e.target.value)}
                  className="min-h-[300px] flex-1 resize-none bg-transparent font-mono text-sm leading-[1.625rem] text-foreground outline-none"
                  spellCheck={false}
                />
              </div>
            </TabsContent>
            <TabsContent value="preview" className="m-0">
              <div
                className="min-h-[300px] overflow-auto p-6"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Deployment Dock */}
      <DeploymentDock />
    </div>
  );
};

export default MarkdownEditor;
