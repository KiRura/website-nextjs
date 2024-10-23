import Header from "@/components/header";
import { Provider } from "@/components/ui/provider";
import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
	title: "きるら",
	description: "しがない個人サイト with Chakra UI v3",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<body>
				<Provider>
					<Header />
					{children}
				</Provider>
			</body>
		</html>
	);
}
