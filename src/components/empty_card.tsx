import { Card, HStack, Icon } from "@chakra-ui/react";
import { FaXmark } from "react-icons/fa6";

export function EmptyCard() {
	return (
		<Card.Root size="sm" h="full" borderWidth={0} bg="bg.subtle">
			<Card.Body>
				<HStack>
					<Icon color="fg.subtle">
						<FaXmark />
					</Icon>
					<Card.Title color="fg.subtle">Empty</Card.Title>
				</HStack>
			</Card.Body>
		</Card.Root>
	);
}
