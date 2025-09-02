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
			color="bg.subtle"
		>
			KiRura
		</Text>
	);
}

export function ZZZ() {
	const breakpoint = useBreakpointValue(["xs", "sm", "md"]);
	const kiRuras = Array.from({
		length: breakpoint === "xs" ? 20 : breakpoint === "sm" ? 130 : 500,
	})
		.fill(0)
		.map(() => KiRura);
	const doubleKiRuras = [];
	for (let i = 0; i < kiRuras.length; i++) {
		doubleKiRuras.push(kiRuras.splice(i, 4));
	}

	const splitKiRuras = [];
	for (let i = 0; i < doubleKiRuras.length; i++) {
		splitKiRuras.push(doubleKiRuras.splice(i, 5));
	}

	return (
		<ClientOnly>
			<Center
				zIndex={0}
				pos="absolute"
				overflow="hidden"
				maxW="full"
				h="full"
				maxH="75rem"
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
						<HStack key={Math.random()}>
							{kiRuras.map((doubleKiRuras) => (
								<HStack
									key={Math.random()}
									animation={`slide-to-${i % 2 === 0 ? "left" : "right"}-full 200s linear infinite`}
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
