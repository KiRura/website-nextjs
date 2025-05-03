import { DataListItem } from "@/components/ui/data-list";
import { For, HStack, Link, Separator, Table, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import {
	FaBlog,
	FaPerson,
	FaThumbsDown,
	FaThumbsUp,
	FaWrench,
} from "react-icons/fa6";

const likes = [
	{
		name: "miHoYo",
		href: "https://www.mihoyo.com",
	},
	{
		name: "タルレミ・エラ",
		href: "https://lit.link/tallemiella",
	},
	{
		name: "LΛMPLIGHT",
		href: "https://lamplight0.sakura.ne.jp/a",
	},
	{
		name: "FUZI × MAAS - Circle of Karma",
		href: "https://youtu.be/lW_Ae03xvM0",
	},
	{
		name: "Lizardry",
		href: "https://x.com/Lizardry_dev",
	},
	{
		name: "tayama",
		href: "https://x.com/tayama222",
	},
	{
		name: "Rafutsuri",
		href: "https://lit.link/rafutsuri",
	},
	{
		name: "柊マグネタイト",
		href: "https://x.com/hiiragi_magne",
	},
];

const disLikes = [
	{
		name: "今の高校",
	},
	{
		name: "Google",
	},
	{
		name: "Apple",
	},
	{
		name: "Discord",
	},
	{
		name: "ニトリ",
		href: "https://x.com/i/status/1885911562457858488",
	},
];

const langs = [
	{
		name: "JavaScript / TypeScript (Bun)",
		href: "https://bun.sh",
	},
	{
		name: "YMM4",
		href: "https://manjubox.net/ymm4",
	},
	{
		name: "Next.js",
		href: "https://nextjs.org",
	},
	{
		name: "discord.js",
		href: "https://discord.js.org",
	},
];

const intros = [
	{
		title: "好き",
		description: <TextsToLinks things={likes} />,
		icon: FaThumbsUp,
	},
	{
		title: "嫌い",
		description: <TextsToLinks things={disLikes} />,
		icon: FaThumbsDown,
	},
	{
		title: "年齢",
		description: "17歳 / 高3",
		icon: FaPerson,
	},
	{
		title: "まあまあできる",
		description: <TextsToLinks things={langs} />,
		icon: FaWrench,
	},
	{
		title: "ブログ",
		description: (
			<TextsToLinks
				things={[
					{
						name: "自己紹介の投稿",
						href: "https://blog.kirura.f5.si/posts/who-is-kirura",
					},
				]}
			/>
		),
		icon: FaBlog,
	},
];

function TextsToLinks({
	things,
}: {
	things: {
		name: string;
		href?: string;
	}[];
}) {
	return (
		<HStack
			wrap="wrap"
			separator={<Separator orientation="vertical" h="1em" />}
		>
			<For each={things}>
				{(thing) => {
					if (!thing.href) return <Text key={thing.name}>{thing.name}</Text>;

					return (
						<Link
							asChild
							variant="underline"
							key={thing.name}
							colorPalette="orange"
						>
							<NextLink href={thing.href} target="_blank">
								{thing.name}
							</NextLink>
						</Link>
					);
				}}
			</For>
		</HStack>
	);
}

export function Intro() {
	return (
		<For each={intros}>
			{(intro) => (
				<Table.Row key={intro.title}>
					<Table.Cell color="fg.muted">
						<HStack>
							<intro.icon />
							{intro.title}
						</HStack>
					</Table.Cell>
					<Table.Cell>{intro.description}</Table.Cell>
				</Table.Row>
			)}
		</For>
	);
}

export function IntroSm() {
	return (
		<For each={intros}>
			{(intro) => (
				<DataListItem
					key={intro.title}
					label={
						<HStack>
							<intro.icon />
							{intro.title}
						</HStack>
					}
					value={intro.description}
				/>
			)}
		</For>
	);
}
