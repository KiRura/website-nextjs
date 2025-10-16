"use client";
import {
	Container,
	DataList,
	ProgressCircle,
	Switch,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "../loading";

type Progresses = {
	year: number;
	month: number;
	week: number;
	day: number;
	hour: number;
	minute: number;
	second: number;
};

// GPT-4o君に頑張って貰った関数
function calculateProgresses(date: Date): Progresses {
	const startOfYear = new Date(date.getFullYear(), 0, 1);
	const startOfNextYear = new Date(date.getFullYear() + 1, 0, 1);
	const yearProgress =
		((date.getTime() - startOfYear.getTime()) /
			(startOfNextYear.getTime() - startOfYear.getTime())) *
		100;

	const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
	const startOfNextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
	const monthProgress =
		((date.getTime() - startOfMonth.getTime()) /
			(startOfNextMonth.getTime() - startOfMonth.getTime())) *
		100;

	const dayOfWeek = date.getDay();
	const startOfWeek = new Date(date);
	startOfWeek.setDate(date.getDate() - dayOfWeek);
	startOfWeek.setHours(0, 0, 0, 0);
	const endOfWeek = new Date(startOfWeek);
	endOfWeek.setDate(startOfWeek.getDate() + 7);
	const weekProgress =
		((date.getTime() - startOfWeek.getTime()) /
			(endOfWeek.getTime() - startOfWeek.getTime())) *
		100;

	const startOfDay = new Date(date);
	startOfDay.setHours(0, 0, 0, 0);
	const endOfDay = new Date(startOfDay);
	endOfDay.setDate(startOfDay.getDate() + 1);
	const dayProgress =
		((date.getTime() - startOfDay.getTime()) /
			(endOfDay.getTime() - startOfDay.getTime())) *
		100;

	const startOfHour = new Date(date);
	startOfHour.setMinutes(0, 0, 0);
	const endOfHour = new Date(startOfHour);
	endOfHour.setHours(startOfHour.getHours() + 1);
	const hourProgress =
		((date.getTime() - startOfHour.getTime()) /
			(endOfHour.getTime() - startOfHour.getTime())) *
		100;

	const startOfMinute = new Date(date);
	startOfMinute.setSeconds(0, 0);
	const endOfMinute = new Date(startOfMinute);
	endOfMinute.setMinutes(startOfMinute.getMinutes() + 1);
	const minuteProgress =
		((date.getTime() - startOfMinute.getTime()) /
			(endOfMinute.getTime() - startOfMinute.getTime())) *
		100;

	const startOfSecond = new Date(date);
	startOfSecond.setMilliseconds(0);
	const endOfSecond = new Date(startOfSecond);
	endOfSecond.setSeconds(startOfSecond.getSeconds() + 1);
	const secondProgress =
		((date.getTime() - startOfSecond.getTime()) /
			(endOfSecond.getTime() - startOfSecond.getTime())) *
		100;

	return {
		year: yearProgress,
		month: monthProgress,
		week: weekProgress,
		day: dayProgress,
		hour: hourProgress,
		minute: minuteProgress,
		second: secondProgress,
	};
}

const colors = ["purple", "blue", "teal", "green", "yellow", "orange", "red"];

export default function Page() {
	const [mounted, setMounted] = useState(false);
	const [progresses, setProgresses] = useState<Progresses>(
		calculateProgresses(new Date()),
	);

	const [prevSecond, setPrevSecond] = useState(new Date().getSeconds());
	const [enableMilli, setEnableMilli] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			if (enableMilli || prevSecond !== new Date().getSeconds())
				setProgresses(calculateProgresses(new Date()));

			if (!enableMilli) setPrevSecond(new Date().getSeconds());
		}, 1);

		return () => clearInterval(interval);
	}, [enableMilli, prevSecond]);

	if (!mounted) return <Loading />;

	const progressData = [
		{ label: "days / a year", value: progresses.year },
		{ label: "days / a month", value: progresses.month },
		{ label: "days / this week", value: progresses.week },
		{ label: "hours / a day", value: progresses.day },
		{ label: "minutes / an hour", value: progresses.hour },
		{ label: "seconds / a minute", value: progresses.minute },
	];
	if (enableMilli)
		progressData.push({ label: "milli / a second", value: progresses.second });

	return (
		<Container centerContent alignItems="end" py="4">
			{progressData.map((data, i) => (
				<ProgressCircle.Root
					key={data.label}
					value={data.value}
					pos="absolute"
					left={new Array(5).fill(0).map((_, ii) => `${i * ((ii + 1) * 8)}px`)}
					top={new Array(5)
						.fill(0)
						.map((_, ii) => `${i * ((ii + 1) * 8) + 40}px`)}
					colorPalette={colors[i]}
				>
					<ProgressCircle.Circle
						css={{
							"--size": new Array(5)
								.fill(0)
								.map(
									(_, ii) =>
										`${(progressData.length - i) * (ii + 1) * 16 + 64}px`,
								),
							"--thickness": ["3px", "5px", "7px", "9px", "11px"],
						}}
					>
						<ProgressCircle.Track stroke="bg.muted" />
						<ProgressCircle.Range transition="none" />
					</ProgressCircle.Circle>
				</ProgressCircle.Root>
			))}
			<VStack maxW="1/2" w="full">
				<Switch.Root
					checked={enableMilli}
					onCheckedChange={(e) => setEnableMilli(e.checked)}
				>
					<Switch.HiddenInput />
					<Switch.Control />
					<Switch.Label>ミリ秒</Switch.Label>
				</Switch.Root>
				<DataList.Root divideY="1px" borderWidth={1} rounded="md" pb="5" px="4">
					{progressData.map((progress, i) => (
						<DataList.Item key={progress.label} pt="4">
							<DataList.ItemLabel color={`${colors[i]}.fg`}>
								{progress.label}
							</DataList.ItemLabel>
							<DataList.ItemValue fontFamily="mono">
								{`${progress.value < 10 ? "0" : ""}${progress.value.toFixed(6)}%`}
							</DataList.ItemValue>
						</DataList.Item>
					))}
				</DataList.Root>
			</VStack>
		</Container>
	);
}
