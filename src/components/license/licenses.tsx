"use client";

import interJp from "@/app/license/interjp";
import { Heading, Link, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import {
	AccordionItem,
	AccordionItemContent,
	AccordionItemTrigger,
	AccordionRoot,
} from "../ui/accordion";
import { Switch } from "../ui/switch";

type ChildLicenses = {
	name: string;
	content: string;
};

type Licenses = {
	title: string;
	license: ChildLicenses[];
	href?: string;
};

const licenses: Licenses[] = [
	{
		title: "Inter JP",
		license: interJp,
		href: "https://crea.techblog.jp/FontStudio/index.html#four",
	},
];

export default function Licenses() {
	const [multiple, setMultiple] = useState(true);
	return (
		<>
			<Switch
				checked={multiple}
				onCheckedChange={(e) => setMultiple(e.checked)}
			>
				複数展開
			</Switch>
			{licenses.map((license) => (
				<VStack key={license.title} w="100%">
					{license.href ? (
						<Link
							fontSize="xl"
							fontWeight="bold"
							variant="underline"
							color="orange.fg"
							asChild
						>
							<NextLink href={license.href} target="_blank">
								{license.title}
							</NextLink>
						</Link>
					) : (
						<Heading>{license.title}</Heading>
					)}
					<AccordionRoot multiple={multiple} collapsible>
						{license.license.map((data, i) => (
							<AccordionItem key={data.name} value={`${i}`}>
								<AccordionItemTrigger>{data.name}</AccordionItemTrigger>
								<AccordionItemContent whiteSpace="pre-wrap">
									{data.content}
								</AccordionItemContent>
							</AccordionItem>
						))}
					</AccordionRoot>
				</VStack>
			))}
		</>
	);
}
