import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Deps } from "../../components/license/deps";

export const metadata: Metadata = {
	title: "ライセンス",
	description: "ライセンス一覧",
};

export default function Page() {
	return (
		<Container as="main" maxW="8xl" my="4" spaceY="4" fluid centerContent>
			<Heading>Deps</Heading>
			<SimpleGrid
				columns={{
					smDown: 1,
					sm: 1,
					md: 2,
					lg: 3,
					xl: 4,
				}}
				gap="2"
				w="full"
			>
				<Deps />
			</SimpleGrid>
			{/* <Licenses /> */}
		</Container>
	);
}
