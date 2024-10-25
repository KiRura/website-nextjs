import { Center, Container, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import Servers from "./servers";

export default function Home() {
	return (
		<Container maxW="8xl">
			<Center my={24}>
				<Heading
					as="h1"
					size={{
						base: "5xl",
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
		</Container>
	);
}
