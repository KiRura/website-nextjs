"use client";

import {
	Card,
	Flex,
	HStack,
	Icon,
	Link,
	useBreakpoint,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { AnimatedGridItem, type ElementWithKey } from "./animated_griditem";
import { links } from "./linksdata";
import { Tooltip } from "./ui/tooltip";

const columns = {
	base: 1,
	sm: 1,
	md: 2,
	lg: 3,
	xl: 4,
};

export function Links() {
	const [copied, setCopied] = useState(-1);
	const [errored, setErrored] = useState(-1);
	const breakpoint = useBreakpoint({
		breakpoints: ["base", "sm", "md", "lg", "xl"],
	}) as "base" | "sm" | "md" | "lg" | "xl";
	const [emptiesNumber, setBleedsNumber] = useState(0);

	useEffect(() => {
		const column = columns[breakpoint];
		let num = column - (links.length % column);
		if (column === num) num = 0;
		setBleedsNumber(num);
	}, [breakpoint]);

	const empties: ElementWithKey[] = [];
	for (let i = 0; i < emptiesNumber; i++) {
		empties.push({
			key: i.toString(),
			element: (
				<Card.Root size="sm" h="100%" borderWidth={0} bg="bg.subtle">
					<Card.Body>
						<HStack>
							<Icon color="fg.subtle">
								<FaXmark />
							</Icon>
							<Card.Title color="fg.subtle">Empty</Card.Title>
						</HStack>
					</Card.Body>
				</Card.Root>
			),
		});
	}

	return (
		<AnimatedGridItem
			emptiesNumber={emptiesNumber}
			elementArray={links
				.map((link, i) => {
					return {
						key: link.name,
						element: (
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
						),
					};
				})
				.concat(empties)}
		/>
	);
}
