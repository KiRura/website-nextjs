import { MarkdownToComponent } from "@/components/ytmods-docs/markdownToComponent";
import { config } from "@/config";
import { Container, VStack } from "@chakra-ui/react";

export default function Page() {
	return (
		<Container maxW="8xl" {...config.transitionAnimation}>
			<VStack my={8}>
				<MarkdownToComponent />
			</VStack>
		</Container>
	);
}
