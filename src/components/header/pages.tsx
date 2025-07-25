"use client";

import { Button, ButtonGroup, type ButtonProps } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { FaFileSignature } from "react-icons/fa6";

const pages = [
	{
		name: "License",
		href: "/license",
		icon: FaFileSignature,
	},
];

export function Pages(props: ButtonProps) {
	const path = usePathname();

	return (
		<ButtonGroup attached>
			{pages.map((page) => {
				let active = false;
				if (page.href === path || (page.href !== "/" && path.match(page.href)))
					active = true;

				return (
					<Button
						key={page.href}
						variant={active ? "solid" : "outline"}
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
