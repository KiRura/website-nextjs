import LinksParent from "@/components/links_parent";
import { Container, Heading, VStack } from "@chakra-ui/react";
import { Suspense } from "react";

export default function Page() {
	return (
		<Container maxW="8xl">
			<VStack my={7} gap={3}>
				<Heading>他リンク</Heading>
				<Suspense>
					<LinksParent />
				</Suspense>
			</VStack>
		</Container>
	);
}
