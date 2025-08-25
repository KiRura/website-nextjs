import { type CustomRequestInit, createClient } from "microcms-js-sdk";
import type { ListPostType, PostType } from "./interfaces";

if (!process.env.MICRO_CMS_API_KEY)
	throw new Error("process.env.MICRO_CMS_API_KEY is undefined");

export const cmsClient = createClient({
	apiKey: process.env.MICRO_CMS_API_KEY,
	serviceDomain: "kirura",
});

export const endpoint = "blog";
export const customRequestInit: CustomRequestInit = {
	next: { revalidate: 60 },
};

export async function getList() {
	return await cmsClient.getList<ListPostType>({
		endpoint: "blog",
		queries: {
			fields: "id,title,subtitle,coverImage,publishedAt,updatedAt",
		},
		customRequestInit,
	});
}

export async function getDetail(id: string) {
	return await cmsClient.getListDetail<PostType>({
		endpoint: "blog",
		contentId: id,
		customRequestInit,
	});
}
