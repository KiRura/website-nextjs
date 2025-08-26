import {
	Box,
	BoxProps,
	Center,
	ChakraComponent,
	Heading,
	HStack,
	Icon,
	Separator,
	StackProps,
	VStack,
} from "@chakra-ui/react";
import type { JSX, RefAttributes } from "react";

export function Aria(
	props: BoxProps & {
		title: string;
		icon: JSX.Element;
		children: JSX.Element | JSX.Element[];
	},
) {
	return (
		<Box spaceY="4" {...props} title={undefined}>
			<HStack overflow="hidden">
				<Separator variant="dashed" borderColor="border.emphasized" flex="1" />
				<HStack mx="2">
					<Icon boxSize="6">{props.icon}</Icon>
					<Heading size="2xl" overflowWrap="anywhere">
						{props.title}
					</Heading>
				</HStack>
				<Separator variant="dashed" borderColor="border.emphasized" flex="1" />
			</HStack>
			{props.children}
		</Box>
	);
}
