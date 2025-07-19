// SEO Audit Tool for Portfolio Website
export class SEOAuditor {
  constructor() {
    this.results = {
      score: 0,
      issues: [],
      improvements: [],
      passed: []
    };
  }

  // Run complete SEO audit
  async runAudit() {
    console.log('🔍 Starting SEO Audit...');
    
    this.checkMetaTags();
    this.checkHeadingStructure();
    this.checkImages();
    this.checkLinks();
    this.checkPerformance();
    this.checkAccessibility();
    this.checkStructuredData();
    this.checkMobileOptimization();
    this.checkSocial();
    this.checkSecurity();
    
    this.calculateScore();
    this.generateReport();
    
    return this.results;
  }

  // Check meta tags
  checkMetaTags() {
    const checks = [
      {
        test: () => document.querySelector('title'),
        name: 'Title tag exists',
        requirement: 'Page should have a title tag'
      },
      {
        test: () => {
          const title = document.querySelector('title');
          return title && title.textContent.length >= 30 && title.textContent.length <= 60;
        },
        name: 'Title length optimal',
        requirement: 'Title should be 30-60 characters'
      },
      {
        test: () => document.querySelector('meta[name="description"]'),
        name: 'Meta description exists',
        requirement: 'Page should have a meta description'
      },
      {
        test: () => {
          const desc = document.querySelector('meta[name="description"]');
          return desc && desc.content.length >= 120 && desc.content.length <= 160;
        },
        name: 'Meta description length optimal',
        requirement: 'Meta description should be 120-160 characters'
      },
      {
        test: () => document.querySelector('meta[name="viewport"]'),
        name: 'Viewport meta tag exists',
        requirement: 'Page should have viewport meta tag'
      },
      {
        test: () => document.querySelector('link[rel="canonical"]'),
        name: 'Canonical URL exists',
        requirement: 'Page should have canonical URL'
      }
    ];

    this.runChecks(checks, 'Meta Tags');
  }

  // Check heading structure
  checkHeadingStructure() {
    const h1s = document.querySelectorAll('h1');
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    const checks = [
      {
        test: () => h1s.length === 1,
        name: 'Single H1 tag',
        requirement: 'Page should have exactly one H1 tag'
      },
      {
        test: () => headings.length > 0,
        name: 'Heading tags exist',
        requirement: 'Page should have heading tags for structure'
      },
      {
        test: () => {
          let isProperOrder = true;
          let lastLevel = 0;
          headings.forEach(heading => {
            const level = parseInt(heading.tagName.charAt(1));
            if (level > lastLevel + 1) {
              isProperOrder = false;
            }
            lastLevel = level;
          });
          return isProperOrder;
        },
        name: 'Proper heading hierarchy',
        requirement: 'Headings should follow proper hierarchy (H1 > H2 > H3...)'
      }
    ];

    this.runChecks(checks, 'Heading Structure');
  }

  // Check images
  checkImages() {
    const images = document.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter(img => !img.alt || img.alt.trim() === '');
    const imagesWithoutSrc = Array.from(images).filter(img => !img.src);
    
    const checks = [
      {
        test: () => imagesWithoutAlt.length === 0,
        name: 'All images have alt text',
        requirement: 'All images should have descriptive alt text'
      },
      {
        test: () => imagesWithoutSrc.length === 0,
        name: 'All images have src attribute',
        requirement: 'All images should have valid src attribute'
      },
      {
        test: () => {
          const largeImages = Array.from(images).filter(img => {
            return img.naturalWidth > 1920 || img.naturalHeight > 1080;
          });
          return largeImages.length === 0;
        },
        name: 'Images are appropriately sized',
        requirement: 'Images should not be excessively large'
      }
    ];

    this.runChecks(checks, 'Images');
  }

  // Check links
  checkLinks() {
    const links = document.querySelectorAll('a');
    const externalLinks = Array.from(links).filter(link => 
      link.href && 
      link.hostname && 
      link.hostname !== window.location.hostname
    );
    const emptyLinks = Array.from(links).filter(link => !link.href || link.href === '#');
    
    const checks = [
      {
        test: () => emptyLinks.length === 0,
        name: 'No empty links',
        requirement: 'All links should have valid href attributes'
      },
      {
        test: () => {
          const externalWithoutTarget = externalLinks.filter(link => 
            !link.target || link.target !== '_blank'
          );
          return externalWithoutTarget.length === 0;
        },
        name: 'External links open in new tab',
        requirement: 'External links should open in new tab for better UX'
      },
      {
        test: () => {
          const linksWithoutText = Array.from(links).filter(link => 
            !link.textContent.trim() && !link.getAttribute('aria-label')
          );
          return linksWithoutText.length === 0;
        },
        name: 'All links have descriptive text',
        requirement: 'Links should have descriptive text or aria-label'
      }
    ];

    this.runChecks(checks, 'Links');
  }

  // Check performance indicators
  checkPerformance() {
    const checks = [
      {
        test: () => document.querySelector('link[rel="preconnect"]'),
        name: 'Preconnect links exist',
        requirement: 'Should preconnect to external domains'
      },
      {
        test: () => document.querySelector('link[rel="dns-prefetch"]'),
        name: 'DNS prefetch exists',
        requirement: 'Should prefetch DNS for external resources'
      },
      {
        test: () => {
          const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
          const criticalCSS = document.querySelector('style[data-critical]');
          return criticalCSS && stylesheets.length <= 3;
        },
        name: 'CSS optimization',
        requirement: 'Should have critical CSS inlined and minimal external stylesheets'
      },
      {
        test: () => {
          const scripts = document.querySelectorAll('script[src]');
          const asyncScripts = Array.from(scripts).filter(script => 
            script.async || script.defer
          );
          return asyncScripts.length === scripts.length;
        },
        name: 'Scripts are async/defer',
        requirement: 'External scripts should be async or defer'
      }
    ];

    this.runChecks(checks, 'Performance');
  }

  // Check accessibility
  checkAccessibility() {
    const checks = [
      {
        test: () => document.documentElement.lang,
        name: 'Language attribute exists',
        requirement: 'HTML should have lang attribute'
      },
      {
        test: () => {
          const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
          );
          return Array.from(focusableElements).every(el => 
            el.offsetWidth > 0 && el.offsetHeight > 0
          );
        },
        name: 'Focusable elements are visible',
        requirement: 'All focusable elements should be visible'
      },
      {
        test: () => document.querySelector('[role="main"], main'),
        name: 'Main content landmark',
        requirement: 'Page should have main content landmark'
      },
      {
        test: () => {
          const skipLinks = document.querySelectorAll('a[href^="#"]');
          return Array.from(skipLinks).some(link => 
            link.textContent.toLowerCase().includes('skip')
          );
        },
        name: 'Skip navigation exists',
        requirement: 'Should have skip navigation for accessibility'
      }
    ];

    this.runChecks(checks, 'Accessibility');
  }

  // Check structured data
  checkStructuredData() {
    const checks = [
      {
        test: () => document.querySelector('script[type="application/ld+json"]'),
        name: 'JSON-LD structured data exists',
        requirement: 'Should have structured data for search engines'
      },
      {
        test: () => {
          const jsonLD = document.querySelector('script[type="application/ld+json"]');
          if (!jsonLD) return false;
          try {
            const data = JSON.parse(jsonLD.textContent);
            return data['@type'] && data['@context'];
          } catch (e) {
            return false;
          }
        },
        name: 'Structured data is valid',
        requirement: 'Structured data should be valid JSON-LD'
      }
    ];

    this.runChecks(checks, 'Structured Data');
  }

  // Check mobile optimization
  checkMobileOptimization() {
    const checks = [
      {
        test: () => {
          const viewport = document.querySelector('meta[name="viewport"]');
          return viewport && viewport.content.includes('width=device-width');
        },
        name: 'Mobile viewport configured',
        requirement: 'Viewport should be configured for mobile devices'
      },
      {
        test: () => !document.querySelector('table:not([role])'),
        name: 'No layout tables',
        requirement: 'Should not use tables for layout'
      },
      {
        test: () => {
          const touchTargets = document.querySelectorAll('button, a, input[type="button"], input[type="submit"]');
          return Array.from(touchTargets).every(target => {
            const rect = target.getBoundingClientRect();
            return rect.width >= 44 && rect.height >= 44;
          });
        },
        name: 'Touch targets are adequately sized',
        requirement: 'Touch targets should be at least 44x44 pixels'
      }
    ];

    this.runChecks(checks, 'Mobile Optimization');
  }

  // Check social media optimization
  checkSocial() {
    const checks = [
      {
        test: () => document.querySelector('meta[property="og:title"]'),
        name: 'Open Graph title exists',
        requirement: 'Should have Open Graph title for social sharing'
      },
      {
        test: () => document.querySelector('meta[property="og:description"]'),
        name: 'Open Graph description exists',
        requirement: 'Should have Open Graph description'
      },
      {
        test: () => document.querySelector('meta[property="og:image"]'),
        name: 'Open Graph image exists',
        requirement: 'Should have Open Graph image'
      },
      {
        test: () => document.querySelector('meta[name="twitter:card"]'),
        name: 'Twitter Card exists',
        requirement: 'Should have Twitter Card meta tags'
      }
    ];

    this.runChecks(checks, 'Social Media');
  }

  // Check security
  checkSecurity() {
    const checks = [
      {
        test: () => window.location.protocol === 'https:',
        name: 'HTTPS protocol',
        requirement: 'Site should be served over HTTPS'
      },
      {
        test: () => {
          const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
          return Array.from(externalLinks).every(link => 
            link.rel && link.rel.includes('noopener')
          );
        },
        name: 'External links are secure',
        requirement: 'External links should have rel="noopener" for security'
      }
    ];

    this.runChecks(checks, 'Security');
  }

  // Helper method to run checks
  runChecks(checks, category) {
    checks.forEach(check => {
      try {
        if (check.test()) {
          this.results.passed.push(`✅ ${category}: ${check.name}`);
        } else {
          this.results.issues.push(`❌ ${category}: ${check.name} - ${check.requirement}`);
        }
      } catch (error) {
        this.results.issues.push(`⚠️ ${category}: ${check.name} - Error during test: ${error.message}`);
      }
    });
  }

  // Calculate overall score
  calculateScore() {
    const total = this.results.passed.length + this.results.issues.length;
    this.results.score = total > 0 ? Math.round((this.results.passed.length / total) * 100) : 0;
  }

  // Generate comprehensive report
  generateReport() {
    console.group('📊 SEO Audit Results');
    console.log(`Overall Score: ${this.results.score}/100`);
    console.log(`Passed: ${this.results.passed.length}`);
    console.log(`Issues: ${this.results.issues.length}`);
    
    if (this.results.passed.length > 0) {
      console.group('✅ Passed Checks');
      this.results.passed.forEach(item => console.log(item));
      console.groupEnd();
    }
    
    if (this.results.issues.length > 0) {
      console.group('❌ Issues Found');
      this.results.issues.forEach(item => console.log(item));
      console.groupEnd();
    }
    
    console.groupEnd();
    
    // Store results for external access
    window.seoAuditResults = this.results;
  }

  // Get grade based on score
  getGrade() {
    if (this.results.score >= 90) return 'A';
    if (this.results.score >= 80) return 'B';
    if (this.results.score >= 70) return 'C';
    if (this.results.score >= 60) return 'D';
    return 'F';
  }
}

// Initialize SEO audit
export const runSEOAudit = () => {
  const auditor = new SEOAuditor();
  return auditor.runAudit();
};

// Auto-run audit after page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      console.log('🚀 Auto-running SEO Audit...');
      runSEOAudit();
    }, 2000);
  });
}
