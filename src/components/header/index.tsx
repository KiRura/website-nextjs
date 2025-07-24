import {
	Box,
	ClientOnly,
	Container,
	Flex,
	HStack,
	IconButton,
	Separator,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaGithub } from "react-icons/fa6";
import { Skeleton } from "../ui/skeleton";
import { HomeLink } from "./homelink";
import { Pages } from "./pages";
import { Settings } from "./settings";

export default function Header() {
	return (
		<Box
			as="header"
			pos="sticky"
			zIndex="docked"
			bg="bg"
			top="0px"
			borderBottomWidth="1px"
		>
			<Container maxW="8xl">
				<Flex justify="space-between" align="center" py="2">
					<HStack separator={<Separator orientation="vertical" h="6" />}>
						<HomeLink />
						<ClientOnly fallback={<Skeleton w="28" h="10" />}>
							<Pages />
						</ClientOnly>
					</HStack>
					<HStack>
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
				</Flex>
			</Container>
		</Box>
	);
}
