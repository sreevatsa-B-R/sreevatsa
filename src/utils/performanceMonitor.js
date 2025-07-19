// Performance monitoring and Core Web Vitals tracking
export class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.vitals = {};
    this.init();
  }

  init() {
    // Track Core Web Vitals
    this.trackLCP();
    this.trackFID();
    this.trackCLS();
    this.trackFCP();
    this.trackTTFB();
    
    // Track custom metrics
    this.trackResourceLoading();
    this.trackNavigation();
    
    // Send metrics after page load
    window.addEventListener('load', () => {
      setTimeout(() => this.sendMetrics(), 1000);
    });
  }

  // Largest Contentful Paint
  trackLCP() {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.vitals.lcp = lastEntry.startTime;
        console.log('LCP:', lastEntry.startTime);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP tracking not supported');
    }
  }

  // First Input Delay
  trackFID() {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          this.vitals.fid = entry.processingStart - entry.startTime;
          console.log('FID:', this.vitals.fid);
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID tracking not supported');
    }
  }

  // Cumulative Layout Shift
  trackCLS() {
    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.vitals.cls = clsValue;
        console.log('CLS:', clsValue);
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS tracking not supported');
    }
  }

  // First Contentful Paint
  trackFCP() {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.vitals.fcp = entry.startTime;
            console.log('FCP:', entry.startTime);
          }
        });
      });
      observer.observe({ entryTypes: ['paint'] });
    } catch (e) {
      console.warn('FCP tracking not supported');
    }
  }

  // Time to First Byte
  trackTTFB() {
    try {
      const navEntry = performance.getEntriesByType('navigation')[0];
      if (navEntry) {
        this.vitals.ttfb = navEntry.responseStart - navEntry.requestStart;
        console.log('TTFB:', this.vitals.ttfb);
      }
    } catch (e) {
      console.warn('TTFB tracking failed');
    }
  }

  // Resource loading performance
  trackResourceLoading() {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          if (entry.initiatorType) {
            const resourceType = entry.initiatorType;
            if (!this.metrics[resourceType]) {
              this.metrics[resourceType] = [];
            }
            this.metrics[resourceType].push({
              name: entry.name,
              duration: entry.duration,
              size: entry.transferSize || 0
            });
          }
        });
      });
      observer.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.warn('Resource tracking not supported');
    }
  }

  // Navigation timing
  trackNavigation() {
    try {
      window.addEventListener('load', () => {
        const navTiming = performance.getEntriesByType('navigation')[0];
        if (navTiming) {
          this.metrics.navigation = {
            dns: navTiming.domainLookupEnd - navTiming.domainLookupStart,
            tcp: navTiming.connectEnd - navTiming.connectStart,
            request: navTiming.responseStart - navTiming.requestStart,
            response: navTiming.responseEnd - navTiming.responseStart,
            domProcessing: navTiming.domContentLoadedEventStart - navTiming.responseEnd,
            domComplete: navTiming.domComplete - navTiming.domContentLoadedEventStart,
            loadComplete: navTiming.loadEventEnd - navTiming.loadEventStart
          };
        }
      });
    } catch (e) {
      console.warn('Navigation timing tracking failed');
    }
  }

  // Get performance grade based on Core Web Vitals
  getPerformanceGrade() {
    const grades = {
      lcp: this.vitals.lcp <= 2500 ? 'good' : this.vitals.lcp <= 4000 ? 'needs-improvement' : 'poor',
      fid: this.vitals.fid <= 100 ? 'good' : this.vitals.fid <= 300 ? 'needs-improvement' : 'poor',
      cls: this.vitals.cls <= 0.1 ? 'good' : this.vitals.cls <= 0.25 ? 'needs-improvement' : 'poor'
    };

    const goodCount = Object.values(grades).filter(grade => grade === 'good').length;
    if (goodCount === 3) return 'excellent';
    if (goodCount === 2) return 'good';
    if (goodCount === 1) return 'needs-improvement';
    return 'poor';
  }

  // Send metrics to analytics (placeholder)
  sendMetrics() {
    const performanceData = {
      vitals: this.vitals,
      metrics: this.metrics,
      grade: this.getPerformanceGrade(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: Date.now()
    };

    console.log('Performance Report:', performanceData);
    
    // In a real implementation, you would send this to your analytics service
    // analytics.track('performance_metrics', performanceData);
    
    // Store in localStorage for debugging
    localStorage.setItem('performance_metrics', JSON.stringify(performanceData));
  }

  // Get current metrics
  getMetrics() {
    return {
      vitals: this.vitals,
      metrics: this.metrics,
      grade: this.getPerformanceGrade()
    };
  }
}

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (typeof window !== 'undefined') {
    window.performanceMonitor = new PerformanceMonitor();
  }
};

// Helper function to log performance summary
export const logPerformanceSummary = () => {
  if (window.performanceMonitor) {
    const metrics = window.performanceMonitor.getMetrics();
    console.group('🚀 Performance Summary');
    console.log('Core Web Vitals:', metrics.vitals);
    console.log('Overall Grade:', metrics.grade);
    console.log('Full Report:', metrics);
    console.groupEnd();
  }
};
