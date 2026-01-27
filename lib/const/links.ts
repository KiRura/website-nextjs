import type { IconType } from "react-icons";
import {
	LuBot,
	LuCircleDashed,
	LuClock,
	LuFactory,
	LuFlame,
	LuInstagram,
	LuMail,
	LuTrainTrack,
	LuTwitter,
	LuWaves,
	LuWind,
	LuYoutube,
} from "react-icons/lu";
import { RiBlueskyLine, RiDiscordLine } from "react-icons/ri";

const links: {
	label: string;
	id: string;
	description: string;
	href: string;
	icon: IconType;
	category: "social" | "game";
}[] = [
	{
		label: "Email",
		id: "kirura@kirura.f5.si",
		icon: LuMail,
		description: "なんかあれば",
		href: "mailto:kirura@kirura.f5.si",
		category: "social",
	},
	{
		label: "Twitter",
		id: "@7KiRura",
		icon: LuTwitter,
		description: "通知オンは100人 ブロックは3万人",
		href: "https://x.com/7KiRura",
		category: "social",
	},
	{
		label: "Discord",
		id: "7kirura",
		icon: RiDiscordLine,
		description: "いつもここにいる",
		href: "https://discord.com/users/606093171151208448",
		category: "social",
	},
	{
		label: "YouTube",
		id: "@7KiRura",
		icon: LuYoutube,
		description: "上げたい時に上げてる",
		href: "https://www.youtube.com/@7KiRura",
		category: "social",
	},
	{
		id: "@7kirura.bsky.social",
		label: "Bluesky",
		description: "一応",
		href: "https://bsky.app/profile/7kirura.bsky.social",
		icon: RiBlueskyLine,
		category: "social",
	},
	{
		id: "@kirura_7",
		label: "Instagram",
		description: "rom専 たまに飯テロ",
		href: "https://www.instagram.com/kirura_7",
		icon: LuInstagram,
		category: "social",
	},
	{
		id: "1301188343",
		label: "Zenless Zone Zero",
		description: "全人類やれ",
		href: "https://zenless.hoyoverse.com/",
		icon: LuCircleDashed,
		category: "game",
	},
	{
		id: "802728892",
		label: "崩壊：スターレイル",
		description: "信じて オンパロスも明るいですよ",
		href: "https://hsr.hoyoverse.com/",
		icon: LuTrainTrack,
		category: "game",
	},
	{
		id: "bHYG5cF09HUKHN7C",
		label: "Refind Self",
		description: "全人類やれ",
		href: "https://store.steampowered.com/app/2514960/Refind_Self",
		icon: LuBot,
		category: "game",
	},
	{
		id: "4921184031",
		label: "Arknights:Endfield",
		description: "UIが本当に素晴らしい",
		href: "https://endfield.gryphline.com/",
		icon: LuFactory,
		category: "game",
	},
	{
		id: "KiRura#371",
		label: "VALORANT",
		description: "基本マルチ",
		href: "https://playvalorant.com",
		icon: LuWind,
		category: "game",
	},
	{
		id: "KiRura#1579",
		label: "Overwatch",
		description: "ゲンボを一番やってる",
		href: "https://overwatch.blizzard.com/",
		icon: LuClock,
		category: "game",
	},
	{
		id: "803854671",
		label: "原神",
		description: "フォンテーヌまでやれ",
		href: "https://genshin.hoyoverse.com/",
		icon: LuWaves,
		category: "game",
	},
	{
		id: "21132502",
		label: "崩壊3rd",
		description: "ショートアニメが好き",
		href: "https://www.houkai3rd.com/",
		icon: LuFlame,
		category: "game",
	},
];

export { links };
