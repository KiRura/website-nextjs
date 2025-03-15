"use client";

import { EmptyState, ProgressCircle, Text } from "@chakra-ui/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useSWR from "swr";
import { Prose } from "../ui/prose";

async function fetcher(key: string) {
	return fetch(key).then((res) => res.json());
}

export function MarkdownToComponent() {
	const { data, error, isLoading } = useSWR(
		"https://api.github.com/repos/KiRura/ytmods-prism-instance/contents/README.md",
		fetcher,
	);

	if (error) return <Text>ドキュメントの取得に失敗しました。</Text>;
	if (isLoading)
		return (
			<EmptyState.Root>
				<EmptyState.Content>
					<EmptyState.Indicator>
						<ProgressCircle.Root value={null} size="lg">
							<ProgressCircle.Circle>
								<ProgressCircle.Track />
								<ProgressCircle.Range />
							</ProgressCircle.Circle>
						</ProgressCircle.Root>
					</EmptyState.Indicator>
				</EmptyState.Content>
			</EmptyState.Root>
		);

	if (!data) return;
	const content = Buffer.from(data.content, "base64")
		.toString()
		.replaceAll(
			"./resource/",
			"https://github.com/KiRura/ytmods-prism-instance/blob/main/resource/",
		)
		.replaceAll(".png", ".png?raw=true");

	return (
		<Prose
			maxW="4xl"
			data-state={isLoading ? "closed" : "open"}
			_open={{
				animationName: "slide-from-top, fade-in",
				animationDuration: "slower",
			}}
		>
			<Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
		</Prose>
	);
}
