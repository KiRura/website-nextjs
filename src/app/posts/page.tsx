import { Container, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import type { Metadata } from "next";
import { FaPenNib } from "react-icons/fa6";
import { PostCard, RecentPostCards } from "@/components/post-card";
import Aria from "@/components/ui/aria";
import { ZZZ } from "@/components/zzz";
import { getList } from "@/lib/blog";

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
				userSelect: "none",
			})}
			filter={{
				base: "drop-shadow(0px 4px 4px {colors.bg})",
				_dark: "drop-shadow(0px 4px 6px {colors.bg})",
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
		<Container as="main" py="8" spaceY="8">
			<Aria.Root pos="relative" overflow="hidden">
				<ZZZ abs accentColor="fg/3" accentBgColor="transparent" h="full" />
				<Aria.Body>
					<Stack
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
				</Aria.Body>
			</Aria.Root>
			<Aria.Root>
				<Aria.TitleBar>
					<Aria.Title>
						<FaPenNib />
						Recents
					</Aria.Title>
				</Aria.TitleBar>
				<Aria.Body>
					<SimpleGrid columns={[1, 1, 2, 2, 3]} gap="2">
						<RecentPostCards posts={posts} />
					</SimpleGrid>
				</Aria.Body>
			</Aria.Root>
		</Container>
	);
}
