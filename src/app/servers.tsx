import { Button } from "@/components/ui/button";
import { Card, GridItem } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const servers = [
	{
		name: "きるらの色々",
		description: "GitLabの通知とかなんか色々",
		footer: (
			<Button asChild>
				<NextLink href="https://discord.com/invite/JUyg7nu6pr" target="_blank">
					<FaArrowUpRightFromSquare /> 招待リンク
				</NextLink>
			</Button>
		),
	},
	{
		name: "ゆた鯖【多様性】",
		description: "身内ノリ多めDiscord鯖 / 人の集まり",
		footer: (
			<>
				<Button variant="subtle" asChild>
					<NextLink
						href="https://yutasaba-283153b1-632d-4bf9-a6f6-8a9dac76272d.vercel.app"
						target="_blank"
					>
						<FaArrowUpRightFromSquare /> Webサイト
					</NextLink>
				</Button>
				<Button asChild>
					<NextLink
						href="https://discord.com/invite/WhBMHHzGE5"
						target="_blank"
					>
						<FaArrowUpRightFromSquare /> 招待リンク
					</NextLink>
				</Button>
			</>
		),
	},
];

export default function Servers() {
	return servers.map((server) => (
		<GridItem key={server.name}>
			<Card.Root h="100%" variant="elevated">
				<Card.Body>
					<Card.Title>{server.name}</Card.Title>
					<Card.Description>{server.description}</Card.Description>
				</Card.Body>
				<Card.Footer justifyContent="end" flexWrap="wrap">
					{server.footer}
				</Card.Footer>
			</Card.Root>
		</GridItem>
	));
}
