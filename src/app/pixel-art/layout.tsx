import { Box } from "@chakra-ui/react";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
	title: "PixelArt",
	description: "しがないピクセルアート交換所(パクリ)",
};

export default function Layout({ children }: PropsWithChildren) {
	return (
		<Box fontFamily="var(--font-dot-gothic-16), {fonts.mono}">{children}</Box>
	);
}
