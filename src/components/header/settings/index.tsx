"use client";

import { CloseButton } from "@/components/ui/close-button";
import { Drawer, IconButton, Portal } from "@chakra-ui/react";
import { FaGear } from "react-icons/fa6";
import { Theme } from "./theme";

export function Settings() {
	return (
		<Drawer.Root>
			<Drawer.Trigger asChild>
				<IconButton variant="outline">
					<FaGear />
				</IconButton>
			</Drawer.Trigger>
			<Portal>
				<Drawer.Backdrop />
				<Drawer.Positioner>
					<Drawer.Content>
						<Drawer.Header>
							<Drawer.Title>設定</Drawer.Title>
						</Drawer.Header>
						<Drawer.Body>
							<Theme />
						</Drawer.Body>
						<Drawer.CloseTrigger asChild>
							<CloseButton />
						</Drawer.CloseTrigger>
					</Drawer.Content>
				</Drawer.Positioner>
			</Portal>
		</Drawer.Root>
	);
}
