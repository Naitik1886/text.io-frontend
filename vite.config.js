import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Bundle analyzer - run build to see bundle composition
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true
    })
  ],
  
  build: {
    // Enable minification
    minify: 'terser',
    
    // Generate source maps for debugging (optional, remove for smaller builds)
    sourcemap: false,
    
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom'],
          
          // Routing
          'router': ['react-router-dom'],
          
          // UI libraries
          'ui-libs': ['react-hot-toast', 'lucide-react'],
          
          // Network & state
          'network-state': ['axios', 'socket.io-client', 'zustand']
        },
        
        // Optimize asset naming for better caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
          if (facadeModuleId) {
            return `js/[name]-[hash].js`
          }
          return `js/[name]-[hash].js`
        },
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.').at(1)
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `img/[name]-[hash][extname]`
          }
          if (/css/i.test(extType)) {
            return `css/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        }
      }
    },
    
    // Optimize build size
    target: 'esnext',
    
    // Enable CSS code splitting
    cssCodeSplit: true,
    
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000
  },
  
  // Optimize dependencies during development
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'axios',
      'socket.io-client',
      'zustand',
      'react-hot-toast',
      'lucide-react'
    ]
  },
  
  // Enable compression
  server: {
    compress: true
  }
})