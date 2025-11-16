import { Button, HStack, Icon, SimpleGrid } from "@chakra-ui/react";
import NextLink from "next/link";
import {
	FaBlog,
	FaDiscord,
	FaGithub,
	FaTwitter,
	FaUpRightFromSquare,
} from "react-icons/fa6";
import { Aria } from "./ui/aria";

const buttons = [
	{
		name: "呟き",
		href: "/posts",
		icon: FaBlog,
	},
	{
		name: "Discord",
		href: "/discord",
		icon: FaDiscord,
		external: true,
	},

	{
		name: "Twitter",
		href: "https://twitter.com/i/user/1165939887998025728",
		icon: FaTwitter,
		external: true,
	},
	{
		name: "GitHub",
		href: "https://github.com/KiRura",
		icon: FaGithub,
		external: true,
	},
];

const ButtonsComponent = buttons.map((data, i) => {
	return (
		<Button
			key={data.name}
			variant="subtle"
			borderColor="border"
			asChild
			size={{ smDown: "xs", sm: "md" }}
			justifyContent="space-between"
			gap="2"
			md={{
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
			<NextLink
				href={data.href}
				target={data.external ? "_blank" : undefined}
				prefetch={false}
			>
				<HStack gap={{ mdDown: "1.5", md: "2" }}>
					<data.icon />
					{data.name}
				</HStack>
				{data.external ? (
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
		<Aria childrenBoxProps={{ shadow: "lg" }}>
			<SimpleGrid
				columns={{ mdDown: 2, md: 4 }}
				gap={{ mdDown: "1.5", md: "0" }}
			>
				{ButtonsComponent}
			</SimpleGrid>
		</Aria>
	);
}
