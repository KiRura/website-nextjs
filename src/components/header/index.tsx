import {
	Box,
	Container,
	HStack,
	IconButton,
	StackSeparator,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaGithub } from "react-icons/fa6";
import { HomeLink } from "./homelink";
import { Pages } from "./pages";
import { Settings } from "./settings";

export default function Header() {
	return (
		<Box
			as="header"
			pos="sticky"
			zIndex="docked"
			bg="bg/90"
			top="0px"
			borderBottomWidth="1px"
			hideBelow="sm"
			backdropFilter="blur(8px)"
		>
			<Container>
				<HStack justify="space-between" py="2">
					<HStack overflow="hidden" separator={<StackSeparator />}>
						<HomeLink />
						<Pages />
					</HStack>
					<HStack pos="sticky" right={0}>
						<IconButton variant="outline" asChild>
							<NextLink
								href="https://github.com/KiRura/website-nextjs"
								target="_blank"
							>
								<FaGithub />
							</NextLink>
						</IconButton>
						<Settings />
					</HStack>
				</HStack>
			</Container>
		</Box>
	);
}
