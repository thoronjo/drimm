/**
 * Performance monitoring utilities
 * Track Core Web Vitals and custom metrics
 */

import { trackPerformance } from './analytics';

/**
 * Report Web Vitals to analytics
 */
export function reportWebVitals(metric: any) {
  const { name, value, id } = metric;
  
  // Send to analytics
  trackPerformance(name, Math.round(value));

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${name}:`, {
      value: Math.round(value),
      id,
      metric,
    });
  }
}

/**
 * Measure custom performance metrics
 */
export class PerformanceMonitor {
  private marks: Map<string, number> = new Map();

  /**
   * Start measuring a metric
   */
  start(name: string) {
    this.marks.set(name, performance.now());
  }

  /**
   * End measuring and report the metric
   */
  end(name: string) {
    const startTime = this.marks.get(name);
    if (!startTime) {
      console.warn(`[Performance] No start mark found for: ${name}`);
      return;
    }

    const duration = performance.now() - startTime;
    this.marks.delete(name);

    // Report to analytics
    trackPerformance(name, Math.round(duration));

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${name}: ${Math.round(duration)}ms`);
    }

    return duration;
  }

  /**
   * Measure a function execution time
   */
  async measure<T>(name: string, fn: () => T | Promise<T>): Promise<T> {
    this.start(name);
    try {
      const result = await fn();
      this.end(name);
      return result;
    } catch (error) {
      this.end(name);
      throw error;
    }
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

/**
 * Monitor API response times
 */
export async function monitorApiCall<T>(
  endpoint: string,
  fetchFn: () => Promise<T>
): Promise<T> {
  const startTime = performance.now();
  
  try {
    const result = await fetchFn();
    const duration = performance.now() - startTime;
    
    trackPerformance(`api_${endpoint}`, Math.round(duration));
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API] ${endpoint}: ${Math.round(duration)}ms`);
    }
    
    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    trackPerformance(`api_${endpoint}_error`, Math.round(duration));
    throw error;
  }
}

/**
 * Get current performance metrics
 */
export function getPerformanceMetrics() {
  if (typeof window === 'undefined') return null;

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  if (!navigation) return null;

  return {
    // Page load metrics
    domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
    loadComplete: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
    
    // Network metrics
    dns: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
    tcp: Math.round(navigation.connectEnd - navigation.connectStart),
    request: Math.round(navigation.responseStart - navigation.requestStart),
    response: Math.round(navigation.responseEnd - navigation.responseStart),
    
    // Total time
    total: Math.round(navigation.loadEventEnd - navigation.fetchStart),
  };
}

/**
 * Log performance metrics to console (development only)
 */
export function logPerformanceMetrics() {
  if (process.env.NODE_ENV !== 'development') return;

  const metrics = getPerformanceMetrics();
  if (!metrics) return;

  console.table({
    'DOM Content Loaded': `${metrics.domContentLoaded}ms`,
    'Load Complete': `${metrics.loadComplete}ms`,
    'DNS Lookup': `${metrics.dns}ms`,
    'TCP Connection': `${metrics.tcp}ms`,
    'Request Time': `${metrics.request}ms`,
    'Response Time': `${metrics.response}ms`,
    'Total Load Time': `${metrics.total}ms`,
  });
}
