import type { Metadata } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { buildZoom } from "@/data/credentials";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is instead of applying the "%s | Crate Construction" template. */
  absoluteTitle?: boolean;
  image?: { url: string; alt: string };
};

export function pageMetadata({ title, description, path, absoluteTitle, image }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.name,
      url: path,
      title: fullTitle,
      description,
      ...(image ? { images: [{ url: image.url, width: 1200, height: 630, alt: image.alt }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image ? { images: [image.url] } : {}),
    },
  };
}

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Serialize JSON-LD safely (prevents `</script>` injection). */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * LocalBusiness structured data — uses only verified business information:
 * name, phone, city/region/postal code (BuildZoom-listed business address),
 * services from the brief, and the public BuildZoom profile.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    telephone: site.phone.e164,
    image: `${site.url}/opengraph-image`,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      postalCode: site.location.postalCode,
      addressCountry: site.location.country,
    },
    areaServed: [
      { "@type": "City", name: "Dallas", containedInPlace: { "@type": "State", name: "Texas" } },
      { "@type": "City", name: "Richardson", containedInPlace: { "@type": "State", name: "Texas" } },
      { "@type": "Place", name: "Dallas–Fort Worth Metroplex" },
    ],
    knowsAbout: services.map((s) => s.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Residential construction services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.summary,
          url: `${site.url}/services#${s.slug}`,
        },
      })),
    },
    sameAs: [buildZoom.url, ...site.social.map((s) => s.href).filter(Boolean)],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { "@id": `${site.url}/#business` },
    inLanguage: "en-US",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
