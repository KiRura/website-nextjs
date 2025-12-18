import { HStack } from "@chakra-ui/react";
import { getList } from "@/lib/blog";
import { ToClientLocaleDate } from "./to-locale-date";

export default async function TopPosts() {
	const posts = await getList();

	return posts.contents.map((post) => (
		<HStack key={post.id}>
			<ToClientLocaleDate date={post.publishedAt} />
		</HStack>
	));
}
