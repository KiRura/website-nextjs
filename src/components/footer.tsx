"use client";

import {
	Box,
	Container,
	Drawer,
	Flex,
	IconButton,
	Image,
	Portal,
	VStack,
} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaMoon, FaSun } from "react-icons/fa6";
import { pages } from "./pages";
import { Button } from "./ui/button";
import { CloseButton } from "./ui/close-button";
import { useColorMode } from "./ui/color-mode";

export function Footer() {
	const [open, setOpen] = useState(false);
	const { colorMode, toggleColorMode } = useColorMode();
	const path = usePathname();

	return (
		<Box
			as="footer"
			pos="sticky"
			bottom={0}
			zIndex="docked"
			bg="bg"
			borderTopWidth={1}
			hideFrom="md"
		>
			<Container maxW="8xl">
				<Flex w="100%" justify="space-between" align="center" py={2}>
					<Drawer.Root
						open={open}
						onOpenChange={(e) => setOpen(e.open)}
						placement="bottom"
					>
						<Drawer.Trigger asChild>
							<IconButton hideFrom="md" variant="ghost">
								<FaBars />
							</IconButton>
						</Drawer.Trigger>
						<Portal>
							<Drawer.Backdrop />
							<Drawer.Positioner>
								<Drawer.Content>
									<Drawer.Header>
										<Drawer.Title>KiRura</Drawer.Title>
									</Drawer.Header>
									<Drawer.Body mb={4}>
										<VStack>
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
														w="full"
														justifyContent="start"
														onClick={() => setOpen(false)}
													>
														<NextLink href={page.href}>
															{page.icon ? <page.icon /> : null}
															{page.image ? (
																<Image asChild boxSize={5} rounded="full">
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
										</VStack>
									</Drawer.Body>
									<Drawer.CloseTrigger asChild>
										<CloseButton size="sm" />
									</Drawer.CloseTrigger>
								</Drawer.Content>
							</Drawer.Positioner>
						</Portal>
					</Drawer.Root>
					<IconButton onClick={toggleColorMode} variant="ghost">
						{colorMode === "light" ? <FaSun /> : <FaMoon />}
					</IconButton>
				</Flex>
			</Container>
		</Box>
	);
}
