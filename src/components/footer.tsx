import { Box, Container, Flex } from "@chakra-ui/react";
import { FooterDrawer } from "./footer-drawer";
import { ColorModeButton } from "./ui/color-mode";

export function Footer() {
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
				<Flex justify="space-between" align="center" py={2}>
					<FooterDrawer />
					<ColorModeButton />
				</Flex>
			</Container>
		</Box>
	);
}
