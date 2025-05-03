"use client";

import { Drawer, IconButton, Portal, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { Pages } from "./pages";
import { CloseButton } from "./ui/close-button";

export function FooterDrawer() {
	const [open, setOpen] = useState(false);

	return (
		<Drawer.Root
			open={open}
			onOpenChange={(e) => setOpen(e.open)}
			placement="bottom"
		>
			<Drawer.Trigger asChild>
				<IconButton hideFrom="md" variant="ghost">
					<FaBars />
				</IconButton>
			</Drawer.Trigger>
			<Portal>
				<Drawer.Backdrop />
				<Drawer.Positioner>
					<Drawer.Content>
						<Drawer.Header>
							<Drawer.Title>KiRura</Drawer.Title>
						</Drawer.Header>
						<Drawer.Body mb={4}>
							<VStack>
								<Pages />
							</VStack>
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
