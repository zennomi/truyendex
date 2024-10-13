/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mangadex.org',
            },
        ],
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    }
}

module.exports = nextConfig
