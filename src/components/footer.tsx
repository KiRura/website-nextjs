import {
	Box,
	Container,
	Flex,
	Link,
	StackSeparator,
	VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaUpRightFromSquare } from "react-icons/fa6";
import { links } from "./linksdata";

export function Footer() {
	return (
		<Box borderTopWidth={1}>
			<Container maxW="8xl" py="12">
				<Flex>
					<VStack
						borderWidth={1}
						rounded="md"
						gap="0"
						align="start"
						separator={<StackSeparator />}
						overflow="clip"
					>
						{[
							<Flex
								w="full"
								justify="center"
								bgColor="bg.panel"
								py="2"
								key="icon"
							>
								<FaUpRightFromSquare />
							</Flex>,
							...links
								.filter((link) => link.category === "social")
								.map((link) => {
									if (!link.href) return;

									return (
										<Link
											key={link.href}
											asChild
											my="2"
											mx="3"
											color={{ base: "fg.muted", _hover: "orange.fg" }}
										>
											<NextLink href={link.href} target="_blank">
												<link.icon /> {link.name}
											</NextLink>
										</Link>
									);
								}),
						]}
					</VStack>
				</Flex>
			</Container>
		</Box>
	);
}
