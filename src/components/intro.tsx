import { DataList, Flex, HStack, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaBlog, FaPerson, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";

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
		href: "https://github.com/KiRura/ksg",
	},
	{
		name: "Apple",
	},
	{
		name: "Discord",
	},
	{
		name: "Riot Games",
	},
	{
		name: "ニトリ",
		href: "https://x.com/i/status/1885911562457858488",
	},
	{
		name: "明治エッセルスーパーカップ SNS広報",
		href: "https://x.com/i/status/1929471107523899612",
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
		<Flex direction="column" gap="1">
			{things.map((thing) => {
				if (!thing.href)
					return (
						<Flex key={thing.name} gap="0.5">
							・<div>{thing.name}</div>
						</Flex>
					);

				return (
					<Flex key={thing.name} gap="0.5">
						・
						<Link asChild variant="underline" colorPalette="orange">
							<NextLink href={thing.href} target="_blank">
								{thing.name}
							</NextLink>
						</Link>
					</Flex>
				);
			})}
		</Flex>
	);
}

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
		description: (
			<TextsToLinks
				things={[
					{
						name: "17歳 / 高3",
					},
				]}
			/>
		),
		icon: FaPerson,
	},
	{
		title: "ブログ",
		description: (
			<TextsToLinks
				things={[
					{
						name: "自己紹介の投稿",
						href: "https://blog.kirura.f5.si/posts/u00ox7m9qwi5",
					},
				]}
			/>
		),
		icon: FaBlog,
	},
];

export function Intro() {
	return intros.map((intro, _i) => (
		<DataList.Item key={intro.title} pt="4">
			<DataList.ItemLabel>
				<HStack>
					<intro.icon /> {intro.title}
				</HStack>
			</DataList.ItemLabel>
			<DataList.ItemValue>{intro.description}</DataList.ItemValue>
		</DataList.Item>
	));
}
