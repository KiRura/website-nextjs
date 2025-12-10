import {
	HStack,
	Link,
	List,
	Table,
	type TableRootProps,
} from "@chakra-ui/react";
import { differenceInYears } from "date-fns";
import type { IconType } from "react-icons";
import { FaCalendar, FaThumbsUp } from "react-icons/fa6";

const info: {
	title: {
		icon: IconType;
		name: string;
	};
	contents: {
		name: string;
		href?: string;
		csrOnly?: boolean;
	}[];
}[] = [
	{
		title: {
			icon: FaThumbsUp,
			name: "好き",
		},
		contents: [
			{
				name: "Circle of Karma",
				href: "https://song.link/s/5KlOBnqEoMmudysmYt762W",
			},
			{
				name: "Hello Dust Town",
				href: "https://song.link/s/61pJ3mvnw1fRxcrXZGRbfx",
			},
			{ name: "Caftaphata", href: "https://youtu.be/cMnuMjXeHrY" },
			{ name: "言葉遊び", href: "https://youtu.be/eGS-IjCUEzA" },
			{ name: "一龠", href: "https://youtu.be/iWzUxFQQAKY" },
			{ name: "Blue Girl", href: "https://youtu.be/qPbW8ZAdnBU" },
			{ name: "Birds", href: "https://youtu.be/YhUZ6_2oy4I" },
			{ name: "Dance Alive", href: "https://youtu.be/q24o6ljQYPc" },
			{ name: "Dopamine", href: "https://youtu.be/qlrpeYdm9Ec" },
			{ name: "Dopamine (DnB Remix)", href: "https://youtu.be/GBuKYAN0RbM" },
		],
	},
	{
		title: {
			icon: FaCalendar,
			name: "年齢",
		},
		contents: [
			{
				name: `${differenceInYears(new Date(), new Date(2008, 2, 17))}歳 / 高3`,
			},
		],
	},
];

export function Intro(props: TableRootProps) {
	return (
		<Table.Root {...props}>
			<Table.Body>
				{info.map((info) => (
					<Table.Row key={info.title.name}>
						<Table.Cell w="2/5">
							<HStack gap="1.5">
								<info.title.icon /> {info.title.name}
							</HStack>
						</Table.Cell>
						<Table.Cell>
							<List.Root gap="1">
								{info.contents.map((content) =>
									content.href ? (
										<List.Item key={content.href}>
											<Link
												href={content.href}
												target="_blank"
												colorPalette="orange"
											>
												{content.name}
											</Link>
										</List.Item>
										// ) : content.csrOnly ? (
										// 	<ClientOnly key={content.name.toString()}>
										// 		<List.Item>{content.name}</List.Item>
										// 	</ClientOnly>
									) : (
										<List.Item key={content.name}>{content.name}</List.Item>
									),
								)}
							</List.Root>
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	);
}
