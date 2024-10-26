import { Toaster } from "@/components/ui/toaster";
import { Center, Container, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import Accounts from "./accounts";
import Servers from "./servers";

export default function Home() {
	return (
		<Container maxW="8xl">
			<Toaster />
			<Center my={24}>
				<Heading
					as="h1"
					size={{
						base: "4xl",
						sm: "5xl",
						md: "6xl",
					}}
				>
					Hello!,
					<br />
					きるら, (7)KiRura,
				</Heading>
			</Center>
			<Flex direction="column" align="center" mb={6}>
				<Heading mb={4}>Discord鯖</Heading>
				<SimpleGrid
					columns={{
						base: 1,
						sm: 1,
						md: 2,
					}}
					gap={4}
					maxW={720}
					w="100%"
				>
					<Servers />
				</SimpleGrid>
			</Flex>
			<Flex direction="column" align="center" mb={6}>
				<Heading mb={4}>他リンク</Heading>
				<SimpleGrid
					columns={{
						base: 1,
						sm: 2,
						md: 3,
						lg: 4,
					}}
					gap={4}
					w="100%"
				>
					<Accounts />
				</SimpleGrid>
			</Flex>
		</Container>
	);
}
