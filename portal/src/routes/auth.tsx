import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Client login — Sam Mackinley web design" },
      {
        name: "description",
        content:
          "Log in to the client portal to raise website change requests, upload files and track progress.",
      },
      { property: "og:title", content: "Client login — Sam Mackinley web design" },
      {
        property: "og:description",
        content: "Access your client portal to submit and track website changes.",
      },
    ],
  }),
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<"login" | "reset">("login");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    setBusy(true);
    try {
      if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Check your email for a reset link");
        setMode("login");
        return;
      }
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: String(form.get("password") ?? ""),
      });
      if (error) throw error;
      navigate({ to: "/portal" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not sign you in");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-5 py-16">
      <div className="w-full max-w-md">
        <Link to="/" className="display text-lg">
          Sam Mackinley<span className="text-ochre">.</span>
        </Link>
        <div className="mt-6 rounded-lg border border-border bg-card p-8">
          <h1 className="text-2xl">{mode === "login" ? "Client portal" : "Reset your password"}</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {mode === "login"
              ? "Accounts are set up by me. If you need access to your site, get in touch and I'll send your login."
              : "Enter your email and I'll send you a link to set a new password."}
          </p>

          <form onSubmit={onSubmit} className="mt-7 grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            {mode === "login" && (
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                />
              </div>
            )}
            <Button type="submit" size="lg" disabled={busy}>
              {busy ? "Working…" : mode === "login" ? "Log in" : "Send reset link"}
            </Button>
          </form>

          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "reset" : "login")}
            className="mt-5 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            {mode === "login" ? "Forgotten your password?" : "Back to login"}
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Not a client yet?{" "}
          <Link to="/start" className="underline underline-offset-4 hover:text-foreground">
            Start a project
          </Link>
        </p>
      </div>
    </div>
  );
}
