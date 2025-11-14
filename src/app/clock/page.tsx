"use client";
import {
	Box,
	ClientOnly,
	Container,
	Heading,
	ProgressCircle,
	SimpleGrid,
	Switch,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useEffectEvent, useState } from "react";
import Loading from "../loading";

const colors = ["purple", "blue", "teal", "green", "yellow", "orange", "red"];

function calcProgress(now: Date, start: Date, end: Date) {
	return (now.getTime() - start.getTime()) / (end.getTime() - start.getTime());
}

export default function Page() {
	const [now, setNow] = useState(new Date());

	const [prevSecond, setPrevSecond] = useState(new Date().getSeconds());
	const [enableMilli, setEnableMilli] = useState(false);

	const onExecInterval = useEffectEvent(() => {
		const _now = new Date();
		if (enableMilli || prevSecond !== _now.getSeconds()) {
			setNow(_now);
			if (!enableMilli) setPrevSecond(_now.getSeconds());
		}
	});

	useEffect(() => {
		const interval = setInterval(onExecInterval);

		return () => clearInterval(interval);
	}, []);

	const [y, M, w, d, h, m, s] = [
		now.getFullYear(),
		now.getMonth(),
		now.getDay(),
		now.getDate(),
		now.getHours(),
		now.getMinutes(),
		now.getSeconds(),
	];

	const progressData = [
		{
			key: "year",
			label: `${y}年`,
			value: calcProgress(now, new Date(y, 0), new Date(y + 1, 0)),
		},
		{
			key: "month",
			label: `${M + 1}月`,
			value: calcProgress(now, new Date(y, M), new Date(y, M + 1)),
		},
		{
			key: "day",
			label: `${["日", "月", "火", "水", "木", "金", "土"][now.getDay()]}曜日`,
			value: calcProgress(
				now,
				new Date(y, M, d - w),
				new Date(y, M, 7 - w + d),
			),
		},
		{
			key: "date",
			label: `${now.getDate()}日`,
			value: calcProgress(now, new Date(y, M, d), new Date(y, M, d + 1)),
		},
		{
			key: "hour",
			label: `${now.getHours()}時`,
			value: calcProgress(now, new Date(y, M, d, h), new Date(y, M, d, h + 1)),
		},
		{
			key: "minute",
			label: `${now.getMinutes()}分`,
			value: calcProgress(
				now,
				new Date(y, M, d, h, m),
				new Date(y, M, d, h, m + 1),
			),
		},
	];

	if (enableMilli)
		progressData.push({
			key: "second",
			label: `${now.getSeconds()}秒`,
			value: calcProgress(
				now,
				new Date(y, M, d, h, m, s),
				new Date(y, M, d, h, m, s + 1),
			),
		});

	function calcSizes(index?: number) {
		return new Array(5)
			.fill(0)
			.map(
				(_, ii) =>
					`${(progressData.length - (index ?? 0)) * (ii + 1) * (ii === 0 ? 32 : 16) + ii * 8}px`,
			);
	}

	const nums = progressData.map((progress, i) => (
		<VStack key={progress.key}>
			<Box pt="4" fontFamily="mono" whiteSpace="nowrap">
				<Heading fontFamily="inherit" color={`${colors[i]}.fg`}>
					{progress.label}
				</Heading>
				<Text>
					{`${progress.value < 0.1 ? "0" : ""}${(Math.floor(progress.value * 100_000000) / 1000000).toFixed(6)}%`}
				</Text>
			</Box>
		</VStack>
	));

	return (
		<ClientOnly fallback={<Loading />}>
			<Container py="4">
				<SimpleGrid columns={[1, 2]} alignItems="center">
					<Box px="4" my="4" pos="relative" h={calcSizes()} w="full">
						{progressData.map((data, i) => (
							<ProgressCircle.Root
								key={data.key}
								value={data.value * 100}
								pos="absolute"
								top="50%"
								left="50%"
								translate="-50% -50%"
								colorPalette={colors[i]}
								transition="all"
							>
								<ProgressCircle.Circle
									css={{
										"--size": calcSizes(i),
										"--thickness": ["4px", "4px", "6px", "8px", "10px"],
									}}
								>
									<ProgressCircle.Track stroke="bg.muted" />
									<ProgressCircle.Range
										transition={
											data.key === "second" || now.getSeconds() === 0
												? "none"
												: undefined
										}
										transitionDuration="fastest"
									/>
								</ProgressCircle.Circle>
							</ProgressCircle.Root>
						))}
					</Box>
					<VStack m="4">
						<Switch.Root
							checked={enableMilli}
							onCheckedChange={(e) => setEnableMilli(e.checked)}
						>
							<Switch.Label>ミリ秒</Switch.Label>
							<Switch.HiddenInput />
							<Switch.Control />
						</Switch.Root>
						<SimpleGrid gap="4" w="full" minChildWidth="28">
							{nums}
						</SimpleGrid>
					</VStack>
				</SimpleGrid>
			</Container>
		</ClientOnly>
	);
}
