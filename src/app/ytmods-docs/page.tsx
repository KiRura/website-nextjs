import { MarkdownToComponent } from "@/components/ytmods-docs/markdown_to_component";
import { Container, VStack } from "@chakra-ui/react";

export default function Page() {
	return (
		<Container maxW="8xl">
			<VStack my={8}>
				<MarkdownToComponent />
			</VStack>
		</Container>
	);
}
