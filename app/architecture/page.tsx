import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { singleton } from "#contentrain";

type ModelField = {
  type?: string;
};

type ModelSchema = {
  id: string;
  kind: string;
  domain: string;
  fields?: Record<string, ModelField>;
};

async function getArchitecture() {
  const rootDir = process.cwd();
  const modelDir = path.join(rootDir, ".contentrain", "models");
  const modelFiles = (await readdir(modelDir)).sort();
  const models = await Promise.all(
    modelFiles.map(async (file) =>
      JSON.parse(await readFile(path.join(modelDir, file), "utf8")) as ModelSchema,
    ),
  );
  const domains = [...new Set(models.map((model) => model.domain))].sort((left, right) =>
    left.localeCompare(right, "en"),
  );

  return domains.map((domain) => ({
    domain,
    models: models.filter((model) => model.domain === domain),
  }));
}

export default async function ArchitecturePage() {
  const site = singleton("site-settings").locale("en").get();
  const navigation = singleton("navigation").locale("en").get();
  const footer = singleton("footer").locale("en").get();
  const groups = await getArchitecture();

  return (
    <main className="shell">
      <header className="header">
        <Link href="/" className="brand">
          {site.site_name}
        </Link>
        <div className="row muted">
          {navigation.items?.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </header>

      <section className="hero">
        <div>
          <span className="badge">Content architecture</span>
          <h1>Commerce models grouped by real Contentrain domains.</h1>
          <p>
            This page reads the starter&apos;s local schema files and shows how system and commerce
            models map to the app surfaces you ship.
          </p>
        </div>

        <aside className="panel">
          <div className="badge">Official surfaces</div>
          <div className="footer-links">
            <a href="https://ai.contentrain.io/packages/sdk.html">SDK</a>
            <a href="https://docs.contentrain.io/">Docs</a>
            <a href="https://studio.contentrain.io/">Studio</a>
          </div>
        </aside>
      </section>

      <section className="section">
        <h2>Domain groups</h2>
        <div className="grid">
          {groups.map((group) => (
            <article key={group.domain} className="quote-card">
              <h3 style={{ textTransform: "capitalize" }}>{group.domain}</h3>
              <p className="muted">{group.models.length} models in this domain</p>
              <div className="chip-list">
                {group.models.map((model) => (
                  <span key={model.id} className="field-chip">
                    {model.id} ({model.kind})
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Field examples</h2>
        <div className="grid">
          {groups.map((group) => (
            <article key={`${group.domain}-fields`} className="quote-card">
              <h3 style={{ textTransform: "capitalize" }}>{group.domain}</h3>
              <div className="field-stack">
                {group.models.map((model) => (
                  <div key={model.id}>
                    <strong>{model.id}</strong>
                    <div className="chip-list">
                      {Object.entries(model.fields ?? {}).map(([fieldName, definition]) => (
                        <span key={fieldName} className="field-chip">
                          {fieldName}: {definition.type ?? "unknown"}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer muted">
        <div className="footer-copy">
          <span>{footer.blurb}</span>
          <span>{footer.legal_notice}</span>
        </div>
        <div className="footer-columns">
          {footer.columns?.map((column) => (
            <section key={column.title} className="footer-column">
              <strong>{column.title}</strong>
              <div className="footer-links">
                {column.links?.map((link) => (
                  <a key={link.label} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </footer>
    </main>
  );
}
