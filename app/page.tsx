import Link from "next/link";
import { query, singleton } from "#contentrain";
import type { CatalogCollection, Product } from "#contentrain";

type CollectionWithProducts = Omit<CatalogCollection, "featured_products"> & {
  featured_products?: Product[];
};

export default function HomePage() {
  const site = singleton("site-settings").locale("en").get();
  const navigation = singleton("navigation").locale("en").get();
  const footer = singleton("footer").locale("en").get();
  const campaign = query("promo-campaign").locale("en").first();
  const featuredCollection = query("catalog-collection")
    .locale("en")
    .include("featured_products")
    .first() as CollectionWithProducts | undefined;
  const products = featuredCollection?.featured_products ?? [];
  const testimonials = query("testimonial").locale("en").all();
  const faqs = query("faq-item").locale("en").all();

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

      <section className="hero" id="campaign">
        <div>
          <span className="badge">Commerce Starter</span>
          <h1>Catalog pages with campaign energy and cleaner conversion paths.</h1>
          <p>
            {campaign?.summary} Product grids, promo strips, testimonials, and FAQ layers are
            modeled for content operations instead of being frozen inside page components.
          </p>
          <div className="row">
            <Link href={navigation.cta_href ?? "/products/atlas-travel-jacket"} className="button">
              {navigation.cta_label ?? "Open flagship PDP"}
            </Link>
            <span className="muted">Vercel-first App Router structure</span>
          </div>
        </div>

        <aside className="panel">
          <div className="badge">{campaign?.title}</div>
          <p className="muted">
            This starter is designed for modern merchandising: campaign rail, featured collection,
            product cards, and a path toward richer product storytelling.
          </p>
          <Link href="/collections/featured-collection" className="text-link">
            Browse the full featured collection
          </Link>
        </aside>
      </section>

      <section className="section" id="collection">
        <h2>{featuredCollection?.name ?? "Featured collection"}</h2>
        <p className="muted">{featuredCollection?.summary}</p>
        <div className="grid">
          {products.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`} className="product-card">
              {product.primary_image ? (
                <img
                  src={product.primary_image}
                  alt={product.image_alt ?? product.name}
                  className="product-media"
                />
              ) : null}
              <div className="row card-top">
                <span className="badge">{product.badge}</span>
                <span className="muted">View PDP</span>
              </div>
              <h3>{product.name}</h3>
              <p className="muted">{product.summary}</p>
              <ul className="bullet-list">
                {(product.highlights ?? []).slice(0, 2).map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="price">{product.price_label}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Starter kits should merchandise, not merely render.</h2>
        <div className="grid">
          {testimonials.map((item) => (
            <article key={item.id} className="quote-card">
              <p>“{item.quote}”</p>
              <p className="muted">
                {item.person_name}
                {item.person_role ? ` · ${item.person_role}` : ""}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="faq">
        <h2>Commerce starters should explain their structure, not hide it.</h2>
        <div className="grid">
          {faqs.map((item) => (
            <article key={item.id} className="quote-card">
              <h3>{item.question}</h3>
              <p className="muted">{item.answer}</p>
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
