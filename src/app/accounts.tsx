"use client";

import { Tooltip } from "@/components/ui/tooltip";
import { Card, Flex, For, HStack, Icon, Link } from "@chakra-ui/react";
import { useState } from "react";
import {
	FaBluesky,
	FaDiscord,
	FaGithub,
	FaGitlab,
	FaInstagram,
	FaTwitter,
	FaYoutube,
} from "react-icons/fa6";
import {
	MdAir,
	MdAlarm,
	MdBolt,
	MdDelete,
	MdFireplace,
	MdGrass,
	MdSmartToy,
	MdTrain,
} from "react-icons/md";

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
		icon: MdSmartToy,
	},
	{
		accountId: "俺のオーディン#KiR",
		name: "VALORANT",
		description: "基本マルチ",
		href: "https://playvalorant.com",
		icon: MdAir,
	},
	{
		accountId: "KiRura#1579",
		name: "Overwatch",
		description: "ゲンボを一番やってる",
		href: "https://overwatch.blizzard.com/",
		icon: MdAlarm,
	},
	{
		accountId: "1301188343",
		name: "ZZZ",
		description: "全人類やれ",
		href: "https://zenless.hoyoverse.com/",
		icon: MdBolt,
	},
	{
		accountId: "803854671",
		name: "原神",
		description: "フォンテーヌまでやれ",
		href: "https://genshin.hoyoverse.com/",
		icon: MdGrass,
	},
	{
		accountId: "802728892",
		name: "スタレ",
		description: "ピノコニーまでやれ",
		href: "https://hsr.hoyoverse.com/",
		icon: MdTrain,
	},
	{
		accountId: "21132502",
		name: "崩壊3rd",
		description: "Steam版とデータが上手く連携できてない",
		href: "https://www.houkai3rd.com/",
		icon: MdFireplace,
	},
	{
		accountId: "きるら",
		name: "apex legends",
		description: "カス",
		icon: MdDelete,
	},
];

export default function Accounts() {
	const [copied, setCopied] = useState(-1);
	const [errored, setErrored] = useState(-1);
	const [open, setOpen] = useState(-1);

	return (
		<For each={accounts}>
			{(account, i) => (
				<Card.Root key={account.name} size="sm" w="100%">
					<Card.Body>
						<Flex align="start" justify="space-between">
							<HStack mb={2}>
								<Icon boxSize={5}>
									<account.icon />
								</Icon>
								<Card.Title>{account.name}</Card.Title>
							</HStack>
							<Tooltip
								content={
									copied === i
										? "コピーされました"
										: errored === i
											? "コピーできませんでした"
											: "コピー"
								}
								open={open === i}
								onOpenChange={(e) => {
									setOpen(e.open ? i : -1);
								}}
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
										setOpen(i);
									}}
								>
									{account.accountId}
								</Link>
							</Tooltip>
						</Flex>
						<Card.Description>{account.description}</Card.Description>
					</Card.Body>
				</Card.Root>
			)}
		</For>
	);
}
