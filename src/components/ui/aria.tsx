import { Heading, HStack, Icon, Separator, VStack } from "@chakra-ui/react";
import type { JSX } from "react";

export function Aria({
	title,
	icon,
	children,
}: {
	title: string;
	icon: JSX.Element;
	children: JSX.Element | JSX.Element[];
}) {
	return (
		<VStack w="full" gap="4">
			<HStack w="full" overflow="hidden">
				<Separator variant="dashed" borderColor="border.emphasized" flex="1" />
				<HStack mx="2">
					<Icon boxSize="6">{icon}</Icon>
					<Heading size="2xl" overflowWrap="anywhere">
						{title}
					</Heading>
				</HStack>
				<Separator variant="dashed" borderColor="border.emphasized" flex="1" />
			</HStack>
			{children}
		</VStack>
	);
}
