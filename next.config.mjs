/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		optimizePackageImports: ["@chakra-ui/react"],
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lanyard.cnrad.dev",
				pathname: "/api/606093171151208448",
				port: "",
				search: "",
			},
			{
				protocol: "https",
				hostname: "count.getloli.com",
				pathname: "/@KiRura",
			},
		],
	},
};

export default nextConfig;
