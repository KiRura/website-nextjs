import {
	Box,
	BoxProps,
	Heading,
	HStack,
	Icon,
	Separator,
	Text,
	TextProps,
} from "@chakra-ui/react";
import type { JSX } from "react";

export function Aria(
	props: BoxProps & {
		title: string;
		icon: JSX.Element;
		children: JSX.Element | JSX.Element[];
	},
) {
	const { title, icon, children, ...restProps } = props;

	return (
		<Box spaceY="4" {...restProps}>
			<HStack overflow="hidden" gap="4">
				<HStack fontSize="5xl" gap="3.5" fontWeight="semibold">
					<Icon>{icon}</Icon>
					<Text>{title}</Text>
				</HStack>
				<Separator variant="dashed" borderColor="border.emphasized" flex="1" />
			</HStack>
			{children}
		</Box>
	);
}
