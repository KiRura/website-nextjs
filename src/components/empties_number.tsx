"use client";

import { useBreakpoint } from "@chakra-ui/react";
import { type JSX, useEffect, useState } from "react";
import type { ElementWithKey } from "./animated_griditem";

export type ColumnsType = {
	base: number;
	sm: number;
	md: number;
	lg: number;
	xl: number;
};

export function Empties(props: {
	children: JSX.Element;
	columns: ColumnsType;
	arrayLength: number;
}) {
	const empties: ElementWithKey[] = [];
	const emptiesNumber = calcEmptiesNumber(props.columns, props.arrayLength);
	for (let i = 0; i < emptiesNumber; i++) {
		empties.push({
			key: i.toString(),
			children: props.children,
		});
	}

	return empties;
}

function calcEmptiesNumber(columns: ColumnsType, arrayLength: number) {
	const breakpoint = useBreakpoint({
		breakpoints: ["base", "sm", "md", "lg", "xl"],
	}) as "base" | "sm" | "md" | "lg" | "xl";
	const [emptiesNumber, setBleedsNumber] = useState(0);

	useEffect(() => {
		const column = columns[breakpoint];
		let num = column - (arrayLength % column);
		if (column === num) num = 0;
		setBleedsNumber(num);
	}, [breakpoint, arrayLength, columns]);

	return emptiesNumber;
}
