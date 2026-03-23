import Link from "next/link";
import { notFound } from "next/navigation";
import { query, singleton } from "#contentrain";
import type { CatalogCollection, Product } from "#contentrain";

type CollectionWithProducts = Omit<CatalogCollection, "featured_products"> & {
  featured_products?: Product[];
};

export function generateStaticParams() {
  return query("catalog-collection")
    .locale("en")
    .all()
    .map((collection) => ({ slug: collection.slug }));
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = singleton("site-settings").locale("en").get();
  const navigation = singleton("navigation").locale("en").get();
  const footer = singleton("footer").locale("en").get();
  const collection = query("catalog-collection")
    .locale("en")
    .include("featured_products")
    .where("slug", slug)
    .first() as CollectionWithProducts | undefined;

  if (!collection) {
    notFound();
  }

  const products = collection.featured_products ?? [];

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
          <span className="badge">Collection view</span>
          <h1>{collection.name}</h1>
          <p>{collection.summary}</p>
          <div className="row">
            <Link className="button" href="/products/atlas-travel-jacket">
              Open flagship PDP
            </Link>
            <Link className="text-link" href="/">
              Back to campaign home
            </Link>
          </div>
        </div>

        <aside className="panel">
          <div className="badge">Contentrain collection</div>
          <p className="muted">
            This page is generated from a relation-backed catalog collection. Update the collection
            in Contentrain and the merchandising surface changes without touching layout code.
          </p>
        </aside>
      </section>

      <section className="section">
        <h2>Collection assortment</h2>
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
                <span className="muted">{product.price_label}</span>
              </div>
              <h3>{product.name}</h3>
              <p className="muted">{product.summary}</p>
            </Link>
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
