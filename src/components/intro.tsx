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
		name: "miHoYo",
		href: "https://www.mihoyo.com",
	},
	{
		name: "タルレミ・エラ",
		href: "https://lit.link/tallemiella",
	},
	{
		name: "柊マグネタイト",
		href: "https://x.com/i/user/1300838650637242370",
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
		href: "https://twitter.com/i/status/1885911562457858488",
	},
];

const langs = [
	{
		name: "JavaScript(Bun)",
		href: "https://bun.sh",
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
		name: "Remix",
		href: "https://remix.run",
	},
	{
		name: "Flutter",
		href: "https://flutter.dev",
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
		description: "17歳 / 高3",
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
		<Table.Row key={intro.title}>
			<Table.Cell color="fg.muted">
				<HStack>
					<intro.icon />
					{intro.title}
				</HStack>
			</Table.Cell>
			<Table.Cell>{intro.description}</Table.Cell>
		</Table.Row>
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
