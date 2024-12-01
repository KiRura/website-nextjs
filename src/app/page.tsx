import { Intro, IntroSm } from "@/components/intro";
import LinksParent from "@/components/links_parent";
import { DataListRoot } from "@/components/ui/data-list";
import { Toaster } from "@/components/ui/toaster";
import {
	Container,
	Flex,
	Heading,
	Highlight,
	Image,
	Stack,
	Table,
	VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Suspense } from "react";

export default function Home() {
	return (
		<Container maxW="8xl">
			<Toaster />
			<Stack
				my={24}
				direction={{ base: "column", sm: "column", md: "row" }}
				align="center"
				justify="center"
				gap={8}
			>
				<Heading
					as="h1"
					size={{
						base: "4xl",
						sm: "5xl",
						md: "6xl",
					}}
				>
					Hello!,
					<br />
					<Highlight
						query={["きるら", "(7)KiRura"]}
						styles={{ color: "orange.300" }}
					>
						きるら, (7)KiRura,
					</Highlight>
				</Heading>

				<NextLink
					href="https://discord.com/users/606093171151208448"
					target="_blank"
				>
					<Image src="https://lanyard.cnrad.dev/api/606093171151208448?idleMessage=%E7%8F%BE%E5%AE%9F%E3%82%92%E3%83%97%E3%83%AC%E3%82%A4%E4%B8%AD&animated=false&showDisplayName=true" />
				</NextLink>
			</Stack>
			<VStack gap={4} mb={6}>
				<Suspense>
					<LinksParent />
				</Suspense>
			</VStack>
			<VStack gap={4} mb={24}>
				<Heading>自己紹介</Heading>
				<Table.Root w="fit" hideBelow="md">
					<Table.Body>
						<Intro />
					</Table.Body>
				</Table.Root>
				<DataListRoot hideFrom="md">
					<IntroSm />
				</DataListRoot>
			</VStack>
			<Flex justify="center" mb={32}>
				<Image src="https://count.getloli.com/@kirura-website" />
			</Flex>
		</Container>
	);
}
