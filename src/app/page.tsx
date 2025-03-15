import DiscordProf from "@/components/image/discord_prof";
import { Intro, IntroSm } from "@/components/intro";
import { Links } from "@/components/links";
import { DataListRoot } from "@/components/ui/data-list";
import { config } from "@/config";
import {
	Container,
	Grid,
	Heading,
	Highlight,
	Stack,
	Table,
	VStack,
} from "@chakra-ui/react";

export default function Home() {
	return (
		<Container maxW="8xl" {...config.transitionAnimation}>
			<Stack
				my={24}
				direction={{ smDown: "column", smToLg: "column", lg: "row" }}
				align="center"
				justify="center"
				gap={8}
			>
				<Heading
					size={{
						smDown: "5xl",
						sm: "5xl",
						md: "6xl",
					}}
					fontFamily="mono"
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
				<VStack>
					<DiscordProf />
				</VStack>
			</Stack>
			<VStack gap={6} mb={24}>
				<Heading>他リンク</Heading>
				<Grid
					templateColumns={{
						smDown: "repeat(1, 1fr)",
						md: "repeat(2, 1fr)",
						lg: "repeat(3, 1fr)",
						xl: "repeat(4, 1fr)",
					}}
					gap={3}
					w="100%"
				>
					<Links
						columns={{
							base: 1,
							sm: 1,
							md: 2,
							lg: 3,
							xl: 4,
						}}
					/>
				</Grid>
				<Heading>自己紹介</Heading>
				<Table.Root w="fit" hideBelow="sm">
					<Table.Body>
						<Intro />
					</Table.Body>
				</Table.Root>
				<DataListRoot hideFrom="sm">
					<IntroSm />
				</DataListRoot>
			</VStack>
		</Container>
	);
}
