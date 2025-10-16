import { Box, Container, Link, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import type { IconType } from "react-icons";
import {
	FaBezierCurve,
	FaBook,
	FaCircle,
	FaImage,
	FaUpRightFromSquare,
} from "react-icons/fa6";
import { Aria } from "@/components/ui/aria";

export const metadata: Metadata = {
	title: "ロゴについて",
	description: "svg, png, 旧アイコン",
};

const logos: {
	category: {
		name: string;
		icon: IconType;
	};
	files: {
		name: string;
		description?: string;
		href: string;
	}[];
}[] = [
	{
		category: {
			name: "SVG",
			icon: FaBezierCurve,
		},
		files: [
			{
				name: "Inkspace SVG",
				description: "Inkspace用SVGとして出力したもの",
				href: "/kirura/inkspace.svg",
			},
			{
				name: "SVG",
				description: "普通のSVG",
				href: "/kirura/kirura.svg",
			},
		],
	},
	{
		category: { name: "PNG", icon: FaImage },
		files: [
			{
				name: "2048p",
				href: "/kirura/2048p.png",
			},
			{
				name: "1024p",
				href: "/kirura/1024p.png",
			},
			{
				name: "768p",
				href: "/kirura/768p.png",
			},
			{
				name: "512p",
				href: "/kirura/512p.png",
			},
		],
	},
	{
		category: { name: "PNG Rounded", icon: FaCircle },
		files: [
			{
				name: "2048p",
				href: "/kirura/rounded/2048p.png",
			},
			{
				name: "1024p",
				href: "/kirura/rounded/1024p.png",
			},
			{
				name: "768p",
				href: "/kirura/rounded/768p.png",
			},
			{
				name: "512p",
				href: "/kirura/rounded/512p.png",
			},
		],
	},
	{
		category: { name: "Legacy", icon: FaBook },
		files: [
			{
				name: "400p jpg",
				href: "/kirura/legacy/kirura.jpg",
			},
		],
	},
];

export default function Page() {
	return (
		<Container maxW="2xl" py="8" spaceY="4">
			{logos.map((logo) => (
				<Aria
					key={logo.category.name}
					title={logo.category.name}
					icon={<logo.category.icon />}
				>
					{logo.files.map((file) => (
						<Box key={file.href}>
							<Link href={file.href} target="_blank" colorPalette="orange">
								{file.name} <FaUpRightFromSquare />
							</Link>
							{file.description && <Text>{file.description}</Text>}
						</Box>
					))}
				</Aria>
			))}
		</Container>
	);
}
