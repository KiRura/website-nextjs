"use client";

import { Image } from "@chakra-ui/react";
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

	if (kurukuru.length)
		return (
			<Image
				asChild
				pos={{ smDown: "absolute", sm: "fixed" }}
				zIndex={{ sm: "overlay" }}
				bottom={0}
				left={{ smDown: "50%" }}
				ml={{ smDown: "-10" }}
				right={{ sm: "0" }}
				maxW={{ smDown: "20", sm: "32" }}
				w="full"
				onClick={() => {
					window.scrollTo({ top: 0, behavior: "smooth" });

					if (timeoutId) clearTimeout(timeoutId);
					setPlaying(true);

					const audio =
						kurukuru[Math.round(Math.random() * (kurukuru.length - 1))];
					audio.volume = 0.3;
					audio.play();

					setTimeoutId(
						setTimeout(() => {
							setPlaying(false);
						}, 1000),
					);
				}}
				{...config.inAnimation}
			>
				<NextImage
					src={playing ? "/kurukuru.webp" : "/herta.webp"}
					alt="kurukuru~ herta"
					width={500}
					height={500}
					unoptimized
					priority
				/>
			</Image>
		);
}
