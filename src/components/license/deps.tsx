import {
	Card,
	Flex,
	HStack,
	Icon,
	Link,
	LinkOverlay,
	Tag,
	Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaUpRightFromSquare } from "react-icons/fa6";
import deps from "@/app/license/licenses.json";
import { Icons } from "./icons";

const regex =
	/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

export function Deps() {
	return deps.map((dep, _i) => {
		const link = (dep.link.match(regex) || [dep.link])[0];
		const DepIcon = Icons[dep.name];

		return (
			<Card.Root key={dep.name} size="sm" h="full" bg={{ _hover: "bg.muted" }}>
				<Card.Header>
					<Flex align="start" justify="space-between">
						<HStack>
							<DepIcon />
							<Card.Title asChild>
								<LinkOverlay asChild>
									<Link asChild variant="underline">
										<NextLink href={link} target="_blank">
											{dep.name}{" "}
											<Icon boxSize="0.7em">
												<FaUpRightFromSquare />
											</Icon>
										</NextLink>
									</Link>
								</LinkOverlay>
							</Card.Title>
						</HStack>
						<Text
							fontFamily="mono"
							fontSize="sm"
							fontStyle="italic"
							color="fg.subtle"
						>
							{dep.installedVersion}
						</Text>
					</Flex>
				</Card.Header>
				<Card.Body>
					<Flex>
						<Tag.Root>
							<Tag.Label>{dep.licenseType}</Tag.Label>
						</Tag.Root>
					</Flex>
				</Card.Body>
			</Card.Root>
		);
	});
}
