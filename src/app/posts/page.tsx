import { Container, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import type { Metadata } from "next";
import { FaPenNib } from "react-icons/fa6";
import { PostCard, RecentPostCards } from "@/components/post_card";
import { Aria } from "@/components/ui/aria";
import { getList } from "@/lib/microcms";

export const metadata: Metadata = {
	title: "Blog",
	description: "しがないブログ",
};

function TopHeading({ hidden }: { hidden?: boolean }) {
	return (
		<Heading
			hideBelow="md"
			size={{ mdDown: "6xl", md: "7xl" }}
			visibility={!hidden ? undefined : "hidden"}
		>
			The
			<br />
			Latest
			<br />
			Post
		</Heading>
	);
}

export default async function Page() {
	const posts = await getList();
	const latest = posts.contents[0];
	posts.contents.shift();

	return (
		<Container py="12" spaceY="12">
			<Stack
				direction={{ mdDown: "column", md: "row" }}
				gap="8"
				w="full"
				justify="center"
				align="center"
			>
				<TopHeading />
				<Heading hideFrom="md" size={["5xl", "6xl"]}>
					The Latest Post
				</Heading>
				<PostCard post={latest} />
				<TopHeading hidden />
			</Stack>
			<Aria title="Recents" icon={<FaPenNib />}>
				<SimpleGrid columns={[1, 1, 2, 2, 3]} gap="2">
					<RecentPostCards posts={posts} />
				</SimpleGrid>
			</Aria>
		</Container>
	);
}
