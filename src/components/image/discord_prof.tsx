"use client";

import { Button, Image } from "@chakra-ui/react";
import NextImage from "next/image";
import { useState } from "react";
import { FaRotateRight } from "react-icons/fa6";
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
				<Image asChild rounded="md" w="full">
					<NextImage
						src={`https://lanyard.cnrad.dev/api/606093171151208448?theme=${colorMode === "light" ? "light" : "dark"}&borderRadius=0px&idleMessage=現実をプレイ中 * ${count}&bg=${colorMode === "light" ? "FFFFFF" : "111111"}`}
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
				w="full"
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
