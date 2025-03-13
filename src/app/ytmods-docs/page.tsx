import { MarkdownToComponent } from "@/components/ytmods-docs/markdownToComponent";
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
