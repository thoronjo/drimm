'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initGA, trackPageView } from '@/lib/analytics';

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize GA on mount
    initGA();
  }, []);

  useEffect(() => {
    // Track page views on route change
    if (pathname) {
      const url = searchParams?.toString() 
        ? `${pathname}?${searchParams.toString()}`
        : pathname;
      
      trackPageView(url);
    }
  }, [pathname, searchParams]);

  return null;
}
