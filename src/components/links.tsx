"use client";

import { Card, Flex, HStack, Icon, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { AnimatedGridItem, type ElementWithKey } from "./animated_griditem";
import { Empties, type ColumnsType } from "./empties_number";
import { links } from "./linksdata";
import { Tooltip } from "./ui/tooltip";
import { EmptyCard } from "./empty_card";

export function Links(props: { columns: ColumnsType }) {
	const [copied, setCopied] = useState(-1);
	const [errored, setErrored] = useState(-1);

	const empties = Empties({
		columns: props.columns,
		arrayLength: links.length,
		children: <EmptyCard />,
	});

	return (
		<AnimatedGridItem
			elementArray={links
				.map((link, i) => {
					return {
						key: link.name,
						children: (
							<Card.Root size="sm" h="100%" variant="subtle" borderWidth={1}>
								<Card.Body>
									<Flex align="start" justify="space-between">
										<HStack mb={2}>
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
						),
					};
				})
				.concat(empties)}
		/>
	);
}
