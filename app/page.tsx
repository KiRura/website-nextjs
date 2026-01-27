"use client";

import {
	Box,
	Button,
	ButtonGroup,
	Card,
	Clipboard,
	Container,
	Flex,
	Heading,
	HStack,
	Icon,
	IconButton,
	Span,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { KiRuraColorIcon } from "@/components/icons";
import "./page.css";
import { LuArrowDown, LuExternalLink } from "react-icons/lu";
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

		// function handleOrientation(e: DeviceOrientationEvent) {
		// 	if (e.beta) setTopHeadingY(e.beta * 1.2);
		// 	if (e.gamma) setTopHeadingX(e.gamma * 1.2);
		// }
		// if (isMobile(window.navigator).any)
		// 	window.addEventListener("deviceorientation", handleOrientation);

		return () => {
			document.removeEventListener("mousemove", onMouseMove);
			// if (isMobile(window.navigator).any)
			// 	window.removeEventListener("deviceorientation", handleOrientation);
		};
	}, []);

	const [selectedLinkIndex, setSelectedLinkIndex] = useState(0);
	const selectedLink = links[selectedLinkIndex];
	function calcLinkPos(i: number) {
		return (selectedLinkIndex - i) * 4 + 75;
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
								bgColor="gray.100"
								borderWidth="1px"
								aria-hidden
							>
								<KiRuraColorIcon />
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
				maxW="full"
				h={["40rem", "40rem", "55rem"]}
				align="center"
				overflow="hidden"
				justifyContent="space-between"
				mdDown={{
					flexDir: "column",
				}}
				_after={{
					content: `""`,
					bgImage: {
						mdDown:
							"linear-gradient(to right, {colors.bg}, transparent 15%, transparent 85%, {colors.bg})",
						md: "linear-gradient(to bottom, {colors.bg}, transparent 30%, transparent 70%, {colors.bg})",
					},
					pos: "absolute",
					h: "full",
					w: "full",
					pointerEvents: "none",
					touchAction: "none",
				}}
			>
				<VStack
					key={`link-content-${selectedLink.label}-${selectedLink.id}`}
					h="full"
					align="start"
					justify="start"
					py={{ mdDown: "12", md: "52" }}
					pb={{ mdDown: "24" }}
					px={{ mdDown: "16", md: "20", lg: "40", xl: "48" }}
					pr={{ md: "32" }}
					flex="1"
					maxW={{ md: "80%" }}
					w={{ mdDown: "full" }}
					animationName="fade-in, slide-from-left"
					animationDuration="slow"
				>
					<Icon aria-hidden fontSize="7xl" color="fg.muted">
						<selectedLink.icon />
					</Icon>
					<Box as="hgroup" mb="4">
						<Heading
							as="h3"
							size={{ smDown: "5xl", sm: "6xl", md: "7xl" }}
							overflowWrap="anywhere"
							animationName="pulse"
							animationTimingFunction="linear"
							animationDuration={`${16 * 4}ms`}
							animationIterationCount={3}
						>
							{selectedLink.label}
						</Heading>
						<Text color="fg.muted" fontSize="lg">
							{selectedLink.description}
						</Text>
					</Box>
					<ButtonGroup size="xl" flexWrap="wrap">
						<IconButton aria-label="リンクを開く" asChild>
							<a href={selectedLink.href} target="_blank">
								<LuExternalLink />
							</a>
						</IconButton>
						<Clipboard.Root value={selectedLink.id}>
							<Clipboard.Trigger asChild>
								<Button variant="outline" fontFamily="mono">
									<Clipboard.ValueText />
									<Clipboard.Indicator />
								</Button>
							</Clipboard.Trigger>
						</Clipboard.Root>
					</ButtonGroup>
				</VStack>
				<Box
					rounded="full"
					h="150%"
					aspectRatio="square"
					mdDown={{
						rotate: "-270deg",
						mb: "-800px",
					}}
					mr={{
						md: "-1100px",
						xl: "-1000px",
						"2xl": "-600px",
					}}
					bgColor="bg.panel"
					borderWidth="4px"
				>
					{links.map((link, i) => (
						<Box
							data-active={selectedLinkIndex === i || undefined}
							data-hidden={
								calcLinkPos(i) > 100 || calcLinkPos(i) < 50 || undefined
							}
							w="fit"
							key={`link-${link.label}-${link.id}`}
							offsetPath="border-box"
							offsetRotate={{ mdDown: "-90deg", md: "0deg" }}
							transitionProperty="offset-distance"
							transitionDuration="slow"
							animationName="offset-from-100, fade-in"
							animationDuration="700ms"
							style={{
								offsetDistance: `${calcLinkPos(i)}%`,
							}}
							_hidden={{
								visibility: "hidden",
							}}
						>
							<Card.Root
								cursor="button"
								_hover={{ bgColor: "bg.subtle" }}
								transition="all"
								w={{ md: "48" }}
								variant="subtle"
								borderWidth="1px"
								onClick={() => setSelectedLinkIndex(i)}
								css={{
									"[data-active] &": {
										bgColor: "bg.panel",
										shadow: "md",
									},
								}}
								asChild
							>
								<button
									type="button"
									disabled={
										!(
											i - selectedLinkIndex < 3 && i - selectedLinkIndex > -3
										) || undefined
									}
								>
									<Card.Body>
										<Card.Title hideBelow="md">{link.label}</Card.Title>
										<Card.Title hideFrom="md" aria-label={link.label}>
											<link.icon />
										</Card.Title>
									</Card.Body>
								</button>
							</Card.Root>
						</Box>
					))}
				</Box>
			</Flex>
		</Box>
	);
};
