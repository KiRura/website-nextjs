"use client";

import {
	Box,
	Container,
	Flex,
	HStack,
	IconButton,
	Image,
} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaMoon, FaSun } from "react-icons/fa6";
import { pages } from "./pages";
import { Button } from "./ui/button";
import { useColorMode } from "./ui/color-mode";

export default function Header() {
	const { colorMode, toggleColorMode } = useColorMode();
	const path = usePathname();

	return (
		<Box
			as="header"
			pos="sticky"
			zIndex="docked"
			top={0}
			bg="bg"
			borderBottomColor="border"
			borderBottomWidth="1px"
			borderBottomStyle="solid"
			hideBelow="md"
		>
			<Container maxW="8xl">
				<Flex w="100%" justify="space-between" align="center" py={2}>
					<HStack>
						{pages.map((page) => {
							let isActive = false;
							if (
								page.href === path ||
								(page.href !== "/" && path.match(page.href))
							)
								isActive = true;

							return (
								<Button
									key={page.name}
									variant={isActive ? "subtle" : "ghost"}
									asChild
									color={isActive ? "fg" : "fg.subtle"}
								>
									<NextLink href={page.href}>
										{page.icon ? <page.icon /> : null}
										{page.image ? (
											<Image asChild boxSize={8} rounded="full">
												<NextImage
													src={page.image.src}
													alt={page.image.alt}
													width={256}
													height={256}
												/>
											</Image>
										) : null}
										{page.name}
									</NextLink>
								</Button>
							);
						})}
					</HStack>
					<HStack>
						<IconButton variant="ghost" asChild>
							<NextLink
								href="https://github.com/KiRura/website-nextjs"
								target="_blank"
							>
								<FaGithub />
							</NextLink>
						</IconButton>
						<IconButton onClick={toggleColorMode} variant="ghost">
							{colorMode === "light" ? <FaSun /> : <FaMoon />}
						</IconButton>
					</HStack>
				</Flex>
			</Container>
		</Box>
	);
}
