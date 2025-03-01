import type { SystemStyleObject } from "@chakra-ui/react";

type ConfigType = {
	transitionAnimation: SystemStyleObject;
};

export const config: ConfigType = {
	transitionAnimation: {
		animation: "ease-out",
		animationDuration: "slow",
		animationName: "fade-in",
	},
};
