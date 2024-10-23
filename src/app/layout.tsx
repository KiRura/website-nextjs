import type React from "react";
import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";

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
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
