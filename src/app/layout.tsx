import { Box } from "@chakra-ui/react";
import type { Metadata, Viewport } from "next";
import {
	DotGothic16,
	Google_Sans_Code,
	Inter,
	M_PLUS_1_Code,
	Noto_Sans_JP,
} from "next/font/google";
import type React from "react";
import { Footer } from "@/components/navigation/footer";
import Header from "@/components/navigation/header";
import { Provider } from "@/components/ui/provider";

export const metadata: Metadata = {
	metadataBase: new URL("https://www.kirura.f5.si"),
	title: { template: "%s - きるら", default: "きるら" },
	description: "しがない個人サイト",
	icons: {
		icon: `/static/kirura/rounded/favicon.ico`,
		shortcut: "/static/kirura/512p.png",
	},
	twitter: {
		card: "summary",
	},
	openGraph: {
		images: `/static/kirura/768p.png`,
		locale: "ja_JP",
		type: "website",
		siteName: "きるら",
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
const googleSansCode = Google_Sans_Code({
	variable: "--font-google-sans-code",
	subsets: ["latin"],
});
const dotGothic16 = DotGothic16({
	weight: ["400"],
	variable: "--font-dot-gothic-16",
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
			className={`${inter.variable} ${notoSansJp.variable} ${dotGothic16.variable} ${mPlus1Code.variable} ${googleSansCode.variable}`}
			suppressHydrationWarning
		>
			<body>
				<p style={{ display: "none" }}>技術的ヲタクは世界を救う</p>
				<p style={{ display: "none" }}>芸術的ヲタクは心身を救う</p>
				<Provider>
					<Box minH="vh">
						<Header />
						{children}
					</Box>
					<Footer />
				</Provider>
			</body>
		</html>
	);
}
