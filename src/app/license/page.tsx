import Licenses from "@/components/license/licenses";
import { Container, Flex, Heading, Table, VStack } from "@chakra-ui/react";
import { DepsBody, DepsHeader } from "../../components/license/deps";

export default function Page() {
	return (
		<Container maxW="8xl" my={12}>
			<VStack gap={8}>
				<VStack>
					<Heading>Deps</Heading>
					<Flex
						w="100vw"
						maxW="8xl"
						px={{ base: 3, sm: 3, md: 5, lg: 7 }}
						overflow="scroll"
					>
						<Table.Root whiteSpace="nowrap">
							<Table.Header>
								<Table.Row>
									<DepsHeader />
								</Table.Row>
							</Table.Header>
							<Table.Body>
								<DepsBody />
							</Table.Body>
						</Table.Root>
					</Flex>
				</VStack>
				<Licenses />
			</VStack>
		</Container>
	);
}
