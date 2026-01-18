import { exec as _exec } from "node:child_process";
import { promisify } from "node:util";
import {
	Container,
	Icon,
	Link,
	LinkOverlay,
	SimpleGrid,
	Table,
} from "@chakra-ui/react";
import type { Metadata } from "next";
import { FaFileImport, FaUpRightFromSquare } from "react-icons/fa6";
import z from "zod";
import Aria from "@/components/ui/aria";

const exec = promisify(_exec);
const schema = z
	.object({
		name: z.string(),
		licenseType: z.string(),
		link: z.url().pipe(z.transform((link) => new URL(link))),
		remoteVersion: z.string(),
		installedVersion: z.string(),
		definedVersion: z.string(),
		author: z.string(),
	})
	.array();

export const metadata: Metadata = {
	title: "ライセンス",
	description: "ライセンス一覧",
};

export default async function Page() {
	const [prod, dev] = await Promise.all([
		exec("./node_modules/.bin/license-report --only=prod"),
		exec("./node_modules/.bin/license-report --only=dev"),
	]);
	const categories = [
		{
			label: "Production",
			deps: schema.parse(JSON.parse(prod.stdout)),
		},
		{
			label: "Development",
			deps: schema.parse(JSON.parse(dev.stdout)),
		},
	];

	return (
		<Container as="main" py="8" spaceY="8">
			<SimpleGrid columns={{ mdDown: 1, md: 2 }} gap="4">
				{categories.map((category) => (
					<Aria.Root key={`deps-${category.label}`}>
						<Aria.TitleBar>
							<Aria.Title>
								<FaFileImport />
								{category.label}
							</Aria.Title>
						</Aria.TitleBar>
						<Aria.Body>
							<Table.Root variant="outline" striped>
								<Table.Body>
									{category.deps.map((dep) => (
										<Table.Row key={`dep-${dep.name}`}>
											<Table.Cell
												pos="relative"
												_hover={{ bgColor: "bg.muted" }}
												transition="backgrounds"
											>
												<LinkOverlay asChild>
													<Link
														href={`https://${dep.link.host}${dep.link.pathname}`}
														target="_blank"
														referrerPolicy="no-referrer"
														display="flex"
														alignItems="center"
														justifyContent="space-between"
														color="orange.fg"
														fontWeight="bold"
													>
														{dep.name}
														<Icon aria-hidden color="fg.subtle">
															<FaUpRightFromSquare />
														</Icon>
													</Link>
												</LinkOverlay>
											</Table.Cell>
											<Table.Cell>{dep.licenseType}</Table.Cell>
											<Table.Cell
												textAlign="end"
												fontFamily="mono"
												whiteSpace="nowrap"
											>
												{dep.installedVersion}
											</Table.Cell>
										</Table.Row>
									))}
								</Table.Body>
							</Table.Root>
						</Aria.Body>
					</Aria.Root>
				))}
			</SimpleGrid>

			{/* <Aria.Root>
				<Aria.TitleBar>
					<Aria.Title>
						<FaFileSignature />
						ライセンス
					</Aria.Title>
				</Aria.TitleBar>
				<Aria.Body>
					<Licenses />
				</Aria.Body>
			</Aria.Root> */}
		</Container>
	);
}
