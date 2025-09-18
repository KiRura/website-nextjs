"use client";

import {
	Bleed,
	Box,
	Center,
	ClientOnly,
	HStack,
	Text,
	useBreakpointValue,
} from "@chakra-ui/react";
import { config } from "@/config";
import { sliceByNumber } from "@/lib/slice-array";

function KiRura() {
	return (
		<Text
			whiteSpace="none"
			fontSize="16rem"
			userSelect="none"
			fontWeight="extrabold"
			letterSpacing={12}
			h="fit"
			lineHeight={0.95}
		>
			KiRura
		</Text>
	);
}

export function ZZZ() {
	const breakpoint = useBreakpointValue(["sm", "md", "lg", "xl", "2xl"]);
	const kiRuras = Array.from({
		length:
			breakpoint === "sm"
				? 2 * 4
				: breakpoint === "md"
					? 2 * 4 * 6
					: breakpoint === "lg"
						? 2 * 4 * 6
						: breakpoint === "xl"
							? 2 * 4 * 8
							: 2 * 4 * 10,
	})
		.fill(0)
		.map(() => KiRura);
	const doubleKiRuras = sliceByNumber(kiRuras, 2);
	const splitKiRuras = sliceByNumber(doubleKiRuras, 4);

	return (
		<ClientOnly>
			<Center
				zIndex={0}
				pos="absolute"
				overflow="hidden"
				w="vw"
				top="-40"
				h="60rem"
				{...config.inAnimation}
			>
				<Bleed
					pos="absolute"
					w="full"
					h="full"
					bgGradient="to-b"
					gradientFrom="transparent"
					gradientTo="bg"
					zIndex={1}
				/>
				<Box rotate={{ smDown: "-90deg", sm: "-45deg" }}>
					{splitKiRuras.map((kiRuras, i) => (
						<HStack
							key={Math.random()}
							color="fg/3"
							{...(splitKiRuras.length / 2 <= i &&
								breakpoint !== "sm" && {
									bg: "orange.300",
									color: "white/15",
								})}
						>
							{kiRuras.map((doubleKiRuras) => (
								<HStack
									key={Math.random()}
									animation={`slide-to-${i % 2 === 0 ? "left" : "right"}-full 100s linear infinite`}
								>
									{doubleKiRuras.map((KiRura) => (
										<KiRura key={Math.random()} />
									))}
								</HStack>
							))}
						</HStack>
					))}
				</Box>
			</Center>
		</ClientOnly>
	);
}
