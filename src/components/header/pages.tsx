"use client";

import { Button, ButtonGroup, type ButtonProps } from "@chakra-ui/react";
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
		<ButtonGroup attached overflow="auto" rounded="sm" borderWidth={1}>
			{pages.map((page, i) => {
				let active = false;
				if (page.href === path || (page.href !== "/" && path.match(page.href)))
					active = true;

				return (
					<Button
						key={page.href}
						variant={active ? "solid" : "outline"}
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
	);
}
