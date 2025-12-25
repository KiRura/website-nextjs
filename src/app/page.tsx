import {
	Bleed,
	Box,
	Center,
	ClientOnly,
	Container,
	GridItem,
	Highlight,
	Icon,
	Image,
	SimpleGrid,
	Text,
	VStack,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { FaAnglesDown, FaLink } from "react-icons/fa6";
import { Herta } from "@/components/herta";
import { Intro } from "@/components/intro";
import { Links } from "@/components/links";
import { TopButtons } from "@/components/top-buttons";
import Aria from "@/components/ui/aria";
import { ZZZ } from "@/components/zzz";

export default function Home() {
	return (
		<>
			<ZZZ />
			<Container as="main" pb="10" spaceY="8">
				<Center
					flexDir="column"
					minH={{ "2xlDown": "94vh", "2xl": "60rem" }}
					gap={{ smDown: "4", sm: "6" }}
					py="4"
				>
					<Text
						fontSize={["5xl", "6xl", "6xl", "7xl"]}
						fontWeight="semibold"
						fontFamily="var(--font-google-sans-code), var(--font-noto-sans-jp), monospace"
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
				<Aria.Root>
					<Aria.TitleBar>
						<Aria.Title>
							<FaLink />
							Links
						</Aria.Title>
					</Aria.TitleBar>
					<Aria.Body>
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
					</Aria.Body>
				</Aria.Root>
				<SimpleGrid columns={[1, 1, 2, 2, 3]} gap="4">
					<GridItem colSpan={1}>
						<Aria.Root overflow="hidden">
							<Box pos="relative" aspectRatio={15 / 5}>
								<Image asChild>
									<NextImage src="/banner.jpg" alt="バナー画像" fill />
								</Image>
								<Bleed
									pos="absolute"
									w="full"
									h="full"
									bgGradient="to-b"
									gradientFrom="bg/10"
									gradientTo="bg"
								/>
								<VStack
									p="4"
									pb="0"
									pos="absolute"
									bottom="0"
									w="full"
									align="start"
									filter={{
										base: "drop-shadow(0px 4px 4px {colors.bg})",
										_dark: "drop-shadow(0px 4px 6px {colors.bg/60})",
									}}
									lineHeight={1.1}
								>
									<Text fontSize={["2xl", "4xl"]} fontWeight="bolder">
										About to
									</Text>
								</VStack>
							</Box>
							<Aria.TitleBar mt="0">
								<Aria.Title
									lineHeight={1.1}
									fontSize={["3xl", "4xl", "5xl"]}
									color="orange.fg"
									fontWeight="bolder"
								>
									きるら / (7)KiRura
								</Aria.Title>
							</Aria.TitleBar>
							<Aria.Body spaceY="1">
								<Text>
									しがない多趣味学生
									<br />
									ゲーム・このサイト(Next.js)・なんか凄い色々
								</Text>
								<Intro />
							</Aria.Body>
						</Aria.Root>
					</GridItem>
					<GridItem colSpan={{ xlDown: 1, xl: 2 }}>
						<Aria.Root h="full">
							<Aria.TitleBar>
								<Aria.Title>最近の呟き(眠い 後で実装する)</Aria.Title>
							</Aria.TitleBar>
							{/* <Aria.Body>
								<TopPosts />
							</Aria.Body> */}
						</Aria.Root>
					</GridItem>
				</SimpleGrid>
			</Container>
			<Box borderTopWidth={1}>
				<Container pt="8" centerContent>
					<ClientOnly>
						<Image
							src={`https://count.getloli.com/@KiRura-website${process.env.NODE_ENV === "development" ? "-dev" : ""}?darkmode=auto`}
							fetchPriority="low"
							alt="moe counter"
						/>
					</ClientOnly>
					<Box borderXWidth="2px">
						<Text color="bg" hideBelow="sm">
							ヘッダーにある左上のアイコンを連打するとサプライズがあるよ！
						</Text>
						<Text color="bg" hideFrom="sm">
							メニューにあるKiRuraを連打するとサプライズがあるよ！
						</Text>
					</Box>
					<Herta />
				</Container>
			</Box>
		</>
	);
}
