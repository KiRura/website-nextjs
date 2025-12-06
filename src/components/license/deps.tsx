import {
	Card,
	Center,
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
		const link = (dep.link.match(regex) || [dep.link])[0].replace(
			"git+ssh://",
			"https://",
		);
		const DepIcon = Icons[dep.name];

		return (
			<Card.Root
				key={dep.name}
				flexDir="row"
				size="sm"
				h="full"
				bg={{ _hover: "bg.muted" }}
				transition="backgrounds"
			>
				<Card.Body spaceY="3">
					<HStack align="start" justify="space-between">
						<Card.Title overflowWrap="anywhere" asChild>
							<LinkOverlay asChild>
								<Link asChild variant="underline">
									<NextLink href={link} target="_blank">
										<Icon>
											<DepIcon />
										</Icon>
										{dep.name}
									</NextLink>
								</Link>
							</LinkOverlay>
						</Card.Title>
						<Text
							fontFamily="mono"
							fontSize="sm"
							fontStyle="italic"
							color="fg.muted"
						>
							{dep.installedVersion}
						</Text>
					</HStack>
					<Tag.Root w="fit">
						<Tag.Label>{dep.licenseType}</Tag.Label>
					</Tag.Root>
				</Card.Body>
				<Center h="full" py="3" pr="3">
					<Icon color="bg.emphasized">
						<FaUpRightFromSquare />
					</Icon>
				</Center>
			</Card.Root>
		);
	});
}
