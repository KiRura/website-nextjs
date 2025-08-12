"use client";

import {
	Box,
	Card,
	Container,
	Flex,
	IconButton,
	Image,
	Link,
	LinkBox,
	LinkOverlay,
	Spinner,
	VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { FaInfo, FaUpRightFromSquare } from "react-icons/fa6";
import { TwitterFooter } from "@/components/links/twitter";
import { EmptyState } from "@/components/ui/empty-state";
import { Tooltip } from "@/components/ui/tooltip";
import { Images } from "./images";

export default function Page() {
	const images = Images();
	const [unko, setUnko] = useState(false);

	return (
		<Container py="8" centerContent>
			{images ? (
				<VStack align="start" gap="8">
					<Tooltip
						open={unko}
						content="結構カスい配置の仕方してる"
						positioning={{ placement: "right" }}
						showArrow
					>
						<IconButton
							size="xs"
							variant="outline"
							onClick={() => setUnko((unko) => !unko)}
						>
							<FaInfo />
						</IconButton>
					</Tooltip>
					<Flex gap="1.5" direction="column">
						<LinkBox>
							<Card.Root size="sm" h="fit" bg={{ _hover: "bg.muted" }} w="fit">
								<Card.Header>
									<LinkOverlay asChild>
										<Link fontWeight="bold" color="blue.fg" asChild>
											<NextLink href="https://x.com/7KiRura" target="_blank">
												Twitterのステータス
												<FaUpRightFromSquare />
											</NextLink>
										</Link>
									</LinkOverlay>
								</Card.Header>
								<Card.Body>
									<TwitterFooter />
								</Card.Body>
							</Card.Root>
						</LinkBox>
						{images.map((image) => (
							<Box
								key={image.alt}
								overflow="hidden"
								h="full"
								borderWidth={1}
								rounded="md"
								w="fit"
							>
								<Image src={image.src} alt={image.alt} />
							</Box>
						))}
					</Flex>
				</VStack>
			) : (
				<EmptyState
					icon={<Spinner />}
					title="ちょっと待ってね"
					description="テーマを画像に適用中..."
				/>
			)}
		</Container>
	);
}
