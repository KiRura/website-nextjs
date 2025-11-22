import {
	Box,
	BoxProps,
	ConditionalValue,
	Heading,
	HeadingProps,
	HStack,
	Icon,
	Separator,
	Span,
	StackProps,
	Text,
	TextProps,
} from "@chakra-ui/react";
import type { JSX, PropsWithChildren, ReactNode } from "react";

function Root(props: BoxProps) {
	return <Box bg="bg" rounded="lg" borderWidth="1px" shadow="lg" {...props} />;
}

function TitleBar(props: StackProps & { actions?: ReactNode }) {
	const { children, actions, ...rest } = props;

	return (
		<HStack gap="3" mx="4" mt="4" justify="start" {...rest}>
			{children}
			<Separator variant="dashed" flex={1} />
			{actions}
		</HStack>
	);
}

function Title(props: HeadingProps) {
	return (
		<Heading
			display="flex"
			alignItems="center"
			as="h2"
			lineHeight={1}
			size={["xl", "2xl", "3xl"]}
			gap="2"
			{...props}
		/>
	);
}

function Body(props: BoxProps) {
	return <Box m="4" {...props} />;
}

export default {
	Root,
	TitleBar,
	Title,
	Body,
};
