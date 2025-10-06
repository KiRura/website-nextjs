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
import { useId } from "react";
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

	const id = useId();

	return (
		<ClientOnly>
			<Center
				zIndex={0}
				pos="absolute"
				overflow="hidden"
				w="full"
				h="94vh"
				{...config.inAnimation}
				smDown={{
					bg: "orange.300",
				}}
			>
				<Bleed
					pos="absolute"
					w="full"
					h="full"
					bgGradient="to-b"
					gradientFrom={["bg/50", "transparent"]}
					gradientTo="bg"
					zIndex={1}
				/>
				<Box rotate={{ smDown: "-90deg", sm: "-45deg" }}>
					{splitKiRuras.map((kiRuras, i) => (
						<HStack
							my="-1px"
							key={`${id}-split-${Math.random() * (i + 1)}`}
							color={{ smDown: "whiteAlpha.300", sm: "fg/3" }}
							{...(splitKiRuras.length / 2 <= i &&
								breakpoint !== "sm" && {
									bg: "orange.300",
									color: "whiteAlpha.300",
								})}
						>
							{kiRuras.map((doubleKiRuras) => (
								<HStack
									key={`${id}-double-${Math.random() * (i + 1)}`}
									animation={`slide-to-${i % 2 === 0 ? "left" : "right"}-full 100s linear infinite`}
								>
									{doubleKiRuras.map((KiRura) => (
										<KiRura key={`${id}-KiRura-${Math.random() * (i + 1)}`} />
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
