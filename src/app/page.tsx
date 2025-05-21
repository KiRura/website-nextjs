import DiscordProf from "@/components/image/discord_prof";
import { Intro } from "@/components/intro";
import { Links } from "@/components/links";
import { config } from "@/config";
import {
	Container,
	DataList,
	Flex,
	HStack,
	Heading,
	Highlight,
	Icon,
	Image,
	Link,
	SimpleGrid,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
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
				{...config.inAnimation}
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
						mdDown: 1,
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
					<Heading size="2xl">自己紹介 (改修中)</Heading>
				</HStack>
				<Flex
					align="center"
					w="full"
					direction={{ lgDown: "column", lg: "row" }}
				>
					<VStack w={{ lg: "1/2" }}>
						<Heading>アイコン</Heading>
						<Flex gap="4">
							<VStack w="1/2">
								<Image
									asChild
									rounded="full"
									boxSize={{ xlDown: "32", xl: "48", "2xl": "xs" }}
								>
									<NextImage
										src="/kirura.png"
										alt="kirura icon"
										height={400}
										width={400}
									/>
								</Image>
								<Text fontSize="sm" color="fg.subtle" textAlign="center">
									ブランド的なもの
									<br />
									プロジェクトファイルは紛失した
								</Text>
							</VStack>
							<VStack w="1/2">
								<Image
									asChild
									rounded="full"
									boxSize={{ xlDown: "32", xl: "48", "2xl": "xs" }}
								>
									<NextImage
										src="/kirura_2.png"
										alt="kirura icon 2"
										height={400}
										width={400}
									/>
								</Image>
								<Text fontSize="sm" color="fg.subtle" textAlign="center">
									Art:{" "}
									<Link asChild colorPalette="orange">
										<NextLink href="https://x.com/meltqc" target="_blank">
											@meltqc
										</NextLink>
									</Link>
								</Text>
							</VStack>
						</Flex>
					</VStack>
					<Flex w={{ lg: "1/2" }} justify="center">
						<DataList.Root
							variant="bold"
							orientation="horizontal"
							justifyContent="center"
							divideY="1px"
						>
							<Intro />
						</DataList.Root>
					</Flex>
				</Flex>
			</Container>
		</>
	);
}
