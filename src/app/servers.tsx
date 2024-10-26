import { Button } from "@/components/ui/button";
import { Card, For, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { MdOpenInNew } from "react-icons/md";

const servers = [
	{
		name: "きるらの色々",
		description: <>GitLabの通知とかなんか色々</>,
		footer: (
			<NextLink href="https://discord.com/invite/JUyg7nu6pr" target="_blank">
				<Button>
					<Icon>
						<MdOpenInNew />
					</Icon>{" "}
					招待リンク
				</Button>
			</NextLink>
		),
	},
	{
		name: "ゆた鯖【多様性】",
		description: <>身内ノリ多めDiscord鯖 / 人の集まり</>,
		footer: (
			<>
				<NextLink
					href="https://yutasaba-283153b1-632d-4bf9-a6f6-8a9dac76272d.vercel.app"
					target="_blank"
				>
					<Button variant="subtle">
						<Icon>
							<MdOpenInNew />
						</Icon>{" "}
						Webサイト
					</Button>
				</NextLink>
				<NextLink href="https://discord.com/invite/WhBMHHzGE5" target="_blank">
					<Button>
						<Icon>
							<MdOpenInNew />
						</Icon>{" "}
						招待リンク
					</Button>
				</NextLink>
			</>
		),
	},
];

export default function Servers() {
	return (
		<For each={servers}>
			{(server) => (
				<Card.Root key={server.name}>
					<Card.Body>
						<Card.Title>{server.name}</Card.Title>
						<Card.Description>{server.description}</Card.Description>
					</Card.Body>
					<Card.Footer justifyContent="end">{server.footer}</Card.Footer>
				</Card.Root>
			)}
		</For>
	);
}
