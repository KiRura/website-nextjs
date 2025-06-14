"use client";

import { Aria } from "@/components/ui/aria";
import { CloseButton } from "@/components/ui/close-button";
import { Drawer, IconButton, Portal } from "@chakra-ui/react";
import { FaGear, FaPalette } from "react-icons/fa6";
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
							<Aria title="明暗" icon={<FaPalette />}>
								<Theme />
							</Aria>
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
