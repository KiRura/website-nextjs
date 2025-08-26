import { Container, SimpleGrid, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import { FaFileImport, FaFileSignature } from "react-icons/fa6";
import Licenses from "@/components/license/licenses";
import { Aria } from "@/components/ui/aria";
import { Deps } from "../../components/license/deps";

export const metadata: Metadata = {
	title: "ライセンス",
	description: "ライセンス一覧",
};

export default function Page() {
	return (
		<Container py="4" spaceY="8" centerContent>
			<Aria title="依存関係" icon={<FaFileImport />} w="full">
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
			</Aria>
			<Aria title="ライセンス" icon={<FaFileSignature />} w="full" maxW="3xl">
				<VStack>
					<Licenses />
				</VStack>
			</Aria>
		</Container>
	);
}
