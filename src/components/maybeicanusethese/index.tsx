import { Flex, GridItem, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { Attachments } from "./attachments";

const langs = [
	{
		name: "Jetpack Compose",
		href: "https://developer.android.com/develop/ui/compose",
		description: "ガワしか作ったことない",
		attachments: [
			{ src: "discord_jc.mp4", type: "video" },
			{ src: "discord_jc_2.mp4", type: "video" },
		],
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
			<Flex gap="2.5">
				<Flex direction="column" gap="1.5" w="1/3">
					<Heading asChild>
						<Link colorPalette="orange" variant="underline" asChild>
							<NextLink href={lang.href} target="_blank">
								{lang.name}
							</NextLink>
						</Link>
					</Heading>
					<Text>{lang.description}</Text>
				</Flex>
				{lang.attachments ? (
					<Attachments attachments={lang.attachments} />
				) : null}
			</Flex>
		</GridItem>
	));
}
