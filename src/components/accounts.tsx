"use client";

import { toaster } from "@/components/ui/toaster";
import { ToggleTip } from "@/components/ui/toggle-tip";
import { Tooltip } from "@/components/ui/tooltip";
import {
	Card,
	Flex,
	GridItem,
	HStack,
	IconButton,
	Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import {
	FaBluesky,
	FaBolt,
	FaCloudMoon,
	FaDiscord,
	FaFire,
	FaGithub,
	FaGitlab,
	FaInfo,
	FaInstagram,
	FaRobot,
	FaStopwatch,
	FaTrain,
	FaTrash,
	FaTwitter,
	FaWind,
	FaYoutube,
} from "react-icons/fa6";

const accounts = [
	{
		accountId: "@7KiRura",
		name: "YouTube",
		description: "思い付いたものをポンポン上げる",
		href: "https://www.youtube.com/channel/UCmPBPQzdqk3LhvxpadSdzDA",
		icon: FaYoutube,
	},
	{
		accountId: "@7KiRura",
		name: "Twitter",
		description: "ただ思ったことを言い続ける",
		href: "https://twitter.com/7KiRura",
		icon: FaTwitter,
	},
	{
		accountId: "KiRura",
		name: "GitLab",
		description: "GitHubから移転した",
		href: "https://gitlab.com/KiRura",
		icon: FaGitlab,
	},
	{
		accountId: "KiRura",
		name: "GitHub",
		description: "負債の塊",
		href: "https://github.com/KiRura",
		icon: FaGithub,
	},
	{
		accountId: "@7kirura.bsky.social",
		name: "Bluesky",
		description: "一応",
		href: "https://bsky.app/profile/7kirura.bsky.social",
		icon: FaBluesky,
	},
	{
		accountId: "@7kirura",
		name: "Instagram",
		description: "rom専 たまに飯テロ",
		href: "https://www.instagram.com/7kirura",
		icon: FaInstagram,
	},
	{
		accountId: "7kirura",
		name: "Discord",
		description: "いつもここにいる",
		href: "https://discord.com/users/606093171151208448",
		icon: FaDiscord,
	},
	{
		accountId: "bHYG5cF09HUKHN7C",
		name: "Refind Self",
		description: "全人類やれ",
		href: "https://store.steampowered.com/app/2514960/Refind_Self",
		icon: FaRobot,
	},
	{
		accountId: "俺のオーディン#KiR",
		name: "VALORANT",
		description: "基本マルチ",
		href: "https://playvalorant.com",
		icon: FaWind,
	},
	{
		accountId: "KiRura#1579",
		name: "Overwatch",
		description: "ゲンボを一番やってる",
		href: "https://overwatch.blizzard.com/",
		icon: FaStopwatch,
	},
	{
		accountId: "1301188343",
		name: "ZZZ",
		description: "全人類やれ",
		href: "https://zenless.hoyoverse.com/",
		icon: FaBolt,
	},
	{
		accountId: "803854671",
		name: "原神",
		description: "フォンテーヌまでやれ",
		href: "https://genshin.hoyoverse.com/",
		icon: FaCloudMoon,
	},
	{
		accountId: "802728892",
		name: "スタレ",
		description: "ピノコニーまでやれ",
		href: "https://hsr.hoyoverse.com/",
		icon: FaTrain,
	},
	{
		accountId: "21132502",
		name: "崩壊3rd",
		description: "Steam版とデータが上手く連携できてない",
		href: "https://www.houkai3rd.com/",
		icon: FaFire,
	},
	{
		accountId: "きるら",
		name: "apex legends",
		description: "カス",
		icon: FaTrash,
	},
];

export default function Accounts() {
	const [copied, setCopied] = useState(-1);
	const [errored, setErrored] = useState(-1);

	return accounts.map((account, i) => (
		<GridItem key={account.name}>
			<Card.Root size="sm" h="100%" variant="subtle">
				<Card.Body>
					<Flex align="start" justify="space-between">
						<HStack mb={2}>
							<account.icon />
							<Card.Title>
								{account.href ? (
									<Link asChild variant="underline">
										<NextLink href={account.href} target="_blank">
											{account.name}
										</NextLink>
									</Link>
								) : (
									account.name
								)}
							</Card.Title>
						</HStack>
						<Tooltip
							content={
								copied === i
									? "コピーされました"
									: errored === i
										? "コピーできませんでした"
										: "コピー"
							}
							showArrow
							positioning={{ placement: "top" }}
							onExitComplete={() => {
								setCopied(-1);
								setErrored(-1);
							}}
							closeOnPointerDown={false}
							closeOnClick={false}
							openDelay={0}
						>
							<Link
								fontStyle="italic"
								colorPalette="gray"
								fontSize="sm"
								overflowWrap="anywhere"
								ml={2}
								onClick={() => {
									try {
										navigator.clipboard.writeText(account.accountId);

										setCopied(i);
									} catch (_error) {
										setErrored(i);
									}
								}}
								onTouchEnd={() => {
									toaster.create({
										title: "コピーされました",
										description: (
											<ToggleTip
												content={
													<>
														ToasterにResponsiveを追加しろChakraUI
														<br />
														ToasterのactionにIconButtonを使わせろChakraUI
														<br />
														zIndex diff
													</>
												}
											>
												<IconButton variant="surface" size="xs">
													<FaInfo />
												</IconButton>
											</ToggleTip>
										),
										action: {
											label: "閉じる",
											onClick() {},
										},
									});
								}}
							>
								{account.accountId}
							</Link>
						</Tooltip>
					</Flex>
					<Card.Description>{account.description}</Card.Description>
				</Card.Body>
			</Card.Root>
		</GridItem>
	));
}
