"use server";

import { createClient } from "@supabase/supabase-js";
import { validateTurnstileToken } from "next-turnstile";
import type { PixelsType } from "@/interface/pixel-art";

if (
	!process.env.NEXT_PUBLIC_SUPABASE_URL ||
	!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
	throw new Error("supabaseのenvがありません");
const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

type ResultType = {
	uuid: string;
	created_at: string;
	title: string;
	pixels: PixelsType[];
};

if (!process.env.TURNSTILE_SECRET_KEY)
	throw new Error("Turnstileのシークレットキーがありません");

export async function uploadPixels({
	title,
	pixels,
	token,
}: {
	title: string;
	pixels: PixelsType[];
	token: string;
}): Promise<{
	error?: true;
	uuid?: string;
	created_at?: string;
	title?: string;
	pixels?: PixelsType[];
	message: string;
}> {
	if (title === undefined)
		return { error: true, message: "タイトルがありません" };
	if (title.length > 7)
		return { error: true, message: "タイトルの文字数が7文字を超えています" };
	if (pixels?.length !== 5 * 5)
		return { error: true, message: "ピクセル数が25に一致しません" };
	let missingIndex = false;
	let missingColor = false;
	for (let i = 0; i < 25; i++) {
		const pixel = pixels[i];
		missingIndex = pixel.index !== i;
		if (!pixel.color) continue;
		missingColor = !pixel.color.match(
			/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/,
		)?.length;
	}
	if (missingIndex)
		return { error: true, message: "ピクセルのインデックスが不正です" };
	if (missingColor) return { error: true, message: "カラーコードが無効です" };

	const turnstile = await validateTurnstileToken({
		token,
		// biome-ignore lint/style/noNonNullAssertion: <throwしてる>
		secretKey: process.env.TURNSTILE_SECRET_KEY!,
	});
	if (!turnstile.success || turnstile.error_codes?.length) {
		if (turnstile.error_codes?.length) console.error(turnstile.error_codes);
		return { error: true, message: "Turnstileによる検証に失敗しました" };
	}

	const uuid = crypto.randomUUID();

	const { error: uploadError } = await supabase
		.from("pixel_arts")
		.insert({ uuid, title: title || "無題", pixels });
	if (uploadError) {
		console.error(uploadError);
		return { error: true, message: `アップロード中にエラーが発生しました` };
	}

	const { data: res, error: selectError } = await supabase
		.from("pixel_arts")
		.select<"*", ResultType>()
		.limit(1);
	if (selectError) {
		console.error(selectError);
		return {
			error: true,
			message:
				"アップロードには成功しましたが、エラーにより絵を交換する事ができませんでした",
		};
	}
	if (!res[0] || res[0].uuid === uuid)
		return {
			error: true,
			message:
				"アップロードには成功しましたが、まだ交換できる絵がありませんでした",
		};

	supabase
		.from("pixel_arts")
		.delete()
		.eq("uuid", res[0].uuid)
		.then((res) => {
			if (res.error) console.error(res.error);
		});

	return {
		message: "交換しました",
		...res[0],
	};
}
