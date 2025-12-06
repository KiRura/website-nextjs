import { Bleed, Box, Container, HStack, IconButton } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaGithub } from "react-icons/fa6";
import { HomeLink } from "../homelink";
import { Settings } from "../settings";
import { Pages } from "./pages";

export default function Header() {
	return (
		<Box
			as="header"
			pos="sticky"
			zIndex="docked"
			top="0"
			py="2"
			bg="bg/80"
			borderBottomWidth="1px"
			backdropFilter="blur(25px)"
			hideBelow="sm"
		>
			<Container centerContent flexDir="row" justifyContent="space-between">
				<HStack gap="0" overflow="hidden" as="nav">
					<HomeLink />
					<Bleed h="2em" w="4" borderRightWidth={1} />
					<Pages />
				</HStack>
				<HStack pos="sticky" right={0}>
					<IconButton variant="ghost" aria-label="source code" asChild>
						<NextLink
							href="https://github.com/KiRura/website-nextjs"
							target="_blank"
						>
							<FaGithub />
						</NextLink>
					</IconButton>
					<Settings />
				</HStack>
			</Container>
		</Box>
	);
}
