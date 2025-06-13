import {
	Box,
	ClientOnly,
	Container,
	Flex,
	HStack,
	IconButton,
	Image,
	Link,
	Separator,
} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import { FaGithub } from "react-icons/fa6";
import { Pages } from "./pages";
import { ColorModeButton } from "../ui/color-mode";
import { Skeleton } from "../ui/skeleton";

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
						<HStack>
							<Link asChild fontWeight="bold">
								<NextLink href="/">
									<Image asChild boxSize="8" rounded="full">
										<NextImage
											src="/kirura.png"
											alt="kirura logo"
											width={256}
											height={256}
										/>
									</Image>
									<Box hideBelow="md">KiRura</Box>
								</NextLink>
							</Link>
						</HStack>
						<ClientOnly fallback={<Skeleton w="28" h="10" />}>
							<Pages />
						</ClientOnly>
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
						<ColorModeButton />
					</HStack>
				</Flex>
			</Container>
		</Box>
	);
}
