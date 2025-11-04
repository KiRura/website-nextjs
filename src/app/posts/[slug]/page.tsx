import {
	Box,
	Center,
	Container,
	Heading,
	HStack,
	Image,
	Stack,
	StackSeparator,
	Text,
	VStack,
} from "@chakra-ui/react";
import type { Metadata } from "next";
import NextImage from "next/image";
import { notFound } from "next/navigation";
import { FaPen, FaRotateRight } from "react-icons/fa6";
import { ToClientLocaleDate } from "@/components/to_locale_date";
import { Prose } from "@/components/ui/prose";
import { getDetail, getListIds } from "@/lib/microcms";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const res = await getDetail(slug).catch(() => notFound());

	return {
		title: { absolute: res.title },
		description: res.subtitle,
		...(res.coverImage
			? {
					openGraph: {
						images: { url: res.coverImage.url, alt: res.coverImage.alt },
						siteName: "Blog - きるら",
					},
				}
			: {
					openGraph: {
						siteName: "Blog - きるら",
					},
				}),
		twitter: {
			card: "summary_large_image",
		},
	};
}

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const res = await getDetail(slug).catch(() => notFound());

	return (
		// デザイン変更後特に調整無し 要リファクタリング
		<Container maxW="3xl" centerContent py="12" spaceY="4">
			<Box
				w="full"
				{...(res.coverImage && {
					bgImg: `url(${res.coverImage.url})`,
					bgPos: "center",
					bgSize: "cover",
					bgBlendMode: "overlay",
					bgColor: { base: "bg/65", _dark: "bg/90" },
				})}
				overflow="hidden"
				rounded="lg"
				borderWidth="1px"
			>
				<Center
					p={["6", "8", "12", "16", "20"]}
					{...(res.coverImage && {
						backdropFilter: "blur(8px)",
					})}
				>
					<Heading size={["2xl", "3xl", "4xl", "5xl", "6xl"]}>
						{res.title}
					</Heading>
				</Center>
			</Box>
			<VStack
				w="full"
				gap="0"
				borderWidth={1}
				rounded="lg"
				overflow="hidden"
				separator={<StackSeparator />}
			>
				<Stack
					direction={{ mdDown: "column", md: "row" }}
					w="full"
					gap="0"
					separator={<StackSeparator />}
				>
					<VStack
						w="full"
						flex={1}
						align="start"
						roundedBottomLeft={{ md: "2xl" }}
						p="5"
					>
						<HStack align="start" gap="3">
							<Image asChild rounded="full" boxSize="11">
								<NextImage
									src="/kirura/768p.png"
									alt="kirura icon"
									width={768}
									height={768}
								/>
							</Image>
							<VStack align="start" gap="0.5">
								<HStack align="start">
									<Text fontWeight="bold" color="orange.fg" whiteSpace="nowrap">
										きるら
									</Text>
								</HStack>
								{res.subtitle ? (
									<Text>{res.subtitle}</Text>
								) : (
									<Text color="fg.muted" fontStyle="italic">
										サブタイトルがないです
									</Text>
								)}
							</VStack>
						</HStack>
					</VStack>
					{res.publishedAt && (
						<Center
							flexDir={{ smDown: "column", md: "column" }}
							gap={["1", "5", "1"]}
							p="5"
							color="fg.muted"
							fontSize="sm"
							fontFamily="mono"
						>
							<HStack gap="1.5">
								<FaPen />
								<ToClientLocaleDate date={res.publishedAt} />
							</HStack>
							{res.publishedAt !== res.updatedAt && (
								<HStack gap="1.5">
									<FaRotateRight />
									<ToClientLocaleDate date={res.updatedAt} />
								</HStack>
							)}
						</Center>
					)}
				</Stack>
			</VStack>
			<Prose maxW="none" size="lg" w="full">
				{/** biome-ignore lint/security/noDangerouslySetInnerHtml: microCMSからのHTMLであるため */}
				<div dangerouslySetInnerHTML={{ __html: res.content }} />
			</Prose>
		</Container>
	);
}

export async function generateStaticParams() {
	const posts = await getListIds();

	return posts.map((id) => ({ slug: id }));
}
