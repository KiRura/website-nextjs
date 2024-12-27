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
import {
	Bleed,
	Flex,
	Grid,
	Heading,
	createListCollection,
} from "@chakra-ui/react";
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
			<Flex
				align={{ base: "center", sm: "center", md: "center" }}
				justify={{ md: "space-between" }}
				w="100%"
				direction={{ base: "column", sm: "column", md: "row" }}
				gap={4}
			>
				<Bleed w={{ md: 48 }} hideBelow="sm" />
				<Heading>他リンク</Heading>
				<SelectRoot
					collection={categories}
					onValueChange={(e) => {
						setValue(e.value as CategoryQuery[]);
					}}
					value={value}
					w={{
						smDown: "100%",
						md: 48,
					}}
					minW={{
						md: "fit",
					}}
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
			</Flex>
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
