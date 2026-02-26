import { Video } from './types';
import { config } from './config';

export function generateVideoStructuredData(video: Video) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnail,
    uploadDate: video.uploadDate,
    contentUrl: video.videoUrl,
    duration: `PT${video.duration}S`,
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: { '@type': 'WatchAction' },
      userInteractionCount: video.views || 0,
    },
    keywords: video.tags.join(', '),
    genre: video.category,
    creator: {
      '@type': 'Organization',
      name: config.app.name,
      url: config.app.url,
    },
  };
}

export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.app.name,
    alternateName: `${config.app.name} - AI Storytelling Platform`,
    url: config.app.url,
    description: config.app.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${config.app.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.app.name,
    url: config.app.url,
    logo: `${config.app.url}/logo.png`,
    description: 'AI video streaming platform celebrating stories from every corner of the world.',
    sameAs: [
      'https://twitter.com/thoronjo',
      'https://github.com/thoronjo/drimm',
    ],
  };
}
