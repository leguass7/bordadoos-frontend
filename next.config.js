const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')

const runtimeCaching = [
  {
    urlPattern: /.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'static-font-assets',
      expiration: {
        maxEntries: 4,
        maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
      }
    }
  },
  {
    urlPattern: /.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'static-image-assets',
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /.(?:js)$/i,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'static-js-assets',
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /.(?:css|less)$/i,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'static-style-assets',
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /.(?:json|xml|csv)$/i,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'static-data-assets',
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /.*/i,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'others',
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  }
]

const withPWAConfig = {
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: false,
  runtimeCaching
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true, // para funcionar o plugin `next-fonts`
    domains: ['sistema.jrbordados.com.br', 'jrbordados.com.br']
  },
  api: {
    bodyParser: {
      sizeLimit: '500kb'
    }
  }
}

module.exports = withPlugins(
  [
    // [withBundleAnalyzer({})],
    [withPWA, withPWAConfig]
    //[withImages, { inlineImageLimit: false }],
    //[withFonts]

    // ...
  ],
  nextConfig
)
