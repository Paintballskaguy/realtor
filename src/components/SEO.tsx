import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  pathname?: string;
  image?: string;
  type?: string;
}

export default function SEO({
  title,
  description,
  pathname = '',
  image = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&auto=format&fit=crop',
  type = 'website',
}: SEOProps) {
  const siteUrl = 'https://kandicenowakrealty.com';
  const url = `${siteUrl}${pathname}`;
  const fullTitle = `${title} | Kandice Nowak Realty`;

  const realEstateAgentSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Kandice Nowak',
    image: `${siteUrl}/agent-photo.jpg`,
    url: siteUrl,
    telephone: '+1-918-408-8089',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4004 E 51st St',
      addressLocality: 'Tulsa',
      addressRegion: 'OK',
      postalCode: '74135',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.0896,
      longitude: -95.9246,
    },
    areaServed: {
      '@type': 'City',
      name: 'Tulsa',
    },
    priceRange: '$$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '34',
    },
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Kandice Nowak Realty" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(realEstateAgentSchema)}
      </script>
    </Helmet>
  );
}
