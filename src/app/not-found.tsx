import { Container, EmptyState, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import { FaXmark } from "react-icons/fa6";

export const metadata: Metadata = {
	title: "404: 無いものは無い",
	description: "ここはどこ お前は誰",
};

export default function NotFound() {
	return (
		<Container>
			<EmptyState.Root>
				<EmptyState.Content gap={20}>
					<EmptyState.Indicator>
						<FaXmark />
					</EmptyState.Indicator>
					<VStack textAlign="center" gap={20}>
						<EmptyState.Title
							fontFamily="mono"
							fontWeight="black"
							fontSize="9xl"
							color="fg.muted"
						>
							404
						</EmptyState.Title>
						<EmptyState.Description>ここはどこ お前は誰</EmptyState.Description>
					</VStack>
				</EmptyState.Content>
			</EmptyState.Root>
		</Container>
	);
}
