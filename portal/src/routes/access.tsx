import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PREVIEW_PASSWORD,
  grantPreviewAccess,
  hasPreviewAccess,
} from "@/lib/preview-access";

export const Route = createFileRoute("/access")({
  head: () => ({
    meta: [
      { title: "Portal access — Sam Mackinley" },
      {
        name: "description",
        content: "Enter the preview password to continue to the client portal.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Access,
});

function Access() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (hasPreviewAccess()) navigate({ to: "/auth" });
  }, [navigate]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password === PREVIEW_PASSWORD) {
      grantPreviewAccess();
      navigate({ to: "/auth" });
      return;
    }
    setError("That password isn’t right. Try again.");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-secondary/40 px-5 py-12">
      <div className="absolute -left-20 top-16 h-64 w-64 rounded-full bg-ochre/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <section className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Lock className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="mt-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-ochre">
          Preview access
        </p>
        <h1 className="mt-4 text-center text-3xl leading-tight sm:text-4xl">Enter the password</h1>
        <p className="mx-auto mt-4 max-w-sm text-center text-sm leading-relaxed text-muted-foreground">
          This keeps the unfinished portal tucked away while we build it. Enter the password to
          continue.
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              autoFocus
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                if (error) setError("");
              }}
              required
            />
            {error ? (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}
          </div>
          <Button type="submit" size="lg">
            Continue to portal
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link to="/" className="underline-offset-4 hover:text-foreground hover:underline">
            Back to coming soon
          </Link>
        </p>
      </section>
    </main>
  );
}
