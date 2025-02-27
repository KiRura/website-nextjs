"use client";

import { Image } from "@chakra-ui/react";
import NextImage from "next/image";
import { useState } from "react";
import { useColorMode } from "../ui/color-mode";
import { Skeleton } from "../ui/skeleton";

export default function DiscordProf() {
	const { colorMode } = useColorMode();
	const [loading, setLoading] = useState(true);

	return (
		<Skeleton asChild loading={loading}>
			<Image asChild fit="contain">
				<NextImage
					src={`https://lanyard.cnrad.dev/api/606093171151208448?theme=${colorMode || "dark"}`}
					alt="discord profile image"
					unoptimized
					width={410}
					height={210}
					onLoad={() => {
						setLoading(false);
					}}
				/>
			</Image>
		</Skeleton>
	);
}
