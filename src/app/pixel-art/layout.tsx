import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
	title: "PixelArt",
	description: "しがないピクセルアート交換所(パクリ)",
};

export default function Layout({ children }: PropsWithChildren) {
	return children;
}
