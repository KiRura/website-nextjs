"use client";

import {
	Box,
	Card,
	Center,
	Flex,
	HStack,
	Icon,
	Link,
	LinkBox,
	LinkOverlay,
	Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { FaCheck, FaCopy, FaUpRightFromSquare, FaXmark } from "react-icons/fa6";
import { links } from "./linksdata";

export function Links() {
	const [copied, setCopied] = useState(-1);
	const [errored, setErrored] = useState(-1);

	useEffect(() => {
		if (copied !== -1 || errored !== -1) {
			const timeout = setTimeout(() => {
				setCopied(-1);
				setErrored(-1);
			}, 1500);

			return () => {
				clearTimeout(timeout);
			};
		}
	}, [copied, errored]);

	return links.map((link, i) => {
		return (
			<LinkBox key={link.name}>
				<Card.Root
					size="sm"
					h="full"
					flexDir="row"
					bg={{ base: "bg.panel", ...(link.href && { _hover: "bg.muted" }) }}
				>
					<Box flex={1} overflow="hidden">
						<Card.Body gap="1.5">
							<Flex
								gap="2.5"
								justify="space-between"
								align="start"
								overflow="hidden"
							>
								<HStack>
									<link.icon />
									<Card.Title
										asChild={Boolean(link.href)}
										color={link.href ? "fg" : "fg.muted"}
									>
										{link.href ? (
											<Link asChild variant="underline">
												<LinkOverlay asChild>
													<NextLink href={link.href} target="_blank">
														{link.name}
													</NextLink>
												</LinkOverlay>
											</Link>
										) : (
											link.name
										)}
									</Card.Title>
								</HStack>
								<Link
									fontStyle="italic"
									color={{
										base: copied === i ? "fg" : "fg.subtle",
										_hover: "fg",
									}}
									fontSize="sm"
									fontFamily="mono"
									textAlign="right"
									variant="underline"
									onClick={() => {
										try {
											navigator.clipboard.writeText(link.accountId);
											setCopied(i);
										} catch (_) {
											setErrored(i);
										}
									}}
									overflow="hidden"
									zIndex="base"
								>
									<Text
										overflow="hidden"
										textOverflow="ellipsis"
										whiteSpace="nowrap"
										pr="0.5"
									>
										{link.accountId}
									</Text>
									<Box
										asChild
										animation="ease-out"
										animationDuration="slow"
										animationName="scale-in, fade-in"
										pos="sticky"
										right={0}
									>
										<Icon>
											{copied === i ? (
												<FaCheck />
											) : errored === i ? (
												<FaXmark />
											) : (
												<FaCopy />
											)}
										</Icon>
									</Box>
								</Link>
							</Flex>
							<Card.Description fontSize="md">
								{link.description}
							</Card.Description>
						</Card.Body>
						{link.external ? (
							<Card.Footer justifyContent="end">
								<link.external />
							</Card.Footer>
						) : null}
					</Box>
					{link.href ? (
						<Center color="fg.muted" p="1.5" borderLeftWidth={1}>
							<FaUpRightFromSquare />
						</Center>
					) : null}
				</Card.Root>
			</LinkBox>
		);
	});
}
