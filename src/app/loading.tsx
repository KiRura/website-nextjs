import { Container, EmptyState, Spinner } from "@chakra-ui/react";

export default function Loading() {
	return (
		<Container as="main" maxW="8xl" minH="vh">
			<EmptyState.Root>
				<EmptyState.Content>
					<EmptyState.Indicator>
						<Spinner />
					</EmptyState.Indicator>
					<EmptyState.Title
						fontFamily="mono"
						fontWeight="black"
						fontSize="xl"
						color="fg.muted"
					>
						Loading...
					</EmptyState.Title>
				</EmptyState.Content>
			</EmptyState.Root>
		</Container>
	);
}
