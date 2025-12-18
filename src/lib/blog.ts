import {
	type CustomRequestInit,
	MicroCMSQueries,
	createClient,
} from "microcms-js-sdk";
import type { PostType, PostWithContentType } from "../interface/blog";

if (!process.env.MICRO_CMS_API_KEY)
	throw new Error("process.env.MICRO_CMS_API_KEY is undefined");

const cmsClient = createClient({
	apiKey: process.env.MICRO_CMS_API_KEY,
	serviceDomain: "kirura",
});

const endpoint = "blog";
const customRequestInit: CustomRequestInit = {
	next: { revalidate: 60 },
};

async function getList(props?: { queries?: MicroCMSQueries }) {
	return await cmsClient.getList<PostType>({
		endpoint: endpoint,
		queries: {
			fields: [
				"id",
				"title",
				"subtitle",
				"coverImage",
				"publishedAt",
				"updatedAt",
			],
			orders: "-publishedAt",
			...props?.queries,
		},
		customRequestInit,
	});
}

async function getListIds() {
	return await cmsClient.getAllContentIds({
		endpoint: endpoint,
		customRequestInit,
	});
}

async function getDetail(id: string) {
	return await cmsClient.getListDetail<PostWithContentType>({
		endpoint: endpoint,
		contentId: id,
		customRequestInit,
	});
}

export { getList, getListIds, getDetail };
