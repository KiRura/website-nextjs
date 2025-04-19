import { config } from "@/config";
import { Container, Grid, Heading, VStack } from "@chakra-ui/react";
import { Deps } from "../../components/license/deps";

export default function Page() {
	return (
		<Container as="main" maxW="8xl" my={4} {...config.transitionAnimation}>
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
