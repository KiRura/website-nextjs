import { Box } from "@chakra-ui/react";
import type { Metadata, Viewport } from "next";
import { Inter, M_PLUS_1_Code, Noto_Sans_JP } from "next/font/google";
import localFont from "next/font/local";
import type React from "react";
import { Footer } from "@/components/footer";
import Header from "@/components/header";
import { Provider } from "@/components/ui/provider";

export const metadata: Metadata = {
	metadataBase: new URL("https://kirura.f5.si"),
	title: { template: "%s - きるら", default: "きるら" },
	description: "しがない個人サイト with Chakra UI v3",
	icons: `/kirura_rounded.png`,
	twitter: {
		card: "summary",
	},
	openGraph: {
		images: `/kirura.png`,
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
const monaspaceNeon = localFont({
	src: "../font/MonaspaceNeonVarVF[wght,wdth,slnt].woff2",
	variable: "--font-monaspace-neon",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="ja"
			className={`${inter.variable} ${notoSansJp.variable} ${mPlus1Code.variable} ${monaspaceNeon.variable}`}
			suppressHydrationWarning
		>
			<head>
				<meta name="darkreader-lock" />
			</head>
			<body>
				<Provider>
					<Box minH="vh">
						<Header />
						{children}
						<Footer />
					</Box>
				</Provider>
			</body>
		</html>
	);
}
