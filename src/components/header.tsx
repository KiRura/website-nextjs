"use client";

import {
	Box,
	Container,
	Flex,
	HStack,
	Icon,
	IconButton,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaGitlab } from "react-icons/fa6";
import { MdDarkMode, MdLightMode } from "react-icons/md";
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
			borderBottomWidth="1px"
			borderBottomStyle="solid"
		>
			<Container maxW="8xl">
				<Flex w="100%" justify="space-between" align="center" py={2}>
					<HStack>
						<NextLink href="/">
							<Button variant="ghost">KiRura</Button>
						</NextLink>
						<Tooltip content="coming soon...">
							<Button disabled variant="ghost">
								Tools
							</Button>
						</Tooltip>
					</HStack>
					<HStack>
						<NextLink
							href="https://gitlab.com/KiRura/kirura-website-chakra-v3"
							target="_blank"
						>
							<IconButton variant="ghost">
								<Icon>
									<FaGitlab />
								</Icon>
							</IconButton>
						</NextLink>
						<IconButton onClick={toggleColorMode} variant="ghost">
							<Icon>
								{colorMode === "light" ? <MdLightMode /> : <MdDarkMode />}
							</Icon>
						</IconButton>
					</HStack>
				</Flex>
			</Container>
		</Box>
	);
}
