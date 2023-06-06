/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/apidocs',
                destination: '/docs/index.html'
            },
            {
                source: '/styles/main.css',
                destination: '/docs/styles/main.css'
            }
        ]
    }
}

module.exports = nextConfig
