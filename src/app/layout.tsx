import Header from "@/components/header";
import { Provider } from "@/components/ui/provider";
import { config } from "@/config";
import type { Metadata, Viewport } from "next";
import {
	Inter,
	JetBrains_Mono,
	M_PLUS_1_Code,
	Noto_Sans_JP,
} from "next/font/google";
import type React from "react";

export const metadata: Metadata = {
	title: { template: "%s - きるら", default: "きるら" },
	description: "しがない個人サイト with Chakra UI v3",
	icons: `https://${config.domain}/kirura_rounded.png`,
	twitter: {
		card: "summary",
	},
	openGraph: {
		images: `https://${config.domain}/kirura.png`,
		locale: "ja_JP",
		type: "website",
	},
	authors: {
		name: "きるら",
	},
};

export const viewport: Viewport = {
	themeColor: "#FFBF7F",
};

const notoSansJp = Noto_Sans_JP({
	variable: "--font-noto-sans-jp",
	subsets: ["latin"],
});
const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});
const mPlus1Code = M_PLUS_1_Code({
	variable: "--font-m-plus-1-code",
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
			className={`${inter.variable} ${notoSansJp.variable} ${mPlus1Code.variable} ${jetBrainsMono.variable}`}
			suppressHydrationWarning
		>
			<head>
				<meta name="darkreader-lock" />
			</head>
			<body>
				<Provider>
					<Header />
					{children}
				</Provider>
			</body>
		</html>
	);
}
