import type { MicroCMSImage } from "microcms-js-sdk";

type PostType = {
	title: string;
	subtitle?: string;
	coverImage?: MicroCMSImage;
};

type PostWithContentType = {
	title: string;
	subtitle?: string;
	coverImage?: MicroCMSImage;
	content: string;
};

export type { PostType, PostWithContentType };
