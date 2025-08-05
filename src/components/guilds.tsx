"use client";

import { Accordion, Button, Card, HStack, Image, Span } from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import { FaUpRightFromSquare } from "react-icons/fa6";

export function Guilds() {
	return (
		<Card.Root maxW="lg">
			<Card.Body spaceY="3">
				<HStack>
					<Image asChild boxSize="10" rounded="full">
						<NextImage
							src="/kirura.png"
							alt="kirura"
							width={400}
							height={400}
						/>
					</Image>
					<Card.Title>きるら</Card.Title>
				</HStack>
				<Card.Description fontSize="md">
					GitHubのコミット通知とかTwitch配信の通知とかたまにTwitterに載せる程でもないお知らせが来たりとかする
				</Card.Description>
				<Accordion.Root variant="enclosed" collapsible>
					<Accordion.Item value="a">
						<Accordion.ItemTrigger>
							<Span flex="1">チャンネル一覧</Span>
							<Accordion.ItemIndicator />
						</Accordion.ItemTrigger>
						<Accordion.ItemContent>
							<Accordion.ItemBody display="flex" justifyContent="center">
								<Image asChild rounded="xs">
									<NextImage
										src="/discord.png"
										alt="Discordサーバーのチャンネル一覧"
										width={301}
										height={632}
									/>
								</Image>
							</Accordion.ItemBody>
						</Accordion.ItemContent>
					</Accordion.Item>
				</Accordion.Root>
			</Card.Body>
			<Card.Footer justifyContent="end">
				<Button asChild>
					<NextLink href="/discord" target="_blank">
						招待リンク <FaUpRightFromSquare />
					</NextLink>
				</Button>
			</Card.Footer>
		</Card.Root>
	);
}
