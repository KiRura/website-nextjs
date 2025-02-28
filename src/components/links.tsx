"use client";

import { Card, Flex, GridItem, HStack, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { links } from "./linksdata";
import { Tooltip } from "./ui/tooltip";

export function Links() {
	const [copied, setCopied] = useState(-1);
	const [errored, setErrored] = useState(-1);
	const [showedIndex, setShowedIndex] = useState(-1);

	useEffect(() => {
		const intervalId = setInterval(
			() => {
				setShowedIndex((i) => {
					console.log(i);
					if (i >= links.length - 1) {
						clearInterval(intervalId);
						return i;
					}
					return i + 2;
				});
			},
			(1 / 120) * 1000,
		);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return links.map((link, i) => (
		<GridItem
			key={link.name}
			visibility={showedIndex >= i ? "visible" : "hidden"}
			data-state={showedIndex >= i ? "open" : "closed"}
			_open={{
				animation: "ease-out",
				animationName: "scale-in, fade-in",
				animationDuration: "faster",
			}}
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
									} catch (_) {
										setErrored(i);
									}
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
}
