import { defineRecipe } from "@chakra-ui/react";
import { containerRecipe as recipe } from "@chakra-ui/react/theme";
import { config } from "@/config";

export const containerRecipe = defineRecipe({
	...recipe,
	base: {
		...recipe.base,
		...config.inAnimation,
	},
});
