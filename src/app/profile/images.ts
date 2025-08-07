"use client";

import { useEffect, useState } from "react";
import { useColorMode } from "@/components/ui/color-mode";

export function Images() {
	const { colorMode } = useColorMode();
	const [mount, setMount] = useState(false);

	useEffect(() => {
		setMount(true);
	}, []);

	if (!mount) return null;

	return [
		{
			alt: "Discord Profile Card",
			src: `https://lanyard.cnrad.dev/api/606093171151208448?theme=${colorMode === "light" ? "light" : "dark"}&borderRadius=0px&idleMessage=現実をプレイ中`,
		},
		{
			alt: "GitHub Status",
			src: `https://github-readme-stats.vercel.app/api?username=KiRura&hide_border=true${colorMode === "light" ? "" : "&theme=tokyonight"}`,
		},
		{
			alt: "Top Langs",
			src: `https://github-readme-stats.vercel.app/api/top-langs/?username=KiRura&hide_border=true${colorMode === "light" ? "" : "&theme=tokyonight"}`,
		},
	] satisfies {
		alt: string;
		src: string;
	}[];
}
