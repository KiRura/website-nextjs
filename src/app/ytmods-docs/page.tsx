import { MarkdownToComponent } from "@/components/ytmods-docs/markdown_to_component";
import { config } from "@/config";
import { Container, VStack } from "@chakra-ui/react";

export default function Page() {
	return (
		<Container as="main" maxW="8xl" {...config.transitionAnimation}>
			<VStack my={8}>
				<MarkdownToComponent />
			</VStack>
		</Container>
	);
}
