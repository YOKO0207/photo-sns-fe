// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer");

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
	reactStrictMode: true,
	distDir: ".next",
	eslint: {
		dirs: ["hooks", "models", "pages", "utils"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
	},
	compiler: {
		// Enables the styled-components SWC transform
		styledComponents: true,
	},
};

module.exports = withPlugins([[bundleAnalyzer]], nextConfig);
