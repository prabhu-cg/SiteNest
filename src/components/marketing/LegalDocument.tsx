interface LegalSection {
  heading: string;
  body: string;
}

export function LegalDocument({ title, updated, sections }: { title: string; updated: string; sections: LegalSection[] }) {
  return (
    <main className="flex-1 bg-surface border-b border-border">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
        <h1 className="text-4xl sm:text-5xl text-foreground">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated {updated}</p>
        <div className="mt-10 rounded-card border border-border bg-card divide-y divide-border">
          {sections.map(({ heading, body }) => (
            <section key={heading} className="p-6 sm:p-8">
              <h2 className="text-2xl text-foreground">{heading}</h2>
              <p className="mt-2 text-ink-secondary leading-relaxed">{body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
