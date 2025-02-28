"use client";

import { GridItem } from "@chakra-ui/react";
import { type JSX, useEffect, useState } from "react";

type ElementWithKey = {
	key: string;
	element: JSX.Element;
};

export function AnimatedGridItem(props: { elementArray: ElementWithKey[] }) {
	const [showedIndex, setShowedIndex] = useState(-1);

	useEffect(() => {
		const intervalId = setInterval(
			() => {
				setShowedIndex((i) => {
					if (i >= props.elementArray.length - 1) {
						clearInterval(intervalId);
						return i;
					}
					return i + 2;
				});
			},
			(1 / 120) * 1000,
		);

		return () => {
			clearInterval(intervalId);
		};
	}, [props.elementArray]);

	return props.elementArray.map((children, i) => (
		<GridItem
			key={children.key}
			visibility={showedIndex >= i ? "visible" : "hidden"}
			data-state={showedIndex >= i ? "open" : "closed"}
			_open={{
				animation: "ease-out",
				animationName: "scale-in, fade-in",
				animationDuration: "faster",
			}}
		>
			{children.element}
		</GridItem>
	));
}
