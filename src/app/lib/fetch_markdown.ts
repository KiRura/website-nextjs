"use server";

export async function fetchMarkdown() {
	return await fetch(
		"https://api.github.com/repos/KiRura/ytmods-prism-instance/contents/README.md",
		{
			headers: {
				Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
			},
			method: "GET",
		},
	).then((data) => data.json());
}
