"use client";

import { toaster } from "@/components/ui/toaster";
import { ToggleTip } from "@/components/ui/toggle-tip";
import { Tooltip } from "@/components/ui/tooltip";
import {
	Card,
	Flex,
	GridItem,
	HStack,
	IconButton,
	Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { FaInfo } from "react-icons/fa6";
import type { CategoryQuery } from "./category_query";
import { links } from "./linksdata";

export default function Links({ category }: { category: CategoryQuery }) {
	const [copied, setCopied] = useState(-1);
	const [errored, setErrored] = useState(-1);

	return links
		.filter((link) => category === "all" || link.category === category)
		.map((link, i) => (
			<GridItem key={link.name}>
				<Card.Root size="sm" h="100%" variant="subtle">
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
										} catch (_error) {
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
}
