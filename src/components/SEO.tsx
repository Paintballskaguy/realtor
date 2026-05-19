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
  image = 'https://kandicenowakrealty.com/agent-photo.jpg',
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
    email: 'kandicenowak@gmail.com',
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
    areaServed: [
      { '@type': 'City', name: 'Tulsa' },
      { '@type': 'City', name: 'Broken Arrow' },
      { '@type': 'City', name: 'Owasso' },
      { '@type': 'City', name: 'Claremore' },
      { '@type': 'City', name: 'Sand Springs' },
      { '@type': 'City', name: 'Bixby' },
      { '@type': 'City', name: 'Jenks' },
      { '@type': 'City', name: 'Glenpool' },
      { '@type': 'City', name: 'Catoosa' },
      { '@type': 'City', name: 'Skiatook' },
      { '@type': 'State', name: 'Oklahoma' },
    ],
    priceRange: '$$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '50',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://www.facebook.com/profile.php?id=100063687033272',
      'https://www.linkedin.com/in/kandice-nowak-a257912a4/',
      'https://www.zillow.com/profile/kandicenowak',
      'https://kandicenowak.sites.c21.homes/',
      'https://profile.realsatisfied.com/Kandice-Nowak',
    ],
    memberOf: {
      '@type': 'RealEstateAgent',
      name: 'CENTURY 21 First Choice Realty',
      url: 'https://www.century21.com',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentSchema) }}
      />
    </Helmet>
  );
}
