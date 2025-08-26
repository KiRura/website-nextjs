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
import NextImage from "next/image";
import { FaRotateRight } from "react-icons/fa6";
import { ToClientLocaleDate } from "@/components/to_locale_date";
import { Prose } from "@/components/ui/prose";
import { getDetail } from "@/lib/microcms";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const res = await getDetail(slug);

	return (
		<Container maxW="3xl" centerContent py="12" spaceY="12">
			<VStack
				w="full"
				gap="0"
				borderWidth={1}
				rounded="2xl"
				overflow="hidden"
				separator={<StackSeparator />}
			>
				<Box
					w="full"
					{...(res.coverImage && {
						bgImg: `url(${res.coverImage.url})`,
						bgPos: "center",
						bgSize: "cover",
						bgBlendMode: "overlay",
						bgColor: { base: "bg/65", _dark: "bg/90" },
					})}
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
				<Stack
					direction={{ mdDown: "column", md: "row" }}
					w="full"
					align={{ md: "start" }}
					justify={{ md: "space-between" }}
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
									src="/kirura.png"
									alt="kirura icon"
									width={400}
									height={400}
								/>
							</Image>
							<VStack align="start" gap="0.5">
								<HStack align="start">
									<Text fontWeight="bold" color="orange.fg">
										きるら
									</Text>
									{res.publishedAt ? (
										<ToClientLocaleDate
											color="fg.muted"
											fontSize="sm"
											date={res.publishedAt}
										/>
									) : null}
								</HStack>
								{res.subtitle ? (
									<Text>{res.subtitle}</Text>
								) : (
									<Text color="fg.muted" fontStyle="italic">
										サブタイトルがありません。
									</Text>
								)}
							</VStack>
						</HStack>
					</VStack>
					<VStack p="4" color="fg.muted">
						<HStack gap="1.5">
							<FaRotateRight />
							<Text>最終更新</Text>
						</HStack>
						<ToClientLocaleDate fontFamily="mono" date={res.updatedAt} />
					</VStack>
				</Stack>
			</VStack>
			<Prose maxW="none" size="lg" w="full">
				{/** biome-ignore lint/security/noDangerouslySetInnerHtml: microCMSからのHTMLであるため */}
				<div dangerouslySetInnerHTML={{ __html: res.content }} />
			</Prose>
		</Container>
	);
}

export function generateStaticParams() {
	return [];
}
