import { ClientOnly, Skeleton, Text, type TextProps } from "@chakra-ui/react";
import type { RefAttributes } from "react";
import { FormatClientLocaleDate } from "./to-client-locale-date";
import { FormatLocaleDate } from "./to-locale-date";

export function ToClientLocaleDate(
	props: TextProps & RefAttributes<HTMLParagraphElement> & { date?: string },
) {
	return (
		<ClientOnly
			fallback={
				<Skeleton>
					<Res />
				</Skeleton>
			}
		>
			<Res date={props.date} {...props} />
		</ClientOnly>
	);
}

export function ToLocaleDate(
	props: TextProps & RefAttributes<HTMLParagraphElement> & { date: string },
) {
	return (
		<Text {...props}>
			<FormatLocaleDate date={props.date} />
		</Text>
	);
}

function Res(props: { date?: string }) {
	return (
		<Text {...props}>
			{props.date ? (
				<FormatClientLocaleDate date={props.date} />
			) : (
				"yyyy/MM/dd HH:mm"
			)}
		</Text>
	);
}
