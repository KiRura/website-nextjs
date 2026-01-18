import { defineSlotRecipe } from "@chakra-ui/react";
import { tableSlotRecipe as defaultTableSlotRecipe } from "@chakra-ui/react/theme";

export const tableSlotRecipe = defineSlotRecipe({
	slots: defaultTableSlotRecipe.slots,
	variants: {
		striped: {
			true: {
				row: {
					"&:nth-of-type(odd) td": {
						bg: "bg.panel",
					},
				},
			},
		},
	},
});
