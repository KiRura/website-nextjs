import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
	theme: {
		tokens: {
			fonts: {
				heading: {
					value:
						"var(--font-zalando-sans), var(--font-noto-sans-jp), sans-serif",
				},
				body: {
					value:
						"var(--font-zalando-sans), var(--font-noto-sans-jp), sans-serif",
				},
				mono: { value: "var(--font-google-sans-code), monospace" },
			},
		},
	},
});

export default createSystem(defaultConfig, config);
