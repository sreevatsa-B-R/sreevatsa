// Image optimization utilities
export const imageFormats = {
  webp: 'image/webp',
  avif: 'image/avif', 
  jpeg: 'image/jpeg',
  png: 'image/png'
};

// Check if browser supports modern image formats
export const supportsImageFormat = (format) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL(`image/${format}`).indexOf(`data:image/${format}`) === 0;
};

// Generate responsive image sources
export const generateImageSources = (imagePath, sizes = [400, 800, 1200]) => {
  const extension = imagePath.split('.').pop();
  const basePath = imagePath.replace(`.${extension}`, '');
  
  return sizes.map(size => ({
    size,
    webp: `${basePath}-${size}w.webp`,
    original: `${basePath}-${size}w.${extension}`,
    fallback: imagePath
  }));
};

// Lazy loading intersection observer
export const createLazyLoader = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px'
    });

    return imageObserver;
  }
  return null;
};

// WebP conversion utility (for future implementation)
export const convertToWebP = (file, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob(resolve, 'image/webp', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Image preloader for critical images
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Optimize image loading with different strategies
export const optimizeImageLoading = () => {
  // Preload critical images
  const criticalImages = [
    './assets/images/DSC_4237.jpg'
  ];
  
  criticalImages.forEach(preloadImage);
  
  // Setup lazy loading for non-critical images
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imageObserver = createLazyLoader();
  
  if (imageObserver) {
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  }
};
