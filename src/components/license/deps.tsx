import deps from "@/app/license/licenses.json";
import { Card, Code, Flex, Link, Tag } from "@chakra-ui/react";
import NextLink from "next/link";
import { AnimatedGridItem } from "../animated_griditem";

const regex =
	/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export function Deps() {
	return (
		<AnimatedGridItem
			elementArray={deps.map((dep, _i) => {
				const link = (dep.link.match(regex) || [dep.link])[0];

				return {
					key: dep.name,
					element: (
						<Card.Root size="sm">
							<Card.Body gap={4}>
								<Flex align="start" justify="space-between">
									<Card.Title asChild>
										<Link asChild variant="underline">
											<NextLink href={link} target="_blank">
												{dep.name}
											</NextLink>
										</Link>
									</Card.Title>
									<Code>{dep.installedVersion}</Code>
								</Flex>
								<Flex>
									<Tag.Root>
										<Tag.Label>{dep.licenseType}</Tag.Label>
									</Tag.Root>
								</Flex>
							</Card.Body>
						</Card.Root>
					),
				};
			})}
		/>
	);
}
