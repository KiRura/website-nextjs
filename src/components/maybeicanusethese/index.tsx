import {
	Accordion,
	Card,
	GridItem,
	Heading,
	HStack,
	Link,
	Span,
	Text,
	VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaFile } from "react-icons/fa6";
import { Attachments } from "./attachments";

const langs = [
	{
		name: "Jetpack Compose",
		href: "https://developer.android.com/develop/ui/compose",
		description: "ガワしか作ったことない",
		attachments: [{ src: "discord_jc.mp4", type: "video" }],
		colSpan: {
			xl: 2,
		},
	},
	{
		name: "YMM4",
		href: "https://manjubox.net/ymm4",
		description: "OSのコンセプト画像とかなんとかなんか",
		attachments: [
			{ src: "ymm4.png", type: "image", width: 1920, height: 1080 },
			{ src: "ymm4-2.png", type: "image", width: 1920, height: 1080 },
		],
		colSpan: {
			xl: 2,
		},
	},
	{
		name: "JavaScript / TypeScript (Bun)",
		href: "https://bun.sh",
		description: "次の2つ",
	},
	{
		name: "Next.js",
		href: "https://nextjs.org",
		description: "このサイト",
	},
	{
		name: "discord.js",
		href: "https://discord.js.org",
		description: "今は亡きもの達",
		attachments: [
			{ src: "discordbot.png", type: "image", width: 283, height: 177 },
		],
	},
];

export function MaybeICanUseThese() {
	return langs.map((lang) => (
		<GridItem key={lang.name} colSpan={lang.colSpan}>
			<Card.Root h="full">
				<Card.Body gap="5">
					<VStack align="start">
						<Heading asChild>
							<Link colorPalette="orange" variant="underline" asChild>
								<NextLink href={lang.href} target="_blank" prefetch={false}>
									{lang.name}
								</NextLink>
							</Link>
						</Heading>
						<Text>{lang.description}</Text>
					</VStack>
					{lang.attachments && (
						<Accordion.Root
							collapsible
							defaultValue={["attachment"]}
							variant="enclosed"
							rounded="md"
						>
							<Accordion.Item value="attachment">
								<Accordion.ItemTrigger>
									<Span flex="1" color="fg.muted">
										<HStack>
											<FaFile /> 画像 / 動画
										</HStack>
									</Span>
									<Accordion.ItemIndicator />
								</Accordion.ItemTrigger>
								<Accordion.ItemContent>
									<Accordion.ItemBody>
										<Attachments attachments={lang.attachments} />
									</Accordion.ItemBody>
								</Accordion.ItemContent>
							</Accordion.Item>
						</Accordion.Root>
					)}
				</Card.Body>
			</Card.Root>
		</GridItem>
	));
}
