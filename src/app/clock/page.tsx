"use client";

import {
	AbsoluteCenter,
	Box,
	Center,
	Code,
	Container,
	Flex,
	HStack,
	ProgressCircle,
	Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Page() {
	const [time, setTime] = useState("0");
	const [percentage, setPercentage] = useState<number | null>(null);

	useEffect(() => {
		const timeout = setTimeout(() => {
			const date = new Date();
			setTime(date.getTime().toString());
			setPercentage(Math.floor((date.getMilliseconds() / 1000) * 100));
			console.log(percentage);
		}, 1);

		return () => clearTimeout(timeout);
	});

	return (
		<Container maxW="8xl">
			<HStack justify="center" align="center" my={32}>
				<ProgressCircle.Root size="xl" value={percentage}>
					<ProgressCircle.Circle>
						<ProgressCircle.Track />
						<ProgressCircle.Range />
					</ProgressCircle.Circle>
					<AbsoluteCenter>
						<ProgressCircle.ValueText />
					</AbsoluteCenter>
				</ProgressCircle.Root>
				<Code size="lg">{time}</Code>
			</HStack>
		</Container>
	);
}
