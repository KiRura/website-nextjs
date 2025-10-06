"use client";

import { Bleed, Box, Button, ButtonGroup } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
	FaAddressCard,
	FaBlog,
	FaClock,
	FaFileSignature,
} from "react-icons/fa6";

export const pages = [
	{
		name: "Blog (WIP)",
		href: "/posts",
		icon: FaBlog,
	},
	{
		name: "Profile",
		href: "/profile",
		icon: FaAddressCard,
	},
	{
		name: "Clock",
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
	const rootPath = path.split("/")[1] ?? "";

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
				<ButtonGroup wordWrap="normal" whiteSpace="nowrap" attached>
					{pages.map((page) => {
						const active = `/${rootPath}` === page.href;

						return (
							<Button
								key={page.href}
								variant="plain"
								rounded="none"
								color={{ base: "fg.muted", _hover: "fg" }}
								borderColor={{ base: "border", _hover: "border.emphasized" }}
								borderWidth={0}
								borderBottomWidth="2px"
								{...(active && {
									color: { base: "orange.fg", _hover: "fg" },
									borderColor: {
										base: "orange.emphasized",
										_hover: "orange.focusRing",
									},
								})}
								asChild
							>
								<NextLink href={page.href}>
									{page.icon && <page.icon />}
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
