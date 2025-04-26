"use client";

import { Card, Flex, For, HStack, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { links } from "./linksdata";
import { Tooltip } from "./ui/tooltip";

export function Links() {
	const [copied, setCopied] = useState(-1);
	const [errored, setErrored] = useState(-1);

	return (
		<For each={links}>
			{(link, i) => (
				<Card.Root key={link.name} size="sm">
					<Card.Header>
						<Flex justify="space-between" align="start">
							<HStack>
								<link.icon />
								<Card.Title asChild={Boolean(link.href)}>
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
									color="fg.subtle"
									fontSize="sm"
									fontFamily="mono"
									overflowWrap="anywhere"
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
					</Card.Header>
					<Card.Body pt={2}>
						<Card.Description>{link.description}</Card.Description>
					</Card.Body>
				</Card.Root>
			)}
		</For>
	);
}
