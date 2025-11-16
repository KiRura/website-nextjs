import {
	Box,
	BoxProps,
	ConditionalValue,
	Heading,
	HStack,
	Icon,
	Separator,
	Span,
	StackProps,
	Text,
	TextProps,
} from "@chakra-ui/react";
import type { JSX } from "react";

export function Aria(
	props: BoxProps & {
		title?: string;
		titleProps?: StackProps;
		icon?: JSX.Element;
		childrenBoxProps?: BoxProps;
		children: JSX.Element | JSX.Element[];
	},
) {
	const { title, titleProps, icon, children, childrenBoxProps, ...restProps } =
		props;

	return (
		<Box {...restProps}>
			{(title || icon) && (
				<HStack ml="4" gap="4" as="h2" justify="start">
					{/* <Separator
						hideBelow="sm"
						variant="dashed"
						borderColor="border.emphasized"
						flex="1"
					/> */}
					<HStack
						px="6"
						roundedTop="lg"
						borderTopWidth="1px"
						borderXWidth="1px"
						bg="bg"
						py="3"
						{...(!titleProps?.fontSize && {
							mb: ["-6", "-7", "-8"],
						})}
						lineHeight="1"
						fontSize={["2xl", "3xl", "4xl"]}
						gap={["2", "2.5", "3.5"]}
						fontWeight="semibold"
						{...titleProps}
					>
						{icon ?? null}
						{title ?? null}
					</HStack>
					{/* <Separator
						variant="dashed"
						borderColor="border.emphasized"
						flex="1"
					/> */}
				</HStack>
			)}
			<Box
				bg="bg"
				p="4"
				pt={
					!titleProps?.fontSize && (title || icon)
						? ["10", "11", "12"]
						: undefined
				}
				rounded="lg"
				borderWidth="1px"
				borderLeftColor="border.muted"
				borderTopColor="border.muted"
				borderRightColor="border"
				borderBottomColor="border"
				_dark={{
					borderLeftColor: "border",
					borderTopColor: "border",
					borderRightColor: "border.muted",
					borderBottomColor: "border.muted",
				}}
				{...childrenBoxProps}
			>
				{children}
			</Box>
		</Box>
	);
}
