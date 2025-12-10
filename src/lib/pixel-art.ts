"use server";

import { createClient } from "@supabase/supabase-js";
import { validateTurnstileToken } from "next-turnstile";
import {
	DrawingPixelArt,
	type DrawingPixelArtType,
	PixelArtDB,
	type ResponsePixelArtFromDBType,
	type ResponsePixelArtType,
} from "@/interface/pixel-art";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY)
	throw new Error("supabaseのenvがありません");
const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_ANON_KEY,
);

if (!process.env.TURNSTILE_SECRET_KEY)
	throw new Error("Turnstileのシークレットキーがありません");

export async function uploadPixels({
	title,
	pixels,
	token,
}: DrawingPixelArtType & {
	token: string;
}): Promise<
	| (ResponsePixelArtType & { error?: undefined })
	| { error: true; message: string }
> {
	const { data: parsed, ...parsedStatus } = DrawingPixelArt.safeParse({
		title,
		pixels,
	});
	if (!parsedStatus.success)
		return {
			error: true,
			message: `アップロードされたデータが不正です\n${parsedStatus.error.message}`,
		};

	const turnstile = await validateTurnstileToken({
		token,
		// biome-ignore lint/style/noNonNullAssertion: <throwしてる>
		secretKey: process.env.TURNSTILE_SECRET_KEY!,
	});
	if (!turnstile.success) {
		console.error(turnstile.error_codes);
		return { error: true, message: "Turnstileによる検証に失敗しました" };
	}

	const uuid = crypto.randomUUID();

	const [{ error: uploadError }, { data: response, error: selectError }] =
		await Promise.all([
			supabase.from(PixelArtDB.Table).insert({ uuid, ...parsed }),
			supabase
				.from(PixelArtDB.Table)
				.select<"*", ResponsePixelArtFromDBType>()
				.order("publishedAt", { ascending: true })
				.limit(1),
		]);

	if (uploadError) {
		console.error(uploadError);
		return { error: true, message: `アップロード中にエラーが発生しました` };
	}
	if (selectError) {
		console.error(selectError);
		return {
			error: true,
			message:
				"アップロードには成功しましたが、エラーにより絵を交換する事ができませんでした",
		};
	}

	if (!response[0] || response[0].uuid === uuid)
		return {
			error: true,
			message:
				"アップロードには成功しましたが、まだ交換できる絵がありませんでした",
		};

	supabase
		.from("pixel_arts")
		.delete()
		.eq("uuid", response[0].uuid)
		.then((res) => {
			if (res.error) console.error(res.error);
		});

	return {
		...response[0],
		publishedAt: new Date(response[0].publishedAt),
	};
}
