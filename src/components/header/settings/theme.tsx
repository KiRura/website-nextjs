"use client";

import { Box, Button, Group, HStack, Switch, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaComputer, FaMoon, FaSun } from "react-icons/fa6";
import { useColorMode } from "@/components/ui/color-mode";

export function Theme() {
	const [localStorageTheme, setLocalStorageTheme] = useState<string | null>(
		null,
	);

	const { colorMode, setColorMode } = useColorMode();

	const modes = [
		{
			name: "ライト",
			icon: FaSun,
			value: "light",
		},
		{
			name: "ダーク",
			icon: FaMoon,
			value: "dark",
		},
	];

	useEffect(() => {
		setLocalStorageTheme(localStorage.getItem("theme"));
	}, []);

	return (
		<Box spaceY="2" w="full">
			<Group grow attached>
				{modes.map((mode) => {
					return (
						<Button
							key={mode.value}
							h="fit"
							py="2"
							variant="outline"
							colorScheme={mode.value}
							disabled={!localStorageTheme}
							{...(colorMode === mode.value
								? { color: "orange.fg" }
								: {
										variant: "solid",
										color: "fg.muted",
										onClick: () => {
											setLocalStorageTheme(mode.value);
											setColorMode(mode.value as "dark" | "light");
										},
									})}
						>
							<VStack>
								<mode.icon />
								{mode.name}
							</VStack>
						</Button>
					);
				})}
			</Group>
			<Switch.Root
				checked={localStorageTheme === null}
				onCheckedChange={(e) => {
					setLocalStorageTheme(e.checked ? null : colorMode);
					if (e.checked) {
						setColorMode(
							window.matchMedia?.("(prefers-color-scheme: dark)").matches
								? "dark"
								: "light",
						);
						localStorage.removeItem("theme");
					} else {
						setColorMode(colorMode);
					}
				}}
				w="full"
				justifyContent="space-between"
				borderWidth="1px"
				p="3"
				rounded="sm"
				cursor="switch"
				bg={{ _hover: "bg.muted" }}
				transition="backgrounds"
			>
				<Switch.HiddenInput />
				<Switch.Label>
					<HStack>
						<FaComputer /> システムに従う
					</HStack>
				</Switch.Label>
				<Switch.Control />
			</Switch.Root>
		</Box>
	);
}
