import { Container, Text } from "@chakra-ui/react";
import { getList } from "@/lib/microcms";

export default async function Page() {
	const posts = await getList();

	return (
		<Container>
			<Text fontFamily="mono">{JSON.stringify(posts)}</Text>
		</Container>
	);
}
