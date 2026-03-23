import type { Metadata } from "next";
import { singleton } from "#contentrain";
import "./globals.css";

export function generateMetadata(): Metadata {
  const site = singleton("site-settings").locale("en").get();
  const seo = singleton("seo-defaults").locale("en").get();

  return {
    title: seo.meta_title ?? site.site_name,
    description: seo.meta_description ?? site.site_tagline,
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="atlas-commerce">
      <body>{children}</body>
    </html>
  );
}
