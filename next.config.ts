import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		optimizePackageImports: ["@chakra-ui/react"],
	},
	images: {
		remotePatterns: [
			new URL(
				"https://images.microcms-assets.io/assets/fd9ed75988c24e79a125c1ebf6f304b3/**",
			),
		],
	},
};

export default nextConfig;
