"use client";

import {
	Box,
	Card,
	ClientOnly,
	HStack,
	Image,
	Skeleton,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { useColorMode } from "./ui/color-mode";

export function Guilds() {
	const { colorMode } = useColorMode();

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
			</Card.Body>
			<Card.Footer justifyContent="center">
				<ClientOnly fallback={<Skeleton w="100%" h="300px" />}>
					<Box rounded="5px" w="full" overflow="hidden">
						<iframe
							title="discord embed"
							src={`https://discord.com/widget?id=1280092185286541333&theme=${colorMode}`}
							width="100%"
							height="300"
							sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
						/>
					</Box>
				</ClientOnly>
			</Card.Footer>
		</Card.Root>
	);
}
