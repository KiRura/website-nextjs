import { defineSlotRecipe } from "@chakra-ui/react";
import { dialogSlotRecipe as recipe } from "@chakra-ui/react/theme";

// @ts-expect-error
// プロパティ 'placement' の型に互換性がありません。
// 型 'ConditionalValue<"bottom" | "top" | "center" | undefined>' を型 'ConditionalValue<undefined>' に割り当てることはできません。
//   型 '"bottom"' を型 'ConditionalValue<undefined>' に割り当てることはできません。ts(2345)
// なにこれ？
export const dialogSlotRecipe = defineSlotRecipe({
	...recipe,
	variants: {
		...recipe.variants,
		fontFamily: {
			dot: {
				content: {
					fontFamily: "var(--font-dot-gothic-16), {fonts.mono}",
				},
			},
		},
	},
});
