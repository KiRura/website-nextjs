import { Box, Container, Flex, Group, IconButton } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaGithub } from "react-icons/fa6";
import { Settings } from "../header/settings";
import { Pages } from "./pages";

export function Footer() {
	return (
		<Box
			as="footer"
			pos="sticky"
			bottom={0}
			zIndex="docked"
			bg="bg"
			borderTopWidth={1}
			hideFrom="sm"
		>
			<Container>
				<Flex justify="space-between" align="center" py="2">
					<Pages />
					<Group>
						<IconButton variant="outline" asChild>
							<NextLink
								href="https://github.com/KiRura/website-nextjs"
								target="_blank"
							>
								<FaGithub />
							</NextLink>
						</IconButton>
						<Settings />
					</Group>
				</Flex>
			</Container>
		</Box>
	);
}
