import DiscordProf from "@/components/image/discord_prof";
import { Intro, IntroSm } from "@/components/intro";
import { Links } from "@/components/links";
import { DataListRoot } from "@/components/ui/data-list";
import {
	Box,
	Container,
	Flex,
	HStack,
	Heading,
	Highlight,
	Icon,
	SimpleGrid,
	Stack,
	Table,
	VStack,
} from "@chakra-ui/react";
import { FaDatabase, FaLink } from "react-icons/fa6";

export default function Home() {
	return (
		<>
			<Flex
				pos="absolute"
				align="center"
				justify="center"
				overflow="hidden"
				zIndex={-1}
				w="vw"
				top="28"
				animation="ease-out"
				animationDuration="slow"
				animationName="fade-in"
			>
				<Heading
					mx="auto"
					whiteSpace="none"
					rotate="12deg"
					fontSize={{ lgDown: "18rem", lg: "20rem", xl: "27rem" }}
					color="bg.subtle"
					userSelect="none"
					lineHeight="unset"
					fontWeight="extrabold"
					letterSpacing="wider"
				>
					KiRura
				</Heading>
			</Flex>
			<Container as="main" maxW="8xl" mb="10" fluid centerContent spaceY="6">
				<Stack
					direction={{ lgDown: "column", lg: "row" }}
					align="center"
					justify="center"
					gap="8"
					my="24"
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
				<HStack>
					<Icon boxSize="6">
						<FaLink />
					</Icon>
					<Heading size="2xl">他リンク</Heading>
				</HStack>
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
					<Links />
				</SimpleGrid>
				<HStack>
					<Icon boxSize="6">
						<FaDatabase />
					</Icon>
					<Heading size="2xl">自己紹介</Heading>
				</HStack>
				<Box>
					<Table.Root w="full" hideBelow="md">
						<Table.Body>
							<Intro />
						</Table.Body>
					</Table.Root>
					<DataListRoot hideFrom="md">
						<IntroSm />
					</DataListRoot>
				</Box>
			</Container>
		</>
	);
}
