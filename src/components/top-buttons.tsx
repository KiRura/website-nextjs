import { Button, Card, Group, Icon, SimpleGrid } from "@chakra-ui/react";
import NextLink from "next/link";
import {
	FaBlog,
	FaGithub,
	FaTwitter,
	FaUpRightFromSquare,
	FaYoutube,
} from "react-icons/fa6";

const buttons = [
	{
		name: "Blog (WIP)",
		href: "/posts",
		icon: FaBlog,
	},
	{
		name: "YouTube",
		href: "https://www.youtube.com/channel/UCmPBPQzdqk3LhvxpadSdzDA",
		icon: FaYoutube,
	},
	{
		name: "Twitter",
		href: "https://twitter.com/i/user/1165939887998025728",
		icon: FaTwitter,
	},
	{
		name: "GitHub",
		href: "https://github.com/KiRura",
		icon: FaGithub,
	},
];

const ButtonsComponent = buttons.map((data) => {
	const external = data.href.startsWith("https://");
	return (
		<Button key={data.name} variant="subtle" borderColor="border" asChild>
			<NextLink href={data.href} target={external ? "_blank" : undefined}>
				<data.icon />
				{data.name}
				{external ? (
					<Icon size="xs" color="fg.subtle">
						<FaUpRightFromSquare />
					</Icon>
				) : null}
			</NextLink>
		</Button>
	);
});

export function TopButtons() {
	return (
		<Card.Root flexDir="row" divideX="1px" size="sm" bg="bg" shadow="lg">
			<Card.Body>
				<Group attached hideBelow="md">
					{ButtonsComponent}
				</Group>
				<SimpleGrid columns={2} gap="1.5" hideFrom="md">
					{ButtonsComponent}
				</SimpleGrid>
			</Card.Body>
		</Card.Root>
	);
}
