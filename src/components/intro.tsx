import { DataListItem } from "@/components/ui/data-list";
import {
	type ConditionalValue,
	HStack,
	Link,
	Separator,
	Table,
	Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import type React from "react";
import type { IconType } from "react-icons";
import {
	FaFlask,
	FaPerson,
	FaThumbsDown,
	FaThumbsUp,
	FaWrench,
} from "react-icons/fa6";

const likes = [
	{
		name: "ドゥームフィスト",
		href: "https://overwatch.blizzard.com/heroes/doomfist",
	},
	{
		name: "ラマットラ",
		href: "https://overwatch.blizzard.com/heroes/ramattra",
	},
	{
		name: "バスティオン",
		href: "https://overwatch.blizzard.com/heroes/bastion",
	},
	{
		name: "miHoYoの大部分",
	},
	{
		name: "タルレミ・エラ",
		href: "https://lit.link/tallemiella",
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
		name: "Microsoft",
	},
	{
		name: "Discord",
	},
	{
		name: "ニトリ",
		href: "https://twitter.com/i/status/1885911562457858488",
	},
	{
		name: "アビス",
	},
	{
		name: "ブリーズ",
	},
	{
		name: "miHoYoの一部",
	},
];

const langs = [
	{
		name: "JavaScript(Bun)",
		href: "https://bun.sh",
	},
	{
		name: "Kotlin",
	},
	{
		name: "YMM4",
		href: "https://manjubox.net/ymm4",
	},
];

const things = [
	{
		name: "Next.js",
		href: "https://nextjs.org",
	},
	{
		name: "discord.js",
		href: "https://discord.js.org",
	},
	{
		name: "Jetpack Compose",
		href: "https://developer.android.com/compose",
	},
];

const intros: Intros[] = [
	{
		title: "好き",
		description: <TextsToLinks likesArray={likes} />,
		icon: FaThumbsUp,
		colSpan: { sm: 2, md: 1, lg: 2 },
	},
	{
		title: "嫌い",
		description: <TextsToLinks likesArray={disLikes} />,
		icon: FaThumbsDown,
		colSpan: { sm: 2, md: 1, lg: 2 },
	},
	{
		title: "年齢",
		description: "16歳 / 高2",
		icon: FaPerson,
	},
	{
		title: "まあまあできる",
		description: <TextsToLinks likesArray={langs} />,
		icon: FaWrench,
	},
	{
		title: "触ってみてる",
		description: <TextsToLinks likesArray={things} />,
		icon: FaFlask,
	},
];

type Intros = {
	title: string;
	description: React.JSX.Element | string;
	icon: IconType;
	colSpan?: ConditionalValue<number | "auto">;
};

function TextsToLinks(props: TextsToLinksProps) {
	const { likesArray } = props;

	return (
		<HStack
			wrap="wrap"
			separator={<Separator orientation="vertical" height={4} />}
		>
			{likesArray.map((data) => {
				if (data.href) {
					return (
						<Link
							asChild
							variant="underline"
							key={data.name}
							colorPalette="orange"
						>
							<NextLink href={data.href} target="_blank">
								{data.name}
							</NextLink>
						</Link>
					);
				}
				return <Text key={data.name}>{data.name}</Text>;
			})}
		</HStack>
	);
}

type Likes = {
	name: string;
	href?: string;
};

type TextsToLinksProps = {
	likesArray: Likes[];
};

export function Intro() {
	return intros.map((intro) => (
		<>
			<Table.Row key={intro.title}>
				<Table.Cell color="fg.muted">
					<HStack>
						<intro.icon />
						{intro.title}
					</HStack>
				</Table.Cell>
				<Table.Cell>{intro.description}</Table.Cell>
			</Table.Row>
		</>
	));
}

export function IntroSm() {
	return intros.map((intro) => (
		<DataListItem
			key={intro.title}
			label={
				<HStack>
					<intro.icon />
					{intro.title}
				</HStack>
			}
			value={intro.description}
			hideFrom="md"
		/>
	));
}
