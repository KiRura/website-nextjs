import type { MicroCMSImage } from "microcms-js-sdk";

export type ListPostType = {
	title: string;
	subtitle?: string;
	coverImage?: MicroCMSImage;
};

export type PostType = {
	title: string;
	subtitle?: string;
	coverImage?: MicroCMSImage;
	content: string;
};
