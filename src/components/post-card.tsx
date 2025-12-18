import { PostType, PostWithContentType } from "@/interface/blog";
import {
	Box,
	Card,
	Center,
	HStack,
	Image,
	LinkOverlay,
	VStack,
} from "@chakra-ui/react";
import type {
	MicroCMSContentId,
	MicroCMSDate,
	MicroCMSListResponse,
} from "microcms-js-sdk";
import NextImage from "next/image";
import NextLink from "next/link";
import { FaAngleRight } from "react-icons/fa6";

export function PostCard({
	post,
}: {
	post:
		| (PostType & MicroCMSContentId & MicroCMSDate)
		| (PostWithContentType & MicroCMSContentId & MicroCMSDate);
}) {
	return (
		<Card.Root
			w={{ mdDown: "full" }}
			overflow="hidden"
			h="fit"
			size="lg"
			variant="elevated"
			bg={{ _hover: "bg.muted" }}
			transition="backgrounds"
		>
			{post.coverImage ? (
				<Image w="full" h="64" asChild>
					<NextImage
						src={post.coverImage.url}
						alt={post.coverImage.alt ?? post.title}
						width={post.coverImage.width}
						height={post.coverImage.height}
					/>
				</Image>
			) : null}
			<Card.Body
				flexDir="row"
				gap="7"
				justifyContent="space-between"
				{...(post.coverImage && { borderTop: 1 })}
			>
				<VStack align="start">
					<Card.Title>
						<LinkOverlay asChild>
							<NextLink href={`/posts/${post.id}`}>{post.title}</NextLink>
						</LinkOverlay>
					</Card.Title>
					{post.subtitle ? (
						<Card.Description>{post.subtitle}</Card.Description>
					) : null}
				</VStack>
				<Center color="fg.subtle">
					<FaAngleRight />
				</Center>
			</Card.Body>
		</Card.Root>
	);
}

export function RecentPostCards({
	posts,
}: {
	posts: MicroCMSListResponse<PostType>;
}) {
	return posts.contents.map((post) => (
		<Card.Root
			key={post.id}
			size="sm"
			bg={{ _hover: "bg.muted" }}
			transition="backgrounds"
		>
			<Card.Body flexDir="row" gap="4.5" justifyContent="space-between">
				<HStack align="start" gap="4.5">
					{post.coverImage ? (
						<Box overflow="hidden" maxW="24" rounded="sm" borderWidth={1}>
							<Image asChild aspectRatio="golden">
								<NextImage
									src={post.coverImage.url}
									alt={post.coverImage.alt || post.title}
									width={post.coverImage.width}
									height={post.coverImage.height}
								/>
							</Image>
						</Box>
					) : null}
					<VStack align="start">
						<Card.Title>
							<LinkOverlay asChild>
								<NextLink href={`/posts/${post.id}`}>{post.title}</NextLink>
							</LinkOverlay>
						</Card.Title>
						{post.subtitle ? (
							<Card.Description>{post.subtitle}</Card.Description>
						) : null}
					</VStack>
				</HStack>
				<Center color="fg.subtle">
					<FaAngleRight />
				</Center>
			</Card.Body>
		</Card.Root>
	));
}
