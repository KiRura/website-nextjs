// https://qiita.com/libertyu/items/57dd5931a914daf8f507

export function sliceByNumber<T>(array: readonly T[], number: number): T[][] {
	const length = Math.ceil(array.length / number);

	return new Array(length)
		.fill(0)
		.map((_, i) => array.slice(i * number, (i + 1) * number));
}
