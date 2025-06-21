"use client";

import {
	Box,
	ButtonGroup,
	IconButton,
	Image,
	Pagination,
	VStack,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export function Attachments({
	attachments,
}: {
	attachments: { src: string; type: string; width?: number; height?: number }[];
}) {
	const [currentIndex, setCurrentIndex] = useState(1);
	const current = attachments[currentIndex - 1];

	return (
		<VStack>
			{current.type === "image" ? (
				<Image asChild rounded="md">
					<NextImage
						src={`/maybeicanusethese/${current.src}`}
						alt={current.src}
						width={current.width}
						height={current.height}
					/>
				</Image>
			) : (
				<Box asChild rounded="md" maxH="xs" h="full" aspectRatio={16 / 9}>
					{/** biome-ignore lint/a11y/useMediaCaption: <false> */}
					<video src={`/maybeicanusethese/${current.src}`} controls />
				</Box>
			)}
			<Pagination.Root
				count={attachments.length}
				pageSize={1}
				onPageChange={(e) => setCurrentIndex(e.page)}
			>
				<ButtonGroup gap="4" size="sm" variant="ghost">
					<Pagination.PrevTrigger asChild>
						<IconButton>
							<FaArrowLeft />
						</IconButton>
					</Pagination.PrevTrigger>
					<Pagination.PageText />
					<Pagination.NextTrigger asChild>
						<IconButton>
							<FaArrowRight />
						</IconButton>
					</Pagination.NextTrigger>
				</ButtonGroup>
			</Pagination.Root>
		</VStack>
	);
}
