"use client";

import { config } from "@/config";
import {
	AbsoluteCenter,
	Code,
	Container,
	Heading,
	ProgressCircle,
	Text,
	VStack,
	Wrap,
	WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Progresses = {
	year: number;
	month: number;
	week: number;
	day: number;
	hour: number;
	minute: number;
	second: number;
};

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
		year: Math.floor(yearProgress),
		month: Math.floor(monthProgress),
		week: Math.floor(weekProgress),
		day: Math.floor(dayProgress),
		hour: Math.floor(hourProgress),
		minute: Math.floor(minuteProgress),
		second: Math.floor(secondProgress),
	};
}

export default function Page() {
	const [mounted, setMounted] = useState(false);
	const [now, setNow] = useState(new Date());
	const [progresses, setProgresses] = useState<Progresses>(
		calculateProgresses(new Date()),
	);

	useEffect(() => {
		setMounted(true);
		const interval = setInterval(() => {
			const current = new Date();
			setNow(current);
			setProgresses(calculateProgresses(current));
		});
		return () => clearInterval(interval);
	}, []);

	if (!mounted) return null;

	const progressData = [
		{ label: "days / a year", value: progresses.year },
		{ label: "days / a month", value: progresses.month },
		{ label: "days / a week", value: progresses.week },
		{ label: "hours / a day", value: progresses.day },
		{ label: "minutes / an hour", value: progresses.hour },
		{ label: "seconds / a minute", value: progresses.minute },
		{ label: "milli / a second", value: progresses.second },
	];

	return (
		<Container maxW="8xl" {...config.transitionAnimation}>
			<VStack justify="center" align="center" my={32} gap={8}>
				<Heading>coming soon...</Heading>
				<Wrap gap={6} w="fit">
					{progressData.map((data) => (
						<WrapItem key={data.label}>
							<VStack>
								<ProgressCircle.Root size="xl" value={data.value}>
									<ProgressCircle.Circle>
										<ProgressCircle.Track />
										<ProgressCircle.Range />
									</ProgressCircle.Circle>
									<AbsoluteCenter>
										<ProgressCircle.ValueText />
									</AbsoluteCenter>
								</ProgressCircle.Root>
								<Text>{data.label}</Text>
							</VStack>
						</WrapItem>
					))}
				</Wrap>
				<Code size="lg">{now.getTime()}</Code>
			</VStack>
		</Container>
	);
}
