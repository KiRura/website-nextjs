"use client";

import {
	CloseButton,
	Drawer,
	IconButton,
	Portal,
	Text,
} from "@chakra-ui/react";
import { FaGear, FaPalette } from "react-icons/fa6";
import { Aria } from "@/components/ui/aria";
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
							<Aria
								title="明暗"
								icon={<FaPalette />}
								titleProps={{ fontSize: "2xl" }}
							>
								<Theme />
							</Aria>
						</Drawer.Body>
						<Drawer.Footer flexDir="column" alignItems="start">
							<Text fontWeight="bold">Safari (WebKit)をご利用の方へ</Text>
							<Text>
								上記ブラウザエンジンにおけるデバッグ及び調整は一切行っておりません。如何なる視覚的なバグや挙動のバグも修正を行わず、あらゆる要望も受け付けません。
								<br />
								直近のSafariでフッターがアドレスバーに重なってしまうバグを確認していますが、Safari側の標準に従わない独自的な実装により発生しており、またそれに対する解決策も存在しません。
							</Text>
						</Drawer.Footer>
						<Drawer.CloseTrigger asChild>
							<CloseButton />
						</Drawer.CloseTrigger>
					</Drawer.Content>
				</Drawer.Positioner>
			</Portal>
		</Drawer.Root>
	);
}
