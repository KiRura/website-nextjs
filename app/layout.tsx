import { env } from "node:process";
import type { Metadata } from "next";
import { Google_Sans_Code, Noto_Sans_JP, Zalando_Sans } from "next/font/google";
import { Provider } from "@/components/ui/provider";

if (!env.BASE_URL) throw new Error("envにBASE_URLがない");

export const metadata: Metadata = {
	metadataBase: new URL(env.BASE_URL),
	title: {
		template: "%s | きるら",
		default: "きるら",
	},
	description: "しがないサイト",
};

const zalandoSans = Zalando_Sans({
	variable: "--font-zalando-sans",
	subsets: ["latin"],
	fallback: ["Arial"],
});

const notoSansJP = Noto_Sans_JP({
	variable: "--font-noto-sans-jp",
	subsets: ["latin"],
});

const googleSansCode = Google_Sans_Code({
	variable: "--font-google-sans-code",
	subsets: ["latin"],
	fallback: ["monospace"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<body
				className={`${zalandoSans.variable} ${notoSansJP.variable} ${googleSansCode.variable}`}
			>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
