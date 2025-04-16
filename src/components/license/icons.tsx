import type { IconType } from "react-icons";
import {
	SiChakraui,
	SiNextdotjs,
	SiReact,
	SiRemark,
	SiSwr,
} from "react-icons/si";

type IconsType = {
	[key: string]: IconType;
};

export const Icons: IconsType = {
	react: SiReact,
	"react-icons": SiReact,
	"react-dom": SiReact,
	"next-themes": SiNextdotjs,
	next: SiNextdotjs,
	"@emotion/react": SiReact,
	"@chakra-ui/react": SiChakraui,
	"react-markdown": SiRemark,
	"remark-gfm": SiRemark,
	swr: SiSwr,
};
