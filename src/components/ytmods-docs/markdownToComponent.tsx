"use client";

import { fetchMarkdown } from "@/app/lib/fetch_markdown";
import { EmptyState, ProgressCircle, Show } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prose } from "../ui/prose";

export function MarkdownToComponent() {
	const [content, setContent] = useState("Loading");

	useEffect(() => {
		(async () => {
			const res = await fetchMarkdown();
			const content = Buffer.from(res.content, "base64")
				.toString()
				.replaceAll(
					"./resource/",
					"https://github.com/KiRura/ytmods-prism-instance/blob/main/resource/",
				)
				.replaceAll(".png", ".png?raw=true");

			setContent(content);
		})();
	}, []);

	return (
		<Show
			when={content !== "Loading"}
			fallback={
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
						<EmptyState.Title>読み込み中...</EmptyState.Title>
					</EmptyState.Content>
				</EmptyState.Root>
			}
		>
			<Prose
				maxW="4xl"
				data-state={content === "Loading" ? "closed" : "open"}
				_open={{
					animationName: "slide-from-top, fade-in",
					animationDuration: "slower",
				}}
			>
				<Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
			</Prose>
		</Show>
	);
}
