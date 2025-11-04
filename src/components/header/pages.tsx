"use client";

import { Bleed, Box, Button, ButtonGroup, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { FaBlog, FaClock, FaFileSignature } from "react-icons/fa6";

export const pages = [
	{
		name: "呟き",
		href: "/posts",
		icon: FaBlog,
	},
	{
		name: "時計",
		href: "/clock",
		icon: FaClock,
	},
	{
		name: "License",
		href: "/license",
		icon: FaFileSignature,
	},
];

export function Pages() {
	const path = usePathname();

	return (
		<Box pos="relative" overflow="hidden">
			{new Array(2).fill(0).map((_, i) => (
				<Bleed
					// biome-ignore lint/suspicious/noArrayIndexKey: <動かないから>
					key={i}
					pos="absolute"
					zIndex="docked"
					w="4"
					h="full"
					gradientFrom="bg"
					gradientTo="transparent"
					pointerEvents="none"
					{...(i === 0
						? { left: 0, bgGradient: "to-r" }
						: { right: 0, bgGradient: "to-l" })}
				/>
			))}
			<Box overflow="auto" scrollbarWidth="thin" px="4">
				<ButtonGroup wordWrap="normal" whiteSpace="nowrap" gap="6">
					{pages.map((page) => {
						const active = path.startsWith(page.href);

						return (
							<Button
								key={page.href}
								variant="plain"
								rounded="none"
								px="0"
								color={{ base: "fg.muted", _hover: "fg" }}
								borderBottomColor={{
									_hover: "border",
								}}
								fontSize="sm"
								borderWidth={0}
								borderYWidth="2px"
								{...(active && {
									color: { base: "orange.fg", _hover: "fg" },
									borderBottomColor: {
										base: "orange.emphasized",
										_hover: "orange.focusRing",
									},
									fontWeight: "medium",
								})}
								asChild
							>
								<NextLink href={page.href}>
									{page.icon && (
										<Icon size="sm">
											<page.icon />
										</Icon>
									)}
									{page.name}
								</NextLink>
							</Button>
						);
					})}
				</ButtonGroup>
			</Box>
		</Box>
	);
}
