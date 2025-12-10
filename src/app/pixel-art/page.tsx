"use client";

import {
	Bleed,
	Box,
	Button,
	ButtonGroup,
	Card,
	ClientOnly,
	Code,
	ColorPicker,
	Container,
	Dialog,
	DownloadTrigger,
	FileUpload,
	Heading,
	HStack,
	IconButton,
	Input,
	Portal,
	parseColor,
	Separator,
	SimpleGrid,
	Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { Turnstile } from "next-turnstile";
import { useEffect, useState } from "react";
import {
	FaCheck,
	FaDownload,
	FaEraser,
	FaEyeDropper,
	FaFileExport,
	FaFileImport,
	FaPaintbrush,
	FaRotateRight,
	FaTrashCan,
	FaUpload,
} from "react-icons/fa6";
import z, { ZodError } from "zod";
import { useColorMode } from "@/components/ui/color-mode";
import { Tooltip } from "@/components/ui/tooltip";
import { config } from "@/config";
import {
	DrawingPixelArt,
	type DrawingPixelArtType,
	type PixelType,
	type ResponsePixelArtType,
	SavedPixelArt,
	SavedPixelArtFromLocalStorage,
	type SavedPixelArtFromLocalStorageType,
	type SavedPixelArtType,
} from "@/interface/pixel-art";
import { uploadPixels } from "@/lib/pixel-art";
import Loading from "../loading";

if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)
	throw new Error("Turnstileのサイトキーがありません");

function initPixels() {
	return new Array(5 * 5).fill(0).map((_, i) => ({ index: i, color: null }));
}

enum Storage {
	Drawing = "pixel_art",
	Saved = "pixel_art_saved",
}

export default function Page() {
	const { colorMode } = useColorMode();
	const [token, setToken] = useState<string | null>(null);
	const [pixels, setPixels] = useState<PixelType[]>(initPixels());
	const [title, setTitle] = useState("");
	const [mode, setMode] = useState<"draw" | "erase" | "pipette">("draw");
	const [color, setColor] = useState(parseColor("#fc835cff"));
	const [uploadDialog, setUploadDialog] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [responsePixelArt, setResponsePixelArt] =
		useState<ResponsePixelArtType | null>(null);
	const [saved, setSaved] = useState<SavedPixelArtType[]>([]);
	const [savedIndicator, setSavedIndicator] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const savedDrawing = localStorage.getItem(Storage.Drawing);
		if (!savedDrawing) return;

		let parsed: DrawingPixelArtType;
		try {
			parsed = DrawingPixelArt.parse(JSON.parse(savedDrawing));
		} catch (e) {
			setError(
				`描き途中の絵の読み込みに失敗しました\n${e instanceof ZodError ? e.message : e}`,
			);
			return;
		}

		setTitle(parsed.title);
		setPixels(parsed.pixels);
	}, []);

	useEffect(() => {
		const savedPixelArts = localStorage.getItem(Storage.Saved);
		if (!savedPixelArts) return;

		let parsedToDate: SavedPixelArtType[];
		try {
			const parsed = z
				.array(SavedPixelArtFromLocalStorage)
				.parse(JSON.parse(savedPixelArts));
			parsedToDate = z.array(SavedPixelArt).parse(
				parsed.map(({ publishedAt, savedAt, ...rest }) => ({
					...rest,
					publishedAt: new Date(publishedAt),
					savedAt: new Date(savedAt),
				})),
			);
		} catch (e) {
			setError(
				`保存されていた絵の読み込みに失敗しました\n${e instanceof ZodError ? e.message : e}`,
			);
			return;
		}

		setSaved(parsedToDate);
	}, []);

	function changePixel(pixel: PixelType, index: number) {
		if (mode === "pipette" && pixel.color) {
			setColor(parseColor(pixel.color));
			setMode("draw");
			return;
		}
		setPixels((pixels) => {
			const newPixels = pixels.map((pixel, i) =>
				i === index
					? { ...pixel, color: mode === "draw" ? color.toString("hexa") : null }
					: pixel,
			);
			localStorage.setItem(
				Storage.Drawing,
				JSON.stringify({ title, pixels: newPixels }),
			);
			return newPixels;
		});
	}

	async function upload() {
		if (!token) return;
		setUploading(true);
		const res = await uploadPixels({
			title: title || "無題",
			pixels,
			token,
		});
		setUploading(false);
		setUploadDialog(false);
		if (res.error) return setError(res.message);
		setTitle("");
		setPixels(initPixels());
		localStorage.removeItem(Storage.Drawing);
		setResponsePixelArt(res);
	}

	function saveResponse() {
		if (!responsePixelArt) return;
		const data = {
			...responsePixelArt,
			savedAt: new Date(),
		};
		setSaved((prevSaved) => {
			const newSaved = [...prevSaved, data];
			localStorage.setItem(Storage.Saved, JSON.stringify(newSaved));
			return newSaved;
		});
		setSavedIndicator(true);
		setTimeout(() => {
			setSavedIndicator(false);
			setResponsePixelArt(null);
		}, 1000);
	}

	async function importSavedArts({ files }: { files: File[] }) {
		let parsed: SavedPixelArtFromLocalStorageType[];
		try {
			parsed = SavedPixelArtFromLocalStorage.array().parse(
				await files[0].text(),
			);
		} catch (e) {
			return setError(
				`インポートに失敗しました\n${e instanceof ZodError ? e.message : e}`,
			);
		}
		const parsedToDate: SavedPixelArtType[] = parsed.map(
			({ publishedAt, savedAt, ...rest }) => ({
				...rest,
				publishedAt: new Date(publishedAt),
				savedAt: new Date(savedAt),
			}),
		);

		setSaved((prevSaved) => {
			const data = [
				...parsedToDate,
				...prevSaved.filter(
					(saved) => !parsed.some((data) => saved.uuid === data.uuid),
				),
			];
			data.sort((a, b) => a.savedAt.getTime() - b.savedAt.getTime());
			localStorage.setItem(Storage.Saved, JSON.stringify(data));
			return data;
		});
	}

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
									onBlur={() =>
										localStorage.setItem(
											Storage.Drawing,
											JSON.stringify({ title, pixels }),
										)
									}
									borderWidth="1px"
									borderColor="border"
									rounded="none"
									variant="subtle"
									flex={1}
									placeholder="無題 (7文字まで)"
									maxLength={7}
								/>
								<Dialog.Root placement="center" fontFamily="dot">
									<Dialog.Trigger asChild>
										<IconButton variant="outline" rounded="none">
											<FaRotateRight />
										</IconButton>
									</Dialog.Trigger>
									<Portal>
										<Dialog.Backdrop />
										<Dialog.Positioner>
											<Dialog.Content rounded="none">
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
																localStorage.removeItem(Storage.Drawing);
															}}
															rounded="none"
														>
															はい
														</Button>
													</Dialog.ActionTrigger>
													<Dialog.ActionTrigger asChild>
														<Button variant="outline" rounded="none">
															いいえ
														</Button>
													</Dialog.ActionTrigger>
												</Dialog.Footer>
											</Dialog.Content>
										</Dialog.Positioner>
									</Portal>
								</Dialog.Root>
							</HStack>
							<SimpleGrid
								columns={5}
								borderWidth="1px"
								bgImage={`
									repeating-linear-gradient(
										45deg,
										{colors.bg.panel},
										{colors.bg.panel} 5px,
										{colors.bg.emphasized} 5px,
										{colors.bg.emphasized} 10px
									)
  								`}
							>
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
										onClick={() => changePixel(pixel, i)}
									/>
								))}
							</SimpleGrid>
							<HStack justify="space-between">
								<ButtonGroup variant="surface" borderWidth="1px" attached>
									<IconButton
										variant={mode === "draw" ? "solid" : undefined}
										rounded="none"
										onClick={() => setMode("draw")}
									>
										<FaPaintbrush />
									</IconButton>
									<IconButton
										variant={mode === "erase" ? "solid" : undefined}
										rounded="none"
										onClick={() => setMode("erase")}
									>
										<FaEraser />
									</IconButton>
									<IconButton
										variant={mode === "pipette" ? "solid" : undefined}
										rounded="none"
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
										<ColorPicker.Trigger rounded="none" cursor="button" />
									</ColorPicker.Control>
									<Portal>
										<ColorPicker.Positioner>
											<ColorPicker.Content rounded="none">
												<ColorPicker.Area rounded="none" />
												<ColorPicker.Sliders rounded="none" />
											</ColorPicker.Content>
										</ColorPicker.Positioner>
									</Portal>
								</ColorPicker.Root>
							</HStack>
							<Separator />
							<Dialog.Root
								placement="center"
								open={uploadDialog}
								onOpenChange={(e) => {
									if (!e.open) setToken(null);
									setUploadDialog(e.open);
								}}
								fontFamily="dot"
							>
								<Dialog.Trigger asChild>
									<Button rounded="none" w="full">
										交換する
									</Button>
								</Dialog.Trigger>
								<Portal>
									<Dialog.Backdrop />
									<Dialog.Positioner>
										<Dialog.Content rounded="none">
											<Dialog.Header>
												<Dialog.Title>本当に交換しますか？</Dialog.Title>
											</Dialog.Header>
											<Dialog.Body spaceY="2">
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
													onClick={upload}
													rounded="none"
												>
													はい
												</Button>
												<Dialog.ActionTrigger asChild>
													<Button variant="outline" rounded="none">
														いいえ
													</Button>
												</Dialog.ActionTrigger>
											</Dialog.Footer>
										</Dialog.Content>
									</Dialog.Positioner>
								</Portal>
							</Dialog.Root>
						</Box>
						<Separator w="full" />
						<HStack>
							<ButtonGroup variant="surface" attached>
								<FileUpload.Root
									accept="application/json"
									onFileAccept={importSavedArts}
								>
									<FileUpload.HiddenInput />
									<FileUpload.Trigger asChild>
										<Button rounded="none">
											<FaFileImport />
											インポート
										</Button>
									</FileUpload.Trigger>
								</FileUpload.Root>
								<DownloadTrigger
									data={JSON.stringify(saved)}
									fileName="saved_pixels.json"
									mimeType="application/json"
									asChild
								>
									<Button rounded="none">
										<FaFileExport />
										エクスポート
									</Button>
								</DownloadTrigger>
							</ButtonGroup>
							<Dialog.Root placement="center" fontFamily="dot">
								<Dialog.Trigger asChild>
									<IconButton rounded="none" variant="outline">
										<FaTrashCan />
									</IconButton>
								</Dialog.Trigger>
								<Portal>
									<Dialog.Backdrop />
									<Dialog.Positioner>
										<Dialog.Content rounded="none">
											<Dialog.Header>
												<Dialog.Title>本当に削除しますか？</Dialog.Title>
											</Dialog.Header>
											<Dialog.Body>
												<Text>
													エクスポート済みのデータがあれば復元できます。
												</Text>
											</Dialog.Body>
											<Dialog.Footer>
												<Dialog.ActionTrigger asChild>
													<Button
														colorPalette="red"
														onClick={() => {
															setSaved([]);
															localStorage.removeItem(Storage.Saved);
														}}
														rounded="none"
													>
														はい
													</Button>
												</Dialog.ActionTrigger>
												<Dialog.ActionTrigger asChild>
													<Button variant="outline" rounded="none">
														いいえ
													</Button>
												</Dialog.ActionTrigger>
											</Dialog.Footer>
										</Dialog.Content>
									</Dialog.Positioner>
								</Portal>
							</Dialog.Root>
						</HStack>
						<SimpleGrid columns={[2, 2, 3, 4, 6]}>
							{saved.map((data) => (
								<Card.Root
									key={`pixels-saved-${data.uuid}`}
									size="sm"
									w="max"
									rounded="none"
									{...config.inAnimation}
								>
									<Card.Header>
										<Card.Title>{data.title}</Card.Title>
									</Card.Header>
									<Card.Body display="flex" alignItems="center">
										<SimpleGrid columns={5} w="max" borderWidth="1px">
											{data.pixels.map((pixel) => (
												<Bleed
													w={["6", "8"]}
													h={["6", "8"]}
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
									<Card.Footer flexDir="column" alignItems="start">
										{[
											{
												icon: <FaUpload />,
												label: "投稿日",
												date: data.publishedAt,
											},
											{
												icon: <FaDownload />,
												label: "保存日",
												date: data.savedAt,
											},
										].map((date) => (
											<Tooltip
												key={`${date.label}-${data.uuid}`}
												content={date.date.toISOString()}
											>
												<HStack color="fg.muted" fontSize="sm" as="p" gap="1">
													{date.icon}
													{format(date.date, "MM/dd HH:mm")}
												</HStack>
											</Tooltip>
										))}
									</Card.Footer>
								</Card.Root>
							))}
						</SimpleGrid>
					</Container>
					<Dialog.Root
						placement="center"
						open={error !== null}
						onOpenChange={() => setError(null)}
						fontFamily="dot"
					>
						<Portal>
							<Dialog.Backdrop />
							<Dialog.Positioner>
								<Dialog.Content rounded="none">
									<Dialog.Header>
										<Dialog.Title>エラーが発生しました</Dialog.Title>
									</Dialog.Header>
									<Dialog.Body>
										<Code size="lg" whiteSpace="pre-wrap" rounded="none">
											{error}
										</Code>
									</Dialog.Body>
									<Dialog.Footer>
										<Dialog.ActionTrigger asChild>
											<Button rounded="none">分かった</Button>
										</Dialog.ActionTrigger>
									</Dialog.Footer>
								</Dialog.Content>
							</Dialog.Positioner>
						</Portal>
					</Dialog.Root>
					<Dialog.Root
						placement="center"
						open={responsePixelArt !== null}
						onOpenChange={() => setResponsePixelArt(null)}
						fontFamily="dot"
					>
						<Portal>
							<Dialog.Backdrop />
							<Dialog.Positioner>
								<Dialog.Content rounded="none">
									<Dialog.Header>
										<Dialog.Title>交換しました</Dialog.Title>
									</Dialog.Header>
									<Dialog.Body spaceY="2">
										<Heading>{responsePixelArt?.title}</Heading>
										<SimpleGrid columns={5} borderWidth="1px">
											{responsePixelArt?.pixels.map((pixel) => (
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
										<Button rounded="none" onClick={saveResponse}>
											{savedIndicator ? <FaCheck /> : "保存する"}
										</Button>
										<Dialog.ActionTrigger asChild>
											<Button variant="outline" rounded="none">
												閉じる
											</Button>
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
