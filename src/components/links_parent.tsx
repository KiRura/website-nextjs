"use client";

import type { CategoryQuery } from "@/components/category_query";
import Links from "@/components/links";
import {
	SelectContent,
	SelectItem,
	SelectLabel,
	SelectRoot,
	SelectTrigger,
	SelectValueText,
} from "@/components/ui/select";
import { Grid, createListCollection } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const categories = createListCollection({
	items: [
		{ label: "全て", value: "all" },
		{ label: "SNS", value: "social" },
		{ label: "ゲーム", value: "game" },
	],
});

export default function LinksParent() {
	let query = useSearchParams().get("category");
	if (query !== "social" && query !== "game") query = "all";
	const [value, setValue] = useState<CategoryQuery[]>([query as CategoryQuery]);

	return (
		<>
			<SelectRoot
				collection={categories}
				onValueChange={(e) => setValue(e.value as CategoryQuery[])}
				value={value}
			>
				<SelectLabel>カテゴリー</SelectLabel>
				<SelectTrigger>
					<SelectValueText placeholder="選択" />
				</SelectTrigger>
				<SelectContent>
					{categories.items.map((category) => (
						<SelectItem key={category.value} item={category}>
							{category.label}
						</SelectItem>
					))}
				</SelectContent>
			</SelectRoot>
			<Grid
				templateColumns={{
					base: "repeat(1, 1fr)",
					sm: "repeat(2, 1fr)",
					md: "repeat(3, 1fr)",
					lg: "repeat(4, 1fr)",
				}}
				gap={3}
				w="100%"
			>
				<Links category={value[0]} />
			</Grid>
		</>
	);
}
