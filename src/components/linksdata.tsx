import type { JSX } from "react";
import type { IconType } from "react-icons";
import {
	FaBlog,
	FaBluesky,
	FaBolt,
	FaCloudMoon,
	FaDiscord,
	FaEnvelope,
	FaFire,
	FaGithub,
	FaGitlab,
	FaInstagram,
	FaRobot,
	FaStopwatch,
	FaTrain,
	FaTrash,
	FaTwitter,
	FaWind,
	FaYoutube,
} from "react-icons/fa6";
import { TwitterFooter } from "@/components/links/twitter";

export type Links = {
	accountId: string;
	name: string;
	description: string;
	href?: string;
	icon: IconType;
	category: "social" | "game";
	external?: () => JSX.Element | Promise<JSX.Element>;
};

export const links: Links[] = [
	{
		accountId: "kirura@kirura.f5.si",
		name: "Email",
		description: "一応お仕事用 引き受けるかは気分次第",
		href: "mailto://kirura@kirura.f5.si",
		icon: FaEnvelope,
		category: "social",
	},
	{
		accountId: "kirura-blog.vercel.app",
		name: "Blog",
		description: "ブログ",
		href: "https://kirura-blog.vercel.app",
		icon: FaBlog,
		category: "social",
	},
	{
		accountId: "@7KiRura",
		name: "YouTube",
		description: "思い付いたものをポンポン上げる",
		href: "https://www.youtube.com/channel/UCmPBPQzdqk3LhvxpadSdzDA",
		icon: FaYoutube,
		category: "social",
	},
	{
		accountId: "@7KiRura",
		name: "Twitter",
		description: "ただ思ったことを言い続ける",
		href: "https://twitter.com/i/user/1165939887998025728",
		icon: FaTwitter,
		category: "social",
		external: TwitterFooter,
	},
	{
		accountId: "KiRura",
		name: "GitHub",
		description: "負債",
		href: "https://github.com/KiRura",
		icon: FaGithub,
		category: "social",
	},
	{
		accountId: "KiRura",
		name: "GitLab",
		description: "GitHubから移転した後に結局GitHubに戻った",
		href: "https://gitlab.com/KiRura",
		icon: FaGitlab,
		category: "social",
	},
	{
		accountId: "@7kirura.bsky.social",
		name: "Bluesky",
		description: "一応",
		href: "https://bsky.app/profile/7kirura.bsky.social",
		icon: FaBluesky,
		category: "social",
	},
	{
		accountId: "@kirura_7",
		name: "Instagram",
		description: "rom専 たまに飯テロ",
		href: "https://www.instagram.com/kirura_7",
		icon: FaInstagram,
		category: "social",
	},
	{
		accountId: "7kirura",
		name: "Discord",
		description: "いつもここにいる",
		href: "https://discord.com/users/606093171151208448",
		icon: FaDiscord,
		category: "social",
	},
	{
		accountId: "bHYG5cF09HUKHN7C",
		name: "Refind Self",
		description: "全人類やれ",
		href: "https://store.steampowered.com/app/2514960/Refind_Self",
		icon: FaRobot,
		category: "game",
	},
	{
		accountId: "KiRura#371",
		name: "VALORANT",
		description: "基本マルチ",
		href: "https://playvalorant.com",
		icon: FaWind,
		category: "game",
	},
	{
		accountId: "KiRura#1579",
		name: "Overwatch",
		description: "ゲンボを一番やってる",
		href: "https://overwatch.blizzard.com/",
		icon: FaStopwatch,
		category: "game",
	},
	{
		accountId: "1301188343",
		name: "ZZZ",
		description: "全人類やれ",
		href: "https://zenless.hoyoverse.com/",
		icon: FaBolt,
		category: "game",
	},
	{
		accountId: "803854671",
		name: "原神",
		description: "フォンテーヌまでやれ",
		href: "https://genshin.hoyoverse.com/",
		icon: FaCloudMoon,
		category: "game",
	},
	{
		accountId: "802728892",
		name: "スタレ",
		description: "ピノコニーまでやれ",
		href: "https://hsr.hoyoverse.com/",
		icon: FaTrain,
		category: "game",
	},
	{
		accountId: "21132502",
		name: "崩壊3rd",
		description: "ショートアニメが好き",
		href: "https://www.houkai3rd.com/",
		icon: FaFire,
		category: "game",
	},
	{
		accountId: "きるら",
		name: "apex legends",
		description: "カス",
		icon: FaTrash,
		category: "game",
	},
];
