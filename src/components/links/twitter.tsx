"use client";

import {
	FormatNumber,
	HStack,
	Icon,
	Spinner,
	StackSeparator,
	Text,
} from "@chakra-ui/react";
import { FaHeart, FaUser, FaUsers } from "react-icons/fa6";
import useSWR from "swr";
import { config } from "@/config";
import { fetcher } from "@/lib/fetcher";

export function TwitterFooter() {
	const { data, error, isLoading } = useSWR<{
		code: number;
		message: string;
		user: {
			url: string;
			id: string;
			followers: number;
			following: number;
			likes: number;
			tweets: number;
			name: string;
			screen_name: string;
			description: string;
			location: string;
			banner_url: string;
			avatar_url: string;
			joined: string;
			website: {
				url: string;
				display_url: string;
			} | null;
		};
	}>("https://api.fxtwitter.com/7KiRura", fetcher);

	if (isLoading) return <Spinner color="fg.muted" />;
	if (error) return <Text>取得に失敗しました。</Text>;
	if (!data) return <Text>これは何</Text>;

	const dataArray = [
		{
			id: "following",
			color: "green",
			unit: <FaUser />,
			num: data.user.following,
		},
		{
			id: "followers",
			color: "blue",
			unit: <FaUsers />,
			num: data.user.followers,
		},
		{
			id: "likes",
			color: "red",
			unit: <FaHeart />,
			num: data.user.likes,
		},
	];

	return (
		<HStack separator={<StackSeparator />} wrap="wrap" {...config.inAnimation}>
			{dataArray.map((data) => (
				<HStack key={data.id} fontSize="sm">
					<Icon color={`${data.color}.fg`}>{data.unit}</Icon>
					<Text fontFamily="mono" color="fg.muted">
						<FormatNumber value={data.num} />
					</Text>
				</HStack>
			))}
		</HStack>
	);
}
