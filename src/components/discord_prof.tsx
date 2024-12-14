"use client";

import { Image } from "@chakra-ui/react";
import NextLink from "next/link";
import { useColorMode } from "./ui/color-mode";

export default function DiscordProf() {
	const { colorMode } = useColorMode();

	return (
		<NextLink
			href="https://discord.com/users/606093171151208448"
			target="_blank"
		>
			<Image
				src={`https://lanyard.cnrad.dev/api/606093171151208448?idleMessage=%E7%8F%BE%E5%AE%9F%E3%82%92%E3%83%97%E3%83%AC%E3%82%A4%E4%B8%AD&animated=false&showDisplayName=true&theme=${colorMode || "dark"}`}
				alt="discord profile image"
			/>
		</NextLink>
	);
}
