import { config } from "@/config";
import { Container, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Deps } from "../../components/license/deps";

export const metadata: Metadata = {
	title: "ライセンス",
	description: "ライセンス一覧",
};

export default function Page() {
	return (
		<Container
			as="main"
			maxW="8xl"
			minH="vh"
			my={4}
			{...config.transitionAnimation}
		>
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
