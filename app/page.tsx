"use client";

import {
	Box,
	Button,
	Container,
	Flex,
	HStack,
	Span,
	Text,
} from "@chakra-ui/react";
import isMobile from "ismobilejs";
import { useEffect, useState } from "react";
import { KiRuraIcon } from "@/components/icons";
import "./page.css";

export default () => {
	const [topHeadingX, setTopHeadingX] = useState(0);
	const [topHeadingY, setTopHeadingY] = useState(0);

	useEffect(() => {
		function onMouseMove(e: MouseEvent) {
			setTopHeadingX(e.clientX - document.documentElement.clientWidth / 2);
			setTopHeadingY(e.clientY - document.documentElement.clientHeight / 2);
		}
		document.addEventListener("mousemove", onMouseMove);

		function handleOrientation(e: DeviceOrientationEvent) {
			if (e.beta) setTopHeadingY(e.beta * 0.8);
			if (e.gamma) setTopHeadingX(e.gamma * 0.8);
		}
		if (isMobile(window.navigator).any)
			window.addEventListener("deviceorientation", handleOrientation);

		return () => {
			document.removeEventListener("mousemove", onMouseMove);
			if (isMobile(window.navigator).any)
				window.removeEventListener("deviceorientation", handleOrientation);
		};
	}, []);

	return (
		<Container as="main">
			<Flex
				my="10"
				flexDir="column"
				justify="center"
				maxW="full"
				borderYWidth="2px"
			>
				<Text
					color="bg.emphasized"
					fontWeight="black"
					fontSize={["5xl", "7xl", "8xl", "9xl"]}
					letterSpacing="widest"
					style={{
						transform: `translate(${Math.trunc(topHeadingX / 100)}px, ${Math.trunc(topHeadingY / 100)}px)`,
					}}
				>
					Hello!,
				</Text>
				<Flex
					align="end"
					justify="space-between"
					mdDown={{
						flexDir: "column",
						alignItems: "start",
					}}
					style={{
						transform: `translate(${Math.trunc(topHeadingX / 50)}px, ${Math.trunc(topHeadingY / 50)}px)`,
					}}
					transition="transform"
					transitionTimingFunction="ease-out"
					borderBottomColor="orange.solid"
					borderStyle="dotted"
					borderBottomWidth="2px"
					py="4"
					gap="4"
				>
					<Text as="h1">
						<HStack gap={["4", "4", "5", "6"]}>
							<Box
								h={["16", "28", "36", "44"]}
								w="auto"
								aspectRatio="square"
								color="bg.panel"
								bgColor="fg.muted"
								borderWidth="1px"
								aria-hidden
							>
								<KiRuraIcon />
							</Box>
							<Span letterSpacing="tight" color="fg.muted" lineHeight={1}>
								<Span
									fontWeight="extrabold"
									fontSize={["5xl", "7xl", "8xl", "9xl"]}
								>
									KiRura,
								</Span>
								<Span fontSize={["3xl", "5xl", "6xl"]}>
									<br />
									7KiRura,
								</Span>
							</Span>
						</HStack>
					</Text>
					<Button
						variant="surface"
						size="xl"
						minW="44"
						mdDown={{ minW: "0", w: "full" }}
						disabled
					>
						工事中
					</Button>
				</Flex>
				<Text
					color="bg.emphasized"
					fontWeight="black"
					fontSize={["5xl", "7xl", "8xl", "9xl"]}
					letterSpacing="wide"
					style={{
						transform: `translate(${Math.trunc(topHeadingX / 100)}px, ${Math.trunc(topHeadingY / 100)}px)`,
					}}
				>
					こんにちは！
				</Text>
			</Flex>
		</Container>
	);
};
