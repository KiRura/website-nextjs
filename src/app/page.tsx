import {
	Bleed,
	Box,
	Center,
	ClientOnly,
	Container,
	DataList,
	Flex,
	Heading,
	Highlight,
	HStack,
	Image,
	Link,
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
import { config } from "@/config";

function KiRura() {
	return (
		<Text
			whiteSpace="none"
			fontSize="16rem"
			userSelect="none"
			fontWeight="extrabold"
			letterSpacing={12}
			h="fit"
			lineHeight={0.95}
			color={Math.random() < 0.07 ? "orange.subtle" : "bg.subtle"}
		>
			KiRura
		</Text>
	);
}

export default function Home() {
	const kiRuras = Array.from({ length: 500 })
		.fill(0)
		.map(() => KiRura);
	const doubleKiRuras = [];
	for (let i = 0; i < kiRuras.length; i++) {
		doubleKiRuras.push(kiRuras.splice(i, 4));
	}

	const splitKiRuras = [];
	for (let i = 0; i < doubleKiRuras.length; i++) {
		splitKiRuras.push(doubleKiRuras.splice(i, 5));
	}

	return (
		<>
			<Center
				zIndex={0}
				pos="absolute"
				overflow="hidden"
				maxW="full"
				maxH="75rem"
				{...config.inAnimation}
			>
				<Bleed
					pos="absolute"
					w="full"
					h="full"
					bgGradient="to-b"
					gradientFrom="transparent"
					gradientTo="bg"
					zIndex={1}
				/>
				<Box rotate="-45deg">
					{splitKiRuras.map((kiRuras, i) => (
						<HStack key={Math.random()}>
							{kiRuras.map((doubleKiRuras) => (
								<HStack
									key={Math.random()}
									animation={`slide-to-${i % 2 === 0 ? "left" : "right"}-full 200s linear infinite`}
								>
									{doubleKiRuras.map((KiRura) => (
										<KiRura key={Math.random()} />
									))}
								</HStack>
							))}
						</HStack>
					))}
				</Box>
			</Center>
			<Container pb="10" spaceY="16">
				<Flex
					align="center"
					direction="column"
					gap={{ smDown: "4", sm: "8" }}
					pt={{ lgDown: "32", lg: "48" }}
					pb={{ lgDown: "16", lg: "32" }}
					flexWrap={{ smDown: "wrap" }}
				>
					<Heading
						size={{
							mdDown: "5xl",
							md: "6xl",
						}}
						fontFamily="var(--font-monaspace-neon), var(--font-noto-sans-jp), monospace"
						filter="drop-shadow(0px 4px 8px {colors.gray.900/30})"
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
					>
						<Links />
					</SimpleGrid>
				</Aria>
				<Aria title="自己紹介" icon={<FaDatabase />}>
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
