import { Container, SimpleGrid } from "@chakra-ui/react";
import type { Metadata } from "next";
import { FaFileImport } from "react-icons/fa6";
import Aria from "@/components/ui/aria";
import { Deps } from "../../components/license/deps";

export const metadata: Metadata = {
	title: "ライセンス",
	description: "ライセンス一覧",
};

export default function Page() {
	return (
		<Container as="main" py="8" spaceY="8">
			<Aria.Root>
				<Aria.TitleBar>
					<Aria.Title>
						<FaFileImport />
						依存関係
					</Aria.Title>
				</Aria.TitleBar>
				<Aria.Body asChild>
					<SimpleGrid
						columns={{
							smDown: 1,
							sm: 1,
							md: 2,
							lg: 3,
							xl: 4,
						}}
						gap="2"
					>
						<Deps />
					</SimpleGrid>
				</Aria.Body>
			</Aria.Root>
			{/* <Aria.Root>
				<Aria.TitleBar>
					<Aria.Title>
						<FaFileSignature />
						ライセンス
					</Aria.Title>
				</Aria.TitleBar>
				<Aria.Body>
					<Licenses />
				</Aria.Body>
			</Aria.Root> */}
		</Container>
	);
}
