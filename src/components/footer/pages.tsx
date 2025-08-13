"use client";

import {
	Button,
	CloseButton,
	Drawer,
	IconButton,
	Portal,
	SimpleGrid,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaXmark } from "react-icons/fa6";
import { HomeLink } from "../header/homelink";
import { pages } from "../header/pages";

export function Pages() {
	const path = usePathname();

	return (
		<Drawer.Root placement="bottom">
			<Drawer.Trigger asChild>
				<IconButton variant="outline">
					<FaBars />
				</IconButton>
			</Drawer.Trigger>
			<Portal>
				<Drawer.Backdrop hideFrom="sm" />
				<Drawer.Positioner hideFrom="sm">
					<Drawer.Content bg="bg">
						<Drawer.Header justifyContent="center">
							<HomeLink footer />
						</Drawer.Header>
						<Drawer.Body mb="6">
							<SimpleGrid columns={2} gap="1.5" w="full">
								{pages
									.map((page) => {
										let active = false;
										if (
											page.href === path ||
											(page.href !== "/" && path.match(page.href))
										)
											active = true;
										return (
											<Drawer.ActionTrigger key={page.href} asChild>
												<Button
													variant={active ? "solid" : "outline"}
													justifyContent="start"
													asChild
												>
													<NextLink href={page.href}>
														{page.icon ? <page.icon /> : null}
														{page.name}
													</NextLink>
												</Button>
											</Drawer.ActionTrigger>
										);
									})
									.concat(
										<Button
											key="empty"
											disabled
											variant="outline"
											justifyContent="start"
											color="fg.subtle"
										>
											<FaXmark />
											Empty
										</Button>,
									)}
							</SimpleGrid>
						</Drawer.Body>
						<Drawer.CloseTrigger asChild>
							<CloseButton size="sm" />
						</Drawer.CloseTrigger>
					</Drawer.Content>
				</Drawer.Positioner>
			</Portal>
		</Drawer.Root>
	);
}
