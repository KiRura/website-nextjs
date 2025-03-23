export async function fetcher(key: string) {
	return fetch(key).then((res) => res.json());
}
