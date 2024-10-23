"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";

// const system = createSystem(
// 	defaultConfig,
// 	defineConfig({
// 		theme: {
// 			extend: {
// 				textStyles: defineTextStyles({
// 					body: {
// 						value: {
// 							fontFamily: `"Inter", "sans-serif"`,
// 						},
// 					},
// 				}),
// 			},
// 		},
// 	}),
// );

export function Provider(props: React.PropsWithChildren) {
	return (
		<ChakraProvider value={defaultSystem}>
			<ColorModeProvider>{props.children}</ColorModeProvider>
		</ChakraProvider>
	);
}
