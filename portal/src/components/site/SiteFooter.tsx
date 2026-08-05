import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <p className="display text-xl">
            Sam Mackinley<span className="text-ochre">.</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Web design and build for small businesses. Clear structure, fast pages, and a portal so
            changes actually get made.
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Site
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/work" className="text-muted-foreground hover:text-foreground">
                Work
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-muted-foreground hover:text-foreground">
                Services &amp; pricing
              </Link>
            </li>
            <li>
              <Link to="/start" className="text-muted-foreground hover:text-foreground">
                Start a project
              </Link>
            </li>
            <li>
              <Link to="/book" className="text-muted-foreground hover:text-foreground">
                Book a call
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Clients
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/auth" className="text-muted-foreground hover:text-foreground">
                Client login
              </Link>
            </li>
            <li>
              <Link to="/portal" className="text-muted-foreground hover:text-foreground">
                Client portal
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl border-t border-border px-5 py-6">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sam Mackinley. Web design, built properly.
        </p>
      </div>
    </footer>
  );
}
