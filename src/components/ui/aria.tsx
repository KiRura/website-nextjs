import { Heading, HStack, Icon, Separator, VStack } from "@chakra-ui/react";
import type { JSX } from "react";

export function Aria({
	title,
	icon,
	children,
}: {
	title: string;
	icon: JSX.Element;
	children: JSX.Element;
}) {
	return (
		<VStack w="full" gap="4">
			<HStack w="full">
				<Separator variant="dashed" borderColor="border.emphasized" flex="1" />
				<HStack flexShrink="0" mx="2">
					<Icon boxSize="6">{icon}</Icon>
					<Heading size="2xl">{title}</Heading>
				</HStack>
				<Separator variant="dashed" borderColor="border.emphasized" flex="1" />
			</HStack>
			{children}
		</VStack>
	);
}
