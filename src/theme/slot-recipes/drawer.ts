import { defineSlotRecipe } from "@chakra-ui/react";
import { drawerSlotRecipe as recipe } from "@chakra-ui/react/theme";

export const drawerSlotRecipe = defineSlotRecipe({
	...recipe,
	base: {
		...recipe.base,
		backdrop: {
			...recipe.base?.backdrop,
			bg: `
				repeating-linear-gradient(
					45deg,
					{colors.bg/70},
					{colors.bg/70} 5px,
					{colors.bg/76} 5px,
					{colors.bg/76} 10px
				)
  			`,
			backdropFilter: "blur(8px)",
		},
	},
});
