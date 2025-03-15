import type { IconType } from "react-icons";
import { FaReact } from "react-icons/fa6";
import {
	SiChakraui,
	SiNextdotjs,
	SiRemark,
	SiSwr,
	SiVercel,
} from "react-icons/si";

type IconsType = {
	[key: string]: IconType;
};

export const Icons: IconsType = {
	react: FaReact,
	"react-icons": FaReact,
	"react-dom": FaReact,
	"next-themes": SiNextdotjs,
	next: SiNextdotjs,
	"@emotion/react": FaReact,
	"@chakra-ui/react": SiChakraui,
	"@vercel/speed-insights": SiVercel,
	"react-markdown": SiRemark,
	"remark-gfm": SiRemark,
	swr: SiSwr,
};
