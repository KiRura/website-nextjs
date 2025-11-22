import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		optimizePackageImports: ["@chakra-ui/react"],
	},
	images: {
		remotePatterns: [
			new URL("https://images.microcms-assets.io/assets/**"),
			new URL("https://media.tenor.com/**"),
		],
	},
};

export default nextConfig;
