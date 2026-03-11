import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ParticleBackground from "@/components/ParticleBackground";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up authentication
    console.log("Signup:", { name, email, password });
  };

  return (
    <div className="relative min-h-screen bg-void flex items-center justify-center px-4">
      <ParticleBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-spotlight" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid opacity-30" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link to="/" className="mb-6 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary drop-shadow-[0_0_6px_hsl(217_91%_60%/0.6)]" />
            <span className="text-sm font-bold text-foreground">ReadmeGen</span>
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Create an account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Start generating beautiful READMEs</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass rounded-2xl border border-border p-8 flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full mt-2">
            Create account
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
