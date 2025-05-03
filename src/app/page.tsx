import DiscordProf from "@/components/image/discord_prof";
import { Intro, IntroSm } from "@/components/intro";
import { Links } from "@/components/links";
import { DataListRoot } from "@/components/ui/data-list";
import {
	ClientOnly,
	Container,
	Heading,
	Highlight,
	SimpleGrid,
	Stack,
	Table,
	Text,
	VStack,
} from "@chakra-ui/react";

export default function Home() {
	return (
		<Container as="main" maxW="8xl">
			<Stack
				my={24}
				direction={{ lgDown: "column", lg: "row" }}
				align="center"
				justify="center"
				gap={8}
				w="full"
			>
				<Heading
					size={{
						smDown: "5xl",
						sm: "5xl",
						md: "6xl",
					}}
					fontFamily="var(--font-jetbrains-mono), var(--font-noto-sans-jp), monospace"
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
				<VStack w={{ smDown: "full", sm: "md" }}>
					<DiscordProf />
				</VStack>
			</Stack>
			<VStack gap={6} mb={24}>
				<Heading>他リンク</Heading>
				<ClientOnly fallback={<Text color="fg.muted">Wait a moment...</Text>}>
					<SimpleGrid
						columns={{
							smDown: 1,
							sm: 1,
							md: 2,
							lg: 3,
							xl: 4,
						}}
						w="full"
						gap={2}
					>
						<Links />
					</SimpleGrid>
				</ClientOnly>
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
		</Container>
	);
}
