"use client";

import {
	Box,
	Button,
	Clipboard,
	Image,
	Link,
	Popover,
	Portal,
	Separator,
	SimpleGrid,
} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import { useState } from "react";
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

export function HomeLink({ footer }: { footer?: boolean }) {
	const [i, setI] = useState(0);
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
	const [open, setOpen] = useState(false);

	return (
		<Popover.Root
			open={open}
			onOpenChange={(e) => setOpen(e.open)}
			positioning={{ placement: "bottom-start" }}
		>
			<Popover.Trigger h="8">
				<Tooltip content="🤔" open={i >= 10} disabled={i < 10} showArrow>
					<Link
						as={Popover.Trigger}
						asChild
						fontWeight="bold"
						onClick={() => {
							if (timeoutId) clearTimeout(timeoutId);
							setI((i) => i + 1);

							setTimeoutId(
								setTimeout(() => {
									setI(0);
								}, 2000),
							);
						}}
						onContextMenu={(event) => {
							event.preventDefault();

							setOpen(true);
						}}
					>
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
							>
								<NextImage
									src="/kirura/512.png"
									alt="kirura logo"
									width={512}
									height={512}
									priority
								/>
							</Image>
							<Box {...(!footer && { hideBelow: "md" })}>KiRura</Box>
						</NextLink>
					</Link>
				</Tooltip>
			</Popover.Trigger>
			<Portal>
				<Popover.Positioner>
					<Popover.Content>
						<Popover.Arrow />
						<Popover.Body spaceY="4">
							<SimpleGrid w="full" gap="4" columns={2}>
								<Clipboard.Root value={svg}>
									<Clipboard.Trigger asChild>
										<Button variant="outline">
											<Clipboard.Indicator />
											SVGをコピー
										</Button>
									</Clipboard.Trigger>
								</Clipboard.Root>
								<Button variant="outline" asChild>
									<NextLink href="/brand">
										<Image rounded="full" boxSize="6" minW="6" asChild>
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
							</SimpleGrid>
							<Separator />
							<Button variant="outline" w="full" asChild>
								<NextLink href="/">
									<FaHouse />
									ホーム
								</NextLink>
							</Button>
						</Popover.Body>
					</Popover.Content>
				</Popover.Positioner>
			</Portal>
		</Popover.Root>
	);
}
