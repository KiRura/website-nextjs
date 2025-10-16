"use client";

import { Button, Image, Presence } from "@chakra-ui/react";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { config } from "@/config";

export function Herta() {
	const [playing, setPlaying] = useState(false);
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
	const [kurukuru, setKurukuru] = useState<HTMLAudioElement[]>([]);
	useEffect(() => {
		setKurukuru([new Audio("/kuru1.flac"), new Audio("/kuru2.flac")]);
	}, []);

	if (!kurukuru.length) return null;

	function onClick() {
		window.scrollTo({ top: 0, behavior: "smooth" });

		if (timeoutId) clearTimeout(timeoutId);
		setPlaying(true);

		const audio = kurukuru[Math.round(Math.random() * (kurukuru.length - 1))];
		audio.volume = 0.3;
		audio.play();

		setTimeoutId(
			setTimeout(() => {
				setPlaying(false);
			}, 1000),
		);
	}

	const imageProps = {
		alt: "kurukuru~ herta",
		width: 500,
		height: 500,
		unoptimized: true,
		priority: true,
	};

	return (
		<Button
			variant="plain"
			pos="absolute"
			bottom={0}
			w="fit"
			h="fit"
			onClick={onClick}
			{...config.inAnimation}
			p="0"
			borderWidth="0"
		>
			<Presence
				present={playing}
				_closed={{
					animation: "ease-in",
					animationName: "slide-to-bottom-full",
					animationDuration: "slower",
				}}
				pos="fixed"
				bottom={{ smDown: "56px", sm: "0" }}
			>
				<Image maxW="32" asChild>
					<NextImage src="/kurukuru.webp" {...imageProps} loading="eager" />
				</Image>
			</Presence>
			{!playing && (
				<Image
					maxW="32"
					animation="esae-in"
					animationName="slide-from-bottom-full"
					animationDuration="slowest"
					filter="drop-shadow(0 0 6px {colors.fg.inverted/80})"
					asChild
				>
					<NextImage src="/herta.webp" {...imageProps} loading="eager" />
				</Image>
			)}
		</Button>
	);
}
