import {
	Box,
	ClientOnly,
	Container,
	DataList,
	Flex,
	Heading,
	Highlight,
	HStack,
	Image,
	Link,
	Separator,
	SimpleGrid,
	Stack,
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
import { ZZZ } from "@/components/zzz";

export default function Home() {
	return (
		<>
			<ZZZ />
			<Container pb="10" spaceY="16">
				<Flex justify="center">
					<VStack
						gap={{ smDown: "4", sm: "6" }}
						pt={{ lgDown: "32", lg: "48" }}
						pb={{ lgDown: "16", lg: "32" }}
						flexWrap={{ smDown: "wrap" }}
					>
						<Text
							fontSize={{
								smDown: "3xl",
								sm: "4xl",
								md: "5xl",
								lg: "6xl",
							}}
							fontWeight="semibold"
							fontFamily="var(--font-monaspace-neon), var(--font-noto-sans-jp), monospace"
							filter={{
								base: "drop-shadow(0px 4px 4px {colors.bg})",
								_dark: "drop-shadow(0px 4px 6px {colors.bg/60})",
							}}
						>
							Hello!,
							<br />
							<Highlight
								query={["きるら", "(7)KiRura"]}
								styles={{
									color: "orange.300",
									fontSize: { smDown: "4xl", sm: "5xl", md: "6xl", lg: "7xl" },
									fontWeight: "bold",
								}}
							>
								きるら, (7)KiRura,
							</Highlight>
						</Text>
						<Separator
							w="full"
							size="lg"
							borderColor={{ base: "blackAlpha.300", _dark: "whiteAlpha.300" }}
						/>
						<TopButtons />
					</VStack>
				</Flex>
				<Aria title="Links" icon={<FaLink />}>
					<SimpleGrid
						columns={{
							mdDown: 1,
							md: 2,
							lg: 3,
							xl: 4,
						}}
						gap="2"
					>
						<Links />
					</SimpleGrid>
				</Aria>
				<Aria title="Intro" icon={<FaDatabase />}>
					<Stack direction={{ lgDown: "column", lg: "row" }} align="center">
						<VStack flex={1} maxW={{ lgDown: "md" }} justify="center">
							<Heading>アイコン</Heading>
							<HStack align="start" justify="center">
								<VStack w="44%">
									<Image
										asChild
										rounded="full"
										aspectRatio="square"
										w="full"
										maxW="xs"
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
								<VStack w="44%">
									<Image
										asChild
										rounded="full"
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
							</HStack>
						</VStack>
						<VStack flex={1}>
							<DataList.Root
								variant="bold"
								orientation="horizontal"
								justifyContent="center"
								divideY="1px"
							>
								<Intro />
							</DataList.Root>
						</VStack>
					</Stack>
				</Aria>
				<Aria title="まあまあできる (作り途中)" icon={<FaWrench />}>
					<SimpleGrid
						columns={{
							mdDown: 1,
							mdToXl: 2,
							xl: 4,
						}}
						gap="2"
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
					<Text color="bg" hideBelow="sm">
						ヘッダーにある左上のアイコンを連打するとサプライズがあるよ！
					</Text>
					<Text color="bg" hideFrom="sm">
						メニューにあるKiRuraを連打するとサプライズがあるよ！
					</Text>
					<Herta />
				</Container>
			</Box>
		</>
	);
}
