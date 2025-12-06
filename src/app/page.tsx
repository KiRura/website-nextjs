import {
	Box,
	Center,
	ClientOnly,
	Container,
	Em,
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
							関連
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
				<SimpleGrid
					columns={{ lgDown: 1, lg: 2 }}
					gap={{ lgDown: "8", lg: "4" }}
				>
					<Aria.Root>
						<Aria.TitleBar>
							<Aria.Title>
								<FaIcons />
								画像
							</Aria.Title>
						</Aria.TitleBar>
						<Aria.Body>
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
												src="/static/kirura/768p.png"
												alt="kirura icon"
												height={768}
												width={768}
											/>
										</Image>
										<Em fontSize="sm" color="fg.muted" textAlign="center">
											ブランド的なもの
											<br />
											4年ぐらい使い続けた400x400のjpegのものをベースに
											<Link colorPalette="orange" asChild>
												<NextLink href="/brand">SVG</NextLink>
											</Link>
											に作り直した
										</Em>
									</VStack>
									<VStack>
										<Image
											asChild
											rounded="full"
											borderWidth="2px"
											borderStyle="solid"
										>
											<NextImage
												src="/static/kirura/amagi.png"
												alt="kirura icon 2"
												height={652}
												width={652}
											/>
										</Image>
										<Em fontSize="sm" color="fg.muted" textAlign="center">
											絵:{" "}
											<Link asChild colorPalette="orange">
												<NextLink href="https://x.com/meltqc" target="_blank">
													@meltqc
													<FaUpRightFromSquare />
												</NextLink>
											</Link>
										</Em>
									</VStack>
								</SimpleGrid>
							</Center>
						</Aria.Body>
					</Aria.Root>
					<Aria.Root>
						<Aria.TitleBar>
							<Aria.Title>
								<FaDatabase />
								情報
							</Aria.Title>
						</Aria.TitleBar>
						<Aria.Body>
							<Center>
								<Intro />
							</Center>
						</Aria.Body>
					</Aria.Root>
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
