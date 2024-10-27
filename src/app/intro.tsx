import { Card, HStack, Icon, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { MdThumbDown, MdThumbUp } from "react-icons/md";

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
		name: "アビス",
	},
	{
		name: "ブリーズ",
	},
	{
		name: "miHoYoの一部",
	},
];

const intros = [
	{
		title: "好き",
		description: <TextsToLinks likesArray={likes} />,
		icon: MdThumbUp,
	},
	{
		title: "嫌い",
		description: <TextsToLinks likesArray={disLikes} />,
		icon: MdThumbDown,
	},
	{
		title: "年齢",
		description: <Card.Description>16歳 / 高2</Card.Description>,
	},
];

function TextsToLinks(props: TextsToLinksProps) {
	const { likesArray } = props;

	return (
		<HStack wrap="wrap">
			{likesArray.map((data) => {
				if (data.href) {
					return (
						<Link asChild variant="underline">
							<NextLink href={data.href} target="_blank">
								<Card.Description>{data.name}</Card.Description>
							</NextLink>
						</Link>
					);
				}
				return <Card.Description key={data.name}>{data.name}</Card.Description>;
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

export default function Intro() {
	return intros.map((intro) => (
		<Card.Root key={intro.title} size="sm">
			<Card.Body>
				<HStack mb={2}>
					{intro.icon ? (
						<Icon boxSize={5}>
							<intro.icon />
						</Icon>
					) : (
						<></>
					)}
					<Card.Title>{intro.title}</Card.Title>
				</HStack>
				{intro.description}
			</Card.Body>
		</Card.Root>
	));
}
