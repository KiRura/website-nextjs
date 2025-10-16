import { Button, Card, HStack, Icon, SimpleGrid } from "@chakra-ui/react";
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

const ButtonsComponent = buttons.map((data, i) => {
	const external = data.href.startsWith("https://");
	return (
		<Button
			key={data.name}
			variant="subtle"
			borderColor="border"
			asChild
			size={{ smDown: "xs", sm: "md" }}
			justifyContent="space-between"
			gap="2"
			sm={{
				...(buttons.length !== i + 1
					? {
							roundedRight: "none",
							mr: "-1px",
							...(i !== 0 && {
								rounded: "none",
							}),
						}
					: {
							roundedLeft: "none",
						}),
			}}
		>
			<NextLink href={data.href} target={external ? "_blank" : undefined}>
				<HStack gap={{ mdDown: "1.5", md: "2" }}>
					<data.icon />
					{data.name}
				</HStack>
				{external ? (
					<Icon
						ml={{ mdDown: "0.5", md: "2" }}
						boxSize={{ mdDown: "0.7rem", md: "0.9rem" }}
						color="fg.subtle"
					>
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
				<SimpleGrid
					columns={{ mdDown: 2, md: 4 }}
					gap={{ mdDown: "1.5", md: "0" }}
				>
					{ButtonsComponent}
				</SimpleGrid>
			</Card.Body>
		</Card.Root>
	);
}
