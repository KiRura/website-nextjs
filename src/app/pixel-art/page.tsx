"use client";

import {
	Bleed,
	Box,
	Button,
	ButtonGroup,
	Card,
	ClientOnly,
	ColorPicker,
	Container,
	Dialog,
	Em,
	Flex,
	Heading,
	HStack,
	IconButton,
	Input,
	Portal,
	parseColor,
	ScrollArea,
	Separator,
	SimpleGrid,
	Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { Turnstile } from "next-turnstile";
import { useEffect, useState } from "react";
import {
	FaCheck,
	FaEraser,
	FaEyeDropper,
	FaPaintbrush,
	FaRotateRight,
} from "react-icons/fa6";
import { useColorMode } from "@/components/ui/color-mode";
import type { PixelsType } from "@/interface/pixel-art";
import { uploadPixels } from "@/lib/pixel-art";
import Loading from "../loading";

type SavedPixelsType = {
	uuid: string;
	title: string;
	createdAt: Date;
	pixels: PixelsType[];
};

if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)
	throw new Error("Turnstileのサイトキーがありません");

function initPixels() {
	return new Array(5 * 5).fill(0).map((_, i) => ({ index: i, color: null }));
}

export default function Page() {
	const { colorMode } = useColorMode();
	const [token, setToken] = useState<string | null>(null);
	const [pixels, setPixels] = useState<PixelsType[]>(initPixels());
	const [title, setTitle] = useState("");
	const [mode, setMode] = useState<"draw" | "erase" | "pipette">("draw");
	const [color, setColor] = useState(parseColor("#fc835cff"));
	const [uploadDialog, setUploadDialog] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [result, setResult] = useState<{
		uuid: string;
		title: string;
		createdAt: Date;
		pixels: PixelsType[];
	} | null>(null);
	const [saved, setSaved] = useState<SavedPixelsType[]>([]);
	const [savedIndicator, setSavedIndicator] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const title = localStorage.getItem("pixel_art_title");
		setTitle(title ?? "");

		const saved = localStorage.getItem("pixel_art");
		if (!saved) return;
		let parsed: PixelsType[];

		try {
			parsed = JSON.parse(saved);
		} catch (e) {
			setError(`保存されていた絵の読み込みに失敗しました\n${e}`);
			return;
		}

		setPixels(parsed);
	}, []);

	useEffect(() => {
		const _saved = localStorage.getItem("pixel_art_saved");
		if (!_saved) return;
		let parsedData: SavedPixelsType[];

		try {
			const parsed: {
				uuid: string;
				title: string;
				pixels: PixelsType[];
				createdAt: string;
			}[] = JSON.parse(_saved);
			parsedData = parsed.map(({ createdAt, ...rest }) => ({
				...rest,
				createdAt: new Date(createdAt),
			}));
		} catch (e) {
			setError(`保存されていた絵の読み込みに失敗しました\n${e}`);
			return;
		}

		setSaved(parsedData);
	}, []);

	return (
		<ClientOnly fallback={<Loading />}>
			{() => (
				<>
					<Container as="main" centerContent py="4" gap="8">
						<Box maxW="xs" w="full" spaceY="2">
							<HStack>
								<Input
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									onBlur={() => localStorage.setItem("pixel_art_title", title)}
									variant="flushed"
									flex={1}
									placeholder="無題 (7文字まで)"
									maxLength={7}
								/>
								<Dialog.Root placement="center">
									<Dialog.Trigger asChild>
										<IconButton variant="outline">
											<FaRotateRight />
										</IconButton>
									</Dialog.Trigger>
									<Portal>
										<Dialog.Backdrop />
										<Dialog.Positioner>
											<Dialog.Content>
												<Dialog.Header>
													<Dialog.Title>本当にリセットしますか？</Dialog.Title>
												</Dialog.Header>
												<Dialog.Footer>
													<Dialog.ActionTrigger asChild>
														<Button
															colorPalette="red"
															onClick={() => {
																setPixels(initPixels());
																setTitle("");
																localStorage.removeItem("pixel_art");
																localStorage.removeItem("pixel_art_title");
															}}
														>
															はい
														</Button>
													</Dialog.ActionTrigger>
													<Dialog.ActionTrigger asChild>
														<Button variant="outline">いいえ</Button>
													</Dialog.ActionTrigger>
												</Dialog.Footer>
											</Dialog.Content>
										</Dialog.Positioner>
									</Portal>
								</Dialog.Root>
							</HStack>
							<SimpleGrid columns={5} borderWidth="1px">
								{pixels.map((pixel, i) => (
									<IconButton
										variant="plain"
										w="full"
										h="full"
										aspectRatio="square"
										key={`pixel-${pixel.index}`}
										rounded="none"
										borderColor="border.emphasized"
										bgColor={pixel.color ?? "transparent"}
										onClick={() => {
											if (mode === "pipette" && pixel.color) {
												setColor(parseColor(pixel.color));
												setMode("draw");
												return;
											}
											const newPixels = [...pixels];
											newPixels[i].color =
												mode === "draw" ? color.toString("hexa") : null;
											setPixels(newPixels);
											localStorage.setItem(
												"pixel_art",
												JSON.stringify(newPixels),
											);
										}}
									/>
								))}
							</SimpleGrid>
							<HStack justify="space-between">
								<ButtonGroup variant="surface" attached>
									<IconButton
										variant={mode === "draw" ? "solid" : undefined}
										onClick={() => setMode("draw")}
									>
										<FaPaintbrush />
									</IconButton>
									<IconButton
										variant={mode === "erase" ? "solid" : undefined}
										onClick={() => setMode("erase")}
									>
										<FaEraser />
									</IconButton>
									<IconButton
										variant={mode === "pipette" ? "solid" : undefined}
										onClick={() => setMode("pipette")}
									>
										<FaEyeDropper />
									</IconButton>
								</ButtonGroup>
								<ColorPicker.Root
									value={color}
									onValueChange={(e) => setColor(e.value)}
								>
									<ColorPicker.HiddenInput />
									<ColorPicker.Control>
										<ColorPicker.Trigger cursor="button" />
									</ColorPicker.Control>
									<Portal>
										<ColorPicker.Positioner>
											<ColorPicker.Content>
												<ColorPicker.Area />
												<HStack>
													<ColorPicker.Sliders />
												</HStack>
											</ColorPicker.Content>
										</ColorPicker.Positioner>
									</Portal>
								</ColorPicker.Root>
							</HStack>
							<Separator />
							<Dialog.Root
								placement="center"
								open={uploadDialog}
								onOpenChange={(e) => setUploadDialog(e.open)}
							>
								<Dialog.Trigger asChild>
									<Button w="full">交換する</Button>
								</Dialog.Trigger>
								<Portal>
									<Dialog.Backdrop />
									<Dialog.Positioner>
										<Dialog.Content>
											<Dialog.Header>
												<Dialog.Title>本当に交換しますか？</Dialog.Title>
											</Dialog.Header>
											<Dialog.Body>
												<Text>
													一度交換すると描いた絵は二度と見られなくなります。
												</Text>
												<Turnstile
													// biome-ignore lint/style/noNonNullAssertion: <throwしてる>
													siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
													onVerify={(token) => setToken(token)}
													theme={colorMode}
												/>
											</Dialog.Body>
											<Dialog.Footer>
												<Button
													loading={uploading}
													disabled={!token}
													onClick={async () => {
														if (!token) return;
														setUploading(true);
														const res = await uploadPixels({
															title: title ?? "無題",
															pixels,
															token,
														});
														setUploading(false);
														setUploadDialog(false);
														if (res.error) return setError(res.message);
														setTitle("");
														setPixels(initPixels());
														if (!res.uuid || !res.pixels)
															return setError(res.message);
														setResult({
															uuid: res.uuid,
															title: res.title ?? "無題",
															pixels: res.pixels,
															createdAt: new Date(res.created_at ?? 0),
														});
													}}
												>
													はい
												</Button>
												<Dialog.ActionTrigger asChild>
													<Button variant="outline">いいえ</Button>
												</Dialog.ActionTrigger>
											</Dialog.Footer>
										</Dialog.Content>
									</Dialog.Positioner>
								</Portal>
							</Dialog.Root>
						</Box>
						<Separator w="full" />
						<ScrollArea.Root maxW="8xl" size="xs">
							<ScrollArea.Viewport>
								<ScrollArea.Content>
									<Flex gap="4" flexWrap="nowrap">
										{saved.map((data) => (
											<Card.Root
												key={`pixels-saved-${data.uuid}`}
												size="sm"
												minW="48"
											>
												<Card.Header>
													<Card.Title>{data.title}</Card.Title>
												</Card.Header>
												<Card.Body display="flex" alignItems="center">
													<SimpleGrid columns={5} w="fit" borderWidth="1px">
														{data.pixels.map((pixel) => (
															<Bleed
																w="8"
																h="8"
																aspectRatio="square"
																key={`pixel-saved-${data.uuid}-${pixel.index}`}
																rounded="none"
																borderWidth="1px"
																borderColor="border.emphasized"
																bgColor={pixel.color ?? "transparent"}
															/>
														))}
													</SimpleGrid>
												</Card.Body>
												<Card.Footer>
													<Em>{format(data.createdAt, "yyyy-MM-dd")}</Em>
												</Card.Footer>
											</Card.Root>
										))}
									</Flex>
								</ScrollArea.Content>
							</ScrollArea.Viewport>
							<ScrollArea.Scrollbar orientation="horizontal" />
							<ScrollArea.Corner />
						</ScrollArea.Root>
					</Container>
					<Dialog.Root
						placement="center"
						open={error !== null}
						onOpenChange={() => setError(null)}
					>
						<Portal>
							<Dialog.Backdrop />
							<Dialog.Positioner>
								<Dialog.Content>
									<Dialog.Header>
										<Dialog.Title>エラーが発生しました</Dialog.Title>
									</Dialog.Header>
									<Dialog.Body>
										<Text>{error}</Text>
									</Dialog.Body>
									<Dialog.Footer>
										<Dialog.ActionTrigger asChild>
											<Button>分かった</Button>
										</Dialog.ActionTrigger>
									</Dialog.Footer>
								</Dialog.Content>
							</Dialog.Positioner>
						</Portal>
					</Dialog.Root>
					<Dialog.Root
						placement="center"
						open={result !== null}
						onOpenChange={() => setResult(null)}
					>
						<Portal>
							<Dialog.Backdrop />
							<Dialog.Positioner>
								<Dialog.Content>
									<Dialog.Header>
										<Dialog.Title>交換しました</Dialog.Title>
									</Dialog.Header>
									<Dialog.Body>
										<Heading>{result?.title}</Heading>
										<SimpleGrid columns={5} borderWidth="1px">
											{result?.pixels.map((pixel) => (
												<IconButton
													variant="plain"
													w="full"
													h="full"
													aspectRatio="square"
													key={`pixel-${pixel.index}`}
													rounded="none"
													borderColor="border.emphasized"
													bgColor={pixel.color ?? "transparent"}
												/>
											))}
										</SimpleGrid>
									</Dialog.Body>
									<Dialog.Footer>
										<Button
											onClick={() => {
												if (!result) return;
												setSaved((prevSaved) => {
													const newSaved = [...prevSaved, result];
													localStorage.setItem(
														"pixel_art_saved",
														JSON.stringify(newSaved),
													);
													return newSaved;
												});
												setSavedIndicator(true);
												setTimeout(() => {
													setSavedIndicator(false);
													setResult(null);
												}, 1000);
											}}
										>
											{savedIndicator ? <FaCheck /> : "保存する"}
										</Button>
										<Dialog.ActionTrigger asChild>
											<Button variant="outline">閉じる</Button>
										</Dialog.ActionTrigger>
									</Dialog.Footer>
								</Dialog.Content>
							</Dialog.Positioner>
						</Portal>
					</Dialog.Root>
				</>
			)}
		</ClientOnly>
	);
}
