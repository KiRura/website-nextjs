import { config } from "@/config";
import { Container, Grid, Heading, VStack } from "@chakra-ui/react";
import { Deps } from "../../components/license/deps";

export default function Page() {
	return (
		<Container maxW="8xl" as="main" {...config.transitionAnimation} my={4}>
			<VStack gap={4}>
				<Heading>Deps</Heading>
				<Grid
					templateColumns={{
						smDown: "repeat(1, 1fr)",
						md: "repeat(2, 1fr)",
						lg: "repeat(3, 1fr)",
						xl: "repeat(4, 1fr)",
					}}
					gap={3}
					w="100%"
				>
					<Deps
						columns={{
							base: 1,
							sm: 1,
							md: 2,
							lg: 3,
							xl: 4,
						}}
					/>
				</Grid>
				{/* <Licenses /> */}
			</VStack>
		</Container>
	);
}
