import type { PixelsType } from "@/interface/pixel-art";

export default function parsePixels(pixels: PixelsType[]) {
	try {
		if (pixels.length !== 5 * 5)
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
	} catch (e) {
		return { error: true, message: `パースに失敗しました\n${e}` };
	}

	return { message: "パースに成功しました" };
}
