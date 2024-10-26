import Header from "@/components/header";
import { Provider } from "@/components/ui/provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";

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

const inter = Inter({
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" suppressHydrationWarning className={inter.className}>
			<body>
				<Provider>
					<Header />
					{children}
					<SpeedInsights />
				</Provider>
			</body>
		</html>
	);
}
