import Header from "@/components/header";
import { Provider } from "@/components/ui/provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_JP } from "next/font/google";
import type React from "react";
import "./global.css";
import { Footer } from "@/components/footer";
import { config } from "@/config";
import { Box } from "@chakra-ui/react";

export const metadata: Metadata = {
	title: "きるら",
	description: "しがない個人サイト with Chakra UI v3",
	icons: "https://kirura.vercel.app/kirura_rounded.png",
	twitter: {
		card: "summary",
		images: "https://kirura.vercel.app/kirura.png",
	},
	openGraph: {
		images: "https://kirura.vercel.app/kirura.png",
	},
};

const notoSansJp = Noto_Sans_JP({
	variable: "--font-noto-sans-jp",
	subsets: ["latin"],
});
const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});
const jetBrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="ja"
			className={`${inter.variable} ${notoSansJp.variable} ${jetBrainsMono.variable}`}
			suppressHydrationWarning
		>
			<head>
				<meta name="darkreader-lock" />
			</head>
			<body>
				<Provider>
					<Header />
					<Box as="main" minH="100vh" {...config.transitionAnimation}>
						{children}
					</Box>
					<Footer />
					<SpeedInsights />
				</Provider>
			</body>
		</html>
	);
}
