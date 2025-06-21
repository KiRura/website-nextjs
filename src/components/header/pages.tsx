"use client";

import { Button } from "@chakra-ui/react";
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

export function Pages() {
	const path = usePathname();

	return pages.map((page) => {
		let isActive = false;
		if (page.href === path || (page.href !== "/" && path.match(page.href)))
			isActive = true;

		return (
			<Button
				key={page.name}
				variant={isActive ? "subtle" : "outline"}
				asChild
				color={isActive ? "fg" : "fg.subtle"}
			>
				<NextLink href={page.href}>
					{page.icon ? <page.icon /> : null}
					{page.name}
				</NextLink>
			</Button>
		);
	});
}
