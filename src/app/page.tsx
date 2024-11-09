import { DataListRoot } from "@/components/ui/data-list";
import { Toaster } from "@/components/ui/toaster";
import {
	Center,
	Container,
	Flex,
	Grid,
	Heading,
	Highlight,
	Image,
	Table,
	VStack,
} from "@chakra-ui/react";
import Accounts from "./accounts";
import { Intro, IntroSm } from "./intro";
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
					<Highlight
						query={["きるら", "(7)KiRura"]}
						styles={{ color: "orange.300" }}
					>
						きるら, (7)KiRura,
					</Highlight>
				</Heading>
			</Center>
			<VStack gap={4} mb={6}>
				<Heading>Discord鯖</Heading>
				<Grid
					templateColumns={{
						base: "repeat(1, 1fr)",
						md: "repeat(2, 1fr)",
					}}
					gap={3}
					maxW="3xl"
					w="100%"
				>
					<Servers />
				</Grid>
			</VStack>
			<VStack gap={4} mb={6}>
				<Heading>他リンク</Heading>
				<Grid
					templateColumns={{
						base: "repeat(1, 1fr)",
						sm: "repeat(2, 1fr)",
						md: "repeat(3, 1fr)",
						lg: "repeat(4, 1fr)",
					}}
					gap={3}
					w="100%"
				>
					<Accounts />
				</Grid>
			</VStack>
			<VStack gap={4} mb={24}>
				<Heading>自己紹介</Heading>
				<Table.Root w="fit" hideBelow="md">
					<Table.Body>
						<Intro />
					</Table.Body>
				</Table.Root>
				<DataListRoot hideFrom="md">
					<IntroSm />
				</DataListRoot>
			</VStack>
			<Flex justify="center" mb={32}>
				<Image src="https://count.getloli.com/@kirura-website" />
			</Flex>
		</Container>
	);
}
