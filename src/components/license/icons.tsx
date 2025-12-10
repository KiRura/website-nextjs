import type { IconType } from "react-icons";
import { FaClock, FaCloudflare, FaDatabase } from "react-icons/fa6";
import {
	SiChakraui,
	SiNextdotjs,
	SiReact,
	SiRemark,
	SiSupabase,
	SiSwr,
	SiZod,
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
	"@opennextjs/cloudflare": FaCloudflare,
	"date-fns": FaClock,
	"microcms-js-sdk": FaDatabase,
	"@supabase/supabase-js": SiSupabase,
	"next-turnstile": FaCloudflare,
	zod: SiZod,
};
