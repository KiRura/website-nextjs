import { Container, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Deps } from "../../components/license/deps";

export const metadata: Metadata = {
	title: "ライセンス",
	description: "ライセンス一覧",
};

export default function Page() {
	return (
		<Container as="main" maxW="8xl" my={4}>
			<VStack gap={4}>
				<Heading>Deps</Heading>
				<SimpleGrid minChildWidth="xs" gap={2} w="full">
					<Deps />
				</SimpleGrid>
				{/* <Licenses /> */}
			</VStack>
		</Container>
	);
}
