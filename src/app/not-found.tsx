import { Container, EmptyState, VStack } from "@chakra-ui/react";
import { FaXmark } from "react-icons/fa6";

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
