import {
	Box,
	ClientOnly,
	Container,
	DataList,
	Flex,
	Heading,
	Highlight,
	Icon,
	Image,
	Link,
	SimpleGrid,
	Text,
	VStack,
} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import {
	FaDatabase,
	FaLink,
	FaUpRightFromSquare,
	FaWrench,
} from "react-icons/fa6";
import { Herta } from "@/components/herta";
import { Intro } from "@/components/intro";
import { Links } from "@/components/links";
import { MaybeICanUseThese } from "@/components/maybeicanusethese";
import { TopButtons } from "@/components/top-buttons";
import { Aria } from "@/components/ui/aria";
import { config } from "@/config";

export default function Home() {
	return (
		<>
			<Flex
				pos="absolute"
				align="center"
				justify="center"
				overflow="hidden"
				zIndex={-1}
				w="full"
				top={{ xlDown: "52", xl: "28" }}
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
			<Herta />
			<Container as="main" pb="10" spaceY="16">
				<Flex
					align="center"
					direction="column"
					gap={{ smDown: "4", sm: "8" }}
					my={{ lgDown: "32", lg: "48" }}
					flexWrap={{ smDown: "wrap" }}
				>
					<Heading
						size={{
							mdDown: "5xl",
							md: "6xl",
						}}
						fontFamily="var(--font-monaspace-neon), var(--font-noto-sans-jp), monospace"
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
					<TopButtons />
				</Flex>
				<Aria title="他リンク" icon={<FaLink />}>
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
				</Aria>
				<Aria title="自己紹介" icon={<FaDatabase />}>
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
										borderWidth="2px"
										borderStyle="solid"
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
										borderWidth="2px"
										borderStyle="solid"
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
												<FaUpRightFromSquare />
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
				</Aria>
				<Aria title="まあまあできる (作り途中)" icon={<FaWrench />}>
					<SimpleGrid
						columns={{
							mdDown: 1,
							mdToXl: 2,
							xl: 4,
						}}
						gap="2"
						w="full"
					>
						<MaybeICanUseThese />
					</SimpleGrid>
				</Aria>
			</Container>
			<Box borderTopWidth={1}>
				<Container pt="8" pb="28" centerContent>
					<ClientOnly>
						<Image
							src={`https://count.getloli.com/@KiRura?name=website${process.env.NODE_ENV === "development" ? "-dev" : ""}&darkmode=auto`}
						/>
					</ClientOnly>
					<Text color="bg">
						ヘッダーにある左上のアイコンを連打するとサプライズがあるよ！
					</Text>
				</Container>
			</Box>
		</>
	);
}
