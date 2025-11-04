import {
	Box,
	Center,
	ClientOnly,
	Container,
	DataList,
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
	FaAnglesDown,
	FaDatabase,
	FaIcons,
	FaLink,
	FaUpRightFromSquare,
} from "react-icons/fa6";
import { Herta } from "@/components/herta";
import { Intro } from "@/components/intro";
import { Links } from "@/components/links";
import { TopButtons } from "@/components/top-buttons";
import { Aria } from "@/components/ui/aria";
import { ZZZ } from "@/components/zzz";

export default function Home() {
	return (
		<>
			<ZZZ />
			<Container pb="10" spaceY="16">
				<Center
					flexDir="column"
					minH="94vh" // ズームアウト時に大変なことになる
					gap={{ smDown: "4", sm: "6" }}
					py="10"
				>
					<Text
						fontSize={["5xl", "6xl", "6xl", "7xl"]}
						fontWeight="semibold"
						fontFamily="var(--font-monaspace-neon), var(--font-noto-sans-jp), monospace"
						filter={{
							base: "drop-shadow(0px 4px 4px {colors.bg})",
							_dark: "drop-shadow(0px 4px 6px {colors.bg/60})",
						}}
						whiteSpace="pre-wrap"
					>
						Hello!,
						<br />
						<Highlight
							query={["きるら", "(7)KiRura"]}
							styles={{
								color: "orange.300",
								fontWeight: "bold",
							}}
						>
							{"きるら,\n(7)KiRura,"}
						</Highlight>
					</Text>
					<TopButtons />
					<Icon color="fg.subtle">
						<FaAnglesDown />
					</Icon>
				</Center>
				<Aria title="関連" icon={<FaLink />}>
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
				<SimpleGrid
					columns={{ lgDown: 1, lg: 2 }}
					gap={{ lgDown: "16", lg: "4" }}
				>
					<Aria title="画像" icon={<FaIcons />}>
						<Center>
							<SimpleGrid columns={2} gap="4">
								<VStack>
									<Image
										asChild
										rounded="full"
										aspectRatio="square"
										borderWidth="2px"
										borderStyle="solid"
									>
										<NextImage
											src="/kirura/2048p.png"
											alt="kirura icon"
											height={2048}
											width={2048}
											unoptimized
										/>
									</Image>
									<Text fontSize="sm" color="fg.subtle" textAlign="center">
										ブランド的なもの
										<br />
										4年ぐらい使い続けた400x400のjpegのものをベースに
										<Link colorPalette="orange" asChild>
											<NextLink href="/brand">SVG</NextLink>
										</Link>
										に作り直した
									</Text>
								</VStack>
								<VStack>
									<Image
										asChild
										rounded="full"
										borderWidth="2px"
										borderStyle="solid"
									>
										<NextImage
											src="/kirura/amagi.png"
											alt="kirura icon 2"
											height={652}
											width={652}
											unoptimized
										/>
									</Image>
									<Text fontSize="sm" color="fg.subtle" textAlign="center">
										絵:{" "}
										<Link asChild colorPalette="orange">
											<NextLink href="https://x.com/meltqc" target="_blank">
												@meltqc
												<FaUpRightFromSquare />
											</NextLink>
										</Link>
									</Text>
								</VStack>
							</SimpleGrid>
						</Center>
					</Aria>
					<Aria title="情報" icon={<FaDatabase />}>
						<VStack>
							<DataList.Root
								variant="bold"
								orientation="horizontal"
								justifyContent="center"
								divideY="1px"
							>
								<Intro />
							</DataList.Root>
						</VStack>
					</Aria>
				</SimpleGrid>
			</Container>
			<Box borderTopWidth={1}>
				<Container pt="8" pb="28" centerContent>
					<ClientOnly>
						<Image
							src={`https://count.getloli.com/@KiRura-website${process.env.NODE_ENV === "development" ? "-dev" : ""}?darkmode=auto`}
							fetchPriority="low"
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
