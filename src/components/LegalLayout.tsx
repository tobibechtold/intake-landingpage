interface LegalLayoutProps {
  title: string;
  children: React.ReactNode;
}

// Header and Footer are supplied by SiteShell.astro so this body can render statically
// with no client: directive, and therefore ship no JavaScript.
const LegalLayout = ({ title, children }: LegalLayoutProps) => (
  <main className="flex-1 pt-24 pb-16">
    <div className="container max-w-3xl">
      <h1 className="mb-8 text-3xl text-foreground md:text-4xl">{title}</h1>
      <div className="prose prose-invert prose-sm max-w-none">{children}</div>
    </div>
  </main>
);

export default LegalLayout;
