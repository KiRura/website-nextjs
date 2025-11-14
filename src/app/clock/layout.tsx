import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
	title: "時計",
	description: "しがない設計の時計",
};

export default function Layout(props: PropsWithChildren) {
	return props.children;
}
