/**
 * Analytics utilities for tracking user behavior
 * Supports Google Analytics and custom events
 */

import { config } from './config';

// Google Analytics types
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

/**
 * Initialize Google Analytics
 */
export function initGA() {
  if (!config.analytics.gaMeasurementId || typeof window === 'undefined') {
    return;
  }

  // Load GA script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${config.analytics.gaMeasurementId}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize gtag
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    (window as any).dataLayer = (window as any).dataLayer || [];
    // eslint-disable-next-line prefer-rest-params
    (window as any).dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', config.analytics.gaMeasurementId, {
    page_path: window.location.pathname,
  });
}

/**
 * Track page view
 */
export function trackPageView(url: string) {
  if (!config.analytics.gaMeasurementId || !window.gtag) return;

  window.gtag('config', config.analytics.gaMeasurementId, {
    page_path: url,
  });
}

/**
 * Track custom event
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (!config.analytics.gaMeasurementId || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}

/**
 * Track video events
 */
export const videoEvents = {
  play: (videoId: string, videoTitle: string) => {
    trackEvent('play', 'Video', videoTitle, undefined);
    console.log('[Analytics] Video played:', videoId);
  },

  pause: (videoId: string, videoTitle: string) => {
    trackEvent('pause', 'Video', videoTitle, undefined);
  },

  complete: (videoId: string, videoTitle: string) => {
    trackEvent('complete', 'Video', videoTitle, undefined);
  },

  seek: (videoId: string, videoTitle: string) => {
    trackEvent('seek', 'Video', videoTitle, undefined);
  },
};

/**
 * Track user interactions
 */
export const userEvents = {
  search: (query: string) => {
    trackEvent('search', 'User', query, undefined);
  },

  signup: (method: string) => {
    trackEvent('sign_up', 'User', method, undefined);
  },

  login: (method: string) => {
    trackEvent('login', 'User', method, undefined);
  },

  upload: (videoId: string) => {
    trackEvent('upload', 'User', videoId, undefined);
  },

  share: (videoId: string, platform: string) => {
    trackEvent('share', 'Social', `${platform}:${videoId}`, undefined);
  },

  addToWatchlist: (videoId: string) => {
    trackEvent('add_to_watchlist', 'User', videoId, undefined);
  },

  removeFromWatchlist: (videoId: string) => {
    trackEvent('remove_from_watchlist', 'User', videoId, undefined);
  },
};

/**
 * Track navigation
 */
export const navigationEvents = {
  clickCategory: (category: string) => {
    trackEvent('click', 'Navigation', `category:${category}`, undefined);
  },

  clickVideo: (videoId: string, position: number) => {
    trackEvent('click', 'Video', videoId, position);
  },

  scrollRow: (rowTitle: string) => {
    trackEvent('scroll', 'Navigation', rowTitle, undefined);
  },
};

/**
 * Track errors
 */
export function trackError(error: Error, context?: string) {
  trackEvent('error', 'Error', `${context || 'unknown'}: ${error.message}`, undefined);
  
  // Log to console in development
  if (config.isDevelopment) {
    console.error('[Analytics] Error tracked:', error, context);
  }
}

/**
 * Track performance metrics
 */
export function trackPerformance(metric: string, value: number) {
  trackEvent('performance', 'Performance', metric, value);
}
