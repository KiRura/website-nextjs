"use client";

import { Image } from "@chakra-ui/react";
import NextImage from "next/image";

export function GetLoliCount() {
	return (
		<Image asChild fit="contain">
			<NextImage
				src={`https://count.getloli.com/@KiRura?name=website${process.env.NODE_ENV === "development" ? "-dev" : ""}&darkmode=auto`}
				alt="getloliのカウンター"
				width={45}
				height={100}
			/>
		</Image>
	);
}
