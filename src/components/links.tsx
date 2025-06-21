"use client";

import {
	Box,
	Card,
	Flex,
	HStack,
	IconButton,
	Link,
	LinkBox,
	LinkOverlay,
	Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { FaCheck, FaCopy, FaXmark } from "react-icons/fa6";
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
			<Card.Root key={link.name} size="sm" h="full">
				<Flex w="full" h="full">
					<LinkBox w="full">
						<Card.Body gap="1.5">
							<Flex gap="1.5" justify="space-between" align="start">
								<HStack>
									<link.icon />
									<Card.Title
										asChild={Boolean(link.href)}
										color={link.href ? "fg" : "fg.muted"}
									>
										{link.href ? (
											<LinkOverlay asChild>
												<Link asChild variant="underline">
													<NextLink href={link.href} target="_blank">
														{link.name}
													</NextLink>
												</Link>
											</LinkOverlay>
										) : (
											link.name
										)}
									</Card.Title>
								</HStack>
								<Text
									fontStyle="italic"
									color="fg.subtle"
									fontSize="sm"
									fontFamily="mono"
									overflowWrap="anywhere"
									textAlign="right"
								>
									{link.accountId}
								</Text>
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
					</LinkBox>
					<IconButton
						h="full"
						color="fg.muted"
						rounded="none"
						variant="ghost"
						borderLeftColor="border"
						onClick={() => {
							try {
								navigator.clipboard.writeText(link.accountId);
								setCopied(i);
							} catch (_) {
								setErrored(i);
							}
						}}
					>
						<Box
							asChild
							animation="ease-out"
							animationDuration="slow"
							animationName="scale-in, fade-in"
						>
							{copied === i ? (
								<FaCheck />
							) : errored === i ? (
								<FaXmark />
							) : (
								<FaCopy />
							)}
						</Box>
					</IconButton>
				</Flex>
			</Card.Root>
		);
	});
}
