"use client";

import { Box, Image, Link } from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import { Tooltip } from "../ui/tooltip";

export function HomeLink({ footer }: { footer?: boolean }) {
	const [i, setI] = useState(0);
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

	return (
		<Tooltip content="🤔" open={i >= 10} disabled={i < 10} showArrow>
			<Link
				asChild
				fontWeight="bold"
				onClick={() => {
					if (timeoutId) clearTimeout(timeoutId);
					setI((i) => i + 1);

					setTimeoutId(
						setTimeout(() => {
							setI(0);
						}, 2000),
					);
				}}
			>
				<NextLink
					{...(i < 20
						? { href: "/" }
						: { href: "https://youtu.be/dQw4w9WgXcQ", target: "_blank" })}
				>
					<Image
						asChild
						boxSize="8"
						minW="8"
						rounded="full"
						aspectRatio="square"
					>
						<NextImage
							src="/kirura.png"
							alt="kirura logo"
							width={256}
							height={256}
						/>
					</Image>
					<Box {...(!footer && { hideBelow: "md" })}>KiRura</Box>
				</NextLink>
			</Link>
		</Tooltip>
	);
}
