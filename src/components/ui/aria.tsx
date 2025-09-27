import {
	Box,
	BoxProps,
	ConditionalValue,
	Heading,
	HStack,
	Icon,
	Separator,
	StackProps,
	Text,
	TextProps,
} from "@chakra-ui/react";
import type { JSX } from "react";

export function Aria(
	props: BoxProps & {
		title: string;
		titleProps?: StackProps;
		icon: JSX.Element;
		children: JSX.Element | JSX.Element[];
	},
) {
	const { title, titleProps, icon, children, ...restProps } = props;

	return (
		<Box spaceY="4" {...restProps}>
			<HStack overflow="hidden" gap="4">
				<Separator
					hideBelow="sm"
					variant="dashed"
					borderColor="border.emphasized"
					flex="1"
				/>
				<HStack
					fontSize={["3xl", "4xl", "5xl"]}
					gap={["2", "2.5", "3.5"]}
					fontWeight="semibold"
					{...titleProps}
				>
					<Icon>{icon}</Icon>
					<Text>{title}</Text>
				</HStack>
				<Separator variant="dashed" borderColor="border.emphasized" flex="1" />
			</HStack>
			{children}
		</Box>
	);
}
