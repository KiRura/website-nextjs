import {
	Box,
	Container,
	Flex,
	HStack,
	Image,
	Link,
	StackSeparator,
	Text,
	VStack,
} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import { FaUpRightFromSquare } from "react-icons/fa6";
import { links } from "./linksdata";

export function Footer() {
	return (
		<Box borderTopWidth={1}>
			<Container maxW="8xl" pt="12" pb="24">
				<Flex justify="space-between" align="end">
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
											py="2"
											px="3"
											w="full"
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
					<NextLink href="/">
						<HStack gap="2">
							<Image
								asChild
								rounded="full"
								boxSize={{ smDown: "12", sm: "16" }}
							>
								<NextImage
									src="/kirura.png"
									alt="kirura icon"
									width={400}
									height={400}
								/>
							</Image>
							<Text fontSize={{ smDown: "4xl", sm: "5xl" }} fontWeight="bold">
								KiRura
							</Text>
						</HStack>
					</NextLink>
				</Flex>
			</Container>
		</Box>
	);
}
