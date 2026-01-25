"use client";

import {
	Box,
	Button,
	Card,
	Container,
	Flex,
	HStack,
	Span,
	Text,
} from "@chakra-ui/react";
import isMobile from "ismobilejs";
import { useEffect, useRef, useState } from "react";
import { KiRuraIcon } from "@/components/icons";
import "./page.css";
import { LuArrowDown } from "react-icons/lu";
import { links } from "@/lib/const/links";

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
			if (e.beta) setTopHeadingY(e.beta * 1.2);
			if (e.gamma) setTopHeadingX(e.gamma * 1.2);
		}
		if (isMobile(window.navigator).any)
			window.addEventListener("deviceorientation", handleOrientation);

		return () => {
			document.removeEventListener("mousemove", onMouseMove);
			if (isMobile(window.navigator).any)
				window.removeEventListener("deviceorientation", handleOrientation);
		};
	}, []);

	const [selectedLink, setSelectedLink] = useState(0);
	function calcLinkPos(i: number) {
		return (selectedLink - i) * 5 + 75;
	}

	const linksSectionRef = useRef<HTMLDivElement | null>(null);

	return (
		<Box as="main" spaceY="8">
			<Container
				display="flex"
				flexDir="column"
				justifyContent="center"
				minH="vh"
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
						onClick={() =>
							linksSectionRef.current?.scrollIntoView({
								behavior: "smooth",
								block: "center",
							})
						}
					>
						<LuArrowDown />
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
			</Container>
			<Flex
				as="section"
				ref={linksSectionRef}
				pos="relative"
				justify="end"
				maxW="full"
				h={["40rem", "40rem", "55rem"]}
				align="center"
				overflow="hidden"
				_after={{
					content: `""`,
					bgImage:
						"linear-gradient(to bottom, {colors.bg}, transparent 30%, transparent 70%, {colors.bg})",
					mask: "linear-gradient(to bottom, {colors.bg}, transparent 30%, transparent 70%, {colors.bg})",
					backdropFilter: "blur({blurs.xl})",
					pos: "absolute",
					h: "full",
					w: "full",
					pointerEvents: "none",
				}}
			>
				<Box
					rounded="full"
					h="150%"
					aspectRatio="square"
					mr={{
						smDown: "-800px",
						sm: "-700px",
						md: "-1100px",
						xl: "-1000px",
						"2xl": "-800px",
					}}
					bgColor="bg.panel"
					borderWidth="4px"
				>
					{links.map((link, i) => (
						<Box
							data-active={selectedLink === i || undefined}
							data-hidden={
								calcLinkPos(i) > 100 || calcLinkPos(i) < 50 || undefined
							}
							w="fit"
							key={`link-${link.label}-${link.id}`}
							offsetPath="border-box"
							offsetRotate="0deg"
							transitionProperty="offset-distance"
							transitionDuration="slow"
							style={{
								offsetDistance: `${calcLinkPos(i)}%`,
							}}
							_hidden={{
								visibility: "hidden",
							}}
						>
							<Card.Root
								as="button"
								cursor="button"
								_hover={{ bgColor: "bg.subtle" }}
								transition="all"
								w="72"
								variant="subtle"
								borderWidth="1px"
								onClick={() => setSelectedLink(i)}
								css={{
									"[data-active] &": {
										bgColor: "bg.panel",
										shadow: "md",
									},
								}}
							>
								<Card.Body>
									<Card.Title>{link.label}</Card.Title>
									<Card.Description>{link.description}</Card.Description>
								</Card.Body>
							</Card.Root>
						</Box>
					))}
				</Box>
			</Flex>
		</Box>
	);
};
