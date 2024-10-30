"use client";

import { Box, Container, Flex, HStack, IconButton } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaGitlab, FaMoon, FaSun } from "react-icons/fa6";
import { Button } from "./ui/button";
import { useColorMode } from "./ui/color-mode";
import { Tooltip } from "./ui/tooltip";

export default function Header() {
	const { colorMode, toggleColorMode } = useColorMode();
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
		>
			<Container maxW="8xl">
				<Flex w="100%" justify="space-between" align="center" py={2}>
					<HStack>
						<Button variant="ghost" asChild>
							<NextLink href="/">KiRura</NextLink>
						</Button>
						<Tooltip content="coming soon...">
							<Button disabled variant="ghost">
								Tools
							</Button>
						</Tooltip>
					</HStack>
					<HStack>
						<IconButton variant="ghost" asChild>
							<NextLink
								href="https://gitlab.com/KiRura/kirura-website-chakra-v3"
								target="_blank"
							>
								<FaGitlab />
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
