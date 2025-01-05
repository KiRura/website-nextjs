"use client";

import { toaster } from "@/components/ui/toaster";
import { ToggleTip } from "@/components/ui/toggle-tip";
import { Tooltip } from "@/components/ui/tooltip";
import {
	Card,
	CardBody,
	Flex,
	GridItem,
	HStack,
	Icon,
	IconButton,
	Link,
	useBreakpointValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { FaInfo, FaXmark } from "react-icons/fa6";
import type { CategoryQuery } from "./category_query";
import { type Links as LinksType, links } from "./linksdata";

const gridColumns = {
	base: 1,
	sm: 2,
	md: 3,
	lg: 4,
};

export default function Links({ category }: { category: CategoryQuery }) {
	const [copied, setCopied] = useState(-1);
	const [errored, setErrored] = useState(-1);
	const [previewLinks, setPreviewLinks] = useState(
		links.filter((link) => category === "all" || link.category === category),
	);
	const [opened, setOpened] = useState(previewLinks.length - 1);
	const breakpoint = useBreakpointValue(["base", "sm", "md", "lg"]) as
		| "base"
		| "sm"
		| "md"
		| "lg";
	const [bleedNumbers, setBleedNumbers] = useState(
		gridColumns[breakpoint] -
			(previewLinks.length % gridColumns[breakpoint] ||
				gridColumns[breakpoint]),
	);

	/* eslint react-hooks/rules-of-hooks: 0 */
	useEffect(() => {
		const filteredLinks = links.filter(filterLinks);
		if (
			previewLinks.toString() === filteredLinks.toString() &&
			gridColumns[breakpoint] -
				(filteredLinks.length % gridColumns[breakpoint] ||
					gridColumns[breakpoint]) ===
				bleedNumbers
		)
			return;
		setPreviewLinks(filteredLinks);
		setBleedNumbers(
			gridColumns[breakpoint] -
				(filteredLinks.length % gridColumns[breakpoint] ||
					gridColumns[breakpoint]),
		);
		setOpened(0);
		animate();
		function filterLinks(link: LinksType) {
			return category === "all" || link.category === category;
		}
		async function animate() {
			for (
				let i = 0;
				i <= filteredLinks.length - 1 + bleedNumbers;
				i += breakpoint === "base" || breakpoint === "sm" ? 1 : 2
			) {
				setOpened(i);
				await new Promise((res) =>
					setTimeout(
						res,
						breakpoint === "base" ? 75 : breakpoint === "sm" ? 30 : 1,
					),
				);
			}
		}
	}, [previewLinks, category, bleedNumbers, breakpoint]);

	const cards = previewLinks.map((link, i) => (
		<GridItem
			key={link.name}
			data-state={i <= opened ? "open" : "closed"}
			_open={{
				animationName:
					breakpoint === "base"
						? "slide-from-right, fade-in"
						: "scale-in, fade-in",
				animationDuration: "moderate",
			}}
			hidden={i > opened}
		>
			<Card.Root size="sm" h="100%" variant="subtle" borderWidth={1}>
				<Card.Body>
					<Flex align="start" justify="space-between">
						<HStack mb={2}>
							<link.icon />
							<Card.Title>
								{link.href ? (
									<Link asChild variant="underline">
										<NextLink href={link.href} target="_blank">
											{link.name}
										</NextLink>
									</Link>
								) : (
									link.name
								)}
							</Card.Title>
						</HStack>
						<Tooltip
							content={
								copied === i
									? "コピーされました"
									: errored === i
										? "コピーできませんでした"
										: "コピー"
							}
							showArrow
							positioning={{ placement: "top" }}
							onExitComplete={() => {
								setCopied(-1);
								setErrored(-1);
							}}
							closeOnPointerDown={false}
							closeOnClick={false}
							openDelay={0}
						>
							<Link
								fontStyle="italic"
								colorPalette="gray"
								fontSize="sm"
								overflowWrap="anywhere"
								ml={2}
								onClick={() => {
									try {
										navigator.clipboard.writeText(link.accountId);
										setCopied(i);
										/* eslint @typescript-eslint/no-unused-vars: 0 */
									} catch (_) {
										setErrored(i);
									}
								}}
								onTouchEnd={() => {
									toaster.create({
										title: "コピーされました",
										description: (
											<ToggleTip
												content={
													<>
														ToasterにResponsiveを追加しろChakraUI
														<br />
														ToasterのactionにIconButtonを使わせろChakraUI
														<br />
														zIndex diff
													</>
												}
											>
												<IconButton variant="surface" size="xs">
													<FaInfo />
												</IconButton>
											</ToggleTip>
										),
										action: {
											label: "閉じる",
											onClick() {},
										},
									});
								}}
							>
								{link.accountId}
							</Link>
						</Tooltip>
					</Flex>
					<Card.Description>{link.description}</Card.Description>
				</Card.Body>
			</Card.Root>
		</GridItem>
	));
	const bleedNumbersArray = [];
	for (let i = 0; i < bleedNumbers; i++) {
		bleedNumbersArray.push(i);
	}
	const bleeds = bleedNumbersArray.map((i) => (
		<GridItem
			key={`bleed_${i}`}
			data-state={i + previewLinks.length - 1 <= opened ? "open" : "closed"}
			_open={{ animationName: "scale-in", animationDuration: "fast" }}
			hidden={i + previewLinks.length - 1 > opened}
		>
			<Card.Root size="sm" h="100%" borderWidth={0} bg="bg.subtle">
				<CardBody>
					<HStack>
						<Icon color="fg.subtle">
							<FaXmark />
						</Icon>
						<Card.Title color="fg.subtle">Empty</Card.Title>
					</HStack>
				</CardBody>
			</Card.Root>
		</GridItem>
	));

	return cards.concat(bleeds);
}
