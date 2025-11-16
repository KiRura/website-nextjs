"use client";

import {
	Button,
	ButtonGroup,
	ClientOnly,
	Clipboard,
	Image,
	Link,
	Menu,
	Portal,
	Span,
} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import { type RefObject, useState } from "react";
import { FaHouse } from "react-icons/fa6";
import { Tooltip } from "../ui/tooltip";

const svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>

<svg
   width="48"
   height="48"
   viewBox="0 0 12.7 12.700001"
   version="1.1"
   id="svg1"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <defs
     id="defs1">
    <linearGradient
       id="linearGradient29">
      <stop
         style="stop-color:#7574f0;stop-opacity:1;"
         offset="0.2"
         id="stop29" />
      <stop
         style="stop-color:#b2d5fa;stop-opacity:1;"
         offset="0.81"
         id="stop30" />
    </linearGradient>
    <linearGradient
       xlink:href="#linearGradient29"
       id="linearGradient30"
       x1="2.0584428"
       y1="5.9530234"
       x2="5.708353"
       y2="6.6624942"
       gradientUnits="userSpaceOnUse"
       spreadMethod="pad" />
  </defs>
  <g
     id="layer1">
    <g
       id="g5-8"
       transform="translate(0.0394634,0.04224135)"
       style="display:inline">
      <path
         d="M 8.2576927,2.5083658 5.5752447,5.6308997 5.3206811,7.0468834 6.9666615,10.107152 H 9.561166 L 7.364549,6.229823 7.3853037,6.1307086 10.596787,2.5083658 Z"
         style="font-size:12.7px;line-height:0;fill:#fc835c;fill-opacity:1;stroke-width:0.216866"
         id="path5-2" />
      <path
         d="M 3.5025345,2.5083658 2.0242867,10.107152 H 4.264263 L 5.7425107,2.5083658 Z"
         style="font-size:12.7px;line-height:0;fill:#2f2f2f;fill-opacity:1;stroke-width:0.216866"
         id="path4-4" />
    </g>
  </g>
</svg>`;

export function HomeLink({
	containerRef,
}: {
	containerRef?: RefObject<HTMLElement | null>;
}) {
	const [i, setI] = useState(0);
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

	const link = (
		<Link asChild fontWeight="bold" fontSize="xl">
			<NextLink
				{...(i < 20
					? { href: "/" }
					: { href: "https://youtu.be/dQw4w9WgXcQ", target: "_blank" })}
			>
				<Image
					asChild
					boxSize="8"
					minW="8"
					rounded="full"
					aspectRatio="square"
					mr={{ md: "0.5" }}
				>
					<NextImage
						src="/kirura/512p.png"
						alt="kirura logo"
						width={512}
						height={512}
						priority
						loading="eager"
					/>
				</Image>
				<Span {...(containerRef === undefined && { hideBelow: "md" })}>
					KiRura
				</Span>
			</NextLink>
		</Link>
	);

	return (
		<ClientOnly fallback={link}>
			<Menu.Root positioning={{ placement: "bottom-start" }}>
				<Tooltip content="🤔" open={i >= 10} disabled={i < 10} showArrow>
					<Menu.ContextTrigger
						asChild
						onClick={() => {
							if (timeoutId) clearTimeout(timeoutId);
							setI((i) => i + 1);

							setTimeoutId(
								setTimeout(() => {
									setI(0);
								}, 2000),
							);
						}}
					>
						{link}
					</Menu.ContextTrigger>
				</Tooltip>
				<Portal container={containerRef}>
					<Menu.Positioner>
						<Menu.Content spaceY="4" p="4">
							<ButtonGroup variant="surface" attached grow>
								<Clipboard.Root asChild value={svg}>
									<Clipboard.Trigger asChild>
										<Button py="2" h="fit" flexDir="column">
											<Clipboard.Indicator />
											SVGをコピー
										</Button>
									</Clipboard.Trigger>
								</Clipboard.Root>
								<Button py="2" h="fit" flexDir="column" asChild>
									<NextLink href="/brand">
										<Image rounded="full" boxSize="3.5" asChild>
											<NextImage
												src="/kirura/512p.png"
												alt="kirura logo"
												width={512}
												height={512}
											/>
										</Image>
										ロゴについて
									</NextLink>
								</Button>
							</ButtonGroup>
							<Menu.Separator />
							<Button variant="surface" w="full" asChild>
								<NextLink href="/">
									<FaHouse />
									ホーム
								</NextLink>
							</Button>
						</Menu.Content>
					</Menu.Positioner>
				</Portal>
			</Menu.Root>
		</ClientOnly>
	);
}
