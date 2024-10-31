"use client";

import { Switch } from "@/components/ui/switch";
import {
	AccordionItem,
	AccordionItemContent,
	AccordionItemTrigger,
	AccordionRoot,
	Container,
	Flex,
	Heading,
	Link,
	Table,
	VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import interJp from "./interjp";
import deps from "./licenses.json";

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

type DepData = {
	department: string;
	relatedTo: string;
	name: string;
	licensePeriod: string;
	material: string;
	licenseType: string;
	link: string;
	remoteVersion: string;
	installedVersion: string;
	definedVersion: string;
	author: string;
};

function ForInDepData(depData: DepData) {
	const data = [];

	for (const key in depData) {
		data.push({
			header: key,
			data: (depData as Record<string, string>)[key],
		});
	}

	return data;
}

export default function Page() {
	const [multiple, setMultiple] = useState(true);

	return (
		<Container maxW="8xl" my={12}>
			<VStack gap={8}>
				<VStack>
					<Heading>Deps</Heading>
					<Flex maxW="90vw" overflow="auto">
						<Table.Root whiteSpace="nowrap">
							<Table.Header>
								<Table.Row>
									{ForInDepData(deps[0]).map((data) => (
										<Table.ColumnHeader
											key={data.header}
											textAlign={
												data.header.match("Version") ? "right" : "left"
											}
										>
											{`${data.header.charAt(0).toUpperCase()}${data.header.replace(/([A-Z])/g, " $1").slice(1)}`}
										</Table.ColumnHeader>
									))}
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{deps.map((dep) => (
									<Table.Row key={dep.name}>
										{ForInDepData(dep).map((data) => (
											<Table.Cell
												key={data.header}
												textAlign={
													data.header.match("Version") ? "right" : "left"
												}
											>
												{data.data}
											</Table.Cell>
										))}
									</Table.Row>
								))}
							</Table.Body>
						</Table.Root>
					</Flex>
				</VStack>
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
			</VStack>
		</Container>
	);
}
