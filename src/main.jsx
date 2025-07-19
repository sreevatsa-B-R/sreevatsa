import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { initPerformanceMonitoring, logPerformanceSummary } from './utils/performanceMonitor.js'
import { optimizeImageLoading } from './utils/imageOptimization.js'
import { runSEOAudit } from './utils/seoAuditor.js'

// Initialize performance monitoring
initPerformanceMonitoring();

// Optimize image loading
document.addEventListener('DOMContentLoaded', optimizeImageLoading);

// Run comprehensive audits after page load
window.addEventListener('load', () => {
  setTimeout(() => {
    console.log('🔧 Running Website Audits...');
    logPerformanceSummary();
    runSEOAudit();
  }, 3000);
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
