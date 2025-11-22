"use client";

import {
	Box,
	Card,
	Center,
	Flex,
	Icon,
	Link,
	LinkOverlay,
	Span,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { FaCheck, FaCopy, FaUpRightFromSquare, FaXmark } from "react-icons/fa6";
import { links } from "./data";

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
			<Card.Root
				key={link.name}
				size="sm"
				h="full"
				flexDir="row"
				bg={{ base: "bg.panel", ...(link.href && { _hover: "bg.muted" }) }}
				transition="backgrounds"
			>
				<Box flex={1} overflow="hidden">
					<Card.Body gap="1.5" pr={link.href ? "0.5" : undefined}>
						<Flex gap="2.5" justify="space-between" align="start">
							<Card.Title
								color={{
									base: link.href ? "fg" : "fg.muted",
									_hover: "orange.fg",
								}}
								asChild={Boolean(link.href)}
								transition="common"
							>
								{link.href ? (
									<LinkOverlay asChild>
										<Link asChild variant="underline">
											<NextLink
												href={link.href}
												target="_blank"
												prefetch={false}
											>
												<Icon>
													<link.icon />
												</Icon>
												{link.name}
											</NextLink>
										</Link>
									</LinkOverlay>
								) : (
									link.name
								)}
							</Card.Title>
							<Link
								fontStyle="italic"
								color={{
									base: copied === i ? "blue.fg" : "fg.subtle",
									_hover: "blue.fg",
								}}
								transition="common"
								transitionProperty="color"
								fontSize="sm"
								fontFamily="mono"
								textAlign="right"
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
								whiteSpace="nowrap"
							>
								<Span overflow="hidden" pr="0.5" textOverflow="ellipsis">
									{link.accountId}
								</Span>
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
						<Card.Description>{link.description}</Card.Description>
					</Card.Body>
					{link.external ? (
						<Card.Footer justifyContent="end">
							<link.external />
						</Card.Footer>
					) : null}
				</Box>
				{link.href ? (
					<Center color="bg.emphasized" p="1.5">
						<FaUpRightFromSquare />
					</Center>
				) : null}
			</Card.Root>
		);
	});
}
