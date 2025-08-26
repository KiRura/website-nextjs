"use client";

import {
	Bleed,
	Box,
	Button,
	ButtonGroup,
	type ButtonProps,
} from "@chakra-ui/react";
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

export function Pages(props: ButtonProps) {
	const path = usePathname();

	return (
		<Box pos="relative" rounded="sm" borderWidth={1} overflow="hidden">
			<Bleed
				pos="absolute"
				zIndex="docked"
				left={0}
				w="4"
				h="full"
				bgGradient="to-r"
				gradientFrom="bg"
				gradientTo="transparent"
				pointerEvents="none"
			/>
			<Bleed
				pos="absolute"
				zIndex="docked"
				right={0}
				w="4"
				h="full"
				bgGradient="to-l"
				gradientFrom="bg"
				gradientTo="transparent"
				pointerEvents="none"
			/>
			<Box overflow="auto">
				<ButtonGroup attached>
					{pages.map((page, i) => {
						let active = false;
						if (
							page.href === path ||
							(page.href !== "/" && path.match(page.href))
						)
							active = true;

						return (
							<Button
								key={page.href}
								variant="outline"
								color={active ? "orange.fg" : "fg.muted"}
								borderY={0}
								border={i === 0 || i === pages.length - 1 ? 0 : undefined}
								asChild
								{...props}
							>
								<NextLink href={page.href}>
									{page.icon ? <page.icon /> : null}
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
