import { ImageResponse } from "next/og";
import { getDetail } from "@/lib/microcms";

export const size = {
	width: 1600,
	height: 900,
};

export const contentType = "image/png";

export default async function Image({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = await getDetail(slug).catch(() => {});
	if (!post) return;

	const [interBold, interRegular, notoSansJPBold, notoSansJPRegular] =
		await Promise.all([
			fetch(
				"https://fonts.gstatic.com/s/inter/v19/UcCO3FwrK3iLTeHuS_nVMrMxCp506jIw2boKoduKmMEVuGKYMZg.ttf",
			).then((data) => data.arrayBuffer()),
			fetch(
				"https://fonts.gstatic.com/s/inter/v19/UcCO3FwrK3iLTeHuS_nVMrMxCp50ijIw2boKoduKmMEVuLyfMZg.ttf",
			).then((data) => data.arrayBuffer()),
			fetch(
				"https://fonts.gstatic.com/s/notosansjp/v54/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFM8k75s.ttf",
			).then((data) => data.arrayBuffer()),
			fetch(
				"https://fonts.gstatic.com/s/notosansjp/v54/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75s.ttf",
			).then((data) => data.arrayBuffer()),
		]);

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				background: "#09090B",
				color: "#fafafa",
				alignItems: "center",
				justifyContent: "center",
				fontFamily: "Inter, Noto Sans JP",
				overflow: "hidden",
				whiteSpace: "pre-wrap",
				padding: 96,
				gap: 16,
				fontSize: "2rem",
			}}
		>
			<span style={{ fontWeight: "bold" }}>KiRura Blog</span>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 4,
					alignItems: "center",
				}}
			>
				<h1
					style={{
						fontWeight: "bold",
						fontSize: "2em",
						textOverflow: "ellipsis",
					}}
				>
					{post.title}
				</h1>
				{post.subtitle ? (
					<p
						style={{
							color: "#a1a1aa",
							textOverflow: "ellipsis",
						}}
					>
						{post.subtitle}
					</p>
				) : null}
			</div>
		</div>,
		{
			...size,
			fonts: [
				{
					name: "Inter",
					weight: 600,
					style: "normal",
					data: interBold,
				},
				{
					name: "Inter",
					weight: 400,
					style: "normal",
					data: interRegular,
				},
				{
					name: "Noto Sans JP",
					weight: 600,
					style: "normal",
					data: notoSansJPBold,
				},
				{
					name: "Noto Sans JP",
					weight: 400,
					style: "normal",
					data: notoSansJPRegular,
				},
			],
		},
	);
}
