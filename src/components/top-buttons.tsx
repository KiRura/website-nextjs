import { Button, Card, Group, SimpleGrid } from "@chakra-ui/react";
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
		name: "Blog",
		href: "https://blog.kirura.f5.si",
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

export function TopButtons() {
	const ButtonsComponent = buttons.map((data) => (
		<Button key={data.name} variant="subtle" borderColor="border" asChild>
			<NextLink href={data.href} target="_blank">
				<data.icon />
				{data.name}
			</NextLink>
		</Button>
	));

	return (
		<Card.Root size="sm" bg="bg" shadow="lg">
			<Card.Header alignItems="center">
				<Card.Title color="fg.subtle">
					<FaUpRightFromSquare />
				</Card.Title>
			</Card.Header>
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
