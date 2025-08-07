"use client";

import {
	Box,
	Container,
	HStack,
	IconButton,
	Image,
	Presence,
	Spinner,
	Text,
	VStack,
	Wrap,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaInfo } from "react-icons/fa6";
import { EmptyState } from "@/components/ui/empty-state";
import { config } from "@/config";
import { Images } from "./images";

export default function Page() {
	const images = Images();
	const [unko, setUnko] = useState(false);

	return (
		<Container py="8">
			{images ? (
				<VStack gap="8" {...config.inAnimation}>
					<HStack w="full">
						<IconButton
							size="xs"
							variant="outline"
							onClick={() => setUnko((unko) => !unko)}
						>
							<FaInfo />
						</IconButton>
						<Presence present={unko} {...config.inAnimation}>
							<Text color="fg.muted">
								CSSが思ったよりカス過ぎて納得行ってない
							</Text>
						</Presence>
					</HStack>
					<Wrap justify="center" w="full">
						{images.map((image) => (
							<Box
								key={image.alt}
								overflow="hidden"
								h="full"
								borderWidth={1}
								rounded="md"
							>
								<Image src={image.src} alt={image.alt} />
							</Box>
						))}
					</Wrap>
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
