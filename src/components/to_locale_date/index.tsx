import { ClientOnly, Skeleton, Text, type TextProps } from "@chakra-ui/react";
import type { RefAttributes } from "react";
import { FormatLocaleDate } from "./to_locale_date";

export function ToLocaleDate(
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

function Res(props: { date?: string }) {
	return (
		<Text {...props}>
			{props.date ? <FormatLocaleDate date={props.date} /> : "yyyy/MM/dd HH:mm"}
		</Text>
	);
}
