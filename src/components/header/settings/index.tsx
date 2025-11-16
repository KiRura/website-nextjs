import {
	ClientOnly,
	CloseButton,
	Drawer,
	IconButton,
	Portal,
	Skeleton,
} from "@chakra-ui/react";
import { FaGear, FaPalette } from "react-icons/fa6";
import { Aria } from "@/components/ui/aria";
import { Theme } from "./theme";

export function Settings() {
	return (
		<ClientOnly
			fallback={
				<Skeleton>
					<IconButton />
				</Skeleton>
			}
		>
			<Drawer.Root lazyMount unmountOnExit>
				<Drawer.Trigger asChild>
					<IconButton variant="ghost">
						<FaGear />
					</IconButton>
				</Drawer.Trigger>
				<Portal>
					<Drawer.Backdrop />
					<Drawer.Positioner>
						<Drawer.Content>
							<Drawer.Header borderBottomWidth="1px" py="2" pr="2.5">
								<Drawer.Title>設定</Drawer.Title>
								<Drawer.CloseTrigger asChild>
									<CloseButton pos="static" />
								</Drawer.CloseTrigger>
							</Drawer.Header>
							<Drawer.Body paddingBlock="6">
								<Aria
									title="明暗"
									icon={<FaPalette />}
									titleProps={{ fontSize: "2xl", gap: "3" }}
								>
									<Theme />
								</Aria>
							</Drawer.Body>
							{/* <Drawer.Footer flexDir="column" alignItems="start">
								<Text fontWeight="bold">Safari (WebKit)をご利用の方へ</Text>
								<Text>
									上記ブラウザエンジンにおけるデバッグ及び調整は一切行っておりません。如何なる視覚的なバグや挙動のバグも修正を行わず、あらゆる要望も受け付けません。
									<br />
									直近のSafariでフッターがアドレスバーに重なってしまうバグを確認していますが、Safari側の標準に従わない独自的な実装により発生しており、またそれに対する解決策も存在していません。
								</Text>
							</Drawer.Footer> */}
						</Drawer.Content>
					</Drawer.Positioner>
				</Portal>
			</Drawer.Root>
		</ClientOnly>
	);
}
