"use client";

import { Bleed, Button, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRotateRight } from "react-icons/fa6";
import { useColorMode } from "../ui/color-mode";
import { Skeleton } from "../ui/skeleton";

export default function DiscordProf() {
	const { colorMode } = useColorMode();
	const [loading, setLoading] = useState(true);
	const [count, setCount] = useState(0);
	const [disabled, setDisabled] = useState(false);
	const [mount, setMount] = useState(false);

	useEffect(() => {
		setMount(true);
	}, []);

	return (
		<>
			<Skeleton loading={loading} w="full">
				{mount ? (
					<Image
						rounded="md"
						w="full"
						h="229.467px"
						src={`https://lanyard.cnrad.dev/api/606093171151208448?theme=${colorMode === "light" ? "light" : "dark"}&borderRadius=0px&idleMessage=現実をプレイ中 * ${count}&bg=${colorMode === "light" ? "FFFFFF" : "111111"}`}
						alt="discord profile image"
						onLoad={() => setLoading(false)}
					/>
				) : (
					<Bleed w="full" h="229.467px" />
				)}
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
				disabled={disabled}
			>
				<FaRotateRight /> リロード
			</Button>
		</>
	);
}
