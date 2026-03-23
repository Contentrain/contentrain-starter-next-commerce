import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { query, singleton } from "#contentrain";

export function generateStaticParams() {
  return query("product")
    .locale("en")
    .all()
    .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = query("product").locale("en").where("slug", slug).first();
  const site = singleton("site-settings").locale("en").get();

  if (!product) {
    return {
      title: site.site_name,
    };
  }

  return {
    title: `${product.name} | ${site.site_name}`,
    description: product.summary,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = singleton("site-settings").locale("en").get();
  const navigation = singleton("navigation").locale("en").get();
  const footer = singleton("footer").locale("en").get();
  const product = query("product").locale("en").where("slug", slug).first();

  if (!product) {
    notFound();
  }

  const paragraphs = String(product.description ?? "")
    .split(/\n\s*\n/g)
    .filter(Boolean);

  return (
    <main className="shell">
      <header className="header">
        <a href="/" className="brand">
          {site.site_name}
        </a>
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
          <span className="badge">{product.badge}</span>
          <h1>{product.name}</h1>
          <p>{product.summary}</p>
          <div className="price">{product.price_label}</div>
          {product.image_credit_href && product.image_credit_label ? (
            <a href={product.image_credit_href} className="text-link">
              {product.image_credit_label}
            </a>
          ) : null}
        </div>

        <aside className="panel">
          {product.primary_image ? (
            <img
              src={product.primary_image}
              alt={product.image_alt ?? product.name}
              className="product-media"
            />
          ) : null}
        </aside>
      </section>

      {product.highlights?.length ? (
        <section className="section">
          <h2>Merchandising highlights</h2>
          <ul className="highlight-grid">
            {product.highlights.map((highlight) => (
              <li key={highlight} className="quote-card">
                {highlight}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="section">
        <h2>Product narrative</h2>
        <div className="grid">
          {paragraphs.map((paragraph) => (
            <article key={paragraph} className="quote-card">
              <p className="muted">{paragraph}</p>
            </article>
          ))}
        </div>
      </section>

      {product.gallery?.length ? (
        <section className="section">
          <h2>Gallery</h2>
          <div className="gallery-grid">
            {product.gallery.map((image) => (
              <img key={image} src={image} alt={product.image_alt ?? product.name} className="gallery-media" />
            ))}
          </div>
        </section>
      ) : null}

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
