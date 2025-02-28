"use client";

import { Image } from "@chakra-ui/react";
import NextImage from "next/image";
import { useState } from "react";
import { FaRotateRight } from "react-icons/fa6";
import { Button } from "../ui/button";
import { useColorMode } from "../ui/color-mode";
import { Skeleton } from "../ui/skeleton";

export default function DiscordProf() {
	const { colorMode } = useColorMode();
	const [loading, setLoading] = useState(true);
	const [count, setCount] = useState(0);
	const [disabled, setDisabled] = useState(false);

	return (
		<>
			<Skeleton asChild loading={loading}>
				<Image asChild fit="contain">
					<NextImage
						src={`https://lanyard.cnrad.dev/api/606093171151208448?theme=${colorMode || "dark"}&borderRadius=6px&idleMessage=現実をプレイ中 * ${count}`}
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
			<Button
				w="100%"
				variant="outline"
				color="fg.subtle"
				onClick={() => {
					setLoading(true);
					setCount((i) => i + 1);
					setDisabled(true);
					setTimeout(() => {
						setDisabled(false);
					}, 3 * 1000);
				}}
				loading={loading}
				disabled={disabled}
			>
				<FaRotateRight /> リロード
			</Button>
		</>
	);
}
