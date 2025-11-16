import { Container, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import type { Metadata } from "next";
import { FaPenNib } from "react-icons/fa6";
import { PostCard, RecentPostCards } from "@/components/post_card";
import { Aria } from "@/components/ui/aria";
import { ZZZ } from "@/components/zzz";
import { getList } from "@/lib/microcms";

export const metadata: Metadata = {
	title: "Blog",
	description: "しがないブログ",
};

function TopHeading({ hidden }: { hidden?: boolean }) {
	return (
		<Heading
			hideBelow="lg"
			size={{ mdDown: "6xl", md: "7xl" }}
			{...(hidden && {
				textAlign: "end",
				color: "bg.muted",
			})}
			filter={{
				base: "drop-shadow(0px 4px 4px {colors.bg})",
				_dark: "drop-shadow(0px 4px 6px {colors.bg/60})",
			}}
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
			<Aria
				pos="relative"
				overflow="hidden"
				childrenBoxProps={{ bg: "transparent", px: "0" }}
			>
				<ZZZ abs accentColor="fg/3" accentBgColor="transparent" />
				<Stack
					px="4"
					direction={{ lgDown: "column", lg: "row" }}
					gap="8"
					w="full"
					justify="center"
					align="center"
				>
					<TopHeading />
					<Heading hideFrom="lg" size={["5xl", "6xl"]}>
						The Latest Post
					</Heading>
					<PostCard post={latest} />
					<TopHeading hidden />
				</Stack>
			</Aria>
			<Aria title="Recents" icon={<FaPenNib />}>
				<SimpleGrid columns={[1, 1, 2, 2, 3]} gap="2">
					<RecentPostCards posts={posts} />
				</SimpleGrid>
			</Aria>
		</Container>
	);
}
