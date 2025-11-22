"use client";

import {
	Bleed,
	Box,
	Center,
	type CenterProps,
	ClientOnly,
	HStack,
	Skeleton,
	Text,
	useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { config } from "@/config";
import { sliceByNumber } from "@/lib/slice-array";

function KiRura() {
	return (
		<Text
			whiteSpace="nowrap"
			fontSize="16rem"
			userSelect="none"
			fontWeight="extrabold"
			letterSpacing={12}
			lineHeight={0.95}
		>
			KiRura
		</Text>
	);
}

export function ZZZ({
	abs,
	accentColor,
	accentBgColor,
	...rest
}: {
	abs?: boolean;
	accentColor?: string;
	accentBgColor?: string;
} & CenterProps) {
	const [scrollPos, setScrollPos] = useState(0);

	useEffect(() => {
		if (abs) return;

		function handleScroll() {
			setScrollPos(
				Math.floor((window.pageYOffset / window.innerHeight) * 75) / 75,
			);
		}

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => window.removeEventListener("scroll", handleScroll);
	}, [abs]);

	const breakpoint = useBreakpointValue(["sm", "md", "lg", "xl", "2xl"]);
	const kiRuras = new Array(breakpoint === "sm" ? 2 * 4 * 2 : 2 * 4 * 10)
		.fill("")
		.map((_, i) => ({ key: i, KiRura }));
	const doubleKiRuras = sliceByNumber(kiRuras, 2);
	const splitKiRuras = sliceByNumber(doubleKiRuras, 4);

	const gradient = (
		<Bleed
			pos="absolute"
			w="full"
			h="full"
			bgGradient="to-b"
			gradientFrom={["bg/40", "transparent"]}
			gradientTo="bg"
		/>
	);

	return (
		<Center
			pos={abs ? "absolute" : "fixed"}
			overflow="hidden"
			top="0"
			w="full"
			h={{ "2xlDown": "vh", "2xl": "62rem" }}
			smDown={{
				bg: accentBgColor ?? "orange.300",
			}}
			{...(!abs && {
				opacity: 1 - scrollPos,
				display: scrollPos >= 1 ? "none" : undefined,
			})}
			{...rest}
		>
			<ClientOnly
				fallback={
					<>
						<Skeleton
							w="full"
							h="full"
							rounded="none"
							variant="shine"
							css={{
								"--start-color": "colors.bg.muted",
								"--end-color": "colors.bg",
							}}
						/>
						{!abs && gradient}
					</>
				}
			>
				<Box
					rotate={{ smDown: "-90deg", sm: "-45deg" }}
					{...config.inAnimation}
				>
					{splitKiRuras.map((doubleKiRuras, i) => (
						<HStack
							key={`split-kiruras-${doubleKiRuras[0][0].key}`}
							my="-1px"
							color={{ smDown: "whiteAlpha.300", sm: "fg/3" }}
							{...(splitKiRuras.length / 2 <= i && {
								sm: {
									bg: accentBgColor ?? "orange.300",
									color: accentColor ?? "whiteAlpha.300",
								},
							})}
						>
							{doubleKiRuras.map((kiRuras) => (
								<HStack
									key={`double-kiruras-${kiRuras[0].key}`}
									animationName={`slide-to-${i % 2 === 0 ? "left" : "right"}-full`}
									animationDuration="74s"
									animationTimingFunction="linear"
									animationIterationCount="infinite"
								>
									{kiRuras.map((kiRura) => (
										<kiRura.KiRura key={kiRura.key} />
									))}
								</HStack>
							))}
						</HStack>
					))}
				</Box>
				{!abs && gradient}
			</ClientOnly>
		</Center>
	);
}
